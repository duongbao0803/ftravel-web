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

const getStataionByBuscompany = (buscompanyId: number) => {
  return axiosClient.get(`/api/stations/get-station-by-bus-company/${buscompanyId}`);
}

const addStation = (formValues: CreateStationInfo) => {
  return axiosClient.post("/api/stations", formValues);
};

// const addService = (formValues: ServiceDetail) => {
//   return axiosClient.post("/api/services", formValues);
// };

const deleteStation = (stationId: number) => {
  return axiosClient.delete(`/api/stations/${stationId}`);
};

// const editService = () => {
//   return axiosClient.put("/api/services");
// };

export { getAllStation, getStationDetail, addStation, deleteStation, getStataionByBuscompany };
