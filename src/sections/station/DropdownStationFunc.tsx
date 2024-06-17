import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import DeleteRouteModal from "./DeleteStationModal";
import useRouteService from "@/services/routeService";
import { DataType } from "./StationList";
import EditStationModal from "./EditStationModal";

export interface DropdownStationFuncProps {
  stationInfo: DataType;
}

const DropdownStationFunc: React.FC<DropdownStationFuncProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { stationInfo } = props;
  const { deleteRouteItem } = useRouteService();
  const routeId = stationInfo?.id;

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
                  Chỉnh sửa trạm
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
                  Xóa trạm
                </Link>
              ),
            },
          ],
        }}
        trigger={["click"]}
      >
        <MoreOutlined className="rotate-90" />
      </Dropdown>

      <EditStationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // productInfo={productInfo}
      />
    </>
  );
};

export default DropdownStationFunc;
