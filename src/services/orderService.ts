import { getAllOrder } from "@/api/orderApi";
import { useQuery } from "react-query";

const useOrderService = () => {
  // const queryClient = useQueryClient();

  const fetchOrders = async (page: number) => {
    const res = await getAllOrder(page);
    const { data, headers } = res;
    const pagination = JSON.parse(headers["x-pagination"]);
    const totalCount = pagination.TotalCount;
    return {
      data,
      totalCount,
    };
  };

  // const getInfoPostDetail = async (postId: string) => {
  //   const res = await getDetailPost(postId);
  //   return res.data.postInfo;
  // };

  // const deleteOrder = async (OrderId: number) => {
  //   await removeOrder(OrderId);
  //   return OrderId;
  // };

  // const addNewOrder = async (formValues: OrderInfo) => {
  //   await addOrder(formValues);
  // };

  // const updateOrder = async (formValues: OrderInfo) => {
  //   await editOrder(formValues);
  // };

  const { data: ordersData, isLoading: isFetching } = useQuery(
    ["orders", 1],
    () => fetchOrders(1),
    {
      retry: 1,
      retryDelay: 5000,
    },
  );

  // const addNewOrderMutation = useMutation(addNewOrder, {
  //   onSuccess: () => {
  //     notification.success({
  //       message: "Tạo thành công",
  //       description: "Tạo thành phố thành công",
  //       duration: 2,
  //     });
  //     queryClient.invalidateQueries("cities");
  //   },
  //   onError: (err: CustomError) => {
  //     notification.error({
  //       message: "Tạo thất bại",
  //       description: `${err?.response?.data?.message}`,
  //       duration: 2,
  //     });
  //   },
  // });

  // const deleteOrderMutation = useMutation(deleteOrder, {
  //   onSuccess: () => {
  //     notification.success({
  //       message: "Xóa thành công",
  //       description: "Xóa thành phố thành công",
  //       duration: 2,
  //     });
  //     queryClient.invalidateQueries("cities");
  //   },
  //   onError: (err: CustomError) => {
  //     notification.error({
  //       message: "Xóa thất bại",
  //       description: `${err?.response?.data?.message}`,
  //       duration: 2,
  //     });
  //   },
  // });

  // const updateOrderMutation = useMutation(updateOrder, {
  //   onSuccess: () => {
  //     notification.success({
  //       message: "Chỉnh sửa thành công",
  //       description: "Chỉnh sửa thành phố thành công",
  //       duration: 2,
  //     });
  //     queryClient.invalidateQueries("cities");
  //   },
  //   onError: (err: CustomError) => {
  //     console.error("Xóa thành công", err);
  //     notification.error({
  //       message: "Update Failed",
  //       description: `${err?.response?.data?.message}`,
  //       duration: 2,
  //     });
  //   },
  // });

  // const addNewOrderItem = async (formValues: OrderInfo) => {
  //   await addNewOrderMutation.mutateAsync(formValues);
  // };

  // const deleteOrderItem = async (OrderId: number) => {
  //   await deleteOrderMutation.mutateAsync(OrderId);
  // };

  // const updateOrderItem = async (formValues: OrderInfo) => {
  //   await updateOrderMutation.mutateAsync(formValues);
  // };

  const orders = ordersData?.data;
  const totalCount = ordersData?.totalCount || 0;

  return {
    isFetching,
    orders,
    totalCount,
    // deleteOrderItem,
    // addNewOrderItem,
    // updateOrderItem,
  };
};

export default useOrderService;
