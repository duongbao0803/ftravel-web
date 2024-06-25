import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ServiceDetail } from "@/types/service.types";
import useServiceService from "@/services/serviceService";
import AddServiceStationModal from "./AddServiceStationModal";
import { StationInfo } from "@/types/station.types";
import { RouteStation } from "@/types/route.types";
// import ExportService from "./ExportService";
// import AddServiceModal from "./AddServiceModal";

// export interface DataType {
//   _id: string;
//   key: string;
//   name: string;
//   defaultPrice: number;
//   imgUrl: [];
//   quantity: number;
//   shortDescription: string;
//   fullDescription: string;
// }

export interface ServiceStationListProps {
  routeStation: RouteStation;
  routeId: number;
}

const ServiceStationList: React.FC<ServiceStationListProps> = (props) => {
  const {routeStation, routeId} = props
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [, setCurrentPage] = useState<number>(1);
  const { fetchServiceStation } = useServiceService();

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const [services, setServices] = useState<ServiceDetail[]>([]);

  const fetchData = async (serviceId: number) => {
    try {
      const res = await fetchServiceStation(serviceId);
      if (res && res.status === 200) {
        setServices(res.data);
      }
    } catch (error) {
      console.error("Error fetching route detail:", error);
    }
  };

  useEffect(() => {
    fetchData(routeStation.id);
  }, [props]);

  const columns: TableProps<ServiceDetail>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "img-url",
      width: "10%",
      key: "img-url",
      render: (text: string) => <img src={text} alt="Service" style={{ width: '100%' }} />
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      width: "25%",
      className: "first-column",
    },
    {
      title: "Giá (FToken)",
      dataIndex: "default-price",
      width: "10%",
    },
    {
      title: "Mô tả ngắn gọn",
      dataIndex: "short-description",
      width: "20%",
    },
    {
      title: "Mô tả chi tiết",
      dataIndex: "full-description",
      width: "35%",
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
          <p className="font-bold">Danh sách dịch vụ</p>
        </div>
        <div className="flex gap-x-2">
          {/* <div>
            <ExportService />
          </div> */}
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
        id="myTable"
        columns={columns}
        dataSource={services?.map((record: ServiceDetail) => ({
          ...record,
          key: record.id,
        }))}
        // pagination={{
        //   current: currentPage,
        //   total: totalCount || 0,
        //   pageSize: 5,
        // }}
        onChange={handleTableChange}
        // loading={isFetching}
        rowKey={(record) => record.id}
      />
      <AddServiceStationModal setIsOpen={setIsOpen} isOpen={isOpen} routeId={routeId} routeStation={routeStation}/>
    </>
  );
};

export default ServiceStationList;
