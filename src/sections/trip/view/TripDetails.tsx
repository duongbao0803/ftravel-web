import React from 'react'

const TripDetails: React.FC = () => {
  return (
    <div>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý chuyến xe</p>
      </div>
      <div className="p-5">
        Tính năng này khó vl. Vui lòng truy cập database.
        {/* <div className="mb-3">{<RouteInfoView routeId={routeId} />}</div> */}
        {/* <div>{<RouteStationList routeId={routeId} />}</div> */}
      </div>
    </div>
  )
}

export default TripDetails