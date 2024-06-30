import useTripService from "@/services/tripService";
import { TicketTripInfo } from "@/types/ticket.types";
import { Table, TableProps } from "antd";
import React, { useEffect, useState } from "react";

export interface TripTicketListProps {
  tripId: number;
}

const TripTicketList: React.FC<TripTicketListProps> = React.memo((props) => {
  const { tripId } = props;

  const [tripTickets, setTripTickets] = useState<TicketTripInfo[]>();

  const { fetchTripDetail } = useTripService();

  const fetchData = async (routeId: number) => {
    try {
      const res = await fetchTripDetail(routeId);
      if (res && res.status === 200) {
        setTripTickets(res.data.tickets);
      }
    } catch (error) {
      console.error("Error fetching station detail:", error);
    }
  };

  useEffect(() => {
    fetchData(tripId);
  },[tripId]);

  const columns: TableProps<TicketTripInfo>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, _record, index) => index + 1,
      width: "10%",
    },
    {
      title: "Ghế ngồi",
      dataIndex: "seat-code",
      width: "10%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "20%",
    },
    {
      title: "Loại vé",
      dataIndex: "ticket-type-name",
      width: "35%",
    },
    // {
    //   title: "",
    //   dataIndex: "",
    //   render: (_, record) => (
    //     <>
    //       {" "}
    //       <DropdownServiceFunc
    //         serviceDetail={record}
    //         routeStation={routeStation}
    //       />{" "}
    //     </>
    //   ),
    // },
  ];

  return (

    <>
        <div className="my-2 flex justify-between">
          <div className="flex gap-x-2">
            <p className="font-bold">Danh sách vé</p>
          </div>
          <div className="flex gap-x-2">
            {/* <div>
            <ExportService />
          </div> */}
            {/* <div>
              <Button type="primary" onClick={() => setIsOpen(true)}>
                <div className="flex justify-center">
                  <PlusCircleOutlined className="mr-1 text-lg" /> Thêm dịch vụ
                </div>
              </Button>
            </div> */}
          </div>
        </div>
        <Table
          id="myTable"
          columns={columns}
          dataSource={
            tripTickets &&
            tripTickets?.map((record: TicketTripInfo) => ({
              ...record,
              key: record.id,
            }))
          }
        //   onChange={handleTableChange}
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
});

export default TripTicketList;
