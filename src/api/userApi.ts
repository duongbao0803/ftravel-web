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
  return axiosClient.post(`/api/account`, formValues);
};

// const deleteUser = (userId) => {
//   return axiosClient.post(`/api/account`, userId);
// };

export { getAllUser, addUser };
