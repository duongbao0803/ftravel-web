import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Skeleton,
  Table,
  Tag,
} from "antd";
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
import dayjs from "dayjs";
import { renderStatusTag } from "@/util/renderStatusTag";

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
  const { statusText, tagColor } =
    routeDetail && routeDetail.status
      ? renderStatusTag(routeDetail.status)
      : { statusText: "UNKNOWN", tagColor: "gray" };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchRouteDetail(routeId);
        if (res && res.status === 200) {
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
              statusText = "ĐANG HOẠT ĐỘNG";
              tagColor = "green";
              break;
            case "INACTIVE":
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
          <p className="text-lg font-bold text-[red]">
            Chi tiết tuyến xe &nbsp;
            {routeDetail?.status && <Tag color={tagColor}>{statusText}</Tag>}
          </p>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {routeDetail ? (
          <Form name="normal_login" className="login-form">
            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  label="Tuyến xe"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <EnvironmentOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={routeDetail?.name}
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tên nhà xe"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <EnvironmentOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={routeDetail?.["bus-company-name"]}
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  label="Điểm bắt đầu"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <EnvironmentOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={routeDetail?.["start-point"]}
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Điếm kết thúc"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <EnvironmentOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={routeDetail?.["end-point"]}
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  label="Ngày tạo"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <DatePicker
                    picker="date"
                    format="DD/MM/YYYY"
                    className="formItem w-full p-2"
                    defaultValue={dayjs(routeDetail["create-date"])}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Ngày chỉnh sửa"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <DatePicker
                    picker="date"
                    format="DD/MM/YYYY"
                    className="formItem w-full p-2"
                    defaultValue={dayjs(routeDetail["update-date"])}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        ) : (
          <>
            <Skeleton active className="mb-5" />
            <Skeleton active />
          </>
        )}
      </Modal>
    </>
  );
});

export default RouteList;
