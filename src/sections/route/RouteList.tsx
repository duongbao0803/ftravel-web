import React, { useState } from "react";
import { Button, Input, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, HomeOutlined } from "@ant-design/icons";
import ExportRoute from "./ExportRoute";
import AddRouteModal from "./AddRouteModal";
import DropdownRouteFunc from "./DropdownRouteFunc";
import useRouteService from "@/services/routeService";
import { formatDate2 } from "@/util/validate";

export interface DataType {
  id: number;
  name: string;
  "start-point": string;
  "end-point": string;
  "bus-company-name": string;
  "create-date": string | Date;
  shortDescription: string;
  fullDescription: string;
}

const RouteList: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { routes, totalCount, isFetching } = useRouteService();

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên tuyến xe",
      dataIndex: "name",
      width: "25%",
      className: "first-column",
    },
    {
      title: "Điểm bắt đầu",
      dataIndex: "start-point",
      width: "10%",
    },
    {
      title: "Điểm kết thúc",
      dataIndex: "end-point",
      width: "10%",
    },
    {
      title: "Nhà xe",
      dataIndex: "bus-company-name",
      width: "20%",
    },
    {
      title: "Ngày tạo",
      dataIndex: "create-date",
      width: "20%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "20%",
    },
    // {
    //   title: "",
    //   dataIndex: "",
    //   render: (_, record) => (
    //     <>
    //       {" "}
    //       <DropdownRouteFunc />{" "}
    //     </>
    //   ),
    // },
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
        dataSource={routes?.map(
          (record: { id: unknown; "create-date": Date | string }) => ({
            ...record,
            "create-date": formatDate2(record["create-date"]),
            key: record.id,
          }),
        )}
        pagination={{
          current: currentPage,
          total: totalCount || 0,
          pageSize: 5,
        }}
        onChange={handleTableChange}
        loading={isFetching}
        rowKey={(record) => record.id}
      />
      <AddRouteModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default RouteList;
