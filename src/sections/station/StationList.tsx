import React, { useMemo, useState } from "react";
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
import { CarOutlined, EnvironmentOutlined, FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
// import ExportRoute from "./ExportRoute";
// import AddRouteModal from "./AddRouteModal";
import { formatDate2 } from "@/util/validate";
import dayjs from "dayjs";
import { renderStatusTag } from "@/util/renderStatusTag";
import useStationService from "@/services/stationService";
import { StationDetailInfo } from "@/types/station.types";
import { CommonStatusString } from "@/enums/enums";
import AddStationModal from "./AddStationModal";
import DropdownStationFunc from "./DropdownStationFunc";

const StationList: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [stationDetail, setStationDetail] = useState<StationDetailInfo>();
  const { stations, totalCount, isFetching, fetchStationDetail } =
    useStationService();
  // const [stationId, setStationId] = useState<number>(0);
  const { statusText, tagColor } =
    stationDetail && stationDetail.status
      ? renderStatusTag(stationDetail.status)
      : { statusText: "UNKNOWN", tagColor: "gray" };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchData = async (stationId: number) => {
    try {
      const res = await fetchStationDetail(stationId);
      if (res && res.status === 200) {
        setStationDetail(res.data);
      }
    } catch (error) {
      console.error("Error fetching station detail:", error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [stationId]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const handleRowClick = async (record: number) => {
    setStationDetail(undefined);
    await fetchData(record);
  };

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
        onCell: () => {
          return {
            onClick: () => {
              setIsModalOpen(true);
            },
          };
        },
      },
      {
        title: "Tên nhà xe",
        dataIndex: "bus-company-name",
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
        render: (_, record) => (
          <>
            <DropdownStationFunc stationInfo={record} />
          </>
        ),
      }
    ],
    [],
  );

  const getStatusText = (status: string) => {
    if (status === CommonStatusString.ACTIVE) {
      return "HOẠT ĐỘNG";
    } else if (status === CommonStatusString.INACTIVE) {
      return "TẠM DỪNG";
    }
    return "KHÔNG XÁC ĐỊNH";
  };

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
          {/* <div>
            <ExportRoute />
          </div> */}
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <PlusCircleOutlined className="mr-1 text-lg" /> Thêm trạm
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={stations?.map(
          (record: {
            id: unknown;
            "create-date": Date | string;
            "update-date": Date | string;
          }) => ({
            ...record,
            key: record.id,
            "create-date": record["create-date"]
              ? formatDate2(record["create-date"])
              : "N/A",
            "update-date": record["update-date"]
              ? formatDate2(record["update-date"])
              : "N/A",
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
      <AddStationModal setIsOpen={setIsOpen} isOpen={isOpen} />
      <Modal
        title={
          <p className="text-lg font-bold text-[red]">
            Chi tiết trạm &nbsp;
            {stationDetail?.status && <Tag color={tagColor}>{statusText}</Tag>}
          </p>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {stationDetail ? (
          <Form name="normal_login" className="login-form">
            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  label="Tên trạm"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <EnvironmentOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={stationDetail?.name}
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Nhà xe quản lí"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <CarOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={stationDetail?.["bus-company"].name}
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  label="Trạng thái"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <EnvironmentOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={getStatusText(stationDetail?.status)}
                    readOnly
                  />
                  {/* <Select
                    placeholder="Trạng thái"
                    defaultValue={stationDetail?.status}
                  >
                    {Object.keys(CommonStatus).map((key: string) => {
                      const roleValue =
                        CommonStatus[key as keyof typeof CommonStatus];
                      if (typeof roleValue === "number") {
                        return (
                          <Select.Option
                            key={roleValue}
                            value={roleValue.toString()}
                          >
                            {key}
                          </Select.Option>
                        );
                      }
                      return null;
                    })}
                  </Select> */}
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
                    defaultValue={dayjs(stationDetail["create-date"])}
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
                    defaultValue={dayjs(stationDetail["update-date"])}
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
};

export default StationList;
