import { IUser } from "src/models/User";
import jwt, { Secret } from "jsonwebtoken";
import { Response } from "express";

export const createToken = (
  type: "access_token" | "refresh_token",
  user: IUser
) => {
  const token = jwt.sign(
    {
      userId: user._id,
    },
    type == "access_token"
      ? (process.env.ACCESSTOKEN_SECRET as Secret)
      : (process.env.REFRESHTOKEN_SECRET as Secret),
    {
      expiresIn: type === "access_token" ? "5m" : "2h",
    }
  );
  return token;
};
export const createCookie = (
  res: Response,
  user: IUser,
  refreshTokens: string[]
) => {
  const refreshToken = createToken("refresh_token", user);
  refreshTokens.push(refreshToken);
  res.cookie(process.env.REFRESH_TOKEN_NAME as string, refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/api/auth/refresh_token",
  });
};
