import TripManagementView from "@/sections/trip/view/TripManagementView";
import React from "react";
import { Helmet } from "react-helmet";

const UserManagementPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Quản lý chuyến đi </title>
      </Helmet>
      <TripManagementView />
    </>
  );
};

export default UserManagementPage;
