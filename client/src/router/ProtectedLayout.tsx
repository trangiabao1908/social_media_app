import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authToken from "../utils/authToken";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const ProtectedLayout = () => {
  const navigate = useNavigate();
  // const isLoading = useSelector((state: RootState) => state.loading);
  // const accessToken = useSelector((state: RootState) => state.accessToken);
  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuthenticated
  );
  useEffect(() => {
    const accessToken = authToken.getAccessToken();
    console.log(accessToken);
    if (!accessToken && !isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  console.log("Access token Protected Layout: ", authToken.getAccessToken());
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default ProtectedLayout;
