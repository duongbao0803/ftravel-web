import { OrderManagement } from "@/sections/order/view";
import React from "react";
import { Helmet } from "react-helmet";

const OrderManagementPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Quản lý đơn hàng </title>
      </Helmet>
      <OrderManagement />
    </>
  );
};

export default OrderManagementPage;