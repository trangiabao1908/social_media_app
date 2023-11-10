import { JwtPayload } from "jwt-decode";
export type AuthPayload = JwtPayload & {
  userId: string;
};
