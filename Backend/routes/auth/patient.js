import { Router } from "express";
import { authLimiter } from "../../middleware/authLimiter.js";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "example";

const LoginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(128).required(),
});

const router = Router();

router.post("/login", authLimiter, async (req, res) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  /* login a patient */
  const username = req.body.username;
  const password = req.body.password;
  try {
    //example user [replace with db searching]
    const user = {
      username: "admin",
      password: await bcrypt.hash("adminpass", 8),
    };
    //if user not found or password does not match hashed password(saved password)
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    //send user jwt token
    const token = jwt.sign(
      { username: username, role: "patient" },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({ token });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register", authLimiter, async (req, res) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  /* register a patient */
  const username = req.body.username;
  const password = req.body.password;
  try {
    //example user [replace with db searching]
    const user = {
      username: "admin",
      password: await bcrypt.hash("adminpass", 8),
    };

    //if user already exists [change the if statement]
    if (user) {
      return res.status(401).json({ message: "User Already Exists" });
    }

    //add user to db [todo]

    //send user jwt token
    const token = jwt.sign(
      { username: username, role: "patient" },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({ token });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
  return res.status(501).json({
    message: "register logic not implemented yet",
  });
});

export default router;
