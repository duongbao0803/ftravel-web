import React from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Signin from "./Signin";

interface IProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordForm: React.FC<IProps> = ({
  isShowRegister,
  setIsShowRegister,
}) => {
  return (
    <>
      {!isShowRegister ? (
        <>
          <div data-aos="fade-down">
            <h1 className=" text-4xl font-bold text-center mb-5 text-[#1677ff]">
              Forgot Password
            </h1>
          </div>
          <Form>
            <div data-aos="fade-right">
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
                labelCol={{ span: 24 }}
                label="Username"
                className="formItem"
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Please type your email"
                  className="p-2"
                  autoFocus
                />
              </Form.Item>
            </div>
            <div data-aos="fade-left">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button block mx-auto w-full h-11 text-lg tracking-wider"
                  disabled
                >
                  Send
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div data-aos="fade-up">
            <div className="text-center mt-5 text-sm">
              You already have an account? {""}
              <a
                href="#"
                className="text-[#3094ff] hover:underline font-semibold"
                onClick={() => setIsShowRegister(true)}
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

export default ForgotPasswordForm;
