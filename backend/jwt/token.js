
import jwt from "jsonwebtoken";

export const generateTokenAndSaveInCookies = (userId, res) => {
  // 1️⃣ Generate token
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET_KEY, // ✅ fixed spelling
    { expiresIn: "1d" }        //  ✅ valid timespan
  );

  // 2️⃣ Save in cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  return token;
};
