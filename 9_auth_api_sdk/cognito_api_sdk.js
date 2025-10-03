// cognito_api_sdk.js
import express from "express";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand ,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import axios from "axios";
import crypto from "crypto";

export default function CognitoApiSdk({
  region,
  userPoolId,
  clientId,
  clientSecret,
  cognitoDomain,
  sqsQueueUrl,
  onSuccess = () => {},
  onError = () => {},
  onRegister,
  onLogin,
  onVerify,
  onGoogleLoginStart,
  onGoogleCallback,
  onForgotPassword,
  onResetPassword,
  onPasswordless,
}) {
  const router = express.Router();
  const cognito = new CognitoIdentityProviderClient({ region });
  const sqs = new SQSClient({ region });
  const sns = new SNSClient({ region });
  const otpStore = new Map();
  function generateSecretHash(username, clientId, clientSecret) {
    return crypto
      .createHmac("SHA256", clientSecret)
      .update(username + clientId)
      .digest("base64");
  }

  // === SQS Notifier ===
  async function notifySQS(event, payload = {}) {
    try {
      await sqs.send(
        new SendMessageCommand({
          QueueUrl: sqsQueueUrl,
          MessageBody: JSON.stringify({ event, ...payload, timestamp: Date.now() }),
        })
      );
    } 
    catch (err) {
      console.error("SQS error:", err);
    }
  }
  

  // === Handler Wrapper ===
  function handleRoute(event, fn, hook) {
    return async (req, res, next) => {
      try {
        const result = await fn(req, res);
        await notifySQS(event, { user: req.body?.email || req.query?.code });
        if (hook) await hook(req, res, result); // per-route callback
        onSuccess(event, result); // global fallback
        if (!res.headersSent) res.json(result);
      } catch (err) {
        await notifySQS(event + "_error", { error: err.message });
        if (hook) await hook(req, res, null, err); // pass error too
        onError(event, err);
        next(err);
      }
    };
  }

  // ===== REGISTER =====
  router.post(
    "/register",
    handleRoute(
      "register",
      async (req) => {
        const { username, email, password } = req.body;
        return cognito.send(
          new SignUpCommand({
             
            ClientId: clientId,
            Username: username,
            Password: password,
            SecretHash: generateSecretHash(username, clientId, clientSecret),
            UserAttributes: [
              { Name: "email", Value: email },
              { Name: "name", Value: username } 
            ],

          })
        );
      },
      onRegister
    )
  );

  // ===== VERIFY ACCOUNT =====
  router.post(
    "/verify",
    handleRoute(
      "verify",
      async (req) => {
        const { username, code } = req.body;
        return cognito.send(
          new ConfirmSignUpCommand({
            ClientId: clientId,
            Username: username,
            ConfirmationCode: code,
            SecretHash: generateSecretHash(username, clientId, clientSecret),
          })
        );
      },
      onVerify
    )
  );

  // ===== LOGIN (username + password) =====
  router.post(
    "/login",
    handleRoute(
      "login",
      async (req) => {
        const { username, password } = req.body;
        return cognito.send(
          new InitiateAuthCommand({
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: clientId,
            AuthParameters: 
            { 
              USERNAME: username, 
              PASSWORD: password, 
              SECRET_HASH: generateSecretHash(username, clientId, clientSecret),
             },
          })
        );
      },
      onLogin
    )
  );

  // ===== LOGIN WITH GOOGLE (redirect) =====
  router.get(
    "/login/google",
    handleRoute(
      "loginGoogleStart",
      async (req, res) => {
        // Take redirect_uri dynamically from query or fallback
        const dynamicRedirectUri = `${req.protocol}://${req.get("host")}/cognito-api/auth/callback`;

        const url = `${cognitoDomain}/oauth2/authorize?identity_provider=Google&redirect_uri=${encodeURIComponent(
          dynamicRedirectUri
        )}&response_type=CODE&client_id=${clientId}&scope=openid+email+profile`;

        res.redirect(url);
        return { message: "Redirecting to Google login", redirect: url };
      },
      onGoogleLoginStart
    )
  );

 // ===== GOOGLE CALLBACK =====
  router.get(
    "/auth/callback",
    handleRoute(
      "loginGoogleCallback",
      async (req) => {
        const { code } = req.query;

        const dynamicRedirectUri =
          req.query.redirect_uri ||
          `${req.protocol}://${req.get("host")}/cognito-api/auth/callback`;

        const params = new URLSearchParams({
          grant_type: "authorization_code",
          client_id: clientId,
          code,
          redirect_uri: dynamicRedirectUri,
        });

        if (clientSecret) {
          params.append("client_secret", clientSecret);
        }

        const tokenRes = await axios.post(
          `${cognitoDomain}/oauth2/token`,
          params.toString(),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );

        return tokenRes.data; 
      },
      onGoogleCallback
    )
  );

  // ===== FORGOT PASSWORD =====
  router.post(
    "/forgot-password",
    handleRoute(
      "forgotPassword",
      async (req) => {
        const { username } = req.body;
        return cognito.send(
          new ForgotPasswordCommand({
            ClientId: clientId,
            Username: username,
            SecretHash: generateSecretHash(username, clientId, clientSecret),
             
          })
        );
      },
      onForgotPassword
    )
  );

  // ===== RESET PASSWORD =====
  router.post(
    "/reset-password",
    handleRoute(
      "resetPassword",
      async (req) => {
        const { username, code, newPassword } = req.body;
        return cognito.send(
          new ConfirmForgotPasswordCommand({
            ClientId: clientId,
            Username: username,
            ConfirmationCode: code,
            Password: newPassword,
            SecretHash: generateSecretHash(username, clientId, clientSecret),
          })
        );
      },
      onResetPassword
    )
  );

  // // ===== PASSWORDLESS INIT =====
  // router.post("/passwordless", async (req, res) => {
  //   const { email } = req.body;

  //   if (!email) {
  //     return res.status(400).json({ success: false, message: "Email is required" });
  //   }

  //   // 1 Generate OTP
  //   const token = Math.floor(100000 + Math.random() * 900000).toString();

  //   // 2 Save OTP with expiry (5 mins)
  //   otpStore.set(email, { token, expires: Date.now() + 5 * 60 * 1000 });

  //   // 3 Publish OTP to SNS Topic (subscriber = user’s email)
  //   try {
  //     await sns.send(
  //       new PublishCommand({
  //         TopicArn: process.env.SNS_TOPIC_ARN, // must be configured with email subscription
  //         Message: `Your login code is: ${token}`,
  //         Subject: "Your One-Time Login Code",
  //       })
  //     );

  //     res.json({ success: true, message: "OTP sent to email via SNS" });
  //   } catch (err) {
  //     console.error("SNS error:", err);
  //     res.status(500).json({ success: false, message: "Failed to send OTP" });
  //   }
  // });

  // // ===== PASSWORDLESS VALIDATE =====
  // router.post("/passwordless/validate", async (req, res) => {
  //   const { email, token } = req.body;

  //   const entry = otpStore.get(email);

  //   if (!entry || entry.token !== token || Date.now() > entry.expires) {
  //     return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  //   }

  //   //  Clear OTP after successful validation
  //   otpStore.delete(email);

  //   // 4 Generate JWT
  //   const jwtToken = jwt.sign(
  //     { sub: email },
  //     process.env.JWT_SECRET,
  //     { expiresIn: "30d" }
  //   );

  //   res.json({ success: true, token: jwtToken });
  // });

  return router;
}
