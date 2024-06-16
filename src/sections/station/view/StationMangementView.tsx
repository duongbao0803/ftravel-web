import React from "react";
import StationList from "../StationList";

const StationMangementView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý trạm</p>
      </div>
      <div className="p-5">
        <StationList />
      </div>
    </>
  );
});

export default StationMangementView;
