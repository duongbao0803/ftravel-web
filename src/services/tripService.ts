import { addTrip, getAllTrip, getTripDetail, removeTrip } from "@/api/tripApi";
import { CustomError } from "@/types/error.types";
import { CreateTripForm } from "@/types/trip.types";
import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const useTripService = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const addNewTrip = async (formValues: CreateTripForm) => {
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
    onSuccess: async () => {
      let currentSeconds = 3;
      notification.success({
        message: "Tạo thành công",
        description: `Tạo chuyến xe thành công. Quay về danh sách chuyến xe sau ${currentSeconds} giây`,
        duration: 3,
      });

      const interval = setInterval(() => {
        currentSeconds -= 1;
        if (currentSeconds <= 0) {
          clearInterval(interval);
          navigate("/trip");
          queryClient.invalidateQueries("trips");
        }
      }, 1000);

      return () => clearInterval(interval);
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

  const addNewTripItem = async (formValues: CreateTripForm) => {
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
