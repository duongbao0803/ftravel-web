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

const deleteService = (serviceId: number) => {
  return axiosClient.delete(`/api/services/${serviceId}`);
};

const editService = () => {
  return axiosClient.put("/api/services");
};

const getServiceByStation = (stationId: number) => {
  return axiosClient.get(`/api/services/by-station-id/${stationId}`);
};

export {
  getAllService,
  getServiceDetail,
  addService,
  deleteService,
  editService,
  getServiceByStation,
};
