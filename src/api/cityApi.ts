import axiosClient from "@/config/axiosClient";
import { CityInfo } from "@/types/city.types";

const getAllCity = (page: number) => {
  return axiosClient.get(`/api/cities`, {
    params: {
      "page-index": page,
      "page-size": 20,
    },
  });
};

const addCity = (formValues: CityInfo) => {
  return axiosClient.post(`/api/cities`, formValues);
};

const editCity = (formValues: CityInfo) => {
  return axiosClient.put(`/api/cities`, formValues);
};

const removeCity = (cityId: number) => {
  return axiosClient.delete(`/api/cities/${cityId}`);
};

export { getAllCity, removeCity, addCity, editCity };
