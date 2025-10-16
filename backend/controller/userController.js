
import User from "../models/user.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import {  generateTokenAndSaveInCookies } from "../jwt/token.js"; // fixed

const userSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, { message: "Password must be at least 5 characters" })
});

export const signupController = async (req, res) => {
  try {
    console.log("📩 Received body:", req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ errors: "All fields are required" });

    const validation = userSchema.safeParse({ username, email, password });
    if (!validation.success) {
      const errors = validation.error.issues.map(err => err.message);
      return res.status(400).json({ errors });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ errors: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = generateTokenAndSaveInCookies(savedUser._id, res);

    return res.status(201).json({
      message: "User signed up successfully",
      savedUser,
      token
    });

  } catch (error) {
    console.error("❌ Signup error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ errors: "All fields are required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ errors: "User not found or password incorrect" });
  
    const { password: pwd, ...userData } = user._doc; // exclude password
    const token = generateTokenAndSaveInCookies (user._id, res);

    res.status(200).json({ message: "Login successfully", user: userData, token });

  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const logoutController = (req, res) => {
  
  try {
    res.clearCookie("jwt", { path: "/" });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Logout failed" });
  }
};
