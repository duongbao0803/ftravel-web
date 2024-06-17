import { addUser, getAllUser } from "@/api/userApi";
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

  // const getInfoPostDetail = async (postId: string) => {
  //   const res = await getDetailPost(postId);
  //   return res.data.postInfo;
  // };

  // const deletePost = async (postId: string) => {
  //   await removePost(postId);
  //   return postId;
  // };

  const addNewUser = async (formValues: UserInfo) => {
    const res = await addUser(formValues);
    return res;
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

  const addNewUserItem = async (formValues: UserInfo) => {
    await addNewUserMutation.mutateAsync(formValues);
  };

  const users = userData?.data || [];
  const totalCount = userData?.totalCount || 0;

  return {
    isFetching,
    users,
    totalCount,
    addNewUserItem,
  };
};

export default useUserService;
