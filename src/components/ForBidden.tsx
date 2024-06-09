import React from "react";
import { Button, Result } from "antd";

const ForBidden: React.FC = React.memo(() => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không có quyền truy cập vào trang này"
      extra={
        <Button type="primary" className="bg-[#1677ff]">
          Trở về trang chủ
        </Button>
      }
    />
  );
});

export default ForBidden;
