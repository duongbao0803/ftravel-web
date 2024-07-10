import axiosClient from "@/config/axiosClient";
import { CreateService } from "@/types/service.types";

const getAllService = (page: number) => {
  return axiosClient.get(`/api/services`, {
    params: {
      page: page,
      pageSize: 20,
    },
  });
};

const addService = (formValues: CreateService) => {
  return axiosClient.post("/api/services", formValues);
};

const getServiceDetail = (serviceId: number) => {
  return axiosClient.get(`/api/services/${serviceId}`);
};

const removeService = (serviceId: number) => {
  return axiosClient.delete(`/api/services/${serviceId}`);
};

const editService = (serviceId: number, formValues: CreateService) => {
  return axiosClient.put(`/api/services/${serviceId}`, formValues);
};

const getServiceByStation = (stationId: number) => {
  return axiosClient.get(`/api/services/by-station-id/${stationId}`);
};

const getServiceByRoute = (routeId: number) => {
  return axiosClient.get(`/api/services/by-route-id/${routeId}`);
};

export {
  getAllService,
  getServiceDetail,
  addService,
  removeService,
  editService,
  getServiceByStation,
  getServiceByRoute
};
