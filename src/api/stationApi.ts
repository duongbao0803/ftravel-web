import axiosClient from "@/config/axiosClient";
import { CreateStationInfo } from "@/types/station.types";

const getAllStation = (page: number) => {
  return axiosClient.get(`/api/stations`, {
    params: {
      page: page,
      pageSize: 20,
    },
  });
};

const getStationDetail = (stationId: number) => {
  return axiosClient.get(`/api/stations/${stationId}`);
};

const addStation = (formValues: CreateStationInfo) => {
  return axiosClient.post("/api/stations", formValues);
};

// const addService = (formValues: ServiceDetail) => {
//   return axiosClient.post("/api/services", formValues);
// };

// const deleteService = (serviceId: number) => {
//   return axiosClient.delete(`/api/services/${serviceId}`);
// };

// const editService = () => {
//   return axiosClient.put("/api/services");
// };

export { 
    getAllStation, 
    getStationDetail, 
    addStation 
};
