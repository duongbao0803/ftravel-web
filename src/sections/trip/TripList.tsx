import React, { useMemo, useState } from "react";
import { Button, Input, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import AddServiceModal from "./AddTripModal";
import { useNavigate } from "react-router-dom";
import useTripService from "@/services/tripService";
import { TripInfo } from "@/types/trip.types";
import { formatDate4 } from "@/util/validate";
import { TripStatus } from "@/enums/enums";

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
  const { trips, isFetching } = useTripService();
  const navigate = useNavigate();

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const [isTemplate, setIsTemplate] = useState(true);

  const filterTrips = trips.filter((trip: TripInfo) => trip?.["is-template"]);
  const filterTripsTemplate = trips.filter(
    (trip: TripInfo) => !trip?.["is-template"],
  );

  const handleFilter = () => {
    setIsTemplate((prev) => !prev);
  };

  const renderStatusTrip = (status: string) => {
    switch (status) {
      case TripStatus.OPENING:
        return "ĐANG BÁN VÉ";
      case TripStatus.PENDING:
        return "ĐANG CHỜ";
      case TripStatus.DEPARTED:
        return "ĐÃ KHỞI HÀNH";
      case TripStatus.COMPLETED:
        return "ĐÃ HOÀN THÀNH";
      case TripStatus.CANCELED:
        return "ĐÃ HỦY";
      default:
        return "N/A";
    }
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
        render: (status: string) => renderStatusTrip(status),
      },
      {
        title: "Loại",
        dataIndex: "is-template",
        width: "30%",
        render: (_text, record) => (
          <span>{record["is-template"] ? "Mẫu" : "Thương mại"}</span>
        ),
      },
    ],
    [],
  );

  const handleRowClick = (record: number) => {
    setTripId(record);
    navigate(`/trip/${record}`);
  };

  const dataSource = (isTemplate ? filterTripsTemplate : filterTrips).map(
    (record: TripInfo) => ({
      ...record,
      key: record.id,
      "open-ticket-date": record["open-ticket-date"]
        ? formatDate4(record["open-ticket-date"])
        : "N/A",
      "estimated-start-date": record["estimated-start-date"]
        ? formatDate4(record["estimated-start-date"])
        : "N/A",
    }),
  );

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
          <Button
            className="flex items-center"
            type="primary"
            onClick={handleFilter}
          >
            <FilterOutlined className="align-middle" />
            Dùng mẫu
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
        dataSource={dataSource}
        loading={isFetching}
        onChange={handleTableChange}
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
