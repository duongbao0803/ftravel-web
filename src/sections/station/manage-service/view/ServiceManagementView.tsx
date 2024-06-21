import React from "react";
// import ServiceList from "../ServiceList";

const ServiceManagementView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý dịch vụ</p>
      </div>
      <div className="p-5">{/* <ServiceList /> */}</div>
    </>
  );
});

export default ServiceManagementView;
