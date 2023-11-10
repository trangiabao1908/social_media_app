import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../contexts/AuthProvider";
import { setMode } from "../../redux";
import { RootState } from "../../redux/store";
import { IThemeOptions } from "../../utils/theme";
import DisplayFLexBetween from "../DisplayFlexBetween/DisplayFLexBetween";
import { useMutation } from "@tanstack/react-query";
import { logoutUserFn } from "../../api/authApi";
import authToken from "../../utils/authToken";
import { AxiosError } from "axios";

const Navbar = () => {
  const theme: IThemeOptions = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backgroudNavbar = theme.palette.background.alt;
  const neutralLight = theme.palette.neutral.light;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const darkColor = theme.palette.neutral.dark;
  const isNonResponsiveScreen = useMediaQuery("(min-width: 1000px)");
  const [isOpenMenuNav, setIsOpenMenuNav] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const isOpenMenuUser = Boolean(anchor);
  const userLogged = useSelector((state: RootState) => state.user);
  const { openAlert, setOpenAlert, setInfoAlert } =
    useContext<AuthContextType>(AuthContext);
  // Mutation to logout USer
  const { mutate: logoutUser } = useMutation({
    mutationFn: async () => await logoutUserFn(),
    onSuccess: (res) => {
      if (res.success) {
        setInfoAlert({
          type: "success",
          message: res.message,
          time: 3000,
        });
        setOpenAlert(!openAlert);
        authToken.logoutAccount();
        console.log("Token when logout: ", authToken.getAccessToken());
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        setInfoAlert({
          type: "error",
          message: err.response?.data.message,
          time: 3000,
        });
        return err.response?.data;
      } else if (err instanceof Error) {
        return { success: false, message: err.message };
      }
    },
  });
  const handleLogout = async () => {
    logoutUser();
  };
  const handleClose = () => {
    setAnchor(null);
  };
  const handleOpenLogout = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };
  return (
    <React.Fragment>
      <DisplayFLexBetween padding="13px 5%" bgcolor={backgroudNavbar}>
        <DisplayFLexBetween gap={"25px"}>
          <Typography
            onClick={() => navigate("/")}
            color={"primary"}
            fontWeight={"bold"}
            fontSize="1.6rem"
            sx={{ "&:hover": { color: primaryLight, cursor: "pointer" } }}
          >
            MetaSocial
          </Typography>
          {isNonResponsiveScreen && (
            <DisplayFLexBetween
              bgcolor={neutralLight}
              borderRadius={"10px"}
              gap={"3rem"}
              padding={"1px 10px"}
            >
              <InputBase placeholder="Search...."></InputBase>
              <IconButton
                sx={{
                  border: "none",
                  borderRadius: "0px",
                  "&:hover": { background: neutralLight },
                }}
              >
                <SearchIcon />
              </IconButton>
            </DisplayFLexBetween>
          )}
        </DisplayFLexBetween>
        {isNonResponsiveScreen ? (
          <DisplayFLexBetween gap={"2rem"}>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "light" ? (
                <LightModeIcon
                  sx={{ fontSize: "25px", color: darkColor }}
                ></LightModeIcon>
              ) : (
                <ModeNightIcon sx={{ fontSize: "25px" }}></ModeNightIcon>
              )}
            </IconButton>
            <IconButton>
              <ChatIcon
                sx={
                  theme.palette.mode === "light"
                    ? { fontSize: "25px", color: darkColor }
                    : { fontSize: "25px" }
                }
              ></ChatIcon>
            </IconButton>
            <IconButton>
              <NotificationsIcon
                sx={
                  theme.palette.mode === "light"
                    ? { fontSize: "25px", color: darkColor }
                    : { fontSize: "25px" }
                }
              ></NotificationsIcon>
            </IconButton>
            <IconButton>
              <LiveHelpIcon
                sx={
                  theme.palette.mode === "light"
                    ? { fontSize: "25px", color: darkColor }
                    : { fontSize: "25px" }
                }
              ></LiveHelpIcon>
            </IconButton>
            <DisplayFLexBetween gap={"8px"}>
              <Typography>{userLogged?.username}</Typography>
              <Avatar
                onClick={handleOpenLogout}
                alt="Avatar User"
                src={`http://localhost:3000/assets/${userLogged?.picturePath}`}
                sx={{ width: "46px", height: "46px" }}
              ></Avatar>
            </DisplayFLexBetween>
            <Menu
              id="basic-menu"
              anchorEl={anchor}
              open={isOpenMenuUser}
              onClose={handleClose}
              sx={{ height: "100%", maxHeight: "400px" }}
            >
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </DisplayFLexBetween>
        ) : (
          <IconButton onClick={() => setIsOpenMenuNav(!isOpenMenuNav)}>
            <MenuIcon />
          </IconButton>
        )}

        {/* NAV MENU MOBILEPHONE  */}
        {isOpenMenuNav && !isNonResponsiveScreen && (
          <Box
            position={"fixed"}
            right={"0"}
            top={"0"}
            zIndex={"10"}
            width={"300px"}
            minWidth={"300px"}
            maxWidth={"500px"}
            bgcolor={background}
          >
            <Box display={"flex"} justifyContent={"flex-end"} p={"4px 4px"}>
              <IconButton onClick={() => setIsOpenMenuNav(!isOpenMenuNav)}>
                <CloseIcon
                  sx={
                    theme.palette.mode === "light"
                      ? { fontSize: "20px", color: darkColor }
                      : { fontSize: "20px" }
                  }
                ></CloseIcon>
              </IconButton>
            </Box>
            <DisplayFLexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="2rem"
            >
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "light" ? (
                  <LightModeIcon
                    sx={{ fontSize: "25px", color: darkColor }}
                  ></LightModeIcon>
                ) : (
                  <ModeNightIcon sx={{ fontSize: "25px" }}></ModeNightIcon>
                )}
              </IconButton>
              <IconButton>
                <ChatIcon
                  sx={
                    theme.palette.mode === "light"
                      ? { fontSize: "25px", color: darkColor }
                      : { fontSize: "25px" }
                  }
                ></ChatIcon>
              </IconButton>
              <IconButton>
                <NotificationsIcon
                  sx={
                    theme.palette.mode === "light"
                      ? { fontSize: "25px", color: darkColor }
                      : { fontSize: "25px" }
                  }
                ></NotificationsIcon>
              </IconButton>
              <IconButton>
                <LiveHelpIcon
                  sx={
                    theme.palette.mode === "light"
                      ? { fontSize: "25px", color: darkColor }
                      : { fontSize: "25px" }
                  }
                ></LiveHelpIcon>
              </IconButton>
            </DisplayFLexBetween>
          </Box>
        )}
      </DisplayFLexBetween>
    </React.Fragment>
  );
};

export default Navbar;
