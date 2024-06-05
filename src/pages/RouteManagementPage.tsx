import { RouteManagementView } from "@/sections/route/view";
import React from "react";
import { Helmet } from "react-helmet";

const RouteManagementPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Quản lý tuyến xe </title>
      </Helmet>
      <RouteManagementView />
    </>
  );
};

export default RouteManagementPage;
