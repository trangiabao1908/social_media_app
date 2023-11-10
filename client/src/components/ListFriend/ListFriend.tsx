import React, { useContext, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { IThemeOptions } from "../../utils/theme";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import WrapperBox from "../WrapperBox/WrapperBox";
import Friend from "../Friend/Friend";
import { UserContextType, UserContext } from "../../contexts/UserProvider";

///defind type Props
type Props = {
  userId: string;
};
const ListFriend: React.FC<Props> = (props) => {
  const { userId } = props;
  const theme: IThemeOptions = useTheme();
  const UserLoggedFriends = useSelector(
    (state: RootState) => state.user?.friends
  );
  const { getUserFriend } = useContext<UserContextType>(UserContext);

  useEffect(() => {
    console.log("Is Fetching Friend List...");
    const fetchUserFriend = async () => {
      try {
        const res = await getUserFriend(userId);
        if (!res.success) {
          console.log(res.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserFriend();
  }, [userId, getUserFriend]);
  return (
    <React.Fragment>
      <WrapperBox>
        <Typography
          variant="h5"
          fontSize={"16px"}
          fontWeight={"600"}
          color={theme.palette.neutral.dark}
        >
          Friend List
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"25px"}
          margin={"25px 0px 10px 0px"}
        >
          {UserLoggedFriends?.map((friend, index) => (
            <Friend
              key={index}
              username={friend.username}
              location={friend.location}
              picturePath={friend.picturePath}
              userId={friend._id}
            ></Friend>
          ))}
        </Box>
      </WrapperBox>
    </React.Fragment>
  );
};

export default ListFriend;
