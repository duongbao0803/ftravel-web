import React from "react";
import PushNotice from "../PushNotice";

const PushNoticeView: React.FC = () => {
  return (
    <>
      <div className="rounded-t-xl p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý thông báo</p>
      </div>
      <div className="p-5">
        <PushNotice />
      </div>
    </>
  );
};

export default PushNoticeView;
