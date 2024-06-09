import React, { useState } from "react";
import { Button, Input, Table, Tag } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, UserAddOutlined } from "@ant-design/icons";
import ExportUser from "./ExportUser";
import AddUserModal from "./AddUserModal";
import useUserService from "@/services/userService";
import { formatDate2 } from "@/util/validate";
import DropdownUserFunc from "./DropdownUserFunc";

export interface DataType {
  id: string;
  key: string;
  name: string;
  image: string;
  description: string;
  gender: number;
  dob: string | Date;
  "role-id": number;
}

const UserList: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { userData, isFetching } = useUserService();

  const [, setCurrentPage] = useState<number>(1);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Họ và tên",
      dataIndex: "full-name",
      width: "15%",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      width: "15%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: "17%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone-number",
      width: "10%",
    },
    {
      title: "Vai trò",
      dataIndex: "role-id",
      render: (roleId) => {
        const roleList: { [key: number]: { name: string; color: string } } = {
          0: { name: "CUSTOMER", color: "pink" },
          1: { name: "DRIVER", color: "green" },
          2: { name: "BUS", color: "red" },
          3: { name: "ADMIN", color: "blue" },
        };
        const role = roleList[roleId];
        if (role) {
          const { name, color } = role;
          return (
            <Tag key={roleId} color={color}>
              {name}
            </Tag>
          );
        }
      },
      width: "5%",
    },
    {
      title: "Trạng thái",
      dataIndex: "isDelete",
      filters: [
        { text: "TRUE", value: true },
        { text: "FALSE", value: false },
      ],
      // onFilter: (value, record) => record.isDelete === value,
      //   render: (isDelete) => {
      //     let color;
      //     switch (isDelete) {
      //       case true:
      //         color = "green";
      //         break;
      //       case false:
      //         color = "red";
      //         break;
      //     }
      //     return (
      //       <Tag color={color} key={isDelete.toString()}>
      //         {isDelete.toString().toUpperCase()}
      //       </Tag>
      //     );
      //   },
      width: "10%",
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <>
          <DropdownUserFunc userInfo={record} />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <Input
            placeholder="Tìm kiếm..."
            className="h-8 max-w-lg rounded-lg sm:mb-5 sm:w-[300px]"
          />
          <Button className="flex items-center" type="primary">
            <FilterOutlined className="align-middle" />
            Sắp xếp
          </Button>
        </div>
        <div className="flex gap-x-2">
          <div>
            <ExportUser />
          </div>
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <UserAddOutlined className="mr-1 text-lg" /> Thêm người dùng
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={userData?.map(
          (record: { id: unknown; dob: string }, index: number) => ({
            ...record,
            key: record.id,
            dob: formatDate2(record.dob),
            index: index + 1,
          }),
        )}
        // pagination={{
        //   current: currentPage,
        //   total: totalCount || 0,
        //   pageSize: 5,
        // }}
        onChange={handleTableChange}
        loading={isFetching}
        rowKey={(record) => record.id}
      />
      <AddUserModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default UserList;
