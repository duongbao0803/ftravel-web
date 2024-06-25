import React from "react";
import { Modal } from "antd";

const DeleteServiceModal: React.FC<{
  deleteServiceItem: (id: number) => void;
  serviceId: number;
}> = ({ deleteServiceItem, serviceId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa dịch vụ",
    content: `Bạn có muốn xóa dịch vụ này không. Dịch vụ này không thể được khôi phục`,
    okText: "Có",
    okType: "danger",
    cancelText: "Không",
    onOk() {
      deleteServiceItem(serviceId);
    },
  });
  return null;
};

export default DeleteServiceModal;
