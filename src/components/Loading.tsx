/* eslint-disable no-unused-vars */
import React from "react";
import { Flex, Spin } from "antd";

const Loading: React.FC = () => {
  return (
    <Flex gap="small" vertical className="select-none">
      <Flex gap="small" align="center" justify="center">
        <Spin tip="Loading..." size="large">
          <div className="p-[50px]" />
        </Spin>
      </Flex>
    </Flex>
  );
};

export default Loading;
