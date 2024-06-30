import useTripService from "@/services/tripService";
import { TripDetailInfo } from "@/types/trip.types";
import React, { useEffect, useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
} from "antd";

export interface CreateTripInfoProps {
  tripId: number;
}

const CreateTripInfoView: React.FC<CreateTripInfoProps> = (props) => {
  const { tripId } = props;

  const [tripDetail, setTripDetail] = useState<TripDetailInfo>();

  const { fetchTripDetail } = useTripService();

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

  const { RangePicker } = DatePicker;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  return (
    <>
      <Form {...formItemLayout} style={{ maxWidth: 600 }}>
        <Form.Item
          label="Tên chuyến xe"
          name="name"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tuyến đường"
          name="route-id"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Ngày bán vé"
          name="open-ticket-date"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Ngày xuất phát (dự kiến)"
          name="estimated-start-date"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Ngày hoàn thành chuyến (dự kiến)"
          name="estimated-end-date"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Tài xế"
          name="driver-id"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Mentions"
          name="Mentions"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Mentions />
        </Form.Item>

        <Form.Item
          label="Select"
          name="Select"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select />
        </Form.Item>

        <Form.Item
          label="Cascader"
          name="Cascader"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Cascader />
        </Form.Item>

        <Form.Item
          label="TreeSelect"
          name="TreeSelect"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <TreeSelect />
        </Form.Item>

        <Form.Item
          label="DatePicker"
          name="DatePicker"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="RangePicker"
          name="RangePicker"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <RangePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <div>
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
      </div> */}
    </>
  );
};

export default CreateTripInfoView;
