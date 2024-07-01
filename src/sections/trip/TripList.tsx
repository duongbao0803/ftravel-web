import React, { useMemo, useState } from "react";
import { Button, Input, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import AddServiceModal from "./AddTripModal";
import { useNavigate } from "react-router-dom";
import useTripService from "@/services/tripService";
import { TripInfo } from "@/types/trip.types";
import { formatDate3 } from "@/util/validate";

// export interface DataType {
//   id: string;
//   key: string;
//   name: string;
//   defaultPrice: number;
//   imgUrl: [];
//   quantity: number;
//   shortDescription: string;
//   fullDescription: string;
// }

const TripList: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [, setCurrentPage] = useState<number>(1);
  const [, setTripId] = useState<number>();
  const { trips } = useTripService();
  const navigate = useNavigate();

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };
  
  const columns: TableProps<TripInfo>["columns"] = useMemo(
    () => [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Tên chuyến",
      dataIndex: "name",
      width: "20%",
      className: "first-column",
    },
    {
      title: "Nhà xe",
      dataIndex: "bus-company-name",
      width: "15%",
    },
    {
      title: "Ngày mở bán",
      dataIndex: "open-ticket-date",
      width: "15%",
    },
    {
      title: "Thời gian xuất phát (dự kiến)",
      dataIndex: "estimated-start-date",
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "15%",
    },
    {
      title: "Loại",
      dataIndex: "is-template",
      width: "30%",
      render: (_text, record) => (
        <span>{record["is-template"] ? "Mẫu" : "Thương mại"}</span>
      )
    }
  ],[]);


  const handleRowClick = (record: number) => {
    setTripId(record);
    navigate(`/trip/${record}`);
  };




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
          {/* <div>
            <ExportService />
          </div> */}
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <PlusCircleOutlined className="mr-1 text-lg" /> Thêm chuyến xe
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={trips?.map((record: { id: unknown, "open-ticket-date": Date, "estimated-start-date": Date }) => ({
          ...record,
          key: record.id,
          "open-ticket-date": record["open-ticket-date"] ? formatDate3(record["open-ticket-date"]) : "N/A",
          "estimated-start-date": record["estimated-start-date"] ? formatDate3(record["estimated-start-date"]) : "N/A",
        }))}
        // pagination={{
        //   current: currentPage,
        //   total: totalCount || 0,
        //   pageSize: 5,
        // }}
        onChange={handleTableChange}
        // loading={isFetching}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => handleRowClick(record.id),
        })}
      />
      <AddServiceModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default TripList;
