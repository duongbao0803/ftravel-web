import axiosClient from "@/config/axiosClient";
import { CreateTicketTypeInfo } from "@/types/ticket.types";

const getAllTicketTypeRoute = (page: number, routeId: number) => {
  return axiosClient.get(`/api/ticket-type`, {
    params: {
      page: page,
      pageSize: 20,
      routeId: routeId
    },
  });
};

const addTicketType = (formValues: CreateTicketTypeInfo) => {
  return axiosClient.post("/api/ticket-type", formValues);
}

// const addTrip = (formValues: CreateTrip) => {
//   return axiosClient.post("/api/trips", formValues);
// };

// const getTripDetail = (tripId: number) => {
//   return axiosClient.get(`/api/trips/${tripId}`);
// };

// const removeTrip = (tripId: number) => {
//   return axiosClient.delete(`/api/trips/${tripId}`);
// };

const editTicketType = (ticketTypeId: number, formValues: CreateTicketTypeInfo) => {
  return axiosClient.put(`/api/ticket-type/${ticketTypeId}`, formValues);
};

// const getTripByStation = (stationId: number) => {
//   return axiosClient.get(`/api/trips/by-station-id/${stationId}`);
// };

export {
  getAllTicketTypeRoute,
  addTicketType,
  editTicketType
  //   getTripDetail,
  //   addTrip,
  //   removeTrip,
  //   editTrip,
  //   getTripByStation,
};
