import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DataType } from "./CompanyList";
import EditCompanyModal from "./EditCompanyModal";

export interface DropdownCompanyFuncProps {
  userInfo: DataType;
}

const DropdownCompanyFunc: React.FC<DropdownCompanyFuncProps> = () => {
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
                  Edit Product
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
                  Delete Product
                </Link>
              ),
            },
          ],
        }}
        trigger={["click"]}
      >
        <MoreOutlined className="rotate-90" />
      </Dropdown>

      <EditCompanyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // productInfo={productInfo}
      />
    </>
  );
};

export default DropdownCompanyFunc;
