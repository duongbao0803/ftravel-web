import axiosClient from "@/config/axiosClient";

const getAllOrder = (page: number) => {
  return axiosClient.get(`/api/orders`, {
    params: {
      "page-index": page,
      "page-size": 20,
    },
  });
};

// const addOrder = (formValues: OrderInfo) => {
//   return axiosClient.post(`/api/cities`, formValues);
// };

// const editOrder = (formValues: OrderInfo) => {
//   return axiosClient.put(`/api/cities`, formValues);
// };

// const removeOrder = (OrderId: number) => {
//   return axiosClient.delete(`/api/cities/${OrderId}`);
// };

export { getAllOrder };
