import React, { createContext, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import AlertMessage from "../components/AlertMessage/AlertMessage";
import { RootState } from "../redux/store";
import authToken from "../utils/authToken";
import { IInfoAlert } from "../utils/infoAlertType";
interface Props {
  children: React.ReactNode;
}

export interface AuthContextType {
  infoAlert: IInfoAlert;
  setInfoAlert: React.Dispatch<React.SetStateAction<IInfoAlert>>;
  openAlert: boolean;
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  verifyToken: () => Promise<void>;
}

const AuthContextDefaultValues: AuthContextType = {
  infoAlert: {
    type: "success",
    time: 3000,
    message: "",
  },
  setInfoAlert: () => {},
  openAlert: false,
  setOpenAlert: () => {},
  verifyToken: () => Promise.resolve(),
};

export const AuthContext = createContext<AuthContextType>(
  AuthContextDefaultValues
);

const AuthProvider: React.FC<Props> = (props) => {
  // const theme: IThemeOptions = useTheme();
  const { children } = props;
  const [infoAlert, setInfoAlert] = useState<IInfoAlert>(
    AuthContextDefaultValues.infoAlert
  );
  const [openAlert, setOpenAlert] = useState<boolean>(
    AuthContextDefaultValues.openAlert
  );

  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuthenticated
  );
  //function to verify the token
  const verifyToken = useCallback(async () => {
    const accessToken = authToken.getAccessToken();
    if (!accessToken && isAuthenticated) {
      console.log("Access token null when reload page");
      await authToken.getRefreshToken();
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   const getVerifyToken = async () => {
  //     await verifyToken();
  //     setIsLoading(false);
  //   };
  //   getVerifyToken();
  // }, [verifyToken]);

  const AuthContextProps: AuthContextType = {
    infoAlert,
    setInfoAlert,
    openAlert,
    setOpenAlert,
    verifyToken,
  };

  return (
    <AuthContext.Provider value={AuthContextProps}>
      <AlertMessage
        infoAlert={infoAlert}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      ></AlertMessage>
      {/* {isLoading ? (
        <Box sx={{ height: "95vh", bgcolor: theme.palette.background.default }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%" }}
          >
            <CircularProgress color="primary" />
          </Box>
        </Box>
      ) : (
        children
      )} */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
