import { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { CarOutlined } from "@ant-design/icons";
import useStationService from "@/services/stationService";
import useCompanyService from "@/services/companyService";
import { CompanyInfo } from "@/types/company.types";

export interface AddStationProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddStationModal: React.FC<AddStationProps> = (props) => {
  const { Option } = Select;
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  // const [fileChange, setFileChange] = useState<string>("");
  const { addNewStationItem } = useStationService();
  const { companys } = useCompanyService();
  const [form] = Form.useForm();

  // useEffect(() => {
  //   form.setFieldsValue({ "img-url": fileChange });
  // }, [fileChange, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewStationItem(values);
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

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // const handleFileChange = useCallback((newFileChange: string) => {
  //   setFileChange(newFileChange);
  // }, []);

  return (
    <Modal
      title={<p className="text-lg font-bold text-[red]">Thêm trạm mới</p>}
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
              message: "Vui lòng nhập tên trạm",
            },
          ]}
          colon={true}
          label="Tên trạm"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<CarOutlined className="site-form-item-icon mr-1" />}
            placeholder="Tên trạm"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="bus-company-id"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn nhà xe",
            },
          ]}
          colon={true}
          label="Nhà xe"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Select
            showSearch
            placeholder="Chọn nhà xe"
            optionFilterProp="children"
            filterOption={filterOption}
          >
            {companys.map((company: CompanyInfo, index: number) => (
              <Option key={index} value={`${company.id}`} label={company.name}>
                {`${company.name}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddStationModal;
