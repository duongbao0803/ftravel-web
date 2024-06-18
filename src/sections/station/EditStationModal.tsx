import { useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col } from "antd";
import {
  EnvironmentOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { CommonStatusString } from "@/enums/enums";
import { StationDetailInfo } from "@/types/station.types";

export interface EditStationModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  stationInfo: StationDetailInfo;
}

const EditStationModal: React.FC<EditStationModalProps> = (props) => {
  const { setIsOpen, isOpen, stationInfo } = props;
  const [fileChange] = useState<string>("");
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  // useEffect(() => {
  //   if (isOpen) {
  //     form.setFieldsValue(productInfo);
  //   }
  // }, [isOpen]);

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      // const values = await form.validateFields();

      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          // if (productInfo && productInfo._id) {
          //   await updateProductItem(productInfo._id, values);
          //   setIsConfirmLoading(false);
          //   setIsOpen(false);
          // } else {
          //   console.error("User is undefined");
          // }
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

  const getStatusText = (status: string) => {
    if (status === CommonStatusString.ACTIVE) {
      return "HOẠT ĐỘNG";
    } else if (status === CommonStatusString.INACTIVE) {
      return "TẠM DỪNG";
    }
    return "KHÔNG XÁC ĐỊNH";
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Chỉnh sửa trạm</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form">
            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  label="Tên trạm"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <EnvironmentOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={stationInfo?.name}
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Nhà xe quản lí"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <CarOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={stationInfo?.["bus-company"]?.name}
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  label="Trạng thái"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <EnvironmentOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={getStatusText(stationInfo?.status)}
                    readOnly
                  />
                  {/* <Select
                    placeholder="Trạng thái"
                    defaultValue={stationDetail?.status}
                  >
                    {Object.keys(CommonStatus).map((key: string) => {
                      const roleValue =
                        CommonStatus[key as keyof typeof CommonStatus];
                      if (typeof roleValue === "number") {
                        return (
                          <Select.Option
                            key={roleValue}
                            value={roleValue.toString()}
                          >
                            {key}
                          </Select.Option>
                        );
                      }
                      return null;
                    })}
                  </Select> */}
                </Form.Item>
              </Col>
            </Row>
          </Form>
    </Modal>
  );
};

export default EditStationModal;
