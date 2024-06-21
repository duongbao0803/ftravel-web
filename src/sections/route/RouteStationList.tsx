import React, { useEffect, useMemo, useState } from "react";
import { Button, Input, Table, Tag } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, HomeOutlined } from "@ant-design/icons";
import useRouteService from "@/services/routeService";
import { StationDetailInfo, StationInfo } from "@/types/station.types";
import { CommonStatusString } from "@/enums/enums";


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
    routeId: number
}

const RouteStationList: React.FC<RouteStationListProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
    const {routeId} = props
  const [, setCurrentPage] = useState<number>(1);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const [routeStationList, setRouteStationList] = useState<[]>()

  const {fetchRouteDetail} = useRouteService()

  useEffect(() => {
    const fetchData = async () => {
        const res = await fetchRouteDetail(routeId);
        if (res && res.status === 200) {
            // console.log("check res list station", res.data["route-stations"][0].station.name)
            setRouteStationList(res.data["route-stations"])
        }
    }

    fetchData()
  }, [routeId])

const routeStationName = routeStationList?.map(routeStationDetail => routeStationDetail.station)

console.log("check station", routeStationName)



const columns: TableProps<StationDetailInfo>["columns"] = useMemo(
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
        // onCell: () => {
        //   return {
        //     onClick: () => {
        //       setIsModalOpen(true);
        //     },
        //   };
        // },
      },
      {
        title: "Tên nhà xe",
        dataIndex: "bus-company.name",
        render: (text, record) => {
            return record..["bus-company"].name;
          }
      },
      {
        title: "Ngày tạo",
        dataIndex: "create-date",
      },
      {
        title: "Ngày chỉnh sửa",
        dataIndex: "update-date",
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
        // render: (_, record) => (
        //   <>
        //     <DropdownStationFunc stationInfo={record} />
        //   </>
        // ),
      }
    ],
    [],
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
        </div>
        <div className="flex gap-x-2">
          <div>
            {/* <ExportService /> */}
          </div>
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <HomeOutlined className="mr-1 text-lg" /> Thêm dịch vụ
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={routeStationName?.map((record: { id: unknown }) => ({
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
        rowKey={(record) => record._id}
      />
      {/* <AddServiceModal setIsOpen={setIsOpen} isOpen={isOpen} /> */}
    </>
  );
};

export default RouteStationList;
