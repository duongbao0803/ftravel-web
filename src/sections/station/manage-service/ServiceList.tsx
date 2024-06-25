import React, { useMemo, useState } from "react";
import { Button, Input, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import useServiceService from "@/services/serviceService";

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

export interface ServiceListProps {
  routeId: number;
}

const ServiceList: React.FC<ServiceListProps> = () => {
  const [, setIsOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { services, totalCount } = useServiceService();

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const columns: TableProps<DataType>["columns"] = useMemo(
    () => [
      {
        title: "STT",
        dataIndex: "index",
        key: "index",
        render: (_, _record, index) => index + 1,
      },
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
    ],
    [],
  );

  return (
    <>
      <div>
        <p className="mb-3 text-[1.2rem] font-bold">Danh sách dịch vụ</p>
      </div>
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
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <PlusCircleOutlined className="mr-1 text-lg" /> Thêm dịch vụ
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={services?.map((record: { id: unknown }) => ({
          ...record,
          key: record.id,
        }))}
        pagination={{
          current: currentPage,
          total: totalCount || 0,
          pageSize: 5,
        }}
        onChange={handleTableChange}
        // loading={isFetching}
        rowKey={(record) => record._id}
      />
      {/* <AddServiceModal setIsOpen={setIsOpen} isOpen={isOpen} /> */}
    </>
  );
};

export default ServiceList;
