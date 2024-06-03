import React from "react";
import CompanyList from "../CompanyList";

const BusCompanyManagement: React.FC = () => {
  return (
    <>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Company Management</p>
      </div>
      <div className="p-5">
        <CompanyList />
      </div>
    </>
  );
};

export default BusCompanyManagement;
