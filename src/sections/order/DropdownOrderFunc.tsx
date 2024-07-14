import React from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { OrderInfo } from "@/types/order.types";

export interface DropdownCityFuncProps {
  orderInfo: OrderInfo;
}

const DropdownCityFunc: React.FC<DropdownCityFuncProps> = React.memo(
  () => {
    // const [isOpen, setIsOpen] = useState(false);
    // const { deleteCityItem } = useCityService();
    // const { cityInfo } = props;
    // const cityId = cityInfo?.id;

    return (
      <>
        <Dropdown
          menu={{
            items: [
              {
                key: "2",
                label: (
                  <Link
                    rel="noopener noreferrer"
                    to="#"
                    // onClick={() =>
                    //   DeleteCityModal({
                    //     cityId,
                    //     deleteCityItem,
                    //   })
                    // }
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

        {/* <EditCityModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          cityId={cityId}
          cityInfo={cityInfo}
        /> */}
      </>
    );
  },
);

export default DropdownCityFunc;
