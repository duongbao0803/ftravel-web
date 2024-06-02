import React from "react";
import UserList from "../UserList";

const UserManagementView: React.FC = () => {
  return (
    <>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">User Management</p>
      </div>
      <div className="p-5">
        <UserList />
      </div>
    </>
  );
};

export default UserManagementView;
