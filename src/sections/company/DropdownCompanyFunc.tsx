import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DataType } from "./CompanyList";
import EditCompanyModal from "./EditCompanyModal";

export interface DropdownCompanyFuncProps {
  companyInfo: DataType;
}

const DropdownCompanyFunc: React.FC<DropdownCompanyFuncProps> = React.memo(
  () => {
    const [isOpen, setIsOpen] = useState(false);
    // const { deleteCompanyItem } = useCompanyService();
    // const { companyInfo } = props;
    // const buscompanyId = companyInfo?.id;

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
                  <Link
                    rel="noopener noreferrer"
                    to="#"
                    onClick={openEditModal}
                  >
                    <EditOutlined className="pr-2" />
                    Chỉnh sửa nhà xe
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
                    //   DeleteCompanyModal({
                    //     buscompanyId,
                    //     deleteCompanyItem,
                    //   })
                    // }
                  >
                    <DeleteOutlined className="pr-2" />
                    Xóa nhà xe
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
  },
);

export default DropdownCompanyFunc;
