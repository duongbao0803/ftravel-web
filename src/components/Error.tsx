import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const Error: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" className="bg-[#1677ff]">
          <Link to="/chart">Back home</Link>
        </Button>
      }
    />
  );
};

export default Error;
