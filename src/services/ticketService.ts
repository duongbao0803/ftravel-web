import {
  addTicketType,
  editTicketType,
  getAllTicketTypeRoute,
} from "@/api/ticketApi";
import { CustomError } from "@/types/error.types";
import { CreateTicketTypeInfo } from "@/types/ticket.types";
import { notification } from "antd";
import { useMutation, useQueryClient } from "react-query";

const useTicketService = () => {
  const queryClient = useQueryClient();

  const fetchTicketTypeRoute = async (routeId: number) => {
    const res = await getAllTicketTypeRoute(1, routeId);
    return res;
  };

  const addNewTicketType = async (formValues: CreateTicketTypeInfo) => {
    await addTicketType(formValues);
  };

  const updateTicketType = async ({
    ticketTypeId,
    formValues,
  }: {
    ticketTypeId: number;
    formValues: CreateTicketTypeInfo;
  }) => {
    await editTicketType(ticketTypeId, formValues);
  };

  const addNewTicketTypeMutation = useMutation(addNewTicketType, {
    onSuccess: () => {
      notification.success({
        message: "Tạo thành công",
        description: "Tạo loại vé mới thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("ticket-type");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Tạo thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const updateTicketTypeMutation = useMutation(updateTicketType, {
    onSuccess: () => {
      notification.success({
        message: "Chỉnh sửa thành công",
        description: "Chỉnh sửa loại vé thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("ticket-type");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Lỗi khi chỉnh sửa",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const addNewTicketTypeItem = async (formValues: CreateTicketTypeInfo) => {
    await addNewTicketTypeMutation.mutateAsync(formValues);
  };

  const updateTicketTypeItem = async (
    ticketTypeId: number,
    formValues: CreateTicketTypeInfo,
  ) => {
    await updateTicketTypeMutation.mutateAsync({ ticketTypeId, formValues });
  };

  return {
    fetchTicketTypeRoute,
    addNewTicketTypeItem,
    updateTicketTypeItem,
  };
};

export default useTicketService;
