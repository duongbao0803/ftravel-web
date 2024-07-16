/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, DatePicker, Select, Button, Row, Col } from "antd";
import useCompanyService from "@/services/companyService";
import useRouteService from "@/services/routeService";
import { RouteInfo } from "@/types/route.types";
import { CompanyInfo } from "@/types/company.types";
import useTicketService from "@/services/ticketService";
import { TicketTypeInfo } from "@/types/ticket.types";
import { UserInfoDetail } from "@/types/auth.types";
import useUserService from "@/services/userService";
import useCreateTrip from "@/hooks/useCreateTrip";
import ServiceForm from "./ServiceForm";
import moment from "moment";

const MainForm: React.FC = React.memo(() => {
  const [routes, setRoutes] = useState<RouteInfo[]>();
  const [ticketTypes, setTicketTypes] = useState<TicketTypeInfo[]>();
  const { Option } = Select;
  const [chooseRoute, setChooseRoute] = useState<number>(0);

  // use service
  const { companys } = useCompanyService();
  const { fetchRoutes } = useRouteService();
  const { fetchTicketTypeRoute } = useTicketService();
  const { users } = useUserService();
  const { setListTicketChoose, setCreateTripForm, createTripForm } =
    useCreateTrip();
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (createTripForm && Object.keys(createTripForm).length > 0) {
      form.setFieldsValue({ createTripForm });
    }
  }, [createTripForm, form]);

  const fetchDataRoute = useCallback(
    async (page: number, buscompanyId: number) => {
      try {
        const res = await fetchRoutes(page, buscompanyId);
        if (res) {
          setRoutes(res?.data);
        }
      } catch (error) {
        console.error("Error fetching list buscompany:", error);
      }
    },
    [fetchRoutes, routes],
  );

  const handleChangeBuscompany = useCallback(
    (buscompanyId: number) => {
      fetchDataRoute(1, buscompanyId);
    },
    [fetchDataRoute],
  );

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const fetchDataTicketTypeRoute = useCallback(
    async (routeId: number) => {
      const res = await fetchTicketTypeRoute(routeId);
      if (res && res.status === 200) {
        setTicketTypes(res.data);
      }
    },
    [fetchTicketTypeRoute],
  );

  const handleChooseRoute = useCallback((routeId: number) => {
    setChooseRoute(routeId);
    fetchDataTicketTypeRoute(routeId);
  }, []);

  const handleTicketTypeChange = useCallback(
    (selectedValues: any) => {
      const selectedTicketNames = selectedValues?.map((id: number) => {
        const ticket = ticketTypes?.find((ticketType) => ticketType?.id == id);
        return ticket ? ticket : null;
      });
      setListTicketChoose(selectedTicketNames);
    },
    [setListTicketChoose, ticketTypes],
  );

  const handleSubmit = useCallback(
    async (values: any) => {
      const formattedValues = {
        ...values,
        "open-ticket-date": values["open-ticket-date"].format(
          "YYYY-MM-DDTHH:mm:ss",
        ),
        "estimated-start-date": values["estimated-start-date"].format(
          "YYYY-MM-DDTHH:mm:ss",
        ),
        "estimated-end-date": values["estimated-end-date"].format(
          "YYYY-MM-DDTHH:mm:ss",
        ),
      };
      setCreateTripForm(formattedValues);
      setIsSubmitted(true);
    },
    [setCreateTripForm],
  );

  const disabledDate = (current: object) => {
    return current && current < moment().startOf("day");
  };

  return (
    <>
      <Form onFinish={handleSubmit} layout="vertical" form={form}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="bus-company-id"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn nhà xe",
                },
              ]}
              label="Nhà xe"
              className="formItem"
            >
              <Select
                showSearch
                placeholder="Chọn nhà xe"
                optionFilterProp="children"
                filterOption={filterOption}
                onChange={(value) => handleChangeBuscompany(value)}
                disabled={isSubmitted}
              >
                {companys.map((company: CompanyInfo, index: number) => (
                  <Option
                    key={index}
                    value={`${company.id}`}
                    label={company.name}
                  >
                    {`${company.name}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tuyến đường"
              name="route-id"
              rules={[{ required: true, message: "Vui lòng chọn tuyến đường" }]}
            >
              <Select
                placeholder="Chọn tuyến đường"
                onChange={(value) => handleChooseRoute(value)}
                disabled={isSubmitted}
              >
                {routes?.map((route, index) => (
                  <Option key={index} value={route.id}>
                    {route?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tên chuyến xe"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập chuyến xe" }]}
            >
              <Input placeholder="Chuyến xe" readOnly={isSubmitted} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngày bán vé"
              name="open-ticket-date"
              rules={[{ required: true, message: "Hãy chọn ngày bán vé" }]}
            >
              <DatePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                className="w-full"
                disabled={isSubmitted}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngày xuất phát (dự kiến)"
              name="estimated-start-date"
              rules={[{ required: true, message: "Hãy chọn ngày xuất phát" }]}
            >
              <DatePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                className="w-full"
                disabled={isSubmitted}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngày hoàn thành chuyến (dự kiến)"
              name="estimated-end-date"
              rules={[{ required: true, message: "Hãy chọn ngày hoàn thành" }]}
            >
              <DatePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                className="w-full"
                disabled={isSubmitted}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tài xế"
              name="driver-id"
              rules={[{ required: true, message: "Hãy chọn tài xế" }]}
            >
              <Select
                showSearch
                placeholder="Chọn tài xế"
                optionFilterProp="children"
                disabled={isSubmitted}
              >
                {users.map((user: UserInfoDetail, index: number) => (
                  <Option key={index} value={`${user.id}`} label={user.email}>
                    {`${user.email}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ticket-type-ids"
              label="Loại vé"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại vé cho chuyến",
                  type: "array",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn loại vé"
                onChange={handleTicketTypeChange}
                disabled={isSubmitted}
              >
                {ticketTypes?.map((ticketType, index) => (
                  <Option key={index} value={`${ticketType.id}`}>
                    {ticketType.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

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
      <ServiceForm routeId={chooseRoute} />
    </>
  );
});

export default MainForm;
