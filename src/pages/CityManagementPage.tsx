import { CityManagementView } from "@/sections/city/view";
import React from "react";
import { Helmet } from "react-helmet";

const CityManagementPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | City management </title>
      </Helmet>
      <CityManagementView />
    </>
  );
};

export default CityManagementPage;
