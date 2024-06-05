import React from "react";
import { Helmet } from "react-helmet";
import { PersonalInformationView } from "@/sections/personal/view";

const PersonalInformationPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Thông tin cá nhân </title>
      </Helmet>
      <PersonalInformationView />
    </>
  );
};

export default PersonalInformationPage;
