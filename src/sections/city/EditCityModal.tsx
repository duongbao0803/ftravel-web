import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Switch } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useCityService from "@/services/cityService";
import { CityInfo } from "@/types/city.types";

export interface EditCityModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  cityId: number;
  cityInfo: CityInfo;
}

const EditCityModal: React.FC<EditCityModalProps> = (props) => {
  const { setIsOpen, isOpen, cityId, cityInfo } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { updateCityItem } = useCityService();
  const [isActive, setIsActive] = useState<boolean>(!cityInfo["is-deleted"]);
  const [form] = Form.useForm();

  const handleStatusChange = (newStatus: boolean) => {
    setIsActive(newStatus);
  };

  useEffect(() => {
    if (isOpen && cityInfo) {
      form.setFieldsValue({
        name: cityInfo.name,
        "is-deleted": cityInfo["is-deleted"],
      });
      setIsActive(!cityInfo["is-deleted"]);
    }
  }, [isOpen, cityInfo, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const updatedValues = {
        ...values,
        id: cityId,
        "is-deleted": !isActive,
      };
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await updateCityItem(updatedValues as unknown as CityInfo);
          setIsConfirmLoading(false);
          setIsOpen(false);
        } catch (error) {
          setIsConfirmLoading(false);
          setIsOpen(true);
        }
      }, 1500);
    } catch (errorInfo) {
      console.error("Validation failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  // const handleFileChange = (newFileChange: string) => {
  //   setFileChange(newFileChange);
  // };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Chỉnh sửa thành phố</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên thành phố",
            },
          ]}
          colon={true}
          label="Tên thành phố"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon mr-1" />}
            placeholder="Tên thành phố"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="is-deleted"
          colon={true}
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Switch
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            onChange={handleStatusChange}
            checked={isActive}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCityModal;
