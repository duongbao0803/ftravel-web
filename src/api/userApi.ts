import axiosClient from "@/config/axiosClient";
import { UserInfo } from "@/types/auth.types";

const getAllUser = (page: number) => {
  return axiosClient.get(`/api/accounts`, {
    params: {
      "page-index": page,
      "page-size": 20,
    },
  });
};

const addUser = (formValues: UserInfo) => {
  return axiosClient.post(`/api/accounts`, formValues);
};

const deleteUser = (userId: number) => {
  return axiosClient.delete(`/api/accounts/${userId}`);
};

export { getAllUser, addUser, deleteUser };
