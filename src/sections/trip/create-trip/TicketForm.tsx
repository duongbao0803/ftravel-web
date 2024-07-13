import React, { useCallback, useEffect, useMemo, useState } from "react";
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (values: any) => {
      console.log("check values", values);
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

  useEffect(() => {
    fetchDataTrip(tripId);
  }, [tripId]);

  const sortListTicketChoose = useMemo(() => {
    return listTicketChoose
      ?.slice()
      .sort((a: TicketTypeInfo, b: TicketTypeInfo) => a.price - b.price);
  }, [listTicketChoose]);

  const initialTickets = useMemo(() => {
    return tripDetail2?.tickets.map((ticket) => ({
      ...ticket,
      "ticket-type-id": sortListTicketChoose
        ? sortListTicketChoose[0]?.id
        : ticket["ticket-type-id"],
      price: sortListTicketChoose
        ? sortListTicketChoose[0]?.price
        : ticket.price,
    }));
  }, [tripDetail2, sortListTicketChoose]);
  const handleTicketTypeChange = useCallback(
    (value: number) => {
      const selectedTicket = listTicketChoose?.find(
        (ticket) => ticket.id === value,
      );

      if (selectedTicket) {
        form.setFieldsValue({
          "trip-tickets": form
            .getFieldValue("trip-tickets")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((ticket: any) => ({
              ...ticket,
              "ticket-type-id": selectedTicket.id,
              price: selectedTicket.price,
            })),
        });

        setTicketPrices(() =>
          form
            .getFieldValue("trip-tickets")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .reduce((acc: any, index: number) => {
              acc[index] = selectedTicket.price;
              return acc;
            }, {}),
        );
      }
    },
    [form, listTicketChoose],
  );

  return tripDetail2 && tripDetail2?.tickets ? (
    <Form
      layout="vertical"
      initialValues={{ "trip-tickets": initialTickets }}
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
                  rules={[{ required: true, message: "Seat Code is required" }]}
                  className="flex-1"
                >
                  <Input readOnly={isSubmitted} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "status"]}
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
                  name={[name, "ticket-type-id"]}
                  rules={[
                    { required: true, message: "Ticket Type ID is required" },
                  ]}
                  className="flex-1"
                >
                  <Select
                    disabled={isSubmitted}
                    className="w-[100px]"
                    onChange={(value) => handleTicketTypeChange(value)}
                  >
                    {listTicketChoose?.map((type: TicketTypeInfo) => (
                      <Option key={type.id} value={type.id}>
                        {type.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "price"]}
                  rules={[{ required: true, message: "Price is required" }]}
                  className="flex-1"
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
