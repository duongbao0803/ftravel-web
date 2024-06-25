import React from "react";
import { Modal } from "antd";

const DeleteStationModal: React.FC<{
  deleteStationItem: (id: number) => void;
  stationId: number;
}> = ({ deleteStationItem, stationId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa người dùng",
    content: `Bạn có muốn xóa trạm này không. Trạm này không thể được khôi phục`,
    okText: "Có",
    okType: "danger",
    cancelText: "Không",
    onOk() {
      deleteStationItem(stationId);
    },
  });
  return null;
};

export default DeleteStationModal;
