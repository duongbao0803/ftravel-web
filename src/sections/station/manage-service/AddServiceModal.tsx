import { useCallback, useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col } from "antd";
import { UploadImage } from "@/components";
import useRouteService from "@/services/routeService";
import { RouteDetailInfo } from "@/types/route.types";

export interface AddServiceProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  routeId: number;
}

const AddServiceModal: React.FC<AddServiceProps> = (props) => {
  const { setIsOpen, isOpen, routeId } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [fileChange, setFileChange] = useState<string>("");
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const {fetchRouteDetail} = useRouteService();
  const [routeDetail, setRouteDetail] = useState<RouteDetailInfo>();

  const fetchRouteDetailData = async (routeId: number) => {
    try {
      const res = await fetchRouteDetail(routeId);
      if (res && res.status === 200) {
        setRouteDetail(res.data);
      }
    } catch (error) {
      console.error("Error fetching station detail:", error);
    }
  };

  useEffect(() => {
    fetchRouteDetailData(routeId);
  }, [routeId])

  useEffect(() => {
    form.setFieldsValue({ "img-url": fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const updateValues = {
        ...values,
        "route-id": routeDetail?.id
      }
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

  const handleFileChange = useCallback((newFileChange: string) => {
    setFileChange(newFileChange);
  }, []);

  return (
    <Modal
      title={<p className="text-lg text-[red]">Thêm dịch vụ</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên dịch vụ",
                },
                {
                  min: 5,
                  message: "Tên dịch vụ phải có ít nhất 5 kí tự",
                },
              ]}
              colon={true}
              label="Dịch vụ"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                // prefix={<UserOutlined className="site-form-item-icon mr-1" />}
                placeholder="Tên dịch vụ"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="default-price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá cho dịch vụ",
                },
              ]}
              colon={true}
              label="Giá mặc định (FToken)"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                type="number"
                placeholder="Giá dịch vụ"
                // prefix={
                //   <PhoneOutlined className="site-form-item-icon mr-1 rotate-90" />
                // }
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="short-description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả cho dịch vụ",
            },
          ]}
          colon={true}
          label="Mô tả"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            placeholder="Mô tả"
            // prefix={
            //   <PhoneOutlined className="site-form-item-icon mr-1 rotate-90" />
            // }
          />
        </Form.Item>
        <Form.Item
          name="full-description"
          colon={true}
          label="Mô tả chi tiết"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <TextArea showCount placeholder="Mô tả chi tiết" />
        </Form.Item>
        <Form.Item
          name="img-url"
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

export default AddServiceModal;
