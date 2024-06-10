import React, { useState } from "react";
import { Button, Input, Table, Tag } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, PushpinOutlined } from "@ant-design/icons";
import useCityService from "@/services/cityService";
import AddCityModal from "./AddCityModal";
import ExportCity from "./ExportCity";
import { formatDate2 } from "@/util/validate";
import DropdownCityFunc from "./DropdownCityFunc";

export interface DataType {
  id: number;
  name: string;
  "create-date": string | Date;
  "update-date"?: string | Date;
  "is-deleted": boolean;
}

const CityList: React.FC = React.memo(() => {
  const { cities, isFetching, totalCount } = useCityService();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên thành phố",
      dataIndex: "name",
      width: "35%",
    },
    {
      title: "Ngày tạo",
      dataIndex: "create-date",
      width: "25%",
    },
    {
      title: "Ngày thay đổi",
      dataIndex: "update-date",
      width: "25%",
    },
    {
      title: "Trạng thái",
      dataIndex: "is-deleted",
      render: (isDeleted) => {
        let statusText = "";
        let tagColor = "";
        switch (isDeleted) {
          case false:
            statusText = "ACTIVE";
            tagColor = "green";
            break;
          case true:
            statusText = "INACTIVE";
            tagColor = "pink";
            break;
          default:
            statusText = "UNKNOWN";
            tagColor = "gray";
            break;
        }
        return <Tag color={tagColor}>{statusText}</Tag>;
      },
      width: "15%",
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <>
          <DropdownCityFunc cityInfo={record} />
        </>
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
            Sắp xếp
          </Button>
        </div>
        <div className="flex gap-x-2">
          <div>
            <ExportCity />
          </div>
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <PushpinOutlined className="mr-1 text-lg" /> Thêm công ty
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={cities?.map(
          (record: {
            id: unknown;
            "create-date": string | Date;
            "update-date": string | Date;
          }) => ({
            ...record,
            key: record.id,
            "create-date": formatDate2(record["create-date"]),
            "update-date": formatDate2(record["update-date"]),
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
      <AddCityModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
});

export default CityList;
