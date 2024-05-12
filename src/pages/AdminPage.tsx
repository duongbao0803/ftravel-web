import React from "react";
import { Helmet } from "react-helmet";
import { AdminView } from "@/sections/admin/view";

const AdminPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Admin </title>
      </Helmet>
      <AdminView />
    </>
  );
};

export default AdminPage;
