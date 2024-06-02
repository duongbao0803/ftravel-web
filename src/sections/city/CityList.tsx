import React, { useState } from "react";
import { Button, Input, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { AppstoreAddOutlined, FilterOutlined } from "@ant-design/icons";
import useCityService from "@/services/cityService";
import AddCityModal from "./AddCityModal";
import ExportCity from "./ExportCity";

export interface DataType {
  _id: string;
  key: string;
  name: string;
  image: string;
  description: string;
  quantity: number;
  typeOfProduct: string;
  price: number;
  rating: number;
}

const CityList: React.FC = () => {
  // const { products, isFetching } = useProductService();
  const { cities, isFetching, totalCount } = useCityService();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Unsign name",
      dataIndex: "unsignName",
      width: "25%",
      className: "first-column",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      width: "25%",
    },
    {
      title: "Update Date",
      dataIndex: "updateDate",
      width: "25%",
    },
    {
      title: "Status",
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
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <>{/* <DropdownFunction productInfo={record} /> */}</>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <Input
            placeholder="Search by..."
            className="h-8 max-w-lg rounded-lg sm:mb-5 sm:w-[300px]"
          />
          <Button className="flex items-center" type="primary">
            <FilterOutlined className="align-middle" />
            Sort
          </Button>
        </div>
        <div className="flex gap-x-2">
          <div>
            <ExportCity />
          </div>
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <AppstoreAddOutlined className="mr-1 text-lg" /> Add City
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={cities?.map((record: { id: unknown }) => ({
          ...record,
          key: record.id,
        }))}
        pagination={{
          current: currentPage,
          total: totalCount || 0,
          pageSize: 5,
        }}
        onChange={handleTableChange}
        loading={isFetching}
        rowKey={(record) => record._id}
      />
      <AddCityModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default CityList;
