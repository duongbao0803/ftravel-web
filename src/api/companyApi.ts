import axiosClient from "@/config/axiosClient";
import { CompanyInfo } from "@/types/company.types";

const getAllCompany = (page: number) => {
  return axiosClient.get(`/api/buscompany`, {
    params: {
      "page-index": page,
      "page-size": 20,
    },
  });
};

const getCompanyDetail = (companyId: number) => {
  return axiosClient.get(`/api/buscompany/${companyId}`);
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

export {
  getAllCompany,
  addCompany,
  deleteService,
  getCompanyDetail,
  editService,
};
