import React, { useEffect } from "react";
import Router from "./routes/Sections";
import useAuth from "./hooks/useAuth";
import Cookies from "js-cookie";
import useAuthService from "./services/authService";

const App: React.FC = () => {
  const { fetchUserInfo } = useAuthService();

  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserInfo();
    }
  }, [token]);

  return (
    <>
      <Router />
    </>
  );
};

export default App;
