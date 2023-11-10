import { IPost, IUser } from "../redux";

export interface IAuthResponse {
  success: boolean;
  message: string;
  user?: IUser;
  newUser?: IUser;
  accessToken?: string;
}
export interface IPostResponse {
  success: boolean;
  message: string;
  post?: IPost;
  posts?: IPost[];
}
