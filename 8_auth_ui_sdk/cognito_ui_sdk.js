import axios from "axios";
import { Router } from "express";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

class CognitoUIAuthSDK {
  constructor({
    clientId,
    clientSecret = null,
    cognitoDomain,
    sqsQueueUrl,
    sessionKey = "userId",

    onLogin,
    onMe,
    onLogout,
  }) {
    if (!clientId || !cognitoDomain) {
      throw new Error("Missing required CognitoUIAuthSDK params");
    }

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.cognitoDomain = cognitoDomain;
    this.sqsQueueUrl = sqsQueueUrl;
    this.sessionKey = sessionKey;

    this.onLogin = onLogin;
    this.onMe = onMe;
    this.onLogout = onLogout;

    this.sqs = sqsQueueUrl
      ? new SQSClient({ region: process.env.AWS_REGION })
      : null;

    // 👉 Create a router internally
    this.router = Router();
    this.mountRoutes(this.router);
  }

  /**
   * Publish an event message to AWS SQS
   */
  async publishEvent(eventType, payload) {
    if (!this.sqs || !this.sqsQueueUrl) return;
    try {
      await this.sqs.send(
        new SendMessageCommand({
          QueueUrl: this.sqsQueueUrl,
          MessageBody: JSON.stringify({
            eventType,
            payload,
            at: new Date(),
          }),
        })
      );
    } catch (err) {
      console.error("SQS publish error:", err.message);
    }
  }

  /**
   * Register all authentication routes
   */
  mountRoutes(router) {
     // Login → Redirect to Cognito Hosted UI
    router.get("/auth/login", (req, res) => {
      const redirectUri = `${req.protocol}://${req.get("host")}/cognito-ui/auth/callback`;
     
      const url = `${this.cognitoDomain}/oauth2/authorize?redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=code&client_id=${
        this.clientId
      }&scope=openid+email+profile+aws.cognito.signin.user.admin`;

      res.redirect(url);
    });

    // Callback → Handle Cognito redirect & token exchange
    router.get("/auth/callback", async (req, res) => {
      const { code } = req.query;
      if (!code) return res.status(400).json({ error: "Missing code" });

      const redirectUri = `${req.protocol}://${req.get("host")}/cognito-ui/auth/callback`;

      try {
        const tokenResponse = await axios.post(
          `${this.cognitoDomain}/oauth2/token`,
          new URLSearchParams({
            grant_type: "authorization_code",
            client_id: this.clientId,
            code,
            redirect_uri: redirectUri,
            ...(this.clientSecret && { client_secret: this.clientSecret }),
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const { id_token, access_token, refresh_token } = tokenResponse.data;

        const payload = JSON.parse(
          Buffer.from(id_token.split(".")[1], "base64").toString("utf-8")
        );

        req.session[this.sessionKey] = payload.sub;

        if (this.onLogin) {
          await this.onLogin(
            payload,
            { id_token, access_token, refresh_token },
            req,
            res
          );
        }

        await this.publishEvent("LOGIN", { user: payload });

        res.json({ message: "Login successful", user: payload });
      } 
      catch (err) {
        res.status(400).json({ error: err.response?.data || err.message });
      }
    });

    // Me → Return current session user
    router.get("/auth/me", async (req, res) => {
      try {
        const userId = req.session[this.sessionKey];
        if (!userId) return res.status(401).json({ error: "Not authenticated" });

        let user = null;
        if (this.onMe) user = await this.onMe(userId, req, res);

        await this.publishEvent("ME", { userId });

        res.json({ user });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Logout → Clear session
    router.post("/auth/logout", async (req, res) => {
      try {
        const userId = req.session[this.sessionKey];
        if (this.onLogout) await this.onLogout(userId, req, res);

        if (req.session) req.session.destroy(() => {});
        await this.publishEvent("LOGOUT", { userId });

        res.json({ message: "Logout successful" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  }

  /**
   * Auth Middleware for cognito ui
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
   authMiddleware = (req, res, next) => {
    if (!req.session[this.sessionKey]) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  };
}

export default CognitoUIAuthSDK;
