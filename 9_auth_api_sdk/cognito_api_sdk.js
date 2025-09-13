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
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import axios from "axios";
 import crypto from "crypto";

export default function CognitoApiSdk({
  region,
  userPoolId,
  clientId,
  clientSecret,
  cognitoDomain,
  redirectUri,
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

  // ===== LOGIN (email + password) =====
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
        const { code, redirect_uri } = req.query;
        const dynamicRedirectUri = `${req.protocol}://${req.get("host")}/cognito-api/auth/callback`;

        const tokenRes = await axios.post(
          `${cognitoDomain}/oauth2/token`,
          new URLSearchParams({
            grant_type: "authorization_code",
            client_id: clientId,
            code,
            redirect_uri: dynamicRedirectUri,
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
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
        const { email } = req.body;
        return cognito.send(
          new ForgotPasswordCommand({
            ClientId: clientId,
            Username: email,
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
        const { email, code, newPassword } = req.body;
        return cognito.send(
          new ConfirmForgotPasswordCommand({
            ClientId: clientId,
            Username: email,
            ConfirmationCode: code,
            Password: newPassword,
          })
        );
      },
      onResetPassword
    )
  );

  // ===== PASSWORDLESS =====
  router.post(
    "/passwordless",
    handleRoute(
      "passwordless",
      async (req) => {
        const { email } = req.body;
        return cognito.send(
          new InitiateAuthCommand({
            AuthFlow: "CUSTOM_AUTH",
            ClientId: clientId,
            AuthParameters: { USERNAME: email },
          })
        );
      },
      onPasswordless
    )
  );

  return router;
}
