import { CityManagementView } from "@/sections/city/view";
import React from "react";
import { Helmet } from "react-helmet";

const CityManagementPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Quản lý thành phố </title>
      </Helmet>
      <CityManagementView />
    </>
  );
};

export default CityManagementPage;
