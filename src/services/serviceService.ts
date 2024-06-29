import {
  addService,
  editService,
  getAllService,
  getServiceByStation,
  getServiceDetail,
  removeService,
} from "@/api/serviceApi";
import { CustomError } from "@/types/error.types";
import { CreateService } from "@/types/service.types";
import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useServiceService = () => {
  const queryClient = useQueryClient();

  const fetchServices = async (page: number) => {
    const res = await getAllService(page);
    const { data, headers } = res;
    const pagination = JSON.parse(headers["x-pagination"]);
    const totalCount = pagination.TotalCount;
    return { data, totalCount };
  };

  const fetchServiceDetail = async (serviceId: number) => {
    const res = await getServiceDetail(serviceId);
    return res;
  };

  const fetchServiceStation = async (stationId: number) => {
    const res = await getServiceByStation(stationId);
    return res;
  };

  // const getInfoPostDetail = async (postId: string) => {
  //   const res = await getDetailPost(postId);
  //   return res.data.postInfo;
  // };

  const deleteService = async (serviceId: number) => {
    await removeService(serviceId);
    return serviceId;
  };

  const addNewService = async (formValues: CreateService) => {
    await addService(formValues);
  };

  const updateService = async ({
    serviceId,
    formValues,
  }: {
    serviceId: number;
    formValues: CreateService;
  }) => {
    await editService(serviceId, formValues);
  };

  const { data: servicesData, isLoading: isFetching } = useQuery(
    ["services", 1],
    () => fetchServices(1),
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const addNewServiceMutation = useMutation(addNewService, {
    onSuccess: () => {
      notification.success({
        message: "Tạo thành công",
        description: "Tạo dịch vụ thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("services");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Tạo thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const deleteServiceMutation = useMutation(deleteService, {
    onSuccess: () => {
      notification.success({
        message: "Xóa thành công",
        description: "Xóa dịch vụ thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("services");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Xóa thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const updateServiceMutation = useMutation(updateService, {
    onSuccess: () => {
      notification.success({
        message: "Chỉnh sửa thành công",
        description: "Chỉnh sửa dịch vụ thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("services");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Lỗi khi chỉnh sửa",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const addNewServiceItem = async (formValues: CreateService) => {
    await addNewServiceMutation.mutateAsync(formValues);
  };

  const deleteServiceItem = async (serviceId: number) => {
    await deleteServiceMutation.mutateAsync(serviceId);
  };

  const updateServiceItem = async (
    serviceId: number,
    formValues: CreateService,
  ) => {
    await updateServiceMutation.mutateAsync({ serviceId, formValues });
  };

  // const services = servicesData?.data || [];
  const services =
    servicesData?.data.filter(
      (service: { [x: string]: boolean }) => service["is-deleted"] === false,
    ) || [];
  const totalCount = servicesData?.totalCount || 0;

  return {
    isFetching,
    services,
    totalCount,
    deleteServiceItem,
    addNewServiceItem,
    fetchServiceDetail,
    fetchServiceStation,
    updateServiceItem,
  };
};

export default useServiceService;
