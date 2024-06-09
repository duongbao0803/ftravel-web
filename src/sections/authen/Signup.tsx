import React, { useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Spin, notification } from "antd";
import "aos/dist/aos.css";
import Signin from "./Signin";
import { signUp } from "@/api/authenApi";
import { SignupValues } from "@/types/auth.types";

interface IProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: React.FC<IProps> = ({ isShowRegister, setIsShowRegister }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [, setValues] = useState<SignupValues>({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    role: 0,
  });
  const [isSigningUp, setIsSigningUp] = useState(false);

  const [form] = Form.useForm();

  const validatePassword = (_: unknown, value: string) => {
    const password = form.getFieldValue("password");
    if (value && password && value !== password) {
      return Promise.reject("Mật khẩu không trùng");
    }
    return Promise.resolve();
  };

  const togglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onFinish = (values: SignupValues) => {
    setValues(values);
    handleSignUp(values);
  };

  const handleSignUp = async (formValues: SignupValues) => {
    alert("hihi");
    if (isSigningUp) {
      return;
    }
    try {
      setIsSigningUp(true);
      const res = await signUp(formValues);
      if (res && res.status === 200) {
        notification.success({
          message: "Tạo tài khoản thành công",
          description: "Tài khoản đã được tạo. Vui lòng kiểm tra email",
          duration: 2,
        });
      }
    } catch (err) {
      console.error("err", err);
      setIsSigningUp(false);
    }
  };

  return (
    <>
      {isShowRegister ? (
        <>
          <div
            data-aos="fade-down"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="600"
          >
            <h1 className=" mb-5 text-center text-4xl font-bold text-[#1677ff]">
              ĐĂNG KÝ
            </h1>
          </div>
          <Form name="normal_login" form={form} onFinish={onFinish}>
            <div
              data-aos="fade-right"
              data-aos-offset="200"
              data-aos-easing="ease-in-sine"
              data-aos-duration="600"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                  {
                    min: 8,
                    message: "Phải có ít nhất 8 ký tự",
                  },
                ]}
                colon={true}
                label="Email"
                labelCol={{ span: 24 }}
                className="formItem"
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  className="p-2"
                  autoFocus
                />
              </Form.Item>
            </div>
            <div
              data-aos="fade-right"
              data-aos-offset="200"
              data-aos-easing="ease-in-sine"
              data-aos-duration="600"
            >
              <Form.Item
                name="full-name"
                id="formItem"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên!",
                  },
                ]}
                label="Họ và tên"
                labelCol={{ span: 24 }}
                className="formItem"
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Họ và tên"
                  className="p-2"
                />
              </Form.Item>
            </div>
            <div
              data-aos="fade-right"
              data-aos-offset="200"
              data-aos-easing="ease-in-sine"
              data-aos-duration="600"
            >
              <Form.Item
                name="password"
                id="formItem"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                  {
                    min: 8,
                    message: "Mật khẩu có ít nhất 8 ký tự",
                  },
                ]}
                className="formItem"
                colon={true}
                label="Mật khẩu"
                labelCol={{ span: 24 }}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  className="p-2"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  suffix={
                    <>
                      {showPassword ? (
                        <EyeInvisibleOutlined onClick={togglePassword} />
                      ) : (
                        <EyeOutlined onClick={togglePassword} />
                      )}
                    </>
                  }
                />
              </Form.Item>
            </div>
            <div
              data-aos="fade-right"
              data-aos-offset="200"
              data-aos-easing="ease-in-sine"
              data-aos-duration="600"
            >
              <Form.Item
                name="confirm-password"
                id="formItem"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu!",
                  },
                  {
                    validator: validatePassword,
                  },
                ]}
                className="formItem"
                colon={true}
                label="Xác nhận mật khẩu"
                labelCol={{ span: 24 }}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  className="p-2"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Xác nhận mật khẩu"
                  suffix={
                    <>
                      {showConfirmPassword ? (
                        <EyeInvisibleOutlined onClick={toggleConfirmPassword} />
                      ) : (
                        <EyeOutlined onClick={toggleConfirmPassword} />
                      )}
                    </>
                  }
                />
              </Form.Item>
            </div>
            <div
              data-aos="fade-left"
              data-aos-easing="ease-in-sine"
              data-aos-duration="600"
            >
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button mx-auto mt-2 block h-11 w-full text-lg tracking-wider"
                >
                  {isSigningUp ? (
                    <Spin
                      indicator={<LoadingOutlined className="text-[#fff]" />}
                    />
                  ) : (
                    "Đăng ký"
                  )}
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div>
            <div className="text-center text-sm">
              Bạn đã có tài khoản? {""}
              <a
                href="#"
                className="font-semibold text-[#3094ff] hover:underline"
                onClick={() => setIsShowRegister(false)}
              >
                Đăng nhập
              </a>
            </div>
          </div>
        </>
      ) : (
        <Signin />
      )}
    </>
  );
};

export default Signup;
