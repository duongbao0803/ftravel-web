import { ServiceManagementView } from "@/sections/manage-service/view";
import React from "react";
import { Helmet } from "react-helmet";

const ServiceManagementPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Quản lý dịch vụ </title>
      </Helmet>
      <ServiceManagementView />
    </>
  );
};

export default ServiceManagementPage;
