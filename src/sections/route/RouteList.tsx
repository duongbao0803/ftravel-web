import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Input, Modal, Table, Tag } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import {
  EnvironmentOutlined,
  FilterOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import ExportRoute from "./ExportRoute";
import AddRouteModal from "./AddRouteModal";
import useRouteService from "@/services/routeService";
import { formatDate2 } from "@/util/validate";
import { RouteInfo } from "@/types/route.types";

export interface DataType {
  id: number;
  name: string;
  "start-point": string;
  "end-point": string;
  "bus-company-name": string;
  "create-date": string | Date;
}

const RouteList: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [routeDetail, setRouteDetail] = useState<RouteInfo>();
  const { routes, totalCount, isFetching, fetchRouteDetail } =
    useRouteService();
  const [routeId, setRouteId] = useState<number>(0);
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchRouteDetail(routeId);
        if (res && res.status === 200) {
          console.log("check res", res);
          setRouteDetail(res.data);
        }
      } catch (error) {
        console.error("Error fetching route detail:", error);
      }
    };

    fetchData();
  }, [routeId]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const handleRowClick = (record: number) => {
    setRouteId(record);
  };

  const columns: TableProps<DataType>["columns"] = useMemo(
    () => [
      {
        title: "Tên tuyến xe",
        dataIndex: "name",
        width: "20%",
        className: "first-column",
        onCell: () => {
          return {
            onClick: () => {
              setIsModalOpen(true);
            },
          };
        },
      },
      {
        title: "Điểm bắt đầu",
        dataIndex: "start-point",
        width: "20%",
      },
      {
        title: "Điểm kết thúc",
        dataIndex: "end-point",
        width: "20%",
      },
      {
        title: "Tên nhà xe",
        dataIndex: "bus-company-name",
        width: "20%",
      },
      {
        title: "Ngày tạo",
        dataIndex: "create-date",
        width: "10%",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        render: (status: string) => {
          let statusText = "";
          let tagColor = "";
          switch (status) {
            case "ACTIVE":
              statusText = "HOẠT ĐỘNG";
              tagColor = "green";
              break;
            case "INACTIVE":
              statusText = "Không hoạt động";
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
            <ExportRoute />
          </div>
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <HomeOutlined className="mr-1 text-lg" /> Thêm tuyến xe
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={routes?.map(
          (record: { id: unknown; "create-date": Date | string }) => ({
            ...record,
            "create-date": formatDate2(record["create-date"]),
            key: record.id,
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
        onRow={(record) => ({
          onClick: () => handleRowClick(record.id),
        })}
      />
      <AddRouteModal setIsOpen={setIsOpen} isOpen={isOpen} />
      <Modal
        title={
          <p className="text-lg font-bold text-[red]">Chi tiết tuyến xe</p>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form name="normal_login" className="login-form" form={form}>
          <Form.Item
            name="name"
            id="formItem"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn vai trò",
              },
            ]}
            colon={true}
            label="Vai trò"
            labelCol={{ span: 24 }}
            className="formItem"
            initialValue={routeDetail?.name}
          >
            <Input
              prefix={
                <EnvironmentOutlined className="site-form-item-icon mr-1" />
              }
              className="p-2"
              readOnly
            />
          </Form.Item>
          <p>{routeDetail?.name}</p>
          <p>{routeDetail?.["start-point"]}</p>
          <p>{routeDetail?.["end-point"]}</p>
          <p>{routeDetail?.status}</p>
          <p>{routeDetail?.["bus-company-name"]}</p>
          <p>{String(routeDetail?.["create-date"])}</p>
          <p>{String(routeDetail?.["update-date"])}</p>
          <p>{String(routeDetail?.["is-deleted"])}</p>
        </Form>
      </Modal>
    </>
  );
});

export default RouteList;
