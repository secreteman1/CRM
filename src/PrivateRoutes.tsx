import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { RootStore } from "./store/store";
import { useSelector, useDispatch } from "react-redux";
import { refreshAccessToken } from "./api/auth";

import { setIsAuthorized } from "./store/authSlice";
import { getUserProfile, setAccessToken } from "././api/user";
import { setIsAdmin } from "./store/adminSlice";

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
          dispatch(setIsAdmin(false));
          setLoading(false);
          return;
        }
        const tokensFromRefresh = await refreshAccessToken(refreshToken);
        if (typeof tokensFromRefresh === "string") {
          dispatch(setIsAuthorized(false));
          dispatch(setIsAdmin(false));
          setAccessToken("");
          localStorage.clear();
        } else {
          setAccessToken(tokensFromRefresh.accessToken);
          localStorage.setItem("refreshToken", tokensFromRefresh.refreshToken);
          dispatch(setIsAuthorized(true));
          try {
            const data = await getUserProfile();
            dispatch(setIsAdmin(data.isAdmin));
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
        dispatch(setIsAuthorized(false));
        dispatch(setIsAdmin(false));
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
