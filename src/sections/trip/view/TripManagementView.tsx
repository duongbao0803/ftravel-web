import React from "react";
import TripList from "../TripList";

const TripManagementView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý chuyến xe</p>
      </div>
      <div className="p-5">
        <TripList />
      </div>
    </>
  );
});

export default TripManagementView;
