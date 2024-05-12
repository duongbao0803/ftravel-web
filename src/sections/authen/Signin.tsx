import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/config/firebase";
import Signup from "./Signup";
import ForgotPasswordForm from "./ForgotPassword";

const Signin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isShowRegister, setIsShowRegister] = useState<boolean>(false);
  const [isShowForgotPassword, setIsShowForgotPassword] =
    useState<boolean>(false);

  const handleClick = (): void => {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider).then((data) => {
      console.log("check data", data);
    });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {isShowForgotPassword ? (
        <ForgotPasswordForm
          isShowRegister={isShowRegister}
          setIsShowRegister={setIsShowRegister}
        />
      ) : !isShowRegister ? (
        <>
          <div className="">
            <div data-aos="fade-down">
              <h1 className=" text-4xl font-bold mb-5 text-[#1677ff]">
                Welcome Back
              </h1>
            </div>
            <Form name="normal_login" className="login-form">
              <div data-aos="fade-right">
                <Form.Item
                  name=""
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!",
                    },
                    {
                      min: 8,
                      message: "Username must be at least 8 characters",
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
              <div data-aos="fade-right">
                <Form.Item
                  name=""
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
                  label="Password"
                  labelCol={{ span: 24 }}
                  className="formItem"
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
              <div data-aos="fade-left">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                  <a
                    href="#"
                    className="login-form-forgot float-right text-[#3094ff] hover:underline font-semibold"
                    onClick={() => setIsShowForgotPassword(true)}
                  >
                    Forgot password?
                  </a>
                </Form.Item>
              </div>
              <Form.Item>
                <div data-aos="fade-right">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button block mx-auto w-full h-11 text-lg tracking-wider mt-5"
                  >
                    Sign In
                  </Button>
                </div>
              </Form.Item>
            </Form>

            <div data-aos="flip-up">
              <div className="text-center mt-4 flex items-center justify-center">
                <div className="w-full bg-[#e6e8eb] h-[1px] mr-2"></div>
                <span className="text-[#999999]">OR</span>
                <div className="w-full bg-[#e6e8eb] h-[1px] ml-2"></div>
              </div>
            </div>
            <div data-aos="fade-left">
              <div>
                <Button
                  className="block bg-[#fff] text-[grey] border border-gray-300 shadow-none mx-auto w-full h-11 mt-5 rounded-[5px]"
                  onClick={handleClick}
                >
                  <div className="flex justify-center items-center tracking-wider">
                    <img
                      src="https://freesvg.org/img/1534129544.png"
                      width={23}
                      alt=""
                      className="mr-2"
                    />
                    Continue with Google
                  </div>
                </Button>
              </div>
            </div>
            <div data-aos="fade-up">
              <div className="text-center mt-2 text-sm">
                <span>You don't have account? </span>
                <a
                  href="#"
                  className="text-[#3094ff] hover:underline font-semibold"
                  onClick={() => setIsShowRegister(true)}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Signup
          isShowRegister={isShowRegister}
          setIsShowRegister={setIsShowRegister}
        />
      )}
    </>
  );
};

export default Signin;
