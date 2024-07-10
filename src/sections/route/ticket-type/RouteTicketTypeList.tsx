import useTicketService from "@/services/ticketService";
import { TicketTypeInfo } from "@/types/ticket.types";
import { formatDate4 } from "@/util/validate";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table, TableProps } from "antd";
import React, { useEffect, useState } from "react";
import DropdownTicketTypeFunc from "./DropdownTicketTypeFunc";
import AddTicketTypeModal from "./AddTicketTypeModal";

export interface RouteTicketTypeListProps {
  routeId: number;
}

const RouteTicketTypeList: React.FC<RouteTicketTypeListProps> = (props) => {
  const { routeId } = props;

  const { fetchTicketTypeRoute } = useTicketService();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ticketTypes, setTicketTypes] = useState<TicketTypeInfo[]>();

  const ticketTypeNames = ticketTypes?.map((ticketName) => ticketName?.name);
  const ticketTypeName = ticketTypeNames;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchTicketTypeRoute(routeId);
      if (res && res.status === 200) {
        setTicketTypes(res.data);
      }
    };

    fetchData();
  }, [routeId]);

  const columns: TableProps<TicketTypeInfo>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: "10%",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Loại vé",
      dataIndex: "name",
      width: "15%",
    },
    {
      title: "Giá bán (FToken)",
      dataIndex: "price",
      width: "25%",
    },
    {
      title: "Ngày tạo",
      dataIndex: "create-date",
      width: "25%",
    },
    {
      title: "Ngày chỉnh sửa",
      dataIndex: "update-date",
      width: "25%",
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <>
          {" "}
          <DropdownTicketTypeFunc
            ticketTypeInfo={record}
            ticketTypeName={ticketTypeName}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <AddTicketTypeModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        routeId={routeId}
        ticketTypeName={ticketTypeName}
      />
      <div className="my-2 flex justify-between">
        <div className="flex gap-x-2">
          <p className="font-bold">Danh sách loại vé</p>
        </div>
        <div className="flex gap-x-2">
          {/* <div>
            <ExportService />
          </div> */}
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <PlusCircleOutlined className="mr-1 text-lg" /> Thêm loại vé
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        id="myTable"
        columns={columns}
        dataSource={
          ticketTypes &&
          ticketTypes?.map((record: TicketTypeInfo) => ({
            ...record,
            key: record.id,
            "create-date": record["create-date"]
              ? formatDate4(record["create-date"])
              : "N/A",
            "update-date": record["update-date"]
              ? formatDate4(record["update-date"])
              : "N/A",
          }))
        }
        // pagination={{
        //   current: currentPage,
        //   total: totalCount || 0,
        //   pageSize: 5,
        // }}
        // onChange={handleTableChange}
        // loading={isFetching}
        rowKey={(record) => record.id}
        pagination={false}
        className="my-2"
      />
      {/* <AddServiceStationModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        routeStation={routeStation}
      /> */}
    </>
  );
};

export default RouteTicketTypeList;
