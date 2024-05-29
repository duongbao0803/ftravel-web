import React, { useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "aos/dist/aos.css";
import Signin from "./Signin";

interface IProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: React.FC<IProps> = ({ isShowRegister, setIsShowRegister }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [form] = Form.useForm();

  const validatePassword = (_: unknown, value: string) => {
    const password = form.getFieldValue("password");
    if (value && password && value !== password) {
      return Promise.reject("Passwords do not match");
    }
    return Promise.resolve();
  };

  const togglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // const handleSignUp = async () => {
  //   try {
  //     const res = await axios.post("")
  //   } catch (err) {
  //     console.error("err", err);
  //   }
  // };

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
            <h1 className=" text-4xl font-bold text-center mb-5 text-[#1677ff]">
              SIGN UP
            </h1>
          </div>
          <Form name="normal_login" form={form}>
            <div
              data-aos="fade-right"
              data-aos-offset="200"
              data-aos-easing="ease-in-sine"
              data-aos-duration="600"
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                  {
                    min: 8,
                    message: "Must be at least 8 characters",
                  },
                ]}
                colon={true}
                label="Username"
                labelCol={{ span: 24 }}
                className="formItem"
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
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
                name="name"
                id="formItem"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                  },
                ]}
                label="Name"
                labelCol={{ span: 24 }}
                className="formItem"
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Name"
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
                    message: "Please input your Password!",
                  },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters",
                  },
                ]}
                className="formItem"
                colon={true}
                label="Password"
                labelCol={{ span: 24 }}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  className="p-2"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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
                name="confirmPassword"
                id="formItem"
                rules={[
                  {
                    required: true,
                    message: "Please input your Confirm Password!",
                  },
                  {
                    validator: validatePassword,
                  },
                ]}
                className="formItem"
                colon={true}
                label="Password"
                labelCol={{ span: 24 }}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  className="p-2"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
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
                  className="login-form-button block mx-auto w-full h-11 text-lg tracking-wider mt-2"
                >
                  Sign Up
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div>
            <div className="text-center text-sm">
              You already have an account? {""}
              <a
                href="#"
                className="text-[#3094ff] hover:underline font-semibold"
                onClick={() => setIsShowRegister(false)}
              >
                Sign In
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
