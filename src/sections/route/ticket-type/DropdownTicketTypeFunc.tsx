import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { TicketTypeInfo } from "@/types/ticket.types";
import EditTicketTypeModal from "./EditTicketTypeModal";

export interface DropdownTicketTypeFuncProps {
  ticketTypeInfo: TicketTypeInfo;
  ticketTypeName: string[] | undefined;
}

const DropdownTicketTypeFunc: React.FC<DropdownTicketTypeFuncProps> = (
  props,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ticketTypeInfo, ticketTypeName } = props;
  // const { deleteRouteItem } = useRouteService();
  // const routeId = routeInfo?.id;

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
                  Chỉnh sửa loại vé
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
                  //   DeleteRouteModal({
                  //     routeId,
                  //     deleteRouteItem,
                  //   })
                  // }
                >
                  <DeleteOutlined className="pr-2" />
                  Xóa loại vé này
                </Link>
              ),
            },
          ],
        }}
        trigger={["click"]}
      >
        <MoreOutlined className="rotate-90" />
      </Dropdown>

      <EditTicketTypeModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        ticketTypeInfo={ticketTypeInfo}
        ticketTypeName={ticketTypeName}
      />
    </>
  );
};

export default DropdownTicketTypeFunc;
