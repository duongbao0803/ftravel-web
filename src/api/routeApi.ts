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

const addCompany = (formValues: CompanyInfo) => {
  return axiosClient.post("/api/buscompany", formValues);
};

const deleteService = (serviceId: number) => {
  return axiosClient.delete(`/api/services/${serviceId}`);
};

const editService = () => {
  return axiosClient.put("/api/services");
};

export { getAllRoute, addCompany, deleteService, editService };
