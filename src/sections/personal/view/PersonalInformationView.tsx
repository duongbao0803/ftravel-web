import React from "react";
import GeneralInfo from "../GeneralInfo";

const PersonalInformationView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl p-5">
        <p className="text-2xl font-bold text-[#000000]">Thông tin cá nhân</p>
      </div>
      <div className="p-5">
        <GeneralInfo />
      </div>
    </>
  );
});

export default PersonalInformationView;
