import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { RootStore } from "./store/store";
import { useSelector, useDispatch } from "react-redux";
import { refreshAccessToken } from "./api/auth";
import { setAccessToken } from "./api/user";
import { setIsAuthorized } from "./store/authSlice";

const PrivateRoutes: React.FC = () => {
  const isAuthorized = useSelector(
    (state: RootStore) => state.Authorized.isAuthorized
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          dispatch(setIsAuthorized(false));
          setLoading(false);
          return;
        }
        const tokensFromRefresh = await refreshAccessToken(refreshToken);
        if (typeof tokensFromRefresh === "string") {
          dispatch(setIsAuthorized(false));
          setAccessToken("");
          localStorage.clear();
        } else {
          setAccessToken(tokensFromRefresh.accessToken);
          localStorage.setItem("refreshToken", tokensFromRefresh.refreshToken);
          dispatch(setIsAuthorized(true));
        }
      } catch (error) {
        console.log(error);
        dispatch(setIsAuthorized(false));
        setAccessToken("");
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    checkAuthorization();
  }, [dispatch]);

  if (!loading) {
    return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
