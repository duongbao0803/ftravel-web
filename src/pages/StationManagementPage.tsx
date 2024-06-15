import { StationMangementView } from "@/sections/station/view";
import React from "react";
import { Helmet } from "react-helmet";

const StationManagementPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Quản lý tuyến xe </title>
      </Helmet>
      <StationMangementView />
    </>
  );
};

export default StationManagementPage;
