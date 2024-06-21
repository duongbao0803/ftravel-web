import useRouteService from "@/services/routeService";
import { RouteInfo } from "@/types/route.types";
import { formatDate3 } from "@/util/validate";
import React, { useEffect, useState } from "react";


export interface RouteInfoProps {
  routeId: number;
}

const RouteInfoView: React.FC<RouteInfoProps> = (props) => {

  const { routeId } = props;
  const {fetchRouteDetail} = useRouteService();
  const [routeDetail, setRouteDetail] = useState<RouteInfo>();

  const fetchData = async (routeId: number) => {
    try {
      const res = await fetchRouteDetail(routeId);
      if (res && res.status === 200) {
        setRouteDetail(res.data);
      }
    } catch (error) {
      console.error("Error fetching station detail:", error);
    }
  };

  useEffect(() => {
    fetchData(routeId)
  },[routeId])

  return (
    <>
      <div>
        <p className="text-[1.2rem] font-bold">{routeDetail?.name}</p>
      </div>
      <div>
        <table>
          <tr>
            <td>Nhà xe quản lí:</td>
            <td>{routeDetail?.["bus-company-name"]}</td>
          </tr>
          <tr>
            <td>Điểm đi:</td>
            <td>{routeDetail?.["start-point"]}</td>
          </tr>
          <tr>
            <td>Điểm đến:</td>
            <td>{routeDetail?.["end-point"]}</td>
          </tr>
          <tr>
            <td>Ngày tạo:</td>
            <td>{routeDetail && formatDate3(routeDetail?.["create-date"])}</td>
          </tr>
          <tr>
            <td>Ngày chỉnh sửa:</td>
            <td>{routeDetail && routeDetail?.["update-date"] ? formatDate3(routeDetail?.["update-date"]) : "N/A"}</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default RouteInfoView;
