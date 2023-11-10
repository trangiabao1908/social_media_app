import { createSlice } from "@reduxjs/toolkit";

export interface IPost {
  _id: string;
  location: string;
  user: IUser;
  picturePath: string;
  description: string;
  likes: ILike[];
  comments: IComment[];
}
export interface IComment {
  user: IUser;
  comment: string;
}
export interface ILike {
  user: IUser;
}
export interface IUser {
  _id: string;
  username: string;
  email: string;
  location: string;
  picturePath: string;
  occupation: string;
  friends: IUser[];
}
// Define a type for the slice state
export interface mediaState {
  loading: boolean;
  isAuthenticated: boolean;
  mode: string;
  posts: IPost[];
  post: IPost | null;
  user: IUser | null;
  // accessToken: string | null;
}
const initialState: mediaState = {
  loading: true,
  isAuthenticated: false,
  mode: "light",
  posts: [],
  post: null,
  user: null,
  // accessToken: null,
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setMode: (state: mediaState) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLoading: (state: mediaState) => {
      state.loading = false;
    },
    setLogin: (state: mediaState, action) => {
      // state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      // state.accessToken = action.payload.accessToken;
    },
    setLogout: (state: mediaState) => {
      state.user = null;
      state.isAuthenticated = false;
      // state.accessToken = null;
      // state.loading = true;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    createPosts: (state: mediaState, action) => {
      return {
        ...state,
        posts: [action.payload.post, ...state.posts],
      };
    },
    setPosts: (state: mediaState, action) => {
      return {
        ...state,
        posts: action.payload.posts,
      };
    },
    setPost: (state: mediaState, action) => {
      return {
        ...state,
        post: action.payload.post,
      };
    },
    updatePost: (state: mediaState, action) => {
      const newPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
      return {
        ...state,
        posts: newPosts,
      };
    },
    deletePost: (state: mediaState, action) => {
      const newPosts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
      return {
        ...state,
        posts: newPosts,
      };
    },
  },
});
export const {
  setMode,
  setLogin,
  setLogout,
  setPost,
  setFriends,
  createPosts,
  setPosts,
  updatePost,
  setLoading,
  deletePost,
} = mediaSlice.actions;

export default mediaSlice.reducer;
