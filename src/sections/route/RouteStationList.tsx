import React, { useEffect, useState } from "react";
import { Button, Form, Card } from "antd";
import useRouteService from "@/services/routeService";
import { RouteDetailInfo } from "@/types/route.types";
import AddRouteStationModal from "./AddRouteStationModal";
import ServiceStationList from "./ServiceStationList";

export interface DataType {
  _id: string;
  key: string;
  name: string;
  defaultPrice: number;
  imgUrl: [];
  quantity: number;
  shortDescription: string;
  fullDescription: string;
}

export interface RouteStationListProps {
  routeId: number;
}

const RouteStationList: React.FC<RouteStationListProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { routeId } = props;
  const [fileChange] = useState<string>("");
  const [form] = Form.useForm();
  const [routeDetail, setRouteDetail] = useState<RouteDetailInfo | undefined>(
    undefined,
  );
  const { fetchRouteDetail, fetchServiceByStation } = useRouteService();
  const [, setServiceByStation] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchRouteDetail(routeId);
      if (res && res.status === 200) {
        setRouteDetail(res.data);
      }
    };

    fetchData();
  }, [routeId]);

  useEffect(() => {
    const routeStationsDetail = routeDetail?.["route-stations"]?.map(
      (routeStationDetail) => routeStationDetail?.station,
    );

    const fetchServiceStation = async (stationId: number) => {
      try {
        const res = await fetchServiceByStation(stationId);
        if (res && res.status === 200) {
          setServiceByStation(res.data);
        }
      } catch (error) {
        console.error(`Error fetching data for stationId ${stationId}:`, error);
      }
    };

    if (routeStationsDetail) {
      const routeStationIds = routeStationsDetail.map(
        (routeStation) => routeStation.id,
      );

      const fetchAllData = async () => {
        const fetchPromises = routeStationIds.map((routeStationId) =>
          fetchServiceStation(routeStationId),
        );
        await Promise.all(fetchPromises);
      };

      fetchAllData();
    }
  }, [routeDetail]);

  const routeStations = routeDetail?.["route-stations"]?.map(
    (routeStationDetail) => routeStationDetail,
  );

  useEffect(() => {
    form.setFieldsValue({ "img-url": fileChange });
  }, [fileChange, form]);

  return (
    <>
      <AddRouteStationModal setIsOpen={setIsOpen} isOpen={isOpen} />

      <>
        {routeStations &&
          routeStations.length > 0 &&
          routeStations.map((routeStation, stationIndex) => (
            <div
              style={{
                display: "flex",
                rowGap: 16,
                flexDirection: "column",
                marginBottom: "30px",
              }}
              key={stationIndex}
            >
              <Card
                size="small"
                title={`Trạm ${routeStation["station-index"]}: ${routeStation?.station.name || ""}`}
              >
                <div>
                  <ServiceStationList routeStation={routeStation} />
                </div>
              </Card>
            </div>
          ))}
        <Button type="dashed" onClick={() => setIsOpen(true)} block>
          + Thêm trạm
        </Button>
      </>

      {/* <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item> */}
    </>
  );
};

export default RouteStationList;
