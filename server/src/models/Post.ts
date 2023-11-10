import mongoose, { Schema } from "mongoose";
import { IUser } from "./User";
export interface IPost {
  user: IUser;
  description: string;
  picturePath: string;
  location: string;
  likes?: mongoose.Types.DocumentArray<ILike>;
  comments?: mongoose.Types.DocumentArray<IComment>;
}
export interface IComment {
  user: IUser;
  comment: string;
}
export interface ILike {
  user: IUser;
}
const postSchema = new mongoose.Schema<IPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    location: String,
    picturePath: String,
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>("Post", postSchema);
export default Post;
