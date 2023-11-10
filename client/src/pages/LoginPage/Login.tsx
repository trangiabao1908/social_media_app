import React, { useEffect } from "react";
import { IThemeOptions } from "../../utils/theme";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import FormLogin from "./FormLogin";
import { useNavigate } from "react-router-dom";
import authToken from "../../utils/authToken";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const Login: React.FC = () => {
  const theme: IThemeOptions = useTheme();
  // const accessToken = useSelector((state: RootState) => state.accessToken);
  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuthenticated
  );
  const backgroundAlt = theme.palette.background.alt;
  const primaryLight = theme.palette.primary.light;
  const navigate = useNavigate();
  const isNonResponsive = useMediaQuery("(min-width: 1000px)");
  useEffect(() => {
    console.log("check Token");
    const accessToken = authToken.getAccessToken();
    if (accessToken && isAuthenticated) {
      navigate("..");
    }
  }, [navigate, isAuthenticated]);
  return (
    <React.Fragment>
      <Box>
        <Box
          sx={{
            width: "100%",
            bgcolor: backgroundAlt,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "13px 5%",
            position: "sticky",
            top: "0",
            right: "0",
            zIndex: 10,
          }}
        >
          <Typography
            color={"primary"}
            fontWeight={"bold"}
            fontSize="1.6rem"
            sx={{ "&:hover": { color: primaryLight, cursor: "pointer" } }}
          >
            MetaSocial
          </Typography>
        </Box>
        <Box
          sx={{
            width: isNonResponsive ? "50%" : "90%",
            padding: "32px",
            margin: "50px auto",
            borderRadius: "8px",
            bgcolor: backgroundAlt,
          }}
        >
          <Typography
            variant="h6"
            fontSize={"17px"}
            fontWeight={"500"}
            marginBottom={"25px"}
          >
            Welcome to MeteSocial, Please login to continue
          </Typography>
          <FormLogin />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Login;
