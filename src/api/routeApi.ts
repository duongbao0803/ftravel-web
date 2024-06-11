import axiosClient from "@/config/axiosClient";
import { CompanyInfo } from "@/types/company.types";

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

const addCompany = (formValues: CompanyInfo) => {
  return axiosClient.post("/api/buscompany", formValues);
};

const removeRoute = (routeId: number) => {
  return axiosClient.delete(`/api/routes/${routeId}`);
};

const editService = () => {
  return axiosClient.put("/api/services");
};

export { getAllRoute, addCompany, removeRoute, getRouteDetail, editService };
