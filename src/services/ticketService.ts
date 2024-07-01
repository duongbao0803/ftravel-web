import { addTicketType, editTicketType, getAllTicketTypeRoute } from "@/api/ticketApi";
import { CustomError } from "@/types/error.types";
import { CreateTicketTypeInfo } from "@/types/ticket.types";
import { notification } from "antd";
import { useMutation, useQueryClient } from "react-query";

const useTicketService = () => {
  const queryClient = useQueryClient();

  //   const fetchTicketTypeRoute = async (page: number, routeId: number) => {
  //     const res = await getAllTicketTypeRoute(page, routeId);
  //     const { data, headers } = res;
  //     const pagination = JSON.parse(headers["x-pagination"]);
  //     const totalCount = pagination.TotalCount;
  //     return { data, totalCount };
  //   };

  const fetchTicketTypeRoute = async (routeId: number) => {
    const res = await getAllTicketTypeRoute(1, routeId);
    return res;
  };

  //   const fetchTripDetail = async (tripId: number) => {
  //     const res = await getTripDetail(tripId);
  //     return res;
  //   };

  // const getInfoPostDetail = async (postId: string) => {
  //   const res = await getDetailPost(postId);
  //   return res.data.postInfo;
  // };

  //   const deleteTrip = async (tripId: number) => {
  //     await removeTrip(tripId);
  //     return tripId;
  //   };

  const addNewTicketType = async (formValues: CreateTicketTypeInfo) => {
    await addTicketType(formValues);
  };

  const updateTicketType = async ({
    ticketTypeId,
    formValues,
  }: {
    ticketTypeId: number;
    formValues: CreateTicketTypeInfo;
  }) => {
    await editTicketType(ticketTypeId, formValues);
  };

//   const { data: tripsData, isLoading: isFetching } = useQuery(
//     ["ticket-type", 1],
//     () => fetchTicketTypeRoute(1, routeId),
//     {
//       retry: 3,
//       retryDelay: 5000,
//     },
//   );

  const addNewTicketTypeMutation = useMutation(addNewTicketType, {
    onSuccess: () => {
      notification.success({
        message: "Tạo thành công",
        description: "Tạo loại vé mới thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("ticket-type");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Tạo thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  //   const deleteTripMutation = useMutation(deleteTrip, {
  //     onSuccess: () => {
  //       notification.success({
  //         message: "Xóa thành công",
  //         description: "Xóa dịch vụ thành công",
  //         duration: 2,
  //       });
  //       queryClient.invalidateQueries("trips");
  //     },
  //     onError: (err: CustomError) => {
  //       notification.error({
  //         message: "Xóa thất bại",
  //         description: `${err?.response?.data?.message}`,
  //         duration: 2,
  //       });
  //     },
  //   });

  const updateTicketTypeMutation = useMutation(updateTicketType, {
    onSuccess: () => {
      notification.success({
        message: "Chỉnh sửa thành công",
        description: "Chỉnh sửa loại vé thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("ticket-type");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Lỗi khi chỉnh sửa",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const addNewTicketTypeItem = async (formValues: CreateTicketTypeInfo) => {
    await addNewTicketTypeMutation.mutateAsync(formValues);
  };

  //   const deleteTripItem = async (tripId: number) => {
  //     await deleteTripMutation.mutateAsync(tripId);
  //   };

  const updateTicketTypeItem = async (
    ticketTypeId: number,
    formValues: CreateTicketTypeInfo,
  ) => {
    await updateTicketTypeMutation.mutateAsync({ ticketTypeId, formValues });
  };

//   const trips = tripsData?.data || [];
//   const totalCount = tripsData?.totalCount || 0;

  return {
    fetchTicketTypeRoute, 
    addNewTicketTypeItem,
    updateTicketTypeItem
    // isFetching,
    // trips,
    // totalCount,
    // deleteTripItem,
    //   addNewTripItem,
    // fetchTripDetail,
    //   fetchTripStation,
    //   updateTripItem,
  };
};

export default useTicketService;
