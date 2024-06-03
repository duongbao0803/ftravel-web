import React from "react";
import { Steps } from "antd";

const ProcessOrder: React.FC = () => (
  <>
    <div className="mb-10">
      <p className="text-xl font-bold">Thời gian đặt hàng</p>
    </div>
    <Steps
      progressDot
      current={5}
      direction="vertical"
      items={[
        {
          title: "Đơn hàng 5",
          description: "Vé Vũng Tàu - Hồ Chí Minh",
        },
        {
          title: "Đơn hàng 4",
          description: "Vé Vũng Tàu - Hồ Chí Minh",
        },
        {
          title: "Đơn hàng 3",
          description: "Vé Vũng Tàu - Hồ Chí Minh",
        },
        {
          title: "Đơn hàng 2",
          description: "Vé Vũng Tàu - Hồ Chí Minh",
        },
        {
          title: "Đơn hàng 1",
          description: "Vé Vũng Tàu - Hồ Chí Minh",
        },
      ]}
    />
  </>
);

export default ProcessOrder;
