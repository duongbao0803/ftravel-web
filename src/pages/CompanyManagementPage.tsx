import { CompanyManagementView } from "@/sections/company/view";
import React from "react";
import { Helmet } from "react-helmet";

const BusCompanyMangement: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Quản lý công ty </title>
      </Helmet>
      <CompanyManagementView />
    </>
  );
};

export default BusCompanyMangement;
