import axios from "axios";
import configHeaderAxios from "../utils/configHeaderAxios";
import { IPostResponse } from "./types";
import { store } from "../redux/store";
import { setPosts } from "../redux";
const BASE_URL = "http://localhost:3000/api";
export const postApi = axios.create({
  baseURL: BASE_URL,
});
postApi.defaults.headers.common["Content-Type"] = "application/json";
export const getAllPostFn = async () => {
  const config = configHeaderAxios.configHeaderAxiosWithAuthorization();
  try {
    const res = await postApi.get<IPostResponse>(`post/posts`, config);
    if (res.data.success) {
      store.dispatch(setPosts(res.data));
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
