import React from 'react'
import TripInfoView from '../TripInfoView'
import { useParams } from 'react-router-dom';
import TripTicketList from '../TripTicketList';

const TripDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tripId = Number(id);
  return (
    <div>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý chuyến xe</p>
      </div>
      <div className="p-5">
        <div className="mb-3">{<TripInfoView tripId={tripId} />}</div>
        <div>{<TripTicketList tripId={tripId} />}</div>
      </div>
    </div>
  )
}

export default TripDetails