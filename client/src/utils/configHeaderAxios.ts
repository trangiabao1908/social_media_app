import authToken from "./authToken";

const configHeaderAxios = {
  configHeaderAxiosWithAuthorization: () => {
    const accessToken = authToken.getAccessToken();
    try {
      if (accessToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        return config;
      }
    } catch (err) {
      console.log(err);
    }
  },
  configHeaderAxiosWithAuthorizationandContentType: () => {
    const accessToken = authToken.getAccessToken();
    try {
      if (accessToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        };
        return config;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
export default configHeaderAxios;
