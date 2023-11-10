import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import WrapperBox from "../WrapperBox/WrapperBox";
import DisplayFLexBetween from "../DisplayFlexBetween/DisplayFLexBetween";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Avatar,
  InputBase,
  useTheme,
  Divider,
  useMediaQuery,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { IThemeOptions } from "../../utils/theme";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Dropzone from "react-dropzone";
import { RootState } from "../../redux/store";
import { PostContextType, PostContext } from "../../contexts/PostProvider";
import { AuthContext, AuthContextType } from "../../contexts/AuthProvider";
//define CreatePostWidget props
interface Props {
  picturePath: string;
}
interface IPreviewImage {
  name: string;
  preview: string;
}
const CreatePostWidget: React.FC<Props> = (props) => {
  const { picturePath } = props;
  const userLogged = useSelector((state: RootState) => state.user);
  const mode = useSelector((state: RootState) => state.mode);
  const theme: IThemeOptions = useTheme();
  const [descriptionPost, setDescriptionPost] = useState<string>("");
  const [picture, setPicture] = useState<File>();
  const [isOpenCreatPost, setIsOpenCreatePost] = useState<boolean>(false);
  const isNonResponsive = useMediaQuery("(min-width: 1000px");
  const { createPost } = useContext<PostContextType>(PostContext);
  const { setInfoAlert, setOpenAlert, openAlert } =
    useContext<AuthContextType>(AuthContext);
  const handleChangeDescriptionPost = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionPost(e.target.value);
  };
  const [previewImage, setPreviewImage] = useState<IPreviewImage[]>([]);
  const handleSubmitPost = async () => {
    const postvalues = new FormData();
    const loggedUserId = userLogged?._id;

    if (picture) {
      const exploded_name = picture?.name.split(".");
      const ext = exploded_name[exploded_name?.length - 1];
      const formattedPicturePath = `picture_${loggedUserId}_${
        exploded_name![0]
      }_post.${ext}`;
      postvalues.append("picturePath", formattedPicturePath);
      postvalues.append("picture", picture);
    }
    postvalues.append("description", descriptionPost);
    postvalues.append("location", "TPHCM");
    const res = await createPost(postvalues);
    try {
      if (res.success) {
        setDescriptionPost("");
        setPicture(undefined);
        setPreviewImage([]);
        setIsOpenCreatePost(false);
      } else {
        setInfoAlert({
          type: "error",
          message: res.message,
          time: 3000,
        });
        setOpenAlert(!openAlert);
        console.log(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <WrapperBox>
      <DisplayFLexBetween gap={"20px"}>
        <Avatar
          alt="Avatar User"
          src={`http://localhost:3000/assets/${picturePath}`}
          sx={{ width: "46px", height: "46px" }}
        ></Avatar>
        <InputBase
          placeholder={`What's on your mind ${userLogged?.username}?`}
          onChange={handleChangeDescriptionPost}
          value={descriptionPost}
          multiline
          maxRows={4}
          sx={{
            bgcolor: theme.palette.neutral.light,
            width: "100%",
            borderRadius: "30px",
            padding: "8px 20px",
            "&: hover":
              mode === "dark" ? { bgcolor: "#3A3B3C" } : { bgcolor: "#E4E6E9" },
          }}
        ></InputBase>
      </DisplayFLexBetween>
      {/* Display if click on Image Button */}
      {isOpenCreatPost && (
        <React.Fragment>
          <Box
            sx={{
              border: `2px solid ${theme.palette.neutral.light}`,
              borderRadius: "5px",
              padding: "28px",
              marginTop: "20px",
            }}
          >
            <Dropzone
              accept={{ "image/*": [".jpeg", ".png", ".jpg"] }}
              multiple={false}
              onDrop={(acceptedFiles) => {
                setPicture(acceptedFiles[0]);
                setPreviewImage(() => [
                  ...acceptedFiles.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                  ),
                ]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <>
                  <DisplayFLexBetween>
                    <Box
                      {...getRootProps()}
                      padding={"14px"}
                      width={"100%"}
                      border={`2px dashed ${theme.palette.neutral.light}`}
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!picture ? (
                        <p>Drag picture here , or click to select file</p>
                      ) : (
                        <DisplayFLexBetween>
                          <Typography>{picture.name}</Typography>
                          <EditOutlinedIcon
                            sx={{
                              color: theme.palette.neutral.mediumMain,
                            }}
                          />
                        </DisplayFLexBetween>
                      )}
                    </Box>
                    {picture && (
                      <Box marginLeft={"12px"}>
                        <IconButton
                          sx={{ width: "30px" }}
                          onClick={() => {
                            setPicture(undefined);
                            setPreviewImage([]);
                          }}
                        >
                          <DeleteOutlineOutlinedIcon
                            sx={{
                              color: theme.palette.neutral.mediumMain,
                            }}
                          />
                        </IconButton>
                      </Box>
                    )}
                  </DisplayFLexBetween>
                </>
              )}
            </Dropzone>
          </Box>

          {previewImage &&
            previewImage.map((image) => (
              <React.Fragment key={image.name}>
                <Box sx={{ margin: "10px 0" }}>
                  <img
                    alt="Picture post"
                    src={`${image.preview}`}
                    style={{ borderRadius: "5px" }}
                    width={"100%"}
                    height={"auto"}
                  ></img>
                </Box>
              </React.Fragment>
            ))}
        </React.Fragment>
      )}
      {/* Divider */}
      <Divider sx={{ margin: "20px 0px" }}></Divider>

      {/* Reponsive */}
      <DisplayFLexBetween marginBottom={"4px"}>
        {isNonResponsive ? (
          <React.Fragment>
            <DisplayFLexBetween
              gap={"6px"}
              onClick={() => setIsOpenCreatePost(!isOpenCreatPost)}
            >
              <ImageOutlinedIcon
                sx={{
                  color: theme.palette.neutral.mediumMain,
                }}
              ></ImageOutlinedIcon>
              <Typography
                color={theme.palette.neutral.mediumMain}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.neutral.medium,
                  },
                }}
              >
                Image
              </Typography>
            </DisplayFLexBetween>
            <DisplayFLexBetween gap={"6px"}>
              <VideoLibraryOutlinedIcon
                sx={{
                  color: theme.palette.neutral.mediumMain,
                }}
              ></VideoLibraryOutlinedIcon>
              <Typography
                color={theme.palette.neutral.mediumMain}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.neutral.medium,
                  },
                }}
              >
                Video
              </Typography>
            </DisplayFLexBetween>
            <DisplayFLexBetween gap={"6px"}>
              <EmojiEmotionsOutlinedIcon
                sx={{
                  color: theme.palette.neutral.mediumMain,
                }}
              ></EmojiEmotionsOutlinedIcon>
              <Typography
                color={theme.palette.neutral.mediumMain}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.neutral.medium,
                  },
                }}
              >
                Emotion
              </Typography>
            </DisplayFLexBetween>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DisplayFLexBetween
              gap={"6px"}
              onClick={() => setIsOpenCreatePost(!isOpenCreatPost)}
            >
              <ImageOutlinedIcon
                sx={{
                  color: theme.palette.neutral.mediumMain,
                }}
              ></ImageOutlinedIcon>
              <Typography
                color={theme.palette.neutral.mediumMain}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.neutral.medium,
                  },
                }}
              >
                Image
              </Typography>
            </DisplayFLexBetween>
          </React.Fragment>
        )}
        <Button
          disabled={!descriptionPost}
          onClick={handleSubmitPost}
          sx={{
            width: "80px",
            borderRadius: "30px",
            bgcolor: theme.palette.primary.main,
            cursor: "pointer",
            "&: disabled": {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          <Typography
            sx={{ color: theme.palette.background.alt, fontSize: "16px" }}
          >
            POST
          </Typography>
        </Button>
      </DisplayFLexBetween>
    </WrapperBox>
  );
};

export default CreatePostWidget;
