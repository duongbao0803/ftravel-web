import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DataType } from "./RouteList";
import EditRouteModal from "./EditRouteModal";
import DeleteRouteModal from "./DeleteRouteModal";
import useRouteService from "@/services/routeService";

export interface DropdownRouteFuncProps {
  routeInfo: DataType;
}

const DropdownRouteFunc: React.FC<DropdownRouteFuncProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { routeInfo } = props;
  const { deleteRouteItem } = useRouteService();
  const routeId = routeInfo?.id;

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
                  onClick={() =>
                    DeleteRouteModal({
                      routeId,
                      deleteRouteItem,
                    })
                  }
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
