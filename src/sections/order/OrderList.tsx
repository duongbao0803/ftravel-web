import React, { useState } from "react";
import { Button, Input, Table, Tag } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { formatDate4 } from "@/util/validate";
import DropdownCityFunc from "./DropdownOrderFunc";
import useOrderService from "@/services/orderService";
import { OrderInfo } from "@/types/order.types";

// export interface DataType {
//   id: number;
//   name: string;
//   "create-date": string | Date;
//   "payment-date"?: string | Date;
//   "is-deleted": boolean;
//   code: number;
// }

const OrderList: React.FC = React.memo(() => {
  const { orders, totalCount, isFetching } = useOrderService();

  // const [isOpen, setIsOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const columns: TableProps<OrderInfo>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer-name",
      width: "20%",
    },
    {
      title: "Nhà xe",
      dataIndex: "bus-company-name",
      width: "20%",
    },
    {
      title: "Chuyến xe",
      dataIndex: "trip-name",
      width: "20%"
    },
    {
      title: "Giá tiền (tokens)",
      dataIndex: "total-price",
      width: "10%",
    },
    {
      title: "Ngày tạo",
      dataIndex: "create-date",
      width: "15%",
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "payment-date",
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "payment-order-status",
      render: () => {
        const statusText = "SUCCESS";
        const tagColor = "green";
        return <Tag color={tagColor}>{statusText}</Tag>;
      },
      width: "15%",
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <>
          <DropdownCityFunc orderInfo={record} />
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
            {/* <ExportCity /> */}
          </div>
          <div>
            {/* <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <PushpinOutlined className="mr-1 text-lg" /> Thêm thành phố
              </div>
            </Button> */}
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={orders?.map(
          (record: {
            id: unknown;
            "create-date": string | Date;
            "payment-date": string | Date;
          }) => ({
            ...record,
            key: record.id,
            "create-date": record["create-date"]
              ? formatDate4(record["create-date"])
              : "N/A",
            "payment-date": record["payment-date"]
              ? formatDate4(record["payment-date"])
              : "N/A",
          }),
        )}
        pagination={{
          current: currentPage,
          total: totalCount || 0,
          pageSize: 10,
        }}
        onChange={handleTableChange}
        loading={isFetching}
        rowKey={(record) => record["order-id"]}
      />
    </>
  );
});

export default OrderList;
