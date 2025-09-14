import express from "express";
import dotenv from "dotenv";
import CognitoUIAuthSDK from "./cognito_ui_sdk.js";
import session from "express-session";

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
 * COGNITO-UI SDK
 */
const cognitoUIConfig = new CognitoUIAuthSDK({
  clientId: process.env.COGNITO_CLIENT_ID,
  clientSecret: process.env.COGNITO_CLIENT_SECRET,
  cognitoDomain: process.env.COGNITO_DOMAIN,
  sqsQueueUrl: process.env.SQS_QUEUE_URL,
  sessionKey: "userId",

  onLogin: async (user, tokens, req, res) => {
    console.log(" User logged in:", user);
  },
  onMe: async (userId, req, res) => {
    return { id: userId, role: "basic-user" };
  },
  onLogout: async (userId, req, res) => {
    console.log(" User logged out:", userId);
  },
});

//to register cognito-ui routes
app.use("/cognito-ui", cognitoUIConfig.router);

//to authorize cognito-ui routes
app.get("/cognito-ui-test", cognitoUIConfig.authMiddleware, (req, res) => {
  res.send("Cognito UI Auth Middleware is working!");
});
/**************************************/ 

app.get("/", (req, res) => {
  res.send("Cognito Auth SDK Server is running!");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running at http://localhost:${process.env.PORT}`)
);
