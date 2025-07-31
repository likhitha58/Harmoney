import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the full user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach required details to req.user
    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};
