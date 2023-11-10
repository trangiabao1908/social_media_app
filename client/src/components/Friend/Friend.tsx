import React from "react";
import DisplayFLexBetween from "../DisplayFlexBetween/DisplayFLexBetween";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IThemeOptions } from "../../utils/theme";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { URL_GET_PICTURE } from "../../utils/constants";
// define type Props
type Props = {
  userId: string;
  username: string;
  location: string;
  picturePath: string;
};
const Friend: React.FC<Props> = (props) => {
  const { userId, username, location, picturePath } = props;
  const loggedUserId = useSelector((state: RootState) => state.user?._id);
  const friendsUserLogged = useSelector(
    (state: RootState) => state.user?.friends
  );
  const isFriend = friendsUserLogged?.find((friend) => friend._id === userId);
  const checkUserId = loggedUserId === userId;
  const theme: IThemeOptions = useTheme();
  const neutralMain = theme.palette.neutral.main;
  const neutralLight = theme.palette.neutral.light;
  const neutralMedium = theme.palette.neutral.medium;
  const primaryDark = theme.palette.primary.dark;
  const navigate = useNavigate();
  return (
    <>
      <DisplayFLexBetween>
        <DisplayFLexBetween gap={"16px"}>
          <Avatar
            alt="Avatar User"
            src={`${URL_GET_PICTURE}/${picturePath}`}
            sx={{ width: "46px", height: "46px" }}
          ></Avatar>
          <Box
            onClick={() => {
              navigate(`/profile/${userId}`), navigate(0);
            }}
          >
            <Typography
              color={neutralMain}
              variant="h5"
              fontSize={"16px"}
              fontWeight={600}
              sx={{ "&:hover": { color: neutralLight, cursor: "pointer" } }}
            >
              {username}
            </Typography>
            <Typography
              color={neutralMedium}
              sx={{ fontSize: "14px", marginTop: "3px" }}
            >
              {location}
            </Typography>
          </Box>
        </DisplayFLexBetween>
        {!checkUserId && (
          <React.Fragment>
            <IconButton
              sx={{ bgcolor: theme.palette.primary.light, padding: "8px" }}
            >
              {isFriend ? (
                <PersonRemoveOutlinedIcon
                  sx={{ color: { primaryDark } }}
                ></PersonRemoveOutlinedIcon>
              ) : (
                <PersonAddOutlinedIcon
                  sx={{ color: { primaryDark } }}
                ></PersonAddOutlinedIcon>
              )}
            </IconButton>
          </React.Fragment>
        )}
      </DisplayFLexBetween>
    </>
  );
};

export default Friend;
