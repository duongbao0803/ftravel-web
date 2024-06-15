import React from "react";
import StationList from "../StationList";

const RouteDetails: React.FC = () => {
  return (
    <div>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý tuyến xe</p>
      </div>
      <div className="p-5">
        <StationList />
      </div>
    </div>
  );
};

export default RouteDetails;
