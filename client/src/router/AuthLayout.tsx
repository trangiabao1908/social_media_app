import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { AuthContext, AuthContextType } from "../contexts/AuthProvider";
import PostProvider from "../contexts/PostProvider";
import UserProvider from "../contexts/UserProvider";
import { mediaState } from "../redux";
import { themeSettings } from "../utils/theme";
const AuthLayout: React.FC = () => {
  const mode = useSelector((state: mediaState) => state.mode) as PaletteMode;
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { verifyToken } = useContext<AuthContextType>(AuthContext);
  useEffect(() => {
    const getVerifyToken = async () => {
      await verifyToken();
      setIsLoading(false);
    };
    getVerifyToken();
  }, [verifyToken]);
  if (isLoading) {
    return <LoadingScreen theme={theme}></LoadingScreen>;
  }
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <PostProvider>
            <Outlet />
          </PostProvider>
        </UserProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default AuthLayout;
