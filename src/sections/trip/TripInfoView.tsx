import useTripService from "@/services/tripService";
import { TripDetailInfo } from "@/types/trip.types";
import { formatDate3 } from "@/util/validate";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface TripInfoProps {
  tripId: number;
}

const TripInfoView: React.FC<TripInfoProps> = (props) => {
  const { tripId } = props;

  const [tripDetail, setTripDetail] = useState<TripDetailInfo>();

  const { fetchTripDetail } = useTripService();

  const navigate = useNavigate();

  const fetchData = async (routeId: number) => {
    try {
      const res = await fetchTripDetail(routeId);
      if (res && res.status === 200) {
        setTripDetail(res.data);
      }
    } catch (error) {
      console.error("Error fetching station detail:", error);
    }
  };

  useEffect(() => {
    fetchData(tripId);
  }, [tripId]);

  const handleCreateTrip = () => {
    navigate(`/trip/${tripId}/clone`);
  }

  

  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <div>
            <p className="text-[1.2rem] font-bold">{tripDetail?.name}</p>
          </div>
          <div>
            <table>
              <tr>
                <td>Tuyến đường:</td>
                <td>{tripDetail?.["route-name"]}</td>
              </tr>
              <tr>
                <td>Ngày mở bán vé:</td>
                <td>
                  {tripDetail && tripDetail?.["open-ticket-date"]
                    ? formatDate3(tripDetail?.["open-ticket-date"])
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Ngày xuất phát (dự kiến):</td>
                <td>
                  {tripDetail && tripDetail?.["estimated-start-date"]
                    ? formatDate3(tripDetail?.["estimated-start-date"])
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Ngày kết thúc (dự kiến):</td>
                <td>
                  {tripDetail && tripDetail?.["estimated-end-date"]
                    ? formatDate3(tripDetail?.["estimated-end-date"])
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Trạng thái:</td>
                <td>{tripDetail?.status}</td>
              </tr>
            </table>
          </div>
        </Col>
        <Col span={12}>
          <Button type="primary" icon={<DownloadOutlined />} size='middle' onClick={() => handleCreateTrip()}>
            Dùng mẫu này
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default TripInfoView;
