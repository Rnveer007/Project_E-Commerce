import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import Admin from "../models/adminModel.js";
import "dotenv/config";

export async function checkUser(req, res, next) {
  const token = req.cookies.loginToken;
  if (!token) return res.status(401).send({ message: "No Token Found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid or expired token" });
  }
}

export async function checkAdmin(req, res, next) {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).send({ message: "No Token Found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("password");

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid or expired token" });
  }
}
