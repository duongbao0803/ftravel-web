import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EditCityModal from "./EditCityModal";
import { DataType } from "./CityList";
import DeleteCityModal from "./DeleteCityModal";
import useCityService from "@/services/cityService";

export interface DropdownCityFuncProps {
  cityInfo: DataType;
}

const DropdownCityFunc: React.FC<DropdownCityFuncProps> = React.memo(
  (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { deleteCityItem } = useCityService();
    const { cityInfo } = props;
    const cityId = cityInfo?.id;

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
                    Chỉnh sửa thành phố
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
                      DeleteCityModal({
                        cityId,
                        deleteCityItem,
                      })
                    }
                  >
                    <DeleteOutlined className="pr-2" />
                    Xóa thành phố
                  </Link>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <MoreOutlined className="rotate-90" />
        </Dropdown>

        <EditCityModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          cityId={cityId}
          cityInfo={cityInfo}
        />
      </>
    );
  },
);

export default DropdownCityFunc;
