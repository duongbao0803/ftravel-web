import React from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import DeleteTripModal from "./DeleteTripModal";
import useTripService from "@/services/tripService";

export interface DropdownTripFuncProps {
  tripId: number;
}

const DropdownTripFunc: React.FC<DropdownTripFuncProps> = (props) => {
  const { tripId } = props;
  const { deleteTripItem } = useTripService();

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
                  onClick={() =>
                    DeleteTripModal({
                      tripId,
                      deleteTripItem
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
    </>
  );
};

export default DropdownTripFunc;
