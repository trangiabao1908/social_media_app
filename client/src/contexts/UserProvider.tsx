import React, { createContext, useCallback } from "react";
import { useDispatch } from "react-redux";
import { IUser, setFriends } from "../redux";
import axios, { AxiosError } from "axios";
import configHeaderAxios from "../utils/configHeaderAxios";
import { BASE_URL_BACKEND } from "../utils/constants";
// define type Props
type Props = {
  children: React.ReactNode;
};
//define interface UserResponse
export interface IUserResponse {
  success: boolean;
  message: string;
  friendsFormatted?: IUser[];
}
export type UserContextType = {
  getUserFriend: (userId: string) => Promise<IUserResponse>;
};
const UserContextDefaultValues: UserContextType = {
  getUserFriend: async () =>
    Promise.resolve({
      success: false,
      message: "",
    }),
};
// defince UserContextType
export const UserContext = createContext<UserContextType>(
  UserContextDefaultValues
);

const UserProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const getUserFriend = useCallback(
    async (userId: string) => {
      try {
        const config = configHeaderAxios.configHeaderAxiosWithAuthorization();
        const res = await axios.get(
          `${BASE_URL_BACKEND}/api/user/${userId}/friends`,
          config
        );
        if (res.data.success) {
          dispatch(setFriends(res.data.friendsFormatted));
          console.log("Get User Friends successfully");
        }
        return res.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data);
          return err.response?.data;
        } else if (err instanceof Error) {
          console.log(err.message);
          return { success: false, message: err.message };
        }
      }
    },
    [dispatch]
  );
  const UserContextProps: UserContextType = {
    getUserFriend,
  };
  return (
    <UserContext.Provider value={UserContextProps}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
