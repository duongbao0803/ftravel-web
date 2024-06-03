import axiosClient from "@/config/axiosClient";
import { ServiceDetail } from "@/types/service.types";

const getAllService = (page: number) => {
  return axiosClient.get(`/api/services`, {
    params: {
      page: page,
      pageSize: 20,
    },
  });
};

const addService = (formValues: ServiceDetail) => {
  return axiosClient.post("/api/services", formValues);
};

const deleteService = (serviceId: number) => {
  return axiosClient.delete(`/api/services/${serviceId}`);
};

const editService = () => {
  return axiosClient.put("/api/services");
};

export { getAllService, addService, deleteService, editService };
