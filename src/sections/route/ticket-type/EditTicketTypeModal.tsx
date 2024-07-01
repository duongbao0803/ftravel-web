import { useEffect, useState } from "react";
import { Modal, Form, InputNumber, Select } from "antd";
import { TicketTypeInfo } from "@/types/ticket.types";
import useTicketService from "@/services/ticketService";

export interface EditTicketTypeModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  ticketTypeInfo: TicketTypeInfo;
}

const EditTicketTypeModal: React.FC<EditTicketTypeModalProps> = (props) => {
  const { setIsOpen, isOpen, ticketTypeInfo } = props;
  const { Option } = Select;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { updateTicketTypeItem } = useTicketService();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(ticketTypeInfo);
    }
  }, [isOpen]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const updateValues = {...values, "route-id": ticketTypeInfo["route-id"] }
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await updateTicketTypeItem(ticketTypeInfo.id, updateValues);
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

  // const handleFileChange = (newFileChange: string) => {
  //   setFileChange(newFileChange);
  // };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Chỉnh sửa loại vé</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
      okText="Cập nhật loại vé"
      cancelText="Hủy"
    >
      <Form name="normal_login" className="login-form" form={form}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại vé",
              },
            ]}
            colon={true}
            label="Loại vé"
            labelCol={{ span: 24 }}
            className="formItem"
          >
            <Select placeholder="Loại vé" optionFilterProp="children">
              <Option value="Normal">Vé thường</Option>
              <Option value="VIP">Vé VIP</Option>
              <Option value="SVIP">Vé SVIP</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn giá vé",
              },
            ]}
            colon={true}
            label="Giá vé (FToken)"
            labelCol={{ span: 24 }}
            className="formItem"
            initialValue={ticketTypeInfo.price}
          >
            <InputNumber className="w-full" type="number" min={10} max={10000} />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default EditTicketTypeModal;
