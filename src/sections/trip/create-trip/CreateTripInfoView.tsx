import React, { useEffect, useState } from "react";
import { Button, Divider, Select, Steps } from "antd";
import { TripDetailInfo } from "@/types/trip.types";
import MainForm from "./MainForm";
import TicketForm from "./TicketForm";
import useTripService from "@/services/tripService";

export interface CreateTripInfoProps {
  tripId: number;
}

const CreateTripInfoView: React.FC<CreateTripInfoProps> = (props) => {
  const { tripId } = props;

  // const { Option } = Select;

  const { Step } = Steps;

  const [tripDetail, setTripDetail] = useState<TripDetailInfo>();

  // const [routes, setRoutes] = useState<RouteInfo[]>();
  // const [ticketTypes, setTicketTypes] = useState<TicketTypeInfo[]>();

  // const { companys } = useCompanyService();

  // const { fetchRoutes } = useRouteService();

  const { fetchTripDetail } = useTripService();

  // const { users } = useUserService();

  // const { fetchTicketTypeRoute } = useTicketService();

  // const { setListTicketName } = useCreateTrip();

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

  // const fetchDataTicketTypeRoute = async (routeId: number) => {
  //   const res = await fetchTicketTypeRoute(routeId);
  //   if (res && res.status === 200) {
  //     setTicketTypes(res.data);
  //     console.log("check ticket loai", res.data);
  //   }
  // };

  // const fetchDataRoute = async (page: number, buscompanyId: number) => {
  //   try {
  //     const res = await fetchRoutes(page, buscompanyId);
  //     if (res) {
  //       setRoutes(res?.data);
  //     }
  //     console.log("check routes", routes);
  //   } catch (error) {
  //     console.error("Error fetching list buscompany:", error);
  //   }
  // };

  useEffect(() => {
    fetchDataTrip(tripId);
  }, [tripId]);

  // const { RangePicker } = DatePicker;

  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 6 },
  //   },
  //   wrapperCol: {
  //     xs: { span: 24 },
  //     sm: { span: 14 },
  //   },
  // };

  // const filterOption = (
  //   input: string,
  //   option?: { label: string; value: string },
  // ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // const handleChangeBuscompany = (buscompanyId: number) => {
  //   fetchDataRoute(1, buscompanyId);
  // };

  // const handleChooseRoute = (routeId: number) => {
  //   fetchDataTicketTypeRoute(routeId);
  // };

  // const handleChange = (selectedValues) => {
  //   console.log("check values", selectedValues);
  //   const selectedTicketNames = selectedValues
  //     ?.map((id) => {
  //       const ticket = ticketTypes?.find((ticketType) => ticketType?.id == id);

  //       return ticket ? ticket.name : null;
  //     })
  //     .filter((name) => name !== null);
  //   setListTicketName(selectedTicketNames);
  // };

  const [mainData, setMainData] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [ticketData, setTicketData] = useState(null);

  const handleFormSubmit = (formType, data) => {
    if (formType === "main") {
      console.log("check main data", data);
      setMainData(data);
    } else if (formType === "service") {
      console.log("check main service", data);
      setServiceData(data);
    } else if (formType === "ticket") {
      setTicketData(data);
    }
  };

  const handleSubmitAll = async () => {
    if (!mainData || !serviceData || !ticketData) {
      alert('Please fill out all forms before submitting.');
      return;
    }
    const combinedData = {
      ...mainData,
      'trip-services': [serviceData],
      'trip-tickets': [ticketData],
    };

    console.log("check form final", combinedData);
    
    // try {
    //   const response = await axios.post('/your-api-endpoint', combinedData);
    //   console.log('Response:', response.data);
    //   message.success('Form submitted successfully!');
    // } catch (error) {
    //   console.error('Error:', error);
    //   message.error('Failed to submit form.');
    // }
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
      content: <MainForm onFormSubmit={handleFormSubmit} />,
    },
    {
      title: "Thông tin vé",
      content: (
        <TicketForm
          onFormSubmit={handleFormSubmit}
          tripDetail={tripDetail}
          tripId={tripId}
        />
      ),
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
};

export default CreateTripInfoView;
