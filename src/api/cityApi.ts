import axiosClient from "@/config/axiosClient";

const getAllCity = (page: number) => {
  return axiosClient.get(`/api/cities`, {
    params: {
      page: page,
      pageSize: 20,
    },
  });
};

export { getAllCity };
