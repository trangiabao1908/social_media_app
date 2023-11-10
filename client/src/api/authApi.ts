import axios from "axios";
import { LoginFormValues } from "../pages/LoginPage/FormLogin";
import { IAuthResponse } from "./types";
import { RegisterFormType } from "../pages/RegisterPage/FormRegister";
import authToken from "../utils/authToken";

const BASE_URL = "http://localhost:3000/api";
export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const loginUserFn = async (values: LoginFormValues) => {
  const res = await authApi.post<IAuthResponse>("auth/login", values);
  console.log(res.data);
  return res.data;
};

export const registerUserFn = async (values: RegisterFormType) => {
  const { username, password, location, occupation, picture, email } = values;
  const exploded_name = picture?.name?.split(".");
  const ext = exploded_name![exploded_name!.length - 1];
  const picturePath =
    "picture" + "_" + exploded_name![0] + "_avatar" + `.${ext}`;
  const dataRegister = new FormData();
  dataRegister.append("username", username);
  dataRegister.append("password", password);
  dataRegister.append("location", location);
  dataRegister.append("occupation", occupation);
  dataRegister.append("email", email);
  if (picture) {
    dataRegister.append("picture", picture);
    dataRegister.append("picturePath", picturePath);
  }
  const res = await authApi.post<IAuthResponse>("auth/register", dataRegister, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(res.data);
  return res.data;
};

export const logoutUserFn = async () => {
  const accessToken = authToken.getAccessToken();

  const res = await authApi.get<IAuthResponse>("auth/logout", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
