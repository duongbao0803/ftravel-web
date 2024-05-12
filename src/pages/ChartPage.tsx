import React from "react";
import { Helmet } from "react-helmet";
import { ChartView } from "@/sections/chart/view";

const ChartPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Chart </title>
      </Helmet>
      <ChartView />
    </>
  );
};

export default ChartPage;
