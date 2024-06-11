import React from "react";
import { Modal } from "antd";

const DeleteRouteModal: React.FC = () => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa người dùng",
    content: `Bạn có muốn xóa tuyến xe này không. Tuyến xe này không thể được khôi phục`,
    okText: "Có",
    okType: "danger",
    cancelText: "Không",
    onOk() {},
  });
  return null;
};

export default DeleteRouteModal;
