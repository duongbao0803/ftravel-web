import axiosClient from "@/config/axiosClient";
import { CreateRoute } from "@/types/route.types";

const getAllRoute = (page: number) => {
  return axiosClient.get(`/api/routes`, {
    params: {
      "page-index": page,
      "page-size": 20,
    },
  });
};

const getRouteDetail = (routeId: number) => {
  return axiosClient.get(`/api/routes/${routeId}`);
};

const addRoute = (formValues: CreateRoute) => {
  return axiosClient.post("/api/routes", formValues);
};

const removeRoute = (routeId: number) => {
  return axiosClient.delete(`/api/routes/${routeId}`);
};

const editService = () => {
  return axiosClient.put("/api/services");
};

export { getAllRoute, addRoute, removeRoute, getRouteDetail, editService };
