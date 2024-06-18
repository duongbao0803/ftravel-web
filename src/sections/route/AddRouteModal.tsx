import { useEffect, useState } from "react";
import { Modal, Form, Select } from "antd";
import useCityService from "@/services/cityService";
import { CityInfo } from "@/types/city.types";
import useCompanyService from "@/services/companyService";
import { CompanyInfo } from "@/types/company.types";
import useRouteService from "@/services/routeService";
import useRoute from "@/hooks/useRoute";

export interface AddRouteProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddRouteModal: React.FC<AddRouteProps> = (props) => {
  const { Option } = Select;
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { cities } = useCityService();
  const { companys } = useCompanyService();
  const { addNewRouteItem } = useRouteService();
  const [form] = Form.useForm();
  // const [routeName, setRouteName] = useState<string>();
  // const [startName, setStartName] = useState<string>();
  // const [endName, setEndName] = useState<string>();
  // const [routeName, setRouteName] = useState("")

  const {startName, endName, setStartName, setEndName, setRouteName, routeName}: unknown = useRoute()
  //  routeName = `${startName} - ${endName}`

useEffect(() => {
  if (startName && endName)
  setRouteName(`${startName} - ${endName}`)
}, [startName, endName])

console.log("check route", routeName)
  
console.log("checl",routeName )

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

  const onChangeStart = (value: string) => {
    if (value !== ""){
      setStartName(value.split(";")[1]);
    }
  };

  const onChangeEnd = (value: string) => {
    if (value !== ""){
      setEndName(value.split(";")[1]);
      // generateRouteName();s
    }
  };

  // const generateRouteName = () => {
  //   console.log("check fun")
  //   if (startName && endName) {
  //     setRouteName(`${startName} - ${endName}`);
  //   }
  // }

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Modal
      title={<p className="text-lg text-[red]">Thêm tuyến đường</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
      okText="Tạo mới"
      cancelText="Hủy"
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên tuyến đường",
            },
            {
              min: 5,
              message: "Tuyến đường phải có ít nhất 5 kí tự",
            },
          ]}
          colon={true}
          label="Tuyến đường"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          {/* <Input
            value={routeName}
            prefix={<ShareAltOutlined className="site-form-item-icon mr-1" />}
            placeholder="Tên tuyến đường"
            autoFocus
          /> */}
          <p>{routeName}</p>
        </Form.Item>
        <Form.Item
          name="start-point"
          rules={[
            {
              required: true,
              message: "Hãy chọn điểm bắt đầu",
            },
          ]}
          colon={true}
          label="Điểm bắt đầu"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Select
            showSearch
            placeholder="Chọn điểm bắt đầu"
            optionFilterProp="children"
            onChange={onChangeStart}
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
          name="end-point"
          rules={[
            {
              required: true,
              message: "Hãy chọn điểm kết thúc",
            },
          ]}
          colon={true}
          label="Điểm kết thúc"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Select
            showSearch
            placeholder="Chọn điểm kết thúc"
            optionFilterProp="children"
            onChange={onChangeEnd}
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
          name="bus-company-id"
          rules={[
            {
              required: true,
              message: "Hãy chọn nhà xe",
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
              <Option
                key={index}
                value={`${company.id}`}
                label={company.name}
              >
                {`${company.name}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRouteModal;
