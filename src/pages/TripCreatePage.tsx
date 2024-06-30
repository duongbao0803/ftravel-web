import TripCreate from '@/sections/trip/view/TripCreate'
import React from 'react'
import { Helmet } from 'react-helmet'

const TripCreatePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FTravel | Quản lý chuyến xe </title>
      </Helmet>
      <TripCreate />
    </>
  )
}

export default TripCreatePage