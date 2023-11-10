import axios, { AxiosError } from "axios";
import React, { createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import { createPosts } from "../redux";
import { AuthContext, AuthContextType } from "./AuthProvider";
import configHeaderAxios from "../utils/configHeaderAxios";
import { BASE_URL_BACKEND } from "../utils/constants";
import { IPostResponse } from "../api/types";
type Props = {
  children: React.ReactNode;
};

export type PostContextType = {
  createPost: (values: FormData) => Promise<IPostResponse>;
};

const PostContextDefaultValues: PostContextType = {
  createPost: async () =>
    Promise.resolve({
      success: false,
      message: "",
    }),
};

export const PostContext = createContext<PostContextType>(
  PostContextDefaultValues
);
const PostProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const { openAlert, setInfoAlert, setOpenAlert } =
    useContext<AuthContextType>(AuthContext);
  const dispatch = useDispatch();
  // const accessToken = useSelector((state: RootState) => state.accessToken);

  //function to create new Post //
  const createPost = async (values: FormData) => {
    try {
      const config =
        configHeaderAxios.configHeaderAxiosWithAuthorizationandContentType();
      const res = await axios.post(
        `${BASE_URL_BACKEND}/api/post`,
        values,
        config
      );
      if (res.data.success) {
        dispatch(createPosts(res.data));
        setInfoAlert({
          time: 3000,
          type: "success",
          message: res.data.message,
        });
        setOpenAlert(!openAlert);
      }
      console.log(res.data);
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return err.response?.data;
      }
      if (err instanceof Error) {
        return { success: false, message: err.message };
      }
    }
  };
  const PostContextProps: PostContextType = {
    createPost,
  };
  return (
    <PostContext.Provider value={PostContextProps}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
