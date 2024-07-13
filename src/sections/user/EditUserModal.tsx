import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Select,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { FaRegAddressCard } from "react-icons/fa6";
import moment from "moment";
import { UploadImage } from "@/components";
import { UserInfo } from "@/types/auth.types";
import dayjs from "dayjs";
import useUserService from "@/services/userService";

export interface EditUserModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  userInfo: UserInfo
}

const EditUserModal: React.FC<EditUserModalProps> = (props) => {
  const { setIsOpen, isOpen, userInfo } = props;
  const [fileChange, setFileChange] = useState<string>("");
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const [userData, setUserData] = useState<UserInfo>();
  const { getUserDetail } = useUserService();

  useEffect(() => {
    fetchUserData();
    if (isOpen) {
      const updateUserInfo = {...userData}
      if (userData && userData.dob) {
        updateUserInfo.dob = dayjs(updateUserInfo.dob);
      }
      form.setFieldsValue(updateUserInfo);
    }
  }, [isOpen]);

  useEffect(() => {
    form.setFieldsValue({ "avatar-url": fileChange });
  }, [fileChange, form]);

  // console.log("check user", userData);

  const fetchUserData = async () => {
    try {
      const res = await getUserDetail(userInfo.id);
      if (res && res.status === 200) {
        console.log("Check data", res);
        
        setUserData(res.data);
      }
    }
    catch (err) {
      console.log("Error fetching user data", err);
    }
  }
  

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

  const disabledDate = (current: object) => {
    return current && current > moment().startOf("day");
  };

  const handleFileChange = (newFileChange: string) => {
    setFileChange(newFileChange);
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Chỉnh sửa người dùng</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="full-name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên",
                },
                {
                  min: 5,
                  message: "Tên phải có ít nhất 5 kí tự",
                },
              ]}
              colon={true}
              label="Họ và tên"
              labelCol={{ span: 24 }}
              className="formItem"
              initialValue={userData?.["full-name"]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon mr-1" />}
                placeholder="Họ tên"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày sinh",
                },
              ]}
              colon={true}
              label="Ngày sinh"
              labelCol={{ span: 24 }}
              className="formItem"
              // initialValue={dayjs(userData?.dob)}
            >
              <DatePicker
                format="DD/MM/YYYY"
                className="w-full"
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn giới tính",
                },
              ]}
              colon={true}
              label="Giới tính"
              labelCol={{ span: 24 }}
              className="formItem"
              initialValue={userData?.gender}
            >
              <Select
                placeholder="Chọn giới tính"
                // onChange={(value) => handleChooseRoute(value)}
                // disabled={isSubmitted}
              >
                <Option key={0} value="0">
                  Nam
                </Option>
                <Option key={1} value="1">
                  Nữ
                </Option>
                <Option key={3} value="2">
                  Khác
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone-number"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
                },
              ]}
              colon={true}
              label="Số điện thoại"
              labelCol={{ span: 24 }}
              className="formItem"
              initialValue={userData?.["phone-number"]}
            >
              <Input
                prefix={
                  // <FaAddressBook className="site-form-item-icon mr-1 rotate-90" />
                  <PhoneOutlined className="site-form-item-icon mr-1 rotate-90" />
                }
                placeholder="Số điện thoại"
                maxLength={10}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ",
            },
          ]}
          colon={true}
          label="Địa chỉ"
          labelCol={{ span: 24 }}
          className="formItem"
          initialValue={userData?.address}
        >
          <Input
            prefix={<FaRegAddressCard site-form-item-icon mr-1 />}
            placeholder="Địa chỉ"
            maxLength={10}
          />
        </Form.Item>

        <Form.Item
          name="image"
          rules={[
            {
              required: true,
              message: "Please select image",
            },
          ]}
          colon={true}
          label="Image"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <UploadImage
            onFileChange={handleFileChange}
            initialImage={userData?.["avatar-url"]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
