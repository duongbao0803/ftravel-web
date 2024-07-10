/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import { Form, InputNumber, Button, Select, Table, TableProps } from "antd";
import useServiceService from "@/services/serviceService";
import { ServiceDetail } from "@/types/service.types";
import useCreateTrip from "@/hooks/useCreateTrip";

export interface ServiceFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routeId: number;
}

const ServiceForm: React.FC<ServiceFormProps> = React.memo((props) => {
  const { routeId } = props;
  const [routeServices, setRouteServices] = useState<ServiceDetail[]>();
  const { Option } = Select;
  const [selectedServices, setSelectedServices] = useState<ServiceDetail[]>([]);
  const { setCreateTripForm, createTripForm } = useCreateTrip();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // use service
  const { fetchServiceRoute } = useServiceService();

  const columns: TableProps<ServiceDetail>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: "5%",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "img-url",
      width: "10%",
      key: "img-url",
      render: (text: string) => (
        <img src={text} alt="Service" style={{ width: "100%" }} />
      ),
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      width: "15%",
      className: "first-column",
    },
    {
      title: "Mô tả ngắn gọn",
      dataIndex: "short-description",
      width: "15%",
    },
    {
      title: "Mô tả chi tiết",
      dataIndex: "full-description",
      width: "20%",
    },
    {
      title: "Giá (FToken)",
      dataIndex: "default-price",
      width: "20%",
      render: (text, _record, index) =>
        text && (
          <InputNumber
            readOnly={isSubmitted}
            type="number"
            required
            value={text !== undefined ? text : 0}
            onChange={(value) => {
              const newData = [...selectedServices];
              if (value && value !== undefined) {
                newData[index]["default-price"] = value;
              }
              setSelectedServices(newData);
            }}
            min={1}
            max={999}
          />
        ),
    },
  ];

  const fetchServiceRouteData = useCallback(
    async (routeId: number) => {
      try {
        const res = await fetchServiceRoute(routeId);
        if (res) {
          setRouteServices(res?.data);
        }
      } catch (error) {
        console.error("Error fetching list buscompany:", error);
      }
    },
    [fetchServiceRoute],
  );

  useEffect(() => {
    fetchServiceRouteData(routeId);
  }, [routeId]);

  const handleServiceChange = useCallback(
    (value: any) => {
      if (value) {
        const selectedServicesData = value.map((id: number) => {
          const service = routeServices?.find((service) => service?.id == id);
          return service;
        });
        setSelectedServices(selectedServicesData);
        const selectedService = [];
        selectedService.push(selectedServicesData);
      }
    },
    [routeServices],
  );

  const handleSubmit = useCallback(async () => {
    if (selectedServices) {
      const convertedObject = {
        "trip-services": selectedServices.map((service: ServiceDetail) => {
          return {
            "service-id": service.id,
            price:
              service["default-price"] !== undefined
                ? service["default-price"]
                : 0,
          };
        }),
      };
      setCreateTripForm({
        ...createTripForm,
        "trip-services": convertedObject["trip-services"],
      });
      setIsSubmitted(true);
    }
  }, [createTripForm, selectedServices, setCreateTripForm]);

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="select-multiple"
        label="Dịch vụ"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn dịch vụ cho chuyến",
            type: "array",
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Chọn dịch vụ"
          onChange={handleServiceChange}
          disabled={isSubmitted}
        >
          {routeServices?.map((routeService, index) => (
            <Option key={index} value={`${routeService.id}`}>
              {routeService.name} - {routeService["station-name"]}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {selectedServices && selectedServices.length > 0 ? (
        <Table
          id="myTable"
          columns={columns}
          dataSource={
            selectedServices &&
            selectedServices.map((record: ServiceDetail) => ({
              ...record,
              key: record.id,
            }))
          }
          rowKey={(record) => record.id}
          pagination={false}
          className="my-2"
        />
      ) : (
        ""
      )}

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
  );
});

export default ServiceForm;
