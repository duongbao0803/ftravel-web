/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Form, Input, Checkbox, notification, Spin } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Signup from "./Signup";
import ForgotPasswordForm from "./ForgotPassword";
import { auth } from "@/config/firebase";
import { login } from "@/api/authenApi";
import Cookies from "js-cookie";
import { encryptData } from "@/util/cryptoUtils";
import useAuth from "@/hooks/useAuth";
import { useDecryptCredentials } from "@/hooks/useDecryptCredentials";
import { jwtDecode } from "jwt-decode";
import { SigninValues } from "@/types/auth.types";

const Signin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isShowRegister, setIsShowRegister] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isShowForgotPassword, setIsShowForgotPassword] =
    useState<boolean>(false);
  const [, setValues] = useState<SigninValues>({
    email: "",
    password: "",
  });
  const { email, password, secretKey } = useDecryptCredentials();

  const handleClick = (): void => {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider).then((data) => {
      console.log("check data", data);
    });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = (values: SigninValues) => {
    setValues(values);
    if (values?.email && values?.password) {
      handleSignin(values);
    }
  };

  const handleSignin = async (formValues: SigninValues) => {
    if (isLoggingIn) {
      return;
    }
    try {
      setIsLoggingIn(true);
      const { email, password } = formValues;
      const res = await login(formValues);
      if (res && res.status === 200) {
        const jwtAccessToken = res.data["access-token"];
        const jwtRefreshToken = res.data["refresh-token"];

        Cookies.set("accessToken", jwtAccessToken, { expires: 1 });
        Cookies.set("refreshToken", jwtRefreshToken, { expires: 10 });
        const jwtToken = Cookies.get("accessToken");
        if (jwtToken) {
          const decoded: any = jwtDecode(jwtToken);
          const role =
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];

          if (rememberMe) {
            const encryptedUsername = encryptData(email, secretKey);
            const encryptedPassword = encryptData(password, secretKey);
            Cookies.set("email", encryptedUsername);
            Cookies.set("password", encryptedPassword);
          }
          if (role !== "ADMIN" && role !== "BUSCOMPANY") {
            notification.error({
              message: "Đăng nhập thất bại",
              description: "Bạn không có quyền truy cập vào trang này",
              duration: 2,
            });
            setIsLoggingIn(false);
            const authStore = useAuth.getState();
            authStore.logout();
            return;
          } else {
            notification.success({
              message: "Đăng nhập thành công",
              description: "Bạn đã đăng nhập thành công",
              duration: 2,
            });
            const authStore = useAuth.getState();
            authStore.setRole(role);
            authStore.login();
          }
        }
      }
    } catch (err: any) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: `${err.response.data.message}`,
        duration: 2,
      });
      console.error(">>> Error signing server", err);
      setIsLoggingIn(false);
    }
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
              <h1 className=" mb-5 text-4xl font-bold text-[#1677ff]">
                Chào mừng trở lại
              </h1>
            </div>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
            >
              <div data-aos="fade-right">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email!",
                    },
                    {
                      type: "email",
                      message: "Vui lòng nhập đúng kiểu email",
                    },
                  ]}
                  colon={true}
                  label="Email"
                  labelCol={{ span: 24 }}
                  className="formItem"
                  initialValue={email}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                    className="p-2"
                    autoFocus
                  />
                </Form.Item>
              </div>
              <div data-aos="fade-right">
                <Form.Item
                  name="password"
                  id="formItem"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                    {
                      min: 4,
                      max: 20,
                      message: "Mật khẩu phải có ít nhất 8 kí tự",
                    },
                  ]}
                  label="Mật khẩu"
                  labelCol={{ span: 24 }}
                  className="formItem"
                  initialValue={password}
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
              <div data-aos="fade-left">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
                    Ghi nhớ
                  </Checkbox>
                  <a
                    href="#"
                    className="login-form-forgot float-right font-semibold text-[#3094ff] hover:underline"
                    onClick={() => setIsShowForgotPassword(true)}
                  >
                    Quên mật khẩu
                  </a>
                </Form.Item>
              </div>
              <Form.Item>
                <div data-aos="fade-right">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button mx-auto mt-5 block h-11 w-full text-lg tracking-wider"
                  >
                    {isLoggingIn ? (
                      <Spin
                        indicator={<LoadingOutlined className="text-[#fff]" />}
                      />
                    ) : (
                      "Đăng nhập"
                    )}
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <div data-aos="flip-up">
              <div className="mt-4 flex items-center justify-center text-center">
                <div className="mr-2 h-[1px] w-full bg-[#e6e8eb]"></div>
                <span className="text-[#999999]">hoặc</span>
                <div className="ml-2 h-[1px] w-full bg-[#e6e8eb]"></div>
              </div>
            </div>
            <div data-aos="fade-left">
              <div>
                <Button
                  className="mx-auto mt-5 block h-11 w-full rounded-[5px] border border-gray-300 bg-[#fff] text-[grey] shadow-none"
                  onClick={handleClick}
                >
                  <div className="flex items-center justify-center tracking-wider">
                    <img
                      src="https://freesvg.org/img/1534129544.png"
                      width={23}
                      alt=""
                      className="mr-2"
                    />
                    Tiếp tục với Google
                  </div>
                </Button>
              </div>
            </div>
            <div data-aos="fade-up">
              <div className="mt-2 text-center text-sm">
                <span>Bạn không có tài khoản? </span>
                <a
                  href="#"
                  className="font-semibold text-[#3094ff] hover:underline"
                  onClick={() => setIsShowRegister(true)}
                >
                  Đăng ký
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
