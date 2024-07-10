/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Select, Button, InputNumber } from "antd";
import { TripDetailInfo } from "@/types/trip.types";
import useTripService from "@/services/tripService";
import useCreateTrip from "@/hooks/useCreateTrip";
import { TicketTypeInfo } from "@/types/ticket.types";
import { Loading } from "@/components";

const { Option } = Select;

export interface TicketFormProps {
  tripDetail?: TripDetailInfo;
  tripId: number;
}

const TicketForm: React.FC<TicketFormProps> = React.memo((props) => {
  const { tripId } = props;
  const { fetchTripDetail } = useTripService();
  const { listTicketChoose } = useCreateTrip();
  const [ticketPrices, setTicketPrices] = useState<{ [key: number]: number }>(
    {},
  );
  const { setCreateTripForm, createTripForm } = useCreateTrip();
  const [tripDetail2, setTripDetail2] = useState<TripDetailInfo>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleSubmit = useCallback(
    (values: any) => {
      setCreateTripForm({
        ...createTripForm,
        "trip-tickets": values["trip-tickets"],
      });
      setIsSubmitted(true);
    },
    [createTripForm, setCreateTripForm],
  );

  const fetchDataTrip = useCallback(
    async (tripId: number) => {
      try {
        const res = await fetchTripDetail(tripId);
        if (res && res.status === 200) {
          setTripDetail2(res.data);
        }
      } catch (error) {
        console.error("Error fetching station detail:", error);
      }
    },
    [fetchTripDetail],
  );

  const handlePrice = useCallback(
    (value: number, name: string | number) => {
      const ticketData = listTicketChoose?.find(
        (listTicket: TicketTypeInfo) => listTicket.id === value,
      );
      setTicketPrices((prev) => ({ ...prev, [name]: ticketData?.price }));
    },
    [listTicketChoose],
  );

  useEffect(() => {
    fetchDataTrip(tripId);
  }, [tripId]);

  const sortListTicketChoose = listTicketChoose
    ?.slice()
    .sort((a: TicketTypeInfo, b: TicketTypeInfo) => a.price - b.price);

  return tripDetail2 && tripDetail2?.tickets ? (
    <Form
      layout="vertical"
      initialValues={{ "trip-tickets": tripDetail2.tickets }}
      onFinish={handleSubmit}
      form={form}
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
              <div key={key} className="mb-[8px] flex gap-[1rem]">
                <Form.Item
                  {...restField}
                  name={[name, "seat-code"]}
                  //   label="Seat Code"
                  rules={[{ required: true, message: "Seat Code is required" }]}
                  className="flex-1"
                >
                  <Input readOnly={isSubmitted} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "status"]}
                  //   label="Status"
                  rules={[
                    {
                      required: true,
                      message: "Status is required",
                    },
                  ]}
                  className="flex-1"
                >
                  <Input readOnly={isSubmitted} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  // name="ticket-type-id"
                  rules={[
                    { required: true, message: "Ticket Type ID is required" },
                  ]}
                  className="flex-1"
                >
                  <Select
                    disabled={isSubmitted}
                    className="w-[100px]"
                    onChange={(value) => handlePrice(parseInt(value), name)}
                    defaultValue={
                      sortListTicketChoose
                        ? sortListTicketChoose[0]?.name
                        : undefined
                    }
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
                  className="flex-1"
                >
                  <InputNumber
                    type="number"
                    readOnly={isSubmitted}
                    className="w-full"
                    defaultValue={
                      sortListTicketChoose &&
                      sortListTicketChoose[0]?.price !== null
                        ? sortListTicketChoose[0]?.price
                        : undefined
                    }
                    value={ticketPrices[name]}
                  />
                </Form.Item>
              </div>
            ))}
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isSubmitted}
          className="mr-3"
        >
          {isSubmitted ? "Đã xác nhận" : "Xác nhận thông tin chuyến"}
        </Button>
        <Button
          type="primary"
          onClick={() => setIsSubmitted(false)}
          disabled={!isSubmitted}
        >
          {isSubmitted ? "Chỉnh sửa" : "Chỉnh sửa"}
        </Button>
      </Form.Item>
    </Form>
  ) : (
    <Loading />
  );
});

export default TicketForm;
