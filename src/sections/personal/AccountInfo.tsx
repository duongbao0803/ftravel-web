import React from "react";
import { Row, Col, Form, Input, Button, DatePicker, Select } from "antd";
import {
  AuditOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { validatePhoneNumber } from "@/util/validate";
import moment from "moment";
import { genders } from "@/constants";

const AccountInfo: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    console.log("hihi");
  };

  const disabledDate = (current: object) => {
    return current && current > moment().startOf("day");
  };

  return (
    <div>
      <Form name="normal_login" form={form} onFinish={onFinish}>
        <Row gutter={16} className="relative">
          <Col span={12}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email của bạn",
                },
                {
                  min: 8,
                  message: "Tên phải có ít nhất 8 ký tự",
                },
              ]}
              colon={true}
              label="Email"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email của bạn"
                className="p-2"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên của bạn",
                },
                {
                  min: 8,
                  message: "Tên phải có ít nhất 8 ký tự",
                },
              ]}
              colon={true}
              label="Họ và tên"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<AuditOutlined className="site-form-item-icon" />}
                placeholder="Họ và tên"
                className="p-2"
                autoFocus
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative">
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              id="formItem"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
                },
                { validator: validatePhoneNumber },
              ]}
              label="Số điện thoại"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={
                  <PhoneOutlined className="site-form-item-icon rotate-90" />
                }
                placeholder="Số điện thoại"
                className="p-2"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              id="formItem"
              name="dob"
              colon={true}
              label="Ngày sinh"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <DatePicker
                picker="date"
                disabledDate={disabledDate}
                format="YYYY-MM-DD"
                className="formItem w-full p-2"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative">
          <Col span={12}>
            <Form.Item
              name="address"
              id="formItem"
              // rules={[
              //   {
              //     required: true,
              //     message: "Vui lòng nhập địa chỉ",
              //   },
              // ]}
              label="Địa chỉ"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                placeholder="Địa chỉ"
                className="p-2"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gender"
              // rules={[
              //   {
              //     required: true,
              //     message: "Vui lòng chọn giới tính",
              //   },
              // ]}
              colon={true}
              label="Giới tính"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Select placeholder="Chọn giới tính">
                {genders.map((gender) => (
                  <Select.Option key={gender} value={gender}>
                    {gender}
                  </Select.Option>
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
            Cập nhật thông tin
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountInfo;
