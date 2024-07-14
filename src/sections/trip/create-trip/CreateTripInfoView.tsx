import React, { useEffect, useState } from "react";
import { Button, Divider, notification, Steps } from "antd";
import { TripDetailInfo } from "@/types/trip.types";
import MainForm from "./MainForm";
import TicketForm from "./TicketForm";
import useTripService from "@/services/tripService";
import useCreateTrip from "@/hooks/useCreateTrip";

export interface CreateTripInfoProps {
  tripId: number;
}

const CreateTripInfoView: React.FC<CreateTripInfoProps> = React.memo(
  (props) => {
    const { tripId } = props;

    const { Step } = Steps;

    const [tripDetail, setTripDetail] = useState<TripDetailInfo>();
    const { createTripForm } = useCreateTrip();

    const { fetchTripDetail, addNewTripItem } = useTripService();

    const fetchDataTrip = async (routeId: number) => {
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
      fetchDataTrip(tripId);
    }, [tripId]);

    const handleSubmitAll = async () => {
      if (!createTripForm) {
        notification.warning({
          message: "Thêm không thành công",
          description: "Vui lòng điền đầy đủ thông tin",
          duration: 2,
        });
      }

      const newCreateTripForm = { ...createTripForm };
      delete newCreateTripForm["bus-company-id"];

      try {
        await addNewTripItem(newCreateTripForm);
      } catch (error) {
        console.error("Error", error);
      }
    };

    const [current, setCurrent] = useState(0);

    const next = () => {
      setCurrent(current + 1);
    };

    const prev = () => {
      setCurrent(current - 1);
    };

    const steps = [
      {
        title: "Thông tin chung",
        content: <MainForm />,
      },
      {
        title: "Thông tin vé",
        content: <TicketForm tripDetail={tripDetail} tripId={tripId} />,
      },
      {
        title: "Kết thúc",
        content: (
          <Button type="primary" onClick={handleSubmitAll}>
            Tạo chuyến đi mới
          </Button>
        ),
      },
    ];

    return (
      <>
        <div>
          <Steps size="small" current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content mt-3">{steps[current].content}</div>
          <Divider />
          <div className="steps-action">
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Quay lại
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Tiếp tục
              </Button>
            )}
          </div>
        </div>
      </>
    );
  },
);

export default CreateTripInfoView;
