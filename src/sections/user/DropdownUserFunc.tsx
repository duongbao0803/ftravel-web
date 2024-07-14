import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import useUserService from "@/services/userService";
import { UserInfo } from "@/types/auth.types";

export interface DropdownUserFuncProps {
  userInfo: UserInfo;
}

const DropdownUserFunc: React.FC<DropdownUserFuncProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteUserItem } = useUserService();
  const { userInfo } = props;
  const userId = userInfo?.id;

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
                  Chỉnh sửa người dùng
                </Link>
              ),
            },
            {
              key: "2",
              label: (
                <Link
                  rel="noopener noreferrer"
                  to="#"
                  onClick={() => DeleteUserModal({ deleteUserItem, userId })}
                >
                  <DeleteOutlined className="pr-2" />
                  Xóa người dùng
                </Link>
              ),
            },
          ],
        }}
        trigger={["click"]}
      >
        <MoreOutlined className="rotate-90" />
      </Dropdown>

      <EditUserModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userInfo={userInfo}
      />
    </>
  );
};

export default DropdownUserFunc;
