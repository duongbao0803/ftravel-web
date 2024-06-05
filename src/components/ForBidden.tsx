import React from "react";
import { Button, Result } from "antd";

const ForBidden: React.FC = React.memo(() => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" className="bg-[#1677ff]">
          Back home
        </Button>
      }
    />
  );
});

export default ForBidden;
