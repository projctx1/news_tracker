import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import CognitoApiSdk from "./cognito_api_sdk.js"; 
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "super-secret",
    resave: false,
    saveUninitialized: true,
  })
);

/******************************** 
 * COGNITO-API SDK
 */
const cognitoAPIRouter = CognitoApiSdk({
  region: process.env.AWS_REGION,
  userPoolId: process.env.COGNITO_POOL,
  clientId: process.env.COGNITO_CLIENT_ID,
  clientSecret: process.env.COGNITO_CLIENT_SECRET,
  cognitoDomain: process.env.COGNITO_DOMAIN,
  sqsQueueUrl: process.env.SQS_QUEUE_URL,

  // REGISTER
  onRegister: async (req, res, result, err) => {
    if (err) return console.error("Register failed:", err.message);
    console.log("New user registered:", result);
  },

  // LOGIN (email/password)
  onLogin: async (req, res, result, err) => {
    if (err) return console.error("Login failed:", err.message);
    console.log(" User logged in:", result.AuthenticationResult.AccessToken);
  },

  // VERIFY (email)
  onVerify: async (req, res, result, err) => {
      if (err) {
        return res.status(400).json({ message: "Verification failed", error: err.message });
      }
      return res.status(200).json({ message: "Account verified successfully", result });
    },

  // GOOGLE LOGIN START
  onGoogleLoginStart: async (req, res, result, err) => {
    if (err) return console.error("Google login start failed:", err.message);
    console.log(" Google login redirect started:", result.redirect);
  },

  // GOOGLE CALLBACK
  onGoogleCallback: async (req, res, result, err) => {
    if (err) return console.error("Google callback error:", err.message);
    console.log(" Google callback result (tokens):", result);
  },

  // FORGOT PASSWORD
  onForgotPassword: async (req, res, result, err) => {
    if (err) return console.error("Forgot password error:", err.message);
    console.log(" Forgot password request sent:", result);
  },

  // RESET PASSWORD
  onResetPassword: async (req, res, result, err) => {
    if (err) return console.error("Reset password error:", err.message);
    console.log(" Password reset successful:", result);
  },

  // PASSWORDLESS
  onPasswordless: async (req, res, result, err) => {
    if (err) return console.error("Passwordless login error:", err.message);
    console.log(" Passwordless flow initiated:", result);
  },
});


app.use("/cognito-api", cognitoAPIRouter);
/**************************************************/

app.get("/", (req, res) => {
  res.send("Cognito API SDK Server is running!");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running at http://localhost:${process.env.PORT}`)
);
