import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import argon2 from "argon2";
import User from "../models/User";
import { createCookie, createToken } from "../utils/auth";
import { AuthPayload } from "../types/AuthPayload";
dotenv.config();
export let refreshTokens: string[] = [];
console.log(refreshTokens);
const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email: email });
      if (!existingUser) {
        return res
          .status(404)
          .json({ success: false, message: "Wrong email !!!" });
      }
      const isValidPassWord = await argon2.verify(
        existingUser.password,
        password
      );
      if (!isValidPassWord) {
        return res.status(404).json({
          success: false,
          message: "Wrong password !!!",
        });
      }
      createCookie(res, existingUser, refreshTokens);
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: existingUser,
        accessToken: createToken("access_token", existingUser),
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // register a user
  register: async (req: Request, res: Response) => {
    const {
      username,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    try {
      console.log("req.file:", req.file);
      if (!email || !password) {
        return res.status(403).json({
          success: false,
          message: "Please enter your email or password.",
        });
      }
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }
      const hashPassword = await argon2.hash(password);
      const newUser = new User({
        username,
        email,
        password: hashPassword,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
        isAdmin: false,
      });
      const savedUser = await newUser.save();
      // const { ...others, password } = savedUser._doc;
      return res.status(201).json({
        success: true,
        message: "Registration successful",
        newUser: savedUser,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_NAME as string];
    if (!refreshToken) {
      return res.sendStatus(401);
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not available");
    }
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESHTOKEN_SECRET as Secret
      ) as AuthPayload;
      const existingUser = await User.findById(decoded.userId);
      if (!existingUser) {
        return res.sendStatus(401);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      createCookie(res, existingUser, refreshTokens);
      return res.status(200).json({
        success: true,
        message: "Refresh Token Successfully",
        accessToken: createToken("access_token", existingUser),
      });
    } catch (error) {
      console.log(error.message);
      return res.sendStatus(403);
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      const userId = req.user.userId;
      const existingUSer = await User.findById(userId);
      if (!existingUSer) {
        return res
          .status(400)
          .json({ success: false, message: "You are not logged in" });
      }
      res.clearCookie(process.env.REFRESH_TOKEN_NAME as string, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/api/auth/refresh_token",
      });
      return res
        .status(200)
        .json({ success: true, message: "Logout successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default authController;
