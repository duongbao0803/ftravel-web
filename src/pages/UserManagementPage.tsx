import { UserManagementView } from "@/sections/user/view";
import React from "react";
import { Helmet } from "react-helmet";

const UserManagementPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Quản lý người dùng </title>
      </Helmet>
      <UserManagementView />
    </>
  );
};

export default UserManagementPage;
