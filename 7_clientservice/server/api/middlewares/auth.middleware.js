import User from "../db/models/app_user";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];  

    if (!token) {
      return res.status(401).json({ error: "No access token provided" });
    }

    // Check if token exists in DB
    const user = await User.findOne({ accessToken: token });

    if (!user) {
      return res.status(401).json({ error: "Invalid access token" });
    }
    
    if (req.session.userId != user._id) {
      return res.status(401).json({ error: "Unauthorized Forgery Operation" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return res.status(500).json({ error: "Server error during authentication" });
  }
};

export default authMiddleware;
