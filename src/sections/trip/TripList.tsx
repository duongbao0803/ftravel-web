import React, { useCallback, useMemo, useState } from "react";
import { Button, Input, Table, Tag } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useTripService from "@/services/tripService";
import { TripInfo } from "@/types/trip.types";
import { formatDate4 } from "@/util/validate";
import { TripStatus } from "@/enums/enums";
import ExportTrip from "./ExportTrip";

const TripList: React.FC = () => {
  const [isTemplate, setIsTemplate] = useState<boolean>(true);
  const [, setCurrentPage] = useState<number>(1);
  const [, setTripId] = useState<number | null>(null);
  const { trips, isFetching } = useTripService();
  const navigate = useNavigate();

  const handleTableChange = useCallback((pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  }, []);

  const filteredTrips = useMemo(
    () =>
      trips.filter((trip: TripInfo) =>
        isTemplate ? !trip["is-template"] : trip["is-template"],
      ),
    [trips, isTemplate],
  );

  const handleFilter = useCallback(() => {
    setIsTemplate((prev) => !prev);
  }, []);

  const renderStatusTrip = useCallback((status: string) => {
    switch (status) {
      case TripStatus.OPENING:
        return <Tag color="green">ĐANG BÁN VÉ</Tag>;
      case TripStatus.PENDING:
        return <Tag color="orange">ĐANG CHỜ</Tag>;
      case TripStatus.DEPARTED:
        return <Tag color="blue">ĐÃ KHỞI HÀNH</Tag>;
      case TripStatus.COMPLETED:
        return <Tag color="cyan">ĐÃ HOÀN THÀNH</Tag>;
      case TripStatus.CANCELED:
        return <Tag color="red">ĐÃ HỦY</Tag>;
      default:
        return <Tag>N/A</Tag>;
    }
  }, []);

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
        render: renderStatusTrip,
      },
      {
        title: "Loại",
        dataIndex: "is-template",
        width: "30%",
        render: (_, record) => (
          <span>{record["is-template"] ? "Mẫu" : "Thương mại"}</span>
        ),
      },
    ],
    [renderStatusTrip],
  );

  const handleRowClick = useCallback(
    (record: number) => {
      setTripId(record);
      navigate(`/trip/${record}`);
    },
    [navigate],
  );

  const dataSource = useMemo(
    () =>
      filteredTrips.map((record: TripInfo) => ({
        ...record,
        key: record.id,
        "open-ticket-date": record["open-ticket-date"]
          ? formatDate4(record["open-ticket-date"])
          : "N/A",
        "estimated-start-date": record["estimated-start-date"]
          ? formatDate4(record["estimated-start-date"])
          : "N/A",
      })),
    [filteredTrips],
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
          <div>
            <ExportTrip />
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
    </>
  );
};

export default TripList;
