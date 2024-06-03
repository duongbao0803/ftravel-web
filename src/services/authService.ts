import { getInfoUser } from "@/api/authenApi";
import { useQuery } from "react-query";

const useAuthService = () => {
  const fetchUserInfo = async () => {
    try {
      const res = await getInfoUser();
      if (res && res.status === 200) {
        return res.data;
      }
    } catch (err) {
      console.error("Error fetching userInfo", err);
    }
  };

  const { data: userInfo, isLoading: isFetching } = useQuery(
    "userInfo",
    fetchUserInfo,
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  return {
    isFetching,
    userInfo,
    fetchUserInfo,
  };
};

export default useAuthService;
