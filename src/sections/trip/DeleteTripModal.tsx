import React from "react";
import { Modal } from "antd";

const DeleteTripModal: React.FC<{
  deleteTripItem: (id: number) => void;
  tripId: number;
}> = ({ deleteTripItem, tripId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa người dùng",
    content: `Bạn có muốn xóa chuyến xe này không. Chuyến xe không thể được khôi phục`,
    okText: "Có",
    okType: "danger",
    cancelText: "Không",
    onOk() {
      deleteTripItem(tripId);
    },
  });
  return null;
};

export default DeleteTripModal;
