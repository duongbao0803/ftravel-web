import { useCallback, useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col } from "antd";
import {
  UserOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import useCompanyService from "@/services/companyService";
import { UploadImage } from "@/components";

export interface AddCompanyProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddCompanyModal: React.FC<AddCompanyProps> = (props) => {
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [fileChange, setFileChange] = useState<string>("");
  const { addNewCompanyItem } = useCompanyService();
  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    form.setFieldsValue({ "img-url": fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewCompanyItem(values);
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
  };

  const handleFileChange = useCallback((newFileChange: string) => {
    setFileChange(newFileChange);
  }, []);

  return (
    <Modal
      title={<p className="text-lg font-bold text-[red]">Thêm công ty</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên nhà xe",
                },
              ]}
              colon={true}
              label="Tên nhà xe"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon mr-1" />}
                placeholder="Tên nhà xe"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="manager-email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email quản lý",
                },
              ]}
              colon={true}
              label="Email quản lý"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon mr-1" />}
                placeholder="Email quản lý"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="short-description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ngắn gọn thông tin mô tả",
            },
          ]}
          colon={true}
          label="Mô tả ngắn gọn"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<ContainerOutlined className="site-form-item-icon mr-1" />}
            placeholder="Mô tả ngắn gọn"
          />
        </Form.Item>

        <Form.Item
          name="full-description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập chi tiết thông tin mô tả",
            },
          ]}
          colon={true}
          label="Mô tả chi tiết"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <TextArea showCount placeholder="Mô tả chi tiết" />
        </Form.Item>
        <Form.Item
          name="img-url"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn hỉnh ảnh",
            },
          ]}
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
};

export default AddCompanyModal;
