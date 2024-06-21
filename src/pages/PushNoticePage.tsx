import { PushNoticeView } from "@/sections/notification/view";
import React from "react";
import { Helmet } from "react-helmet";

const PushNoticePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Thông báo </title>
      </Helmet>
      <PushNoticeView />
    </>
  );
};

export default PushNoticePage;
