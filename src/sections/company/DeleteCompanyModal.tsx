import React from "react";
import { Modal } from "antd";

const DeleteCompanyModal: React.FC<{
  deleteCompanyItem: (id: number) => void;
  buscompanyId: number;
}> = ({ deleteCompanyItem, buscompanyId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa nhà xe",
    content: `Bạn có muốn xóa nhà xe này không. Nhà xe này không thể được khôi phục`,
    okText: "Có",
    okType: "danger",
    cancelText: "Không",
    onOk() {
      deleteCompanyItem(buscompanyId);
    },
  });
  return null;
};

export default DeleteCompanyModal;
