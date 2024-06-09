import React from "react";
import { Modal } from "antd";

const DeleteProductModal: React.FC<{
  deleteProductItem: (id: string) => void;
  productId: string;
}> = ({ deleteProductItem, productId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Delete User",
    content: `Do you really want to delete? This user cannot be restored.`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      deleteProductItem(productId);
    },
  });
  return null;
};

export default DeleteProductModal;
