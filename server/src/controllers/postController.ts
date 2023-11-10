import { Request, Response } from "express";

import Post from "../models/Post";

const postController = {
  // GET ALL POST
  getAllPost: async (_req: Request, res: Response) => {
    try {
      const posts = await Post.find()
        .populate("user", ["username", "picturePath", "email"])
        .populate("likes.user", ["username", "picturePath", "email"])
        .populate("comments.user", ["username", "picturePath", "email"])
        .sort({ updatedAt: "desc" });
      return res
        .status(200)
        .json({ success: true, message: "Get All Post Successfully", posts });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },
  // Get post account logged in
  getPost: async (req: Request, res: Response) => {
    try {
      const userId = req.user.userId;
      const posts = await Post.find({ user: userId })
        .populate("user", ["username", "picturePath", "email"])
        .sort({ updatedAt: "desc" });
      return res
        .status(200)
        .json({ success: true, message: "Get Post Successfully", posts });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },
  // GET post By ID //
  getPostsByID: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const posts = await Post.find({ user: userId }).populate("user", [
        "username",
        "picturePath",
        "email",
      ]);
      return res
        .status(200)
        .json({ success: true, message: "Get Post By ID Successfully", posts });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },
  // To create a new post //
  createPost: async (req: Request, res: Response) => {
    try {
      console.log(req.file);
      const userId = req.user.userId;
      const { description, location, picturePath } = req.body;
      if (!description) {
        return res.status(404).json({
          success: false,
          message: "Description is required",
        });
      }
      const newPost = new Post({
        user: userId,
        description,
        location,
        picturePath,
        like: [],
        comments: [],
      });
      newPost.populate("user", ["username", "picturePath", "email"]);
      await newPost.save();
      return res.status(201).json({
        success: true,
        message: "Create Post successfully",
        post: newPost,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // To update a post //
  updatePost: async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const postId = req.params.postId;
    const { description, location, picturePath } = req.body;
    if (!description) {
      return res.status(404).json({
        success: false,
        message: "Description is required",
      });
    }
    try {
      let updateNewValue = {
        description,
        picturePath,
        location,
      };
      const updatePostCondition = { _id: postId, user: userId };
      const updatePost = await Post.findOneAndUpdate(
        updatePostCondition,
        updateNewValue,
        { new: true }
      );
      if (!updatePost) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid post" });
      }
      return res.status(201).json({
        success: true,
        message: "Post updated successfully",
        post: updatePost,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // TO delete a post by ID //
  deletePost: async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const postId = req.params.postId;
    try {
      const deletePostCondition = { _id: postId, user: userId };
      const deletePost = await Post.findOneAndDelete(deletePostCondition);
      if (!deletePost) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid post" });
      }
      return res.status(201).json({
        success: true,
        message: "Post deleted successfully",
        post: deletePost,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // To like or dislike a post //
  likeDislikePost: async (req: Request, res: Response) => {
    try {
      const userId = req.user.userId;
      const postId = req.params.postId;
      const post = await Post.findById(postId);
      let deleteIndex: number | null = null;
      post!.likes?.map((user, index) => {
        const id = user.user;
        (id.toString() as string) === userId
          ? (deleteIndex = index)
          : deleteIndex;
      });
      if (deleteIndex !== null) {
        post?.likes?.splice(deleteIndex, 1);
      } else {
        post?.likes?.push({ user: userId });
      }
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { likes: post?.likes },
        { new: true }
      ).populate("likes.user", ["username", "picturePath", "email"]);
      return res.status(200).json({
        success: true,
        message: "Like or dislike post successfully",
        post: updatedPost,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // To comment a post //
  commentPost: async (req: Request, res: Response) => {
    try {
      const commentValue = req.body.comment;
      const userId = req.user.userId;
      const postId = req.params.postId;
      const post = await Post.findById(postId);
      if (!commentValue) {
        return res
          .status(404)
          .json({ success: false, message: "comment value is required" });
      }
      post?.comments?.push({
        user: userId,
        comment: commentValue,
        // _id: new mongoose.Types.ObjectId(),
      });
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          comments: post?.comments,
        },
        {
          new: true,
        }
      ).populate("comments.user", ["username", "picturePath", "email"]);
      return res.status(200).json({
        success: true,
        message: "Comment Post Successfully",
        updatedPost,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },
  // To comment a post //
  deleteCommentPost: async (req: Request, res: Response) => {
    try {
      const userId = req.user.userId;
      const postId = req.params.postId;
      const commentId = req.body.commentId;
      if (!postId) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid post" });
      }
      if (!commentId) {
        return res
          .status(404)
          .json({ success: false, message: "CommentID is required" });
      }
      const post = await Post.findById(postId);
      let deleteIndex: number | null = null;
      post?.comments?.map((data, index) => {
        (data._id!.toString() as string) === commentId &&
        data.user.toString() === userId
          ? (deleteIndex = index)
          : deleteIndex;
      });
      console.log("deleteIndex: ", deleteIndex);
      if (deleteIndex !== null) {
        post?.comments?.splice(deleteIndex, 1);
      }
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          comments: post?.comments,
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Delete Comment Post Successfully",
        updatedPost,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },
};

export default postController;
