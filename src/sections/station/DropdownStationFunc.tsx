import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EditStationModal from "./EditStationModal";
import { StationDetailInfo } from "@/types/station.types";
import DeleteStationModal from "./DeleteStationModal";
import useStationService from "@/services/stationService";

export interface DropdownStationFuncProps {
  stationInfo: StationDetailInfo;
}

const DropdownStationFunc: React.FC<DropdownStationFuncProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { stationInfo } = props;
  const { deleteStationItem } = useStationService();
  const stationId = stationInfo?.id;

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
                    DeleteStationModal({
                      stationId,
                      deleteStationItem,
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
        stationInfo={stationInfo}
      />
    </>
  );
};

export default DropdownStationFunc;
