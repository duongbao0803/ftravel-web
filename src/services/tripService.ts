import { addTrip, getAllTrip, getTripDetail, removeTrip } from "@/api/tripApi";
import { CustomError } from "@/types/error.types";
import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useTripService = () => {
  const queryClient = useQueryClient();

  const fetchTrips = async (page: number) => {
    const res = await getAllTrip(page);
    const { data, headers } = res;
    const pagination = JSON.parse(headers["x-pagination"]);
    const totalCount = pagination.TotalCount;
    return { data, totalCount };
  };

  const fetchTripDetail = async (tripId: number) => {
    const res = await getTripDetail(tripId);
    return res;
  };

  // const getInfoPostDetail = async (postId: string) => {
  //   const res = await getDetailPost(postId);
  //   return res.data.postInfo;
  // };

  const deleteTrip = async (tripId: number) => {
    await removeTrip(tripId);
    return tripId;
  };

  const addNewTrip = async (formValues) => {
    const res = await addTrip(formValues);
    return res;
  };

  // const updateTrip = async ({
  //   tripId,
  //   formValues,
  // }: {
  //   tripId: number;
  //   formValues: CreateTrip;
  // }) => {
  //   await editTrip(tripId, formValues);
  // };

  const { data: tripsData, isLoading: isFetching } = useQuery(
    ["trips", 1],
    () => fetchTrips(1),
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const addNewTripMutation = useMutation(addNewTrip, {
    onSuccess: () => {
      notification.success({
        message: "Tạo thành công",
        description: "Tạo chuyến xe thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("trips");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Tạo thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const deleteTripMutation = useMutation(deleteTrip, {
    onSuccess: () => {
      notification.success({
        message: "Xóa thành công",
        description: "Xóa dịch vụ thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("trips");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Xóa thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  // const updateTripMutation = useMutation(updateTrip, {
  //   onSuccess: () => {
  //     notification.success({
  //       message: "Chỉnh sửa thành công",
  //       description: "Chỉnh sửa dịch vụ thành công",
  //       duration: 2,
  //     });
  //     queryClient.invalidateQueries("trips");
  //   },
  //   onError: (err: CustomError) => {
  //     notification.error({
  //       message: "Lỗi khi chỉnh sửa",
  //       description: `${err?.response?.data?.message}`,
  //       duration: 2,
  //     });
  //   },
  // });

  const addNewTripItem = async (formValues) => {
    await addNewTripMutation.mutateAsync(formValues);
  };

  const deleteTripItem = async (tripId: number) => {
    await deleteTripMutation.mutateAsync(tripId);
  };

  // const updateTripItem = async (
  //   tripId: number,
  //   formValues: CreateTrip,
  // ) => {
  //   await updateTripMutation.mutateAsync({ tripId, formValues });
  // };

  const trips = tripsData?.data || [];
  const totalCount = tripsData?.totalCount || 0;

  return {
    isFetching,
    trips,
    totalCount,
    deleteTripItem,
    addNewTripItem,
    fetchTripDetail,
    //   fetchTripStation,
    //   updateTripItem,
  };
};

export default useTripService;
