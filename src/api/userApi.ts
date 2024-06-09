import axiosClient from "@/config/axiosClient";
import { UserInfo } from "@/types/auth.types";

const getAllUser = () => {
  return axiosClient.get(`/api/account/accountList`);
};

const addUser = (formValues: UserInfo) => {
  return axiosClient.post(`/api/account`, formValues);
};

// const deleteUser = (userId) => {
//   return axiosClient.post(`/api/account`, userId);
// };

export { getAllUser, addUser };
