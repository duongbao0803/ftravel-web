import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ServiceDetail } from "@/types/service.types";
import useServiceService from "@/services/serviceService";
import DeleteServiceModal from "./DeleteServiceModal";
import EditServiceModal from "./EditServiceModal";
import { RouteStation } from "@/types/route.types";

export interface DropdownServiceFuncProps {
  serviceDetail: ServiceDetail;
  routeStation: RouteStation;
}

const DropdownServiceFunc: React.FC<DropdownServiceFuncProps> = React.memo(
  (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { serviceDetail, routeStation } = props;
    const { deleteServiceItem } = useServiceService();
    const serviceId = serviceDetail?.id;

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
                    Chỉnh sửa dịch vụ
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
                      DeleteServiceModal({
                        serviceId,
                        deleteServiceItem,
                      })
                    }
                  >
                    <DeleteOutlined className="pr-2" />
                    Xóa dịch vụ
                  </Link>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <MoreOutlined className="rotate-90" />
        </Dropdown>

        <EditServiceModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          serviceDetail={serviceDetail}
          routeStation={routeStation}
        />
      </>
    );
  },
);

export default DropdownServiceFunc;
