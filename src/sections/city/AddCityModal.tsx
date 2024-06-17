import { useState } from "react";
import { Modal, Form, Select } from "antd";
import useCityService from "@/services/cityService";
import { cityData } from "@/constants/cityData";
import { CreateCity } from "@/types/city.types";

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddCityModal: React.FC<AddModalProps> = (props) => {
  const { Option } = Select;
  const { setIsOpen, isOpen } = props;
  const { addNewCityItem } = useCityService();
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      const [cityCode, cityName] = values.name.split(';');
      const updateValues = {
        code: cityCode, 
        name: cityName
      }
      console.log("check value", updateValues);
      
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewCityItem(updateValues as unknown as CreateCity);
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

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
          <Select
            showSearch
            placeholder="Chọn thành phố"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
          >
            {cityData.map((city, index) => (
              <Option
                key={index}
                value={`${city.code};${city.name}`}
                label={city.name}
              >
                {`${city.code} - ${city.name}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCityModal;
