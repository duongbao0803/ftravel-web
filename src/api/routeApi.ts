import axiosClient from "@/config/axiosClient";
import { CreateRoute } from "@/types/route.types";
import { AddStationRouteInfo } from "@/types/station.types";

const getAllRoute = (page: number) => {
  return axiosClient.get(`/api/routes`, {
    params: {
      "page-index": page,
      "page-size": 20,
    },
  });
};

const getAllRouteBuscompany = (page: number, buscompanyId: number) => {
  return axiosClient.get(`/api/routes`, {
    params: {
      "page-index": page,
      "page-size": 20,
      "buscompany-id": buscompanyId
    },
  });
};

const getRouteDetail = (routeId: number) => {
  return axiosClient.get(`/api/routes/${routeId}`);
};

const addRoute = (formValues: CreateRoute) => {
  return axiosClient.post("/api/routes", formValues);
};

const addRouteStation = (formValues: AddStationRouteInfo) => {
  return axiosClient.post("/api/routes/add-station", formValues);
}

const removeRoute = (routeId: number) => {
  return axiosClient.delete(`/api/routes/${routeId}`);
};

const editService = () => {
  return axiosClient.put("/api/services");
};

export { getAllRoute, addRoute, removeRoute, getRouteDetail, editService, addRouteStation, getAllRouteBuscompany };
