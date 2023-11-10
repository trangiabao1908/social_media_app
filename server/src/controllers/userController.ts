import { Request, Response } from "express";
import User from "../models/User";

const userController = {
  // Get All User //
  getAllUser: async (_req: Request, res: Response) => {
    try {
      const users = await User.find().select("-password");
      if (!users) {
        return res
          .status(400)
          .json({ success: false, message: "Get all user failed" });
      }
      return res.status(200).json({
        success: true,
        message: "Get all user successfully",
        users: users,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // GET USER BY ID //
  getUser: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      console.log(userId);
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      return res.status(200).json({
        success: true,
        message: "Get User By ID Successfully",
        user: user,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET USER FRIENDS //
  getUserFriend: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found." });
      }

      const friends = await Promise.all(
        user.friends.map((id) => {
          return User.findById(id).select("-password");
        })
      );
      const friendsFormatted = friends.map((friend) => {
        const _id = friend?._id;
        const username = friend?.username;
        const occupation = friend?.occupation;
        const location = friend?.location;
        const picturePath = friend?.picturePath;
        return {
          _id,
          username,
          occupation,
          location,
          picturePath,
        };
      });
      return res.status(200).json({
        success: true,
        message: "Get User Friends Successfully",
        friends: friends,
        friendsFormatted: friendsFormatted,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  //ADD OR REMOVE FRIEND
  addRemoveFriend: async (req: Request, res: Response) => {
    try {
      const userId = req.user.userId;
      const friendId = req.params.friendId;
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);
      if (user?.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId);
        friend!.friends = friend!.friends.filter((id) => id !== userId);
      } else {
        user?.friends.push(friendId);
        friend?.friends.push(userId);
      }
      await user?.save();
      await friend?.save();
      const friends = await Promise.all(
        user!.friends.map((id) => {
          return User.findById(id).select("-password");
        })
      );
      const friendsFormatted = friends.map((friend) => {
        const username = friend?.username;
        const occupation = friend?.occupation;
        const location = friend?.location;
        const picturePath = friend?.picturePath;
        return {
          username,
          occupation,
          location,
          picturePath,
        };
      });
      return res.status(201).json({
        success: true,
        message: "Friend Added or Removed Successfully",
        user,
        friendsFormatted,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default userController;
