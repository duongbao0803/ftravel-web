import { useState } from "react";
import { Modal, Form, Input } from "antd";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";

export interface AddRouteProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddRouteModal: React.FC<AddRouteProps> = (props) => {
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      // const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          // await addNewProductItem(values);
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
      title={<p className="text-lg text-[red]">Thêm dịch vụ</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Form.Item
          name="unsignName"
          rules={[
            {
              required: true,
              message: "Please input name",
            },
            {
              min: 5,
              message: "Name must be at least 5 characters",
            },
          ]}
          colon={true}
          label="Name"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon mr-1" />}
            placeholder="Unsign name"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input typeOfProduct",
            },
          ]}
          colon={true}
          label="Name"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={
              <PhoneOutlined className="site-form-item-icon mr-1 rotate-90" />
            }
            placeholder="Name"
            maxLength={10}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRouteModal;
