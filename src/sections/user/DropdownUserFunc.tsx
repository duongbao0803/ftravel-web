import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DataType } from "./UserList";
import EditUserModal from "./EditUserModal";

export interface DropdownUserFuncProps {
  userInfo: DataType;
}

const DropdownUserFunc: React.FC<DropdownUserFuncProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { userInfo } = props;
  // const userId = userInfo?.id;

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
                  Chỉnh sửa người dùng
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
                  Xóa người dùng
                </Link>
              ),
            },
          ],
        }}
        trigger={["click"]}
      >
        <MoreOutlined className="rotate-90" />
      </Dropdown>

      <EditUserModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // productInfo={productInfo}
      />
    </>
  );
};

export default DropdownUserFunc;
