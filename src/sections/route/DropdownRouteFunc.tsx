import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DataType } from "./RouteList";
import EditRouteModal from "./EditRouteModal";

export interface DropdownRouteFuncProps {
  userInfo: DataType;
}

const DropdownRouteFunc: React.FC<DropdownRouteFuncProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { productInfo } = props;
  // const productId = productInfo?._id;

  const openEditModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Dropdown
        menu={{
          items: [
            {
              key: "1",
              label: (
                <Link rel="noopener noreferrer" to="#" onClick={openEditModal}>
                  <EditOutlined className="pr-2" />
                  Chỉnh sửa tuyến xe
                </Link>
              ),
            },
            {
              key: "2",
              label: (
                <Link
                  rel="noopener noreferrer"
                  to="#"
                  // onClick={() =>
                  //   DeleteProductModal({
                  //     productId,
                  //     deleteProductItem,
                  //   })
                  // }
                >
                  <DeleteOutlined className="pr-2" />
                  Xóa tuyến xe
                </Link>
              ),
            },
          ],
        }}
        trigger={["click"]}
      >
        <MoreOutlined className="rotate-90" />
      </Dropdown>

      <EditRouteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // productInfo={productInfo}
      />
    </>
  );
};

export default DropdownRouteFunc;
