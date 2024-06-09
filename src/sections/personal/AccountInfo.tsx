import React, { useState } from "react";
import { Row, Col, Form, Input, Button, DatePicker, Select } from "antd";
import {
  AuditOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { validatePhoneNumber } from "@/util/validate";
import moment from "moment";
import useAuthService from "@/services/authService";
import dayjs from "dayjs";
import { Gender } from "@/enums/enums";
import { UserInfo } from "@/types/auth.types";

const AccountInfo: React.FC = () => {
  const [form] = Form.useForm();
  const { userInfo } = useAuthService();
  const [, setValues] = useState<UserInfo>({
    address: "",
    "avatar-url": "",
    dob: "",
    email: "",
    gender: 0,
    "phone-number": "",
    "full-name": "",
  });

  const onFinish = (values: UserInfo) => {
    setValues(values);
    console.log("check values", values);
    // if (values?.email && values?.password) {
    //   handleSignin(values);
    // }
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
              colon={true}
              label="Email"
              labelCol={{ span: 24 }}
              className="formItem"
              initialValue={userInfo?.email}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email của bạn"
                className="p-2"
                readOnly
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="full-name"
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
              initialValue={userInfo?.["full-name"]}
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
              name="phone-number"
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
              initialValue={userInfo?.["phone-number"]}
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
                format="DD/MM/YYYY"
                className="formItem w-full p-2"
                defaultValue={dayjs(userInfo?.dob)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative">
          <Col span={12}>
            <Form.Item
              name="address"
              id="formItem"
              label="Địa chỉ"
              labelCol={{ span: 24 }}
              className="formItem"
              initialValue={userInfo?.address}
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
              <Select
                placeholder="Chọn giới tính"
                onChange={(value) => console.log("check key", value)}
              >
                {Object.keys(Gender).map((key: string) => {
                  const genderValue = Gender[key as keyof typeof Gender];
                  if (typeof genderValue === "number") {
                    return (
                      <Select.Option
                        key={genderValue}
                        value={genderValue.toString()}
                      >
                        {key}
                      </Select.Option>
                    );
                  }
                  return null;
                })}
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
