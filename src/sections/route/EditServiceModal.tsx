import { useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col } from "antd";
import { UploadImage } from "@/components";
import { ServiceDetail } from "@/types/service.types";
import useServiceService from "@/services/serviceService";
import { RouteStation } from "@/types/route.types";

export interface AddServiceStationProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  serviceDetail: ServiceDetail;
  routeStation: RouteStation;
  // stationName: string;
}

const EditServiceModal: React.FC<AddServiceStationProps> = (props) => {
  const { setIsOpen, isOpen, serviceDetail, routeStation } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { updateServiceItem } = useServiceService();
  const [fileChange, setFileChange] = useState<string>("");
  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(serviceDetail);
    }
  }, [isOpen]);

  useEffect(() => {
    form.setFieldsValue({ "img-url": fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const updateValues = {
        ...values,
        "station-id": routeStation["station-id"],
      };
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await updateServiceItem(serviceDetail.id, updateValues);
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
      title={<p className="text-lg text-[red] ">Chỉnh sửa dịch vụ</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
      okText="Cập nhật"
      cancelText="Hủy"
    >
      <Row gutter={24}>
        <Col span={6}>
          <p className="mb-3 font-bold">Tuyến đường:</p>
        </Col>
        <Col span={18}>
          <p>{serviceDetail?.["route-name"]}</p>
        </Col>
        <Col span={6}>
          <p className="mb-3 font-bold">Trạm:</p>
        </Col>
        <Col span={18}>
          <p>{serviceDetail?.["station-name"]}</p>
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
              <UploadImage
                onFileChange={handleFileChange}
                initialImage={serviceDetail["img-url"]}
              />
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
                  label={
                    <span>
                      Giá mặc định (FToken) <br />{" "}
                      <span className="italic text-[#757575]">
                        (1 FToken = 1.000 VNĐ)
                      </span>
                    </span>
                  }
                  labelCol={{ span: 24 }}
                  name="default-price"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá dịch vụ",
                    },
                    {
                      type: "number",
                      min: 1,
                      max: 100,
                      message: "Giá phải trong khoảng 1 đến 999",
                    },
                  ]}
                >
                  <Input
                    placeholder="Giá mặc định"
                    type="number"
                    min={1}
                    max={999}
                  />
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

export default EditServiceModal;
