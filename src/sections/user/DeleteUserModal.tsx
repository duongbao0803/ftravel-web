import React from "react";
import { Modal } from "antd";

const DeleteUserModal: React.FC = () => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa người dùng",
    content: `Bạn có muốn xóa người này không. Người dùng này không thể được khôi phục`,
    okText: "Có",
    okType: "danger",
    cancelText: "Không",
    onOk() {},
  });
  return null;
};

export default DeleteUserModal;
