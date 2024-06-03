import React from "react";
import RouteList from "../RouteList";

const RouteManagementView: React.FC = () => {
  return (
    <>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý tuyến xe</p>
      </div>
      <div className="p-5">
        <RouteList />
      </div>
    </>
  );
};

export default RouteManagementView;
