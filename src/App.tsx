import React, { useEffect } from "react";
import Router from "./routes/Sections";
import useAuth from "./hooks/useAuth";
import Cookies from "js-cookie";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const fetchUserInfo = useAuth((state) => state.fetchUserInfo);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserInfo();
    }
  }, [token]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  );
};

export default App;
