import React from "react";
import RouteInfo from "../RouteInfo";
import ServiceList from "../manage-service/ServiceList";
import { useParams } from "react-router-dom";

const RouteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const routeId = Number(id);
  return (
    <div>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý tuyến xe</p>
      </div>
      <div className="p-5">
        <div className="mb-3">{<RouteInfo routeId={routeId} />}</div>
        <div>{<ServiceList routeId={routeId} />}</div>
      </div>
    </div>
  );
};

export default RouteDetails;
