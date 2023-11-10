import { jwtDecode } from "jwt-decode";
import { store } from "../redux/store";
import axios, { AxiosError } from "axios";
import { setLogout } from "../redux";
import { AuthPayload } from "./AuthPayloadType";
import { BASE_URL_BACKEND } from "./constants";

const authToken = () => {
  let refreshTokenTimeoutId: number | null = null;
  let accessToken: string | null = null;

  //function to getAccessToken
  const getAccessToken = () => accessToken;
  //function to setAccessToken
  const setToken = (token: string) => {
    accessToken = token;
    console.log(accessToken);
    const decoded = jwtDecode(accessToken) as AuthPayload;
    const { exp, iat } = decoded;
    const expAsNumber = exp as number;
    const iatAsNumber = iat as number;
    const delay = expAsNumber - iatAsNumber;
    sendRefreshToken(delay);
    return true;
  };
  //function to clearTimeout RefreshToken
  const clearTimeoutRefreshToken = () => {
    if (refreshTokenTimeoutId) window.clearTimeout(refreshTokenTimeoutId);
  };
  // function to logout user //
  const logoutAccount = () => {
    accessToken = null;
    store.dispatch(setLogout());
    clearTimeoutRefreshToken();
  };

  //function to Get Refresh Token
  const getRefreshToken = async () => {
    console.log("Started to get refresh token");
    try {
      const res = await axios.get(
        `${BASE_URL_BACKEND}/api/auth/refresh_token`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const data = res.data as {
          success: boolean;
          message: string;
          accessToken: string;
        };
        // store.dispatch(setToken(data.accessToken));
        setToken(data.accessToken);
      }
      return true;
    } catch (err) {
      logoutAccount();
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
        return false;
      } else if (err instanceof Error) {
        console.log(err.message);
        return false;
      }
    }
  };
  // function to decode Token -> Send RefreshToken
  const sendRefreshToken = (delay: number) => {
    refreshTokenTimeoutId = window.setTimeout(
      getRefreshToken,
      // Get Refresh Token when Access Token has 5 seconds left
      delay * 1000 - 5000
    );
  };

  return {
    sendRefreshToken,
    getRefreshToken,
    clearTimeoutRefreshToken,
    logoutAccount,
    getAccessToken,
    setToken,
  };
};
export default authToken();
