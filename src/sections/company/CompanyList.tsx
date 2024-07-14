import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Table,
  Tag,
} from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import {
  EnvironmentOutlined,
  FilterOutlined,
  MailOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import ExportCompany from "./ExportCompany";
import AddCompanyModal from "./AddCompanyModal";
import useCompanyService from "@/services/companyService";
import { formatDate2 } from "@/util/validate";
import { CompanyInfo } from "@/types/company.types";
import dayjs from "dayjs";
import { renderStatusTag } from "@/util/renderStatusTag";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export interface DataType {
  id: number;
  // key: string;
  // name: string;
  // image: string;
  // description: string;
  // quantity: number;
  // typeOfProduct: string;
  // price: number;
  // rating: number;
}

const CompanyList: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { companys, totalCount, isFetching, fetchCompanyDetail } =
    useCompanyService();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [companyDetail, setCompanyDetail] = useState<CompanyInfo>();
  const { TextArea } = Input;
  const { statusText, tagColor } =
    companyDetail && !companyDetail?.["is-deleted"]
      ? renderStatusTag(!companyDetail?.["is-deleted"])
      : { statusText: <Skeleton count={1} width={90} />, tagColor: "" };
  const [form] = Form.useForm();

  const fetchData = async (companyId: number) => {
    try {
      const res = await fetchCompanyDetail(companyId);
      if (res && res.status === 200) {
        setCompanyDetail(res.data);
      }
    } catch (error) {
      console.error("Error fetching route detail:", error);
    }
  };

  const handleTableChange = useCallback((pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  }, []);

  const handleRowClick = async (record: number) => {
    setCompanyDetail(undefined);
    await fetchData(record);
  };

  const columns: TableProps<DataType>["columns"] = useMemo(
    () => [
      {
        title: "STT",
        dataIndex: "index",
        key: "index",
        render: (_, _record, index) => index + 1,
      },
      {
        title: "Tên nhà xe",
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
        title: "Hình ảnh",
        dataIndex: "img-url",
        width: "15%",
        render: (image) => (
          <Image
            src={image}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
          />
        ),
      },
      {
        title: "Email quản lý",
        dataIndex: "manager-email",
        width: "25%",
      },
      {
        title: "Mô tả ngắn gọn",
        dataIndex: "short-description",
        width: "17%",
      },
      {
        title: "Ngày tạo",
        dataIndex: "create-date",
        width: "13%",
      },
      {
        title: "Trạng thái",
        dataIndex: "is-deleted",
        render: (isDeleted) => {
          let statusText = "";
          let tagColor = "";
          switch (isDeleted) {
            case false:
              statusText = "ACTIVE";
              tagColor = "green";
              break;
            case true:
              statusText = "INACTIVE";
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
            <ExportCompany />
          </div>
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <PlusCircleOutlined className="mr-1 text-lg" />
                Thêm nhà xe
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={companys?.map(
          (record: { id: unknown; "create-date": string | Date }) => ({
            ...record,
            key: record.id,
            "create-date": formatDate2(record["create-date"]),
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
      <AddCompanyModal setIsOpen={setIsOpen} isOpen={isOpen} />
      <Modal
        title={
          <p className="text-lg font-bold text-[red]">
            Chi tiết nhà xe &nbsp;
            {!companyDetail?.["is-deleted"] && (
              <Tag color={tagColor}>{statusText}</Tag>
            )}
          </p>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {companyDetail ? (
          <Form name="normal_login" className="login-form" form={form}>
            <Row gutter={16} className="relative mt-1">
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
                    defaultValue={companyDetail?.name}
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email quản lý"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <MailOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={companyDetail?.["manager-email"]}
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
                    defaultValue={dayjs(companyDetail["create-date"])}
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
                    defaultValue={dayjs(companyDetail["update-date"])}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Mô tả ngắn gọn"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={
                  <EnvironmentOutlined className="site-form-item-icon mr-1" />
                }
                className="p-2"
                defaultValue={companyDetail?.["short-description"]}
                readOnly
              />
            </Form.Item>
            <Form.Item
              name="full-description"
              rules={[
                {
                  required: true,
                },
              ]}
              colon={true}
              label="Mô tả chi tiết"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <TextArea
                showCount
                placeholder="Mô tả chi tiết"
                defaultValue={companyDetail?.["full-description"]}
              />
            </Form.Item>

            <Image
              src={companyDetail["img-url"]}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
          </Form>
        ) : (
          <>
            <Skeleton count={1} width={100} className="mb-2" />
            <Skeleton count={10} className="mb-2" />
            <Skeleton count={1} width={100} className="mb-2" />
            <Skeleton count={10} className="mb-2" />
          </>
        )}
      </Modal>
    </>
  );
};

export default CompanyList;
