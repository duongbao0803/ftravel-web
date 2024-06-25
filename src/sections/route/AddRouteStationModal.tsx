import { useEffect, useState } from "react";
import { Modal, Form, Select } from "antd";
import useCityService from "@/services/cityService";
import { CityInfo } from "@/types/city.types";
import useRouteService from "@/services/routeService";
import useRoute from "@/hooks/useRoute";

export interface AddRouteStationProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddRouteStationModal: React.FC<AddRouteStationProps> = (props) => {
  const { Option } = Select;
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { cities } = useCityService();
  const { addNewRouteItem } = useRouteService();
  const [form] = Form.useForm();

  const { startName, endName, setRouteName, routeName } = useRoute();

  useEffect(() => {
    if (startName && endName) setRouteName(`${startName} - ${endName}`);
  }, [startName, endName]);

  useEffect(() => {
    if (routeName) {
      form.setFieldsValue({ name: routeName });
    }
  }, [routeName, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewRouteItem(values);
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

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Modal
      title={<p className="text-lg text-[red]">Thêm trạm dừng</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
      okText="Tạo mới"
      cancelText="Hủy"
    >
      <div>
        <p>
          Tuyến đường áp dụng:{" "}
          <span className="font-bold">TP.HCM - Cần Thơ</span>
        </p>
      </div>
      <Form name="normal_login" className="login-form" form={form}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn trạm",
            },
          ]}
          colon={true}
          label="Tên trạm"
          labelCol={{ span: 24 }}
          // className="formItem"
        >
          <Select
            showSearch
            placeholder="Chọn trạm"
            optionFilterProp="children"
            filterOption={filterOption}
          >
            {cities.map((city: CityInfo, index: number) => (
              <Option
                key={index}
                value={`${city.id};${city.name}`}
                label={city.name}
              >
                {`${city.name}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn trạm",
            },
          ]}
          colon={true}
          label="Thứ tự trạm"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Select placeholder="Số thứ tự" optionFilterProp="children">
            <Option value={1}>Trạm 1</Option>
            <Option value={2}>Trạm 2</Option>
            <Option value={3}>Trạm 3</Option>
            <Option value={4}>Trạm 4</Option>
            <Option value={5}>Trạm 5</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRouteStationModal;
