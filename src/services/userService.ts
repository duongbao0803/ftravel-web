import { addUser, getAllUser, deleteUser, editUser, getUserInfoDetail } from "@/api/userApi";
import { UserInfo } from "@/types/auth.types";
import { CustomError } from "@/types/error.types";
import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useUserService = () => {
  const queryClient = useQueryClient();

  const fetchUsers = async (page: number) => {
    const res = await getAllUser(page);
    const { data, headers } = res;
    const pagination = JSON.parse(headers["x-pagination"]);
    const totalCount = pagination.TotalCount;
    return { data, totalCount };
  };

  const getUserDetail = async (userId: number) => {
    const res = await getUserInfoDetail(userId);
    return res;
  };

  const removeUser = async (userId: number) => {
    await deleteUser(userId);
    return userId;
  };

  const addNewUser = async (formValues: UserInfo) => {
    const res = await addUser(formValues);
    return res;
  };

  const updateUser = async (formValues: UserInfo) => {
    await editUser(formValues);
  };

  // const updatePostInfo = async ({
  //   postId,
  //   postInfo,
  // }: {
  //   postId: string;
  //   postInfo: PostInfo;
  // }) => {
  //   await editPostInfo(postId, postInfo);
  // };

  const { data: userData, isLoading: isFetching } = useQuery(
    "users",
    () => fetchUsers(1),
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const addNewUserMutation = useMutation(addNewUser, {
    onSuccess: (res) => {
      notification.success({
        message: "Tạo thành công",
        description: res.data.message,
        duration: 2,
      });
      queryClient.invalidateQueries("users");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Tạo thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const deleteUserMutation = useMutation(removeUser, {
    onSuccess: () => {
      notification.success({
        message: "Xóa thành công",
        description: "Xóa người dùng thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("users");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Xóa thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      notification.success({
        message: "Chỉnh sửa thành công",
        description: "Chỉnh sửa người dùng thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("users");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Lỗi khi chỉnh sửa",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const addNewUserItem = async (formValues: UserInfo) => {
    await addNewUserMutation.mutateAsync(formValues);
  };

  const updateUserItem = async (formValues: UserInfo) => {
    await updateUserMutation.mutateAsync(formValues);
  };

  const deleteUserItem = async (userId: number) => {
    await deleteUserMutation.mutateAsync(userId);
  };

  const users = userData?.data || [];
  const totalCount = userData?.totalCount || 0;

  return {
    isFetching,
    users,
    totalCount,
    addNewUserItem,
    deleteUserItem,
    updateUserItem,
    getUserDetail
  };
};

export default useUserService;
