import React, { useState } from "react";
import { Button, Input, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, HomeOutlined } from "@ant-design/icons";
import ExportRoute from "./ExportRoute";
import AddRouteModal from "./AddRouteModal";

export interface DataType {
  _id: string;
  key: string;
  name: string;
  defaultPrice: number;
  imgUrl: [];
  quantity: number;
  shortDescription: string;
  fullDescription: string;
}

const RouteList: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [, setCurrentPage] = useState<number>(1);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      width: "25%",
      className: "first-column",
    },
    {
      title: "Giá gốc",
      dataIndex: "defaultPrice",
      width: "10%",
    },
    {
      title: "Ảnh",
      dataIndex: "imgUrl",
      width: "15%",
    },
    {
      title: "Mô tả ngắn gọn",
      dataIndex: "shortDescription",
      width: "20%",
    },
    {
      title: "Mô tả chi tiết",
      dataIndex: "fullDescription",
      width: "30%",
    },
    {
      title: "",
      dataIndex: "",
      // render: (_, record) => (
      //   <>{/* <DropdownFunction productInfo={record} /> */}</>
      // ),
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
            <ExportRoute />
          </div>
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <HomeOutlined className="mr-1 text-lg" /> Thêm tuyến xe
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        // dataSource={cities?.map((record: { id: unknown }) => ({
        //   ...record,
        //   key: record.id,
        // }))}
        // pagination={{
        //   current: currentPage,
        //   total: totalCount || 0,
        //   pageSize: 5,
        // }}
        onChange={handleTableChange}
        // loading={isFetching}
        rowKey={(record) => record._id}
      />
      <AddRouteModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default RouteList;
