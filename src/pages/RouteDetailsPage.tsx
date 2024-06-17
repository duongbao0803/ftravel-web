import { RouteDetails } from "@/sections/route/view";
import React from "react";
import { Helmet } from "react-helmet";

const RouteDetailsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Quản lý tuyến xe </title>
      </Helmet>
      <RouteDetails />
    </>
  );
};

export default RouteDetailsPage;
