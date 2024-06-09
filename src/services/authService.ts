import { getInfoUser } from "@/api/authenApi";
import { UserInfo } from "@/types/auth.types";
import { useQuery } from "react-query";

const useAuthService = () => {
  const fetchUserInfo = async (): Promise<UserInfo | undefined> => {
    try {
      const res = await getInfoUser();
      if (res && res.status === 200) {
        const userInfo: UserInfo = res.data;
        if (userInfo) {
          return userInfo;
        }
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
