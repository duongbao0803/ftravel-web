import { UserManagementView } from "@/sections/user/view";
import React from "react";
import { Helmet } from "react-helmet";

const CityManagementPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | City management </title>
      </Helmet>
      <UserManagementView />
    </>
  );
};

export default CityManagementPage;
