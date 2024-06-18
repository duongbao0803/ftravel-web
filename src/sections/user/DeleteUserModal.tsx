import React from "react";
import { Modal } from "antd";

const DeleteUserModal: React.FC<{
  deleteUserItem: (id: number) => void;
  userId: number;
}> = ({ deleteUserItem, userId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa người dùng",
    content: `Bạn có muốn xóa người này không. Người dùng này không thể được khôi phục`,
    okText: "Có",
    okType: "danger",
    cancelText: "Không",
    onOk() {
      deleteUserItem(userId);
    },
  });
  return null;
};

export default DeleteUserModal;
