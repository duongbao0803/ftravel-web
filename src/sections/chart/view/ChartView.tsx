import React, { useState } from "react";
import BarChart from "../BarChart";
import TotalField from "../TotalField";
import ProcessOrder from "../ProcessOrder";
import { SystemData } from "@/constants";

const ChartView: React.FC = () => {
  const [systemData] = useState({
    labels: SystemData.map((data) => data.year),
    datasets: [
      {
        label: "Người đặt vé",
        data: SystemData.map((data) => data.userGain),
        backgroundColor: ["green", "blue"],
      },
      {
        label: "Người hủy vé",
        data: SystemData.map((data) => data.userLost),
        backgroundColor: ["yellow", "orange"],
      },
    ],
  });
  return (
    <>
      <div className="p-5">
        <TotalField />
      </div>
      <div className="grid grid-cols-1 gap-12 p-5 sm:grid-cols-3">
        <div className="col-span-1 sm:col-span-2">
          <BarChart chartData={systemData} />
        </div>
        <div className="col-span-1 sm:col-span-1">
          <ProcessOrder />
        </div>
      </div>
    </>
  );
};

export default ChartView;
