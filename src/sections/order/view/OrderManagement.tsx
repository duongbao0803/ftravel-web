import React from "react";
import OrderList from "../OrderList";

const OrderManagement: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý đơn hàng</p>
      </div>
      <div className="p-5">
        <OrderList />
      </div>
    </>
  );
});

export default OrderManagement;
