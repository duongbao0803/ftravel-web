/* eslint-disable no-unused-vars */
import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import useTripService from "@/services/tripService";

const ExportTrip: React.FC = () => {
  const { trips } = useTripService();
  const exportToFile = () => {
    const jsonData = JSON.stringify(trips, null, 2);
    const worksheet = XLSX.utils.json_to_sheet(JSON.parse(jsonData));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "trip_list.xlsx");
  };

  return (
    <Button type="primary" onClick={exportToFile} className="flex items-center">
      <ExportOutlined /> Xuất file
    </Button>
  );
};

export default ExportTrip;
