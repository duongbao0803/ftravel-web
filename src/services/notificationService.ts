import { getAllNotice, sendNotice } from "@/api/noticeApi";
import { CustomError } from "@/types/error.types";
import { sendNotification } from "@/types/notification.types";
import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useNoticeService = (page: number) => {
  const queryClient = useQueryClient();

  const fetchNotices = async (page: number) => {
    const res = await getAllNotice(page);
    const { data, headers } = res;
    const pagination = JSON.parse(headers["x-pagination"]);
    const totalCount = pagination.TotalCount;
    return { data, totalCount };
  };

  const addNewNotice = async (formValues: sendNotification) => {
    await sendNotice(formValues);
  };

  const {
    data: noticeData,
    isLoading: isFetching,
    refetch,
  } = useQuery(["notices", page], () => fetchNotices(page), {
    retry: 1,
    retryDelay: 5000,
    keepPreviousData: true,
  });

  const addNewNoticeMutation = useMutation(addNewNotice, {
    onSuccess: () => {
      notification.success({
        message: "Gửi thành công",
        description: "Gửi thông báo đến người dùng thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("notices");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Gửi thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const addNewNoticeItem = async (formValues: sendNotification) => {
    await addNewNoticeMutation.mutateAsync(formValues);
  };

  return {
    isFetching,
    noticeData,
    refetch,
    addNewNoticeItem,
    fetchNotices,
  };
};

export default useNoticeService;
