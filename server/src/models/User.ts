import mongoose from "mongoose";

interface DocumentResult<T> {
  _doc: T;
}
export interface IUser extends DocumentResult<Event> {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  friends: string[];
  picturePath: string;
  location?: string;
  occupation?: string;
  viewedProfile: number;
  impressions: number;
  isAdmin: boolean;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    friends: [],
    picturePath: {
      type: String,
      default: "",
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
