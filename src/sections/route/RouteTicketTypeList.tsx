import { TicketTypeInfo } from "@/types/ticket.types";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table, TableProps } from "antd";
import React, { useState } from "react";

export interface RouteTicketTypeListProps {
  routeId: number;
}

const RouteTicketTypeList: React.FC<RouteTicketTypeListProps> = (props) => {
  const { routeId } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      width: "20%",
    },
    {
      title: "Giá bán (FToken)",
      dataIndex: "price",
      width: "30%",
      className: "first-column",
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
        // dataSource={
        //   data &&
        //   data.data?.map((record: TicketTypeInfo) => ({
        //     ...record,
        //     key: record.id,
        //   }))
        // }
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
