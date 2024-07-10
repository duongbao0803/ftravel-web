import axiosClient from "@/config/axiosClient";

const getAllTrip = (page: number) => {
  return axiosClient.get(`/api/trips`, {
    params: {
      page: page,
      pageSize: 20,
    },
  });
};

const addTrip = (formValues) => {
  return axiosClient.post("/api/trips", formValues);
};

const getTripDetail = (tripId: number) => {
  return axiosClient.get(`/api/trips/${tripId}`);
};

const removeTrip = (tripId: number) => {
  return axiosClient.delete(`/api/trips/${tripId}`);
};

// const editTrip = (tripId: number, formValues: CreateTrip) => {
//   return axiosClient.put(`/api/trips/${tripId}`, formValues);
// };

// const getTripByStation = (stationId: number) => {
//   return axiosClient.get(`/api/trips/by-station-id/${stationId}`);
// };

export {
  getAllTrip,
  getTripDetail,
  //   addTrip,
  removeTrip,
  addTrip,
  //   editTrip,
  //   getTripByStation,
};
