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

const getUserInfoDetail = (userId: number) => {
  return axiosClient.get(`/api/accounts/${userId}`);
};

const addUser = (formValues: UserInfo) => {
  return axiosClient.post(`/api/accounts`, formValues);
};

const editUser = (formValues: UserInfo) => {
  return axiosClient.put(`/api/accounts`, formValues);
}

const deleteUser = (userId: number) => {
  return axiosClient.delete(`/api/accounts/${userId}`);
};

export { getAllUser, addUser, deleteUser, editUser, getUserInfoDetail };
