import React from "react";
import { Row, Col, Form, Input, Button, Select } from "antd";
import { AuditOutlined, MailOutlined } from "@ant-design/icons";
import useAuthService from "@/services/authService";
import { UserInfo } from "@/types/auth.types";
import useUserService from "@/services/userService";
import { sendNotification } from "@/types/notification.types";
import { sendNotice } from "@/api/noticeApi";

const PushNotice: React.FC = React.memo(() => {
  const [form] = Form.useForm();
  const { userInfo } = useAuthService();
  const { users } = useUserService();

  const { Option } = Select;

  const onFinish = (values: sendNotification) => {
    const id = values["user-ids"];
    const updateId = [Number(id)];
    const updateValues = { ...values, "user-ids": updateId };
    console.log("check ", updateValues);
    if (updateValues) {
      handleSendNotice(updateValues);
    }
  };

  const handleSendNotice = async (noticeInfo: sendNotification) => {
    try {
      await sendNotice(noticeInfo);
    } catch (err) {
      console.error("Err receiving notice", err);
    }
  };

  return (
    <div>
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
                {users.map((user: UserInfo, index: number) => (
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
    </div>
  );
});

export default PushNotice;
