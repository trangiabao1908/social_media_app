import React, { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { IPost } from "../../redux";
import WrapperBox from "../WrapperBox/WrapperBox";
import DisplayFLexBetween from "../DisplayFlexBetween/DisplayFLexBetween";
import { IThemeOptions } from "../../utils/theme";
import Friend from "../Friend/Friend";
import { URL_GET_PICTURE } from "../../utils/constants";

interface IPostWidget extends IPost {
  isFetching: boolean;
  isLoading: boolean;
}
const PostWidget: React.FC<IPostWidget> = (props) => {
  const {
    _id,
    user,
    description,
    picturePath,
    location,
    isFetching,
    isLoading,
  } = props;
  const theme: IThemeOptions = useTheme();
  const neutralMain = theme.palette.neutral.main;
  const [isOpenComment, setIsOpenComment] = useState<boolean>(false);
  const isNonResponsive = useMediaQuery("(min-width: 1000px)");
  const [isLoading1, setIsLoading1] = useState<boolean>(true);
  return (
    <React.Fragment>
      <WrapperBox
        sx={isNonResponsive ? { margin: "30px 0" } : { margin: "15px 0" }}
      >
        <Friend
          userId={user._id}
          username={user.username}
          location={location}
          picturePath={user?.picturePath}
        ></Friend>

        <Typography
          color={neutralMain}
          sx={{ marginTop: "16px", fontSize: "16px" }}
        >
          {isLoading ? <Skeleton /> : description}
        </Typography>
        {isLoading ? (
          <Skeleton
            sx={{ height: "300px", marginTop: "6px" }}
            animation="wave"
            variant="rounded"
          />
        ) : (
          <>
            {picturePath && (
              <img
                loading="lazy"
                width={"100%"}
                height={"auto"}
                alt="A post picture"
                src={`${URL_GET_PICTURE}/${picturePath}`}
                style={{ borderRadius: "6px", marginTop: "6px" }}
              ></img>
            )}
          </>
        )}
        <DisplayFLexBetween marginTop={"6px"}>
          <Typography color={neutralMain}>0 Like</Typography>
          <DisplayFLexBetween gap={"16px"}>
            <Typography color={neutralMain}>0 Comment</Typography>
            <Typography color={neutralMain}>0 Share</Typography>
          </DisplayFLexBetween>
        </DisplayFLexBetween>
        <Divider sx={{ margin: "12px 0px 8px 0px" }}></Divider>
        <DisplayFLexBetween
          marginTop={"4px"}
          gap={"16px"}
          sx={isNonResponsive ? { padding: "0 3rem" } : { padding: 0 }}
        >
          <IconButton
            sx={{ borderRadius: "4px", color: theme.palette.primary.main }}
          >
            <ThumbUpIcon></ThumbUpIcon>
            <Typography marginLeft={"7px"}>Like</Typography>
          </IconButton>
          <IconButton
            sx={{ borderRadius: "4px", color: neutralMain }}
            onClick={() => setIsOpenComment(!isOpenComment)}
          >
            <ModeCommentOutlinedIcon></ModeCommentOutlinedIcon>
            <Typography marginLeft={"7px"}>Comment</Typography>
          </IconButton>
          <IconButton sx={{ borderRadius: "4px", color: neutralMain }}>
            <SendOutlinedIcon></SendOutlinedIcon>
            <Typography marginLeft={"7px"}>Share</Typography>
          </IconButton>
        </DisplayFLexBetween>
        {isOpenComment && (
          <Box marginTop="8px">
            <Box>
              <Divider></Divider>
              <Typography
                sx={{
                  color: neutralMain,
                  margin: "6px 0px",
                  paddingLeft: "12px",
                }}
              >
                ABCD
              </Typography>
            </Box>
            <Divider />
          </Box>
        )}
      </WrapperBox>
    </React.Fragment>
  );
};

export default PostWidget;
