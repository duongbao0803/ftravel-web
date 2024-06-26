import { TripDetails } from "@/sections/trip/view";
import React from "react";
import { Helmet } from "react-helmet";

const TripDetailsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Quản lý chuyến xe </title>
      </Helmet>
      <TripDetails />
    </>
  );
};

export default TripDetailsPage;
