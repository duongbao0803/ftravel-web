/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
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

export interface MainFormProps {
  onFormSubmit: any;
}

const MainForm: React.FC<MainFormProps> = (props) => {
  const { onFormSubmit } = props;
  const [routes, setRoutes] = useState<RouteInfo[]>();
  const [ticketTypes, setTicketTypes] = useState<TicketTypeInfo[]>();
  const { Option } = Select;
  const [chooseRoute, setChooseRoute] = useState<number>(0);

  // use service
  const { companys } = useCompanyService();
  const { fetchRoutes } = useRouteService();
  const { fetchTicketTypeRoute } = useTicketService();
  const { users } = useUserService();
  const { setListTicketChoose } = useCreateTrip();

  const onFinish = (values: any) => {
    onFormSubmit("main", values);
  };

  const fetchDataRoute = async (page: number, buscompanyId: number) => {
    try {
      const res = await fetchRoutes(page, buscompanyId);
      if (res) {
        setRoutes(res?.data);
      }
      console.log("check routes", routes);
    } catch (error) {
      console.error("Error fetching list buscompany:", error);
    }
  };

  const handleChangeBuscompany = (buscompanyId: number) => {
    fetchDataRoute(1, buscompanyId);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const fetchDataTicketTypeRoute = async (routeId: number) => {
    const res = await fetchTicketTypeRoute(routeId);
    if (res && res.status === 200) {
      setTicketTypes(res.data);
    }
  };

  const handleChooseRoute = (routeId: number) => {
    setChooseRoute(routeId);
    fetchDataTicketTypeRoute(routeId);
  };

  const handleTicketTypeChange = (selectedValues: any) => {
    const selectedTicketNames = selectedValues?.map((id: number) => {
      const ticket = ticketTypes?.find((ticketType) => ticketType?.id == id);
      return ticket ? ticket : null;
    });
    setListTicketChoose(selectedTicketNames);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (values: any) => {
    await onFinish(values);
    setIsSubmitted(true);
  };

  return (
    <>
      <Form onFinish={handleSubmit} layout="vertical">
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
              <Input readOnly={isSubmitted} />
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
                format="YYYY-MM-DDTHH:mm"
                style={{ width: "100%" }}
                readOnly={isSubmitted}
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
                format="YYYY-MM-DDTHH:mm"
                style={{ width: "100%" }}
                readOnly={isSubmitted}
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
                format="YYYY-MM-DDTHH:mm"
                style={{ width: "100%" }}
                readOnly={isSubmitted}
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
              name="select-multiple"
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
          <Button type="primary" htmlType="submit" disabled={isSubmitted}>
            {isSubmitted ? "Đã xác nhận" : "Xác nhận thông tin chuyến"}
          </Button>
        </Form.Item>
      </Form>
      <ServiceForm onFormSubmit={onFormSubmit} routeId={chooseRoute} />
    </>
  );
};

export default MainForm;
