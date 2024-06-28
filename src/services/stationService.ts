import {
  addStation,
  deleteStation,
  getAllStation,
  getStataionByBuscompany,
  getStationDetail,
} from "@/api/stationApi";
import { CustomError } from "@/types/error.types";
import { CreateStationInfo } from "@/types/station.types";
import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useStationService = () => {
  const queryClient = useQueryClient();

  const fetchStations = async (page: number) => {
    const res = await getAllStation(page);
    const { data, headers } = res;
    const pagination = JSON.parse(headers["x-pagination"]);
    const totalCount = pagination.TotalCount;
    return { data, totalCount };
  };

  const fetchStationByBuscompany = async (buscompanyId: number) => {
    const res = await getStataionByBuscompany(buscompanyId);
    return res;
  };

  const fetchStationDetail = async (stationId: number) => {
    const res = await getStationDetail(stationId);
    return res;
  };

  const addNewStation = async (formValues: CreateStationInfo) => {
    await addStation(formValues);
  };

  const removeStation = async (stationId: number) => {
    const res = await deleteStation(stationId);
    console.log("check res", res);
  };

  const { data: stationsData, isLoading: isFetching } = useQuery(
    ["stations", 1],
    () => fetchStations(1),
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const addNewStationMutation = useMutation(addNewStation, {
    onSuccess: () => {
      notification.success({
        message: "Tạo thành công",
        description: "Tạo trạm mới thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("stations");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Tạo thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const deleteStationMutation = useMutation(removeStation, {
    onSuccess: () => {
      notification.success({
        message: "Xóa thành công",
        description: "Xóa trạm thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("stations");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Xóa thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const addNewStationItem = async (formValues: CreateStationInfo) => {
    await addNewStationMutation.mutateAsync(formValues);
  };

  const deleteStationItem = async (stationId: number) => {
    await deleteStationMutation.mutateAsync(stationId);
  };

  const stations = stationsData?.data || [];
  const totalCount = stationsData?.totalCount || 0;

  return {
    isFetching,
    stations,
    totalCount,
    fetchStationDetail,
    addNewStationItem,
    deleteStationItem,
    fetchStationByBuscompany
    // updateCityItem,
    // deleteRouteItem,
  };
};

export default useStationService;
