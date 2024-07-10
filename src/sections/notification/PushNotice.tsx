import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  TableProps,
  Table,
  TablePaginationConfig,
} from "antd";
import { AuditOutlined, MailOutlined } from "@ant-design/icons";
import useAuthService from "@/services/authService";
import { UserInfoDetail } from "@/types/auth.types";
import useUserService from "@/services/userService";
import { sendNotification } from "@/types/notification.types";
import useNoticeService from "@/services/notificationService";
import { formatDate4 } from "@/util/validate";

export interface DataType {
  id: number;
  "user-id": number;
  title: string;
  message: string;
  "create-date": string | Date;
  "update-date"?: string | Date;
}

const PushNotice: React.FC = React.memo(() => {
  const [form] = Form.useForm();
  const { userInfo } = useAuthService();
  const { users } = useUserService();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { isFetching, addNewNoticeItem, refetch, noticeData } =
    useNoticeService(currentPage);
  const notices = noticeData?.data;
  const totalCount = noticeData?.totalCount;

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const { Option } = Select;

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      width: "25%",
    },
    {
      title: "Lời nhắn",
      dataIndex: "message",
      width: "35%",
    },
    {
      title: "Ngày tạo",
      dataIndex: "create-date",
      width: "25%",
    },
    {
      title: "Ngày thay đổi",
      dataIndex: "update-date",
      width: "25%",
    },
  ];

  const onFinish = (values: sendNotification) => {
    const id = values["user-ids"];
    const updateId = [Number(id)];
    const updateValues = { ...values, "user-ids": updateId };
    if (updateValues) {
      handleSendNotice(updateValues);
    }
  };

  const handleSendNotice = async (noticeInfo: sendNotification) => {
    try {
      await addNewNoticeItem(noticeInfo);
    } catch (err) {
      console.error("Err receiving notice", err);
    }
  };

  return (
    <>
      <Form name="normal_login" form={form} onFinish={onFinish}>
        <Row gutter={16} className="relative">
          <Col span={12}>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                },
              ]}
              colon={true}
              label="Tiêu đề"
              labelCol={{ span: 24 }}
              className="formItem"
              initialValue={userInfo?.email}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Nhập tiêu đề"
                className="p-2"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="message"
              rules={[
                {
                  required: true,
                  message: "Vui lòng lời nhắn",
                },
              ]}
              colon={true}
              label="Lời nhắn"
              labelCol={{ span: 24 }}
              className="formItem"
              initialValue={userInfo?.["full-name"]}
            >
              <Input
                prefix={<AuditOutlined className="site-form-item-icon" />}
                placeholder="Họ và tên"
                className="p-2"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative">
          <Col span={12}>
            <Form.Item
              name="user-ids"
              rules={[
                {
                  required: true,
                },
              ]}
              colon={true}
              label="Danh sách người dùng"
              labelCol={{ span: 24 }}
              className="formItem"
              initialValue={userInfo?.email}
            >
              <Select
                showSearch
                placeholder="Chọn nhà xe"
                optionFilterProp="children"
              >
                {users.map((user: UserInfoDetail, index: number) => (
                  <Option key={index} value={`${user.id}`} label={user.email}>
                    {`${user.email}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item id="form-button">
          <Button
            type="primary"
            htmlType="submit"
            className="text-md mt-2 block tracking-wider"
          >
            Gửi thông báo
          </Button>
        </Form.Item>
      </Form>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={notices?.map(
          (record: {
            id: unknown;
            "create-date": string | Date;
            "update-date": string | Date;
          }) => ({
            ...record,
            key: record.id,
            "create-date": record["create-date"]
              ? formatDate4(record["create-date"])
              : "N/A",
            "update-date": record["update-date"]
              ? formatDate4(record["update-date"])
              : "N/A",
          }),
        )}
        pagination={{
          current: currentPage,
          total: totalCount,
          pageSize: 50,
        }}
        onChange={handleTableChange}
        loading={isFetching}
        rowKey={(record) => record.id}
      />
    </>
  );
});

export default PushNotice;
