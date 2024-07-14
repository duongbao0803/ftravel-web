import React, { useCallback, useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Select, Col, Row } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { formatDate, validatePhoneNumber } from "@/util/validate";
import moment from "moment";
import { CreateRoles } from "@/enums/enums";
import useUserService from "@/services/userService";
import { UserInfo } from "@/types/auth.types";
import { UploadImage } from "@/components";

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddUserModal: React.FC<AddModalProps> = React.memo((props) => {
  const { addNewUserItem } = useUserService();
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [fileChange, setFileChange] = useState<string>("");
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ "avatar-url": fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedDate = formatDate(values.dob);
      const formatRole = +values.role;
      const updatedValues: string = JSON.stringify({
        ...values,
        dob: formattedDate,
        role: formatRole,
      });
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewUserItem(updatedValues as unknown as UserInfo);
          form.resetFields();
          setIsConfirmLoading(false);
          setIsOpen(false);
        } catch (error) {
          setIsConfirmLoading(false);
          setIsOpen(true);
        }
      }, 1500);
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  const disabledDate = (current: object) => {
    return current && current > moment().startOf("day");
  };

  const handleFileChange = useCallback((newFileChange: string) => {
    setFileChange(newFileChange);
  }, []);

  return (
    <Modal
      title={<p className="text-lg font-bold text-[red] ">Thêm người dùng</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email",
                },
                {
                  type: "email",
                  message: "Vui lòng nhập đúng địa chỉ email",
                },
              ]}
              colon={true}
              label="Email"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon mr-1" />}
                placeholder="Email"
                className="p-2"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="full-name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ và tên",
                },
              ]}
              colon={true}
              label="Họ và tên"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon mr-1" />}
                className="p-2"
                placeholder="Họ và tên"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative mt-1">
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
                  <PhoneOutlined className="site-form-item-icon mr-1 rotate-90" />
                }
                placeholder="Số điện thoại"
                className="p-2"
                maxLength={10}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="address"
              id="formItem"
              label="Địa chỉ"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={
                  <EnvironmentOutlined className="site-form-item-icon mr-1" />
                }
                placeholder="Địa chỉ"
                className="p-2"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
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
            >
              <Select placeholder="Chọn vai trò" className="h-10">
                {Object.keys(CreateRoles).map((key: string) => {
                  const roleValue =
                    CreateRoles[key as keyof typeof CreateRoles];
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
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="avatar-url"
          colon={true}
          label="Hình ảnh"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <UploadImage onFileChange={handleFileChange} initialImage={""} />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default AddUserModal;
