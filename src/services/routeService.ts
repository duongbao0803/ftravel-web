import { editCity } from "@/api/cityApi";
import {
  addRoute,
  addRouteStation,
  getAllRoute,
  getRouteDetail,
  removeRoute,
} from "@/api/routeApi";
import { getServiceByStation } from "@/api/serviceApi";
import { CityInfo } from "@/types/city.types";
import { CustomError } from "@/types/error.types";
import { CreateRoute } from "@/types/route.types";
import { AddStationRouteInfo } from "@/types/station.types";
import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useRouteService = () => {
  const queryClient = useQueryClient();

  const fetchRoutes = async (page: number) => {
    const res = await getAllRoute(page);
    const { data, headers } = res;
    const pagination = JSON.parse(headers["x-pagination"]);
    const totalCount = pagination.TotalCount;
    return { data, totalCount };
  };

  const fetchRouteDetail = async (routeId: number) => {
    const res = await getRouteDetail(routeId);
    return res;
  };

  const fetchServiceByStation = async (stationId: number) => {
    const res = await getServiceByStation(stationId);
    return res;
  };

  // const getInfoPostDetail = async (postId: string) => {
  //   const res = await getDetailPost(postId);
  //   return res.data.postInfo;
  // };

  const deleteRoute = async (routeId: number) => {
    await removeRoute(routeId);
    return routeId;
  };

  const addNewRoute = async (formValues: CreateRoute) => {
    await addRoute(formValues);
  };

  const addNewRouteStation = async (formValues: AddStationRouteInfo) => {
    await addRouteStation(formValues);
  }

  const updateCity = async (formValues: CityInfo) => {
    await editCity(formValues);
  };

  const { data: routesData, isLoading: isFetching } = useQuery(
    ["routes", 1],
    () => fetchRoutes(1),
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const addNewRouteMutation = useMutation(addNewRoute, {
    onSuccess: () => {
      notification.success({
        message: "Tạo thành công",
        description: "Tạo tuyến đường thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("routes");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Tạo thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const addNewRouteStationMutation = useMutation(addNewRouteStation, {
    onSuccess: () => {
      notification.success({
        message: "Thêm trạm thành công",
        description: "Thêm trạm cho tuyến đường thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("routes");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Thêm trạm thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const deleteRouteMutation = useMutation(deleteRoute, {
    onSuccess: () => {
      notification.success({
        message: "Xóa thành công",
        description: "Xóa tuyến đường thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("cities");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Xóa thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const updateCityMutation = useMutation(updateCity, {
    onSuccess: () => {
      notification.success({
        message: "Chỉnh sửa thành công",
        description: "Chỉnh sửa tuyến đường thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("cities");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Lỗi khi chỉnh sửa",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const addNewRouteItem = async (formValues: CreateRoute) => {
    await addNewRouteMutation.mutateAsync(formValues);
  };

  const addNewRouteStationItem = async (formValues: AddStationRouteInfo) => {
    await addNewRouteStationMutation.mutateAsync(formValues);
  };

  const deleteRouteItem = async (routeId: number) => {
    await deleteRouteMutation.mutateAsync(routeId);
  };

  const updateCityItem = async (formValues: CityInfo) => {
    await updateCityMutation.mutateAsync(formValues);
  };

  const routes = routesData?.data || [];
  const totalCount = routesData?.totalCount || 0;

  return {
    isFetching,
    routes,
    totalCount,
    addNewRouteItem,
    updateCityItem,
    deleteRouteItem,
    fetchRouteDetail,
    fetchServiceByStation,
    addNewRouteStationItem
  };
};

export default useRouteService;
