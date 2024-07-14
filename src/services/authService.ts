import { getInfoUser } from "@/api/authenApi";
import { editUser } from "@/api/userApi";
import { UserInfo } from "@/types/auth.types";
import { CustomError } from "@/types/error.types";
import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useAuthService = () => {
  const queryClient = useQueryClient();

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

  const updatePersonal = async (formValues: UserInfo) => {
    await editUser(formValues);
  };

  const { data: userInfo, isLoading: isFetching } = useQuery(
    "userInfo",
    fetchUserInfo,
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const updatePersonalMutation = useMutation(updatePersonal, {
    onSuccess: () => {
      notification.success({
        message: "Chỉnh sửa thành công",
        description: "Chỉnh sửa thông tin cá thân thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("userInfo");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Lỗi khi chỉnh sửa",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const updatePersonalItem = async (formValues: UserInfo) => {
    await updatePersonalMutation.mutateAsync(formValues);
  };

  return {
    isFetching,
    userInfo,
    fetchUserInfo,
    updatePersonalItem,
  };
};

export default useAuthService;
