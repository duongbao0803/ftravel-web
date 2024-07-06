/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, InputNumber } from "antd";
import { TripDetailInfo } from "@/types/trip.types";
import useTripService from "@/services/tripService";
import useCreateTrip from "@/hooks/useCreateTrip";
import { TicketTypeInfo } from "@/types/ticket.types";

const { Option } = Select;

export interface TicketFormProps {
  onFormSubmit: any;
  tripDetail?: TripDetailInfo;
  tripId: number;
}

const TicketForm: React.FC<TicketFormProps> = (props) => {
  const { onFormSubmit, tripId } = props;
  const { fetchTripDetail } = useTripService();
  const { listTicketChoose } = useCreateTrip();
  const [ticketPrices, setTicketPrices] = useState<{ [key: number]: number }>({});

  const [tripDetail2, setTripDetail2] = useState<TripDetailInfo>();

  const handleSubmit = (values: any) => {
    console.log("check list ticket", values);
    
    onFormSubmit("ticket", values);
  };

  const fetchDataTrip = async (tripId: number) => {
    try {
      const res = await fetchTripDetail(tripId);
      if (res && res.status === 200) {
        console.log("check res", res.data.tickets);

        setTripDetail2(res.data);
      }
    } catch (error) {
      console.error("Error fetching station detail:", error);
    }
  };

  const handlePrice = (value: number, name: string | number) => {
    const ticketData = listTicketChoose?.find(
      (listTicket: TicketTypeInfo) => listTicket.id === value,
    );
    setTicketPrices((prev) => ({ ...prev, [name]: ticketData?.price }));
  };

  useEffect(() => {
    fetchDataTrip(tripId);
  }, [tripId]);

  return tripDetail2 && tripDetail2?.tickets ? (
    <Form
      layout="vertical"
      initialValues={{ "trip-tickets": tripDetail2.tickets }}
      onFinish={handleSubmit}
    >
      <Form.List name="trip-tickets">
        {(fields) => (
          <>
            <div className="mb-3 flex justify-around">
              <p className="font-bold">Mã ghế</p>
              <p className="font-bold">Trạng thái</p>
              <p className="font-bold">Loại vé</p>
              <p className="font-bold">Giá vé (FToken)</p>
            </div>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                style={{ display: "flex", gap: "1rem", marginBottom: 8 }}
              >
                <Form.Item
                  {...restField}
                  name={[name, "seat-code"]}
                  //   label="Seat Code"
                  rules={[{ required: true, message: "Seat Code is required" }]}
                  style={{ flex: 1 }}
                >
                  <Input readOnly />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "status"]}
                  //   label="Status"
                  rules={[{ required: true, message: "Status is required" }]}
                  style={{ flex: 1 }}
                >
                  <Input readOnly />
                </Form.Item>
                <Form.Item
                  {...restField}
                  // name="ticket-type-id"
                  rules={[
                    { required: true, message: "Ticket Type ID is required" },
                  ]}
                  style={{ flex: 1 }}
                >
                  <Select
                    className="w-[100px]"
                    onChange={(value) => handlePrice(value, name)}
                  >
                    {listTicketChoose?.map((type: TicketTypeInfo) => (
                      <Option key={type.id} value={type.id}>
                        {type.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  rules={[
                    { required: true, message: "Ticket Type ID is required" },
                  ]}
                  style={{ flex: 1 }}
                >
                  <InputNumber
                    type="number"
                    readOnly
                    className="w-full"
                    value={ticketPrices[name]}
                  />
                </Form.Item>
              </div>
            ))}
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Xác nhận danh sách vé
        </Button>
      </Form.Item>
    </Form>
  ) : (
    ""
  );
};

export default TicketForm;
