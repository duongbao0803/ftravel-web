import { useCallback, useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col, DatePicker, Select } from "antd";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { FaRegAddressCard } from "react-icons/fa6";
import moment from "moment";
import { UploadImage } from "@/components";
import { UserInfo } from "@/types/auth.types";
import dayjs from "dayjs";
import useUserService from "@/services/userService";
import { convertDateFormat } from "@/util/validate";

export interface EditUserModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  userInfo: UserInfo;
}

const EditUserModal: React.FC<EditUserModalProps> = (props) => {
  const { setIsOpen, isOpen, userInfo } = props;
  const [fileChange, setFileChange] = useState<string>("");
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const { updateUserItem } = useUserService();
  const genderValue =
    userInfo?.gender === 0 ? "Nam" : userInfo?.gender === 1 ? "Nữ" : "Khác";

  useEffect(() => {
    form.setFieldsValue({ "avatar-url": fileChange });
  }, [fileChange, form]);

  useEffect(() => {
    if (isOpen) {
      const updateUserInfo = { ...userInfo };
      if (userInfo && userInfo.dob) {
        updateUserInfo.dob = dayjs(convertDateFormat(userInfo.dob));
        updateUserInfo.gender = genderValue;
      }
      form.setFieldsValue(updateUserInfo);
    }
  }, [isOpen]);

  const handleOk = useCallback(async () => {
    try {
      const values = await form.validateFields();
      if (values.gender === "Nam") {
        values.gender = 0;
      } else if (values.gender === "Nữ") {
        values.gender = 1;
      }
      const updateValues = { ...values, "account-id": userInfo.id };
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          if (userInfo && userInfo.id) {
            await updateUserItem(updateValues);
            setIsConfirmLoading(false);
            setIsOpen(false);
          } else {
            console.error("User is undefined");
          }
        } catch (error) {
          setIsConfirmLoading(false);
          setIsOpen(true);
        }
      }, 1500);
    } catch (errorInfo) {
      console.error("Validation failed:", errorInfo);
    }
  }, [form, setIsOpen, updateUserItem, userInfo]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const disabledDate = (current: object) => {
    return current && current > moment().startOf("day");
  };

  const handleFileChange = (newFileChange: string) => {
    setFileChange(newFileChange);
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Chỉnh sửa người dùng</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="full-name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên",
                },
                {
                  min: 5,
                  message: "Tên phải có ít nhất 5 kí tự",
                },
              ]}
              colon={true}
              label="Họ và tên"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon mr-1" />}
                placeholder="Họ tên"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày sinh",
                },
              ]}
              colon={true}
              label="Ngày sinh"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <DatePicker
                picker="date"
                format="DD/MM/YYYY"
                className="w-full"
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative mt-1">
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
              <Select placeholder="Chọn giới tính">
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
          <Col span={12}>
            <Form.Item
              name="phone-number"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
                },
              ]}
              colon={true}
              label="Số điện thoại"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                type="number"
                prefix={
                  <PhoneOutlined className="site-form-item-icon mr-1 rotate-90" />
                }
                placeholder="Số điện thoại"
                className="w-full"
                maxLength={10}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ",
            },
          ]}
          colon={true}
          label="Địa chỉ"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<FaRegAddressCard site-form-item-icon mr-1 />}
            placeholder="Địa chỉ"
            maxLength={10}
          />
        </Form.Item>

        <Form.Item
          name="avatar-url"
          rules={[
            {
              required: true,
              message: "Please select image",
            },
          ]}
          colon={true}
          label="Image"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <UploadImage
            onFileChange={handleFileChange}
            initialImage={userInfo?.["avatar-url"]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
