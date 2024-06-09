import { addUser, getAllUser } from "@/api/userApi";
import { UserInfo } from "@/types/auth.types";
import { CustomError } from "@/types/error.types";
import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useUserService = () => {
  const queryClient = useQueryClient();

  const fetchUsers = async () => {
    const res = await getAllUser();
    return res.data;
    // const { data, headers } = res;
    // const pagination = JSON.parse(headers["x-pagination"]);
    // const totalCount = pagination.TotalCount;
    // return { data, totalCount };
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
    await addUser(formValues);
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
    () => fetchUsers(),
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const addNewUserMutation = useMutation(addNewUser, {
    onSuccess: () => {
      notification.success({
        message: "Tạo thành công",
        description: "Tạo người dùng thành công",
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

  // const users = userData?.data || [];
  // const totalCount = userData?.totalCount || 0;

  return {
    isFetching,
    userData,
    // totalCount,
    addNewUserItem,
  };
};

export default useUserService;
