import React, { useCallback, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  notification,
} from "antd";
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
import { UserInfo } from "@/types/auth.types";

interface AccountInfoProps {
  fileChange: string;
}

const AccountInfo: React.FC<AccountInfoProps> = (props) => {
  const { fileChange } = props;
  const [form] = Form.useForm();
  const { userInfo, updatePersonalItem } = useAuthService();
  const { Option } = Select;
  const genderValue =
    userInfo?.gender === 0 ? "Nam" : userInfo?.gender === 1 ? "Nữ" : "Khác";

  useEffect(() => {
    const updateUserInfo = { ...userInfo };
    if (userInfo && userInfo.dob) {
      updateUserInfo.dob = dayjs(userInfo.dob);
      updateUserInfo.gender = genderValue;
    }
    form.setFieldsValue(updateUserInfo);
  }, []);

  const onFinish = useCallback(
    async (values: UserInfo) => {
      if (!fileChange) {
        notification.warning({
          message: "Chỉnh sửa không thành công",
          description: "Vui lòng chọn ảnh đại diện",
          duration: 2,
        });
        return;
      }
      if (values.gender === "Nam") {
        values.gender = 0;
      } else if (values.gender === "Nữ") {
        values.gender = 1;
      }
      if (userInfo) {
        const updateValues = {
          ...values,
          "account-id": userInfo.id,
          "avatar-url": fileChange,
        };
        await updatePersonalItem(updateValues);
      }
    },
    [fileChange, updatePersonalItem, userInfo],
  );

  const disabledDate = (current: object) => {
    return current && current > moment().startOf("day");
  };

  return (
    <>
      <Form name="normal_login" form={form} onFinish={onFinish}>
        <Row gutter={16} className="relative">
          <Col span={12}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
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
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn giới tính",
                },
              ]}
              colon={true}
              label="Giới tính"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Select placeholder="Chọn giới tính" className="h-10">
                <Option key={0} value="0">
                  Nam
                </Option>
                <Option key={1} value="1">
                  Nữ
                </Option>
                <Option key={3} value="2">
                  Khác
                </Option>
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
    </>
  );
};

export default AccountInfo;
