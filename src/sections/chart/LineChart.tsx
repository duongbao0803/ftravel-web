import React from "react";
import { Line } from "react-chartjs-2";
import Chart, { ChartData, CategoryScale } from "chart.js/auto";
Chart.register(CategoryScale);

interface LineChartProps {
  chartData: ChartData<"line">;
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const { chartData } = props;
  return (
    <>
      <div className="w-[500px]">
        <Line data={chartData} options={{}} />
      </div>
    </>
  );
};

export default LineChart;
