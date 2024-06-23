import React, { useEffect, useMemo, useState } from "react";
import { Button, Table, Tag } from "antd";
import type { TablePaginationConfig } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import useRouteService from "@/services/routeService";
import { StationInfo } from "@/types/station.types";
import { CommonStatusString } from "@/enums/enums";
import { RouteDetailInfo } from "@/types/route.types";
import { ColumnsType } from "antd/es/table";

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

export interface RouteStationListProps {
  routeId: number;
}

const RouteStationList: React.FC<RouteStationListProps> = (props) => {
  const [, setIsOpen] = useState<boolean>(false);
  const { routeId } = props;
  const [, setCurrentPage] = useState<number>(1);
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };
  //   const [routeStationList, setRouteStationList] = useState<[]>();
  const [routeDetail, setRouteDetail] = useState<RouteDetailInfo | undefined>(
    undefined,
  );
  const { fetchRouteDetail, isFetching } = useRouteService();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchRouteDetail(routeId);
      if (res && res.status === 200) {
        setRouteDetail(res.data);
      }
    };
    fetchData();
  }, [routeId]);

  const routeStation = routeDetail?.["route-stations"]?.map(
    (routeStationDetail) => routeStationDetail?.station,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnsType<StationInfo | unknown | undefined | any> = useMemo(
    () => [
      {
        title: "STT",
        dataIndex: "index",
        key: "index",
        render: (_, _record, index) => index + 1,
      },
      {
        title: "Tên trạm",
        dataIndex: "name",
        className: "first-column",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        render: (status: string) => {
          let statusText = "";
          let tagColor = "";
          switch (status) {
            case CommonStatusString.ACTIVE.toString():
              statusText = "ĐANG HOẠT ĐỘNG";
              tagColor = "green";
              break;
            case CommonStatusString.INACTIVE.toString():
              statusText = "KHÔNG HOẠT ĐỘNG";
              tagColor = "pink";
              break;
            default:
              statusText = "UNKNOWN";
              tagColor = "gray";
              break;
          }
          return <Tag color={tagColor}>{statusText}</Tag>;
        },
        width: "10%",
      },
      {
        title: "",
        dataIndex: "",
      },
    ],
    [],
  );
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-x-2">
            <h3 className="text-[1.2rem] font-bold">Danh sách trạm</h3>
        </div>
        <div className="flex gap-x-2">
          <div>{/* <ExportService /> */}</div>
          <div className="mb-3">
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <PlusCircleOutlined className="mr-1 text-lg" /> Thêm trạm cho tuyến
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={routeStation?.map(
          (record: {
            id: unknown;
            "create-date": Date | string;
            "update-date": Date | string;
          }) => ({
            ...record,
            key: record.id,
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
      {/* <AddServiceModal setIsOpen={setIsOpen} isOpen={isOpen} /> */}
    </>
  );
};

export default RouteStationList;
