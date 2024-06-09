import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const Error: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang này không tồn tại"
      extra={
        <Button type="primary" className="bg-[#1677ff]">
          <Link to="/chart">Trở về trang chủ</Link>
        </Button>
      }
    />
  );
};

export default Error;
