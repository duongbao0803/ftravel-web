import { useState } from "react";
import { Modal, Form, Input } from "antd";
import { PushpinOutlined } from "@ant-design/icons";
import useCityService from "@/services/cityService";

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddCityModal: React.FC<AddModalProps> = (props) => {
  const { setIsOpen, isOpen } = props;
  const { addNewCityItem } = useCityService();
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewCityItem(values);
          form.resetFields();
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
    form.resetFields();
  };

  return (
    <Modal
      title={<p className="text-lg font-bold text-[red]">Thêm thành phố</p>}
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
            prefix={<PushpinOutlined className="site-form-item-icon mr-1" />}
            placeholder="Tên thành phố"
            autoFocus
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCityModal;
