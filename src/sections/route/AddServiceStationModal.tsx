import { useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col } from "antd";
import { UploadImage } from "@/components";
import useRouteService from "@/services/routeService";
import { RouteDetailInfo, RouteStation } from "@/types/route.types";
import useServiceService from "@/services/serviceService";

export interface AddServiceStationProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  routeStation: RouteStation;
  // stationName: string;
}

const AddServiceStationModal: React.FC<AddServiceStationProps> = (props) => {
  const { setIsOpen, isOpen, routeStation } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [fileChange, setFileChange] = useState<string>("");
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { fetchRouteDetail } = useRouteService();
  const { addNewServiceItem } = useServiceService();
  const [routeDetail, setRouteDetail] = useState<RouteDetailInfo>();

  const fetchData = async (routeId: number) => {
    try {
      const res = await fetchRouteDetail(routeId);
      if (res && res.status === 200) {
        setRouteDetail(res.data);
      }
    } catch (error) {
      console.error("Error fetching route detail:", error);
    }
  };

  useEffect(() => {
    fetchData(routeStation["route-id"]);
  }, [routeStation["route-id"]]);

  useEffect(() => {
    form.setFieldsValue({ "img-url": fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const updateValues = {
        ...values,
        "route-id": routeStation["route-id"],
        "station-id": routeStation?.station?.id,
      };
      console.log("check update", updateValues);
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewServiceItem(updateValues);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (newFileChange: string) => {
    setFileChange(newFileChange);
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Thêm dịch vụ</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Row gutter={24}>
        <Col span={6}>
          <p className="mb-3 font-bold">Tuyến đường:</p>
        </Col>
        <Col span={18}>
          <p>{routeDetail?.name}</p>
        </Col>
        <Col span={6}>
          <p className="mb-3 font-bold">Trạm:</p>
        </Col>
        <Col span={18}>
          <p>{routeStation?.station?.name}</p>
        </Col>
      </Row>
      <Form name="normal_login" className="login-form" form={form}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              name="img-url"
              colon={true}
              label="Hình ảnh"
              labelCol={{ span: 24 }}
              className="formItem"
              rules={[
                {
                  required: true,
                  message: "Please choose image",
                },
              ]}
            >
              <UploadImage onFileChange={handleFileChange} initialImage={""} />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  label="Tên dịch vụ"
                  labelCol={{ span: 24 }}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên dịch vụ",
                    },
                    {
                      min: 5,
                      message: "Tên phải có ít nhất 5 kí tự",
                    },
                  ]}
                >
                  <Input autoFocus placeholder="Tên dịch vụ" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Giá mặc định (FToken)"
                  labelCol={{ span: 24 }}
                  name="default-price"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá dịch vụ",
                    },
                    {
                      min: 1,
                      max: 999,
                      message: "Giá phải trong khoảng 1 đến 999",
                    },
                  ]}
                >
                  <Input placeholder="Giá mặc định" type="number" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Mô tả"
                  labelCol={{ span: 24 }}
                  name="short-description"
                >
                  <Input placeholder="Mô tả" />
                </Form.Item>
                <Form.Item
                  label="Mô tả chi tiết"
                  labelCol={{ span: 24 }}
                  name="full-description"
                >
                  <TextArea placeholder="Mô tả" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddServiceStationModal;
