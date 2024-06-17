import React from "react";
import { Modal } from "antd";

const DeleteCityModal: React.FC<{
  deleteCityItem: (id: number) => void;
  cityId: number;
}> = ({ deleteCityItem, cityId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa thành phố",
    content: `Bạn có muốn xóa thành phố này không. Thành phố này không thể được khôi phục`,
    okText: "Có",
    okType: "danger",
    cancelText: "Không",
    onOk() {
      deleteCityItem(cityId);
    },
  });
  return null;
};

export default DeleteCityModal;
