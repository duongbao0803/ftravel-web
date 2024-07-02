import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import useCompanyService from "@/services/companyService";
import { CompanyInfo } from "@/types/company.types";
import useRouteService from "@/services/routeService";
import { RouteInfo } from "@/types/route.types";
import useUserService from "@/services/userService";
import { UserInfoDetail } from "@/types/auth.types";
import useTicketService from "@/services/ticketService";
import { TicketTypeInfo } from "@/types/ticket.types";

export interface CreateTripInfoProps {
  tripId: number;
}

const CreateTripInfoView: React.FC<CreateTripInfoProps> = () => {

  const { Option } = Select;

  // const [tripDetail, setTripDetail] = useState<TripDetailInfo>();

  const [routes, setRoutes] = useState<RouteInfo[]>();
  const [ticketTypes, setTicketTypes] = useState<TicketTypeInfo[]>();

  const { companys } = useCompanyService();

  const { fetchRoutesBuscompany } = useRouteService();

  const { users } = useUserService();

  const { fetchTicketTypeRoute } = useTicketService();

  // const fetchData = async (routeId: number) => {
  //   try {
  //     const res = await fetchTripDetail(routeId);
  //     if (res && res.status === 200) {
  //       setTripDetail(res.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching station detail:", error);
  //   }
  // };

  const fetchDataTicketTypeRoute = async (routeId: number) => {
    const res = await fetchTicketTypeRoute(routeId);
    if (res && res.status === 200) {
      setTicketTypes(res.data);
    }
  };

  const fetchDataRoute = async (page: number, buscompanyId: number) => {
    try {
      const res = await fetchRoutesBuscompany(page, buscompanyId);
      if (res && res.status === 200) {
        setRoutes(res.data);
      }
    } catch (error) {
      console.error("Error fetching list buscompany:", error);
    }
  };

  // useEffect(() => {
  //   fetchData(tripId);
  // }, [tripId]);

  // const { RangePicker } = DatePicker;

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

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleChangeBuscompany = (buscompanyId: number) => {
    fetchDataRoute(1, buscompanyId);
  };

  const handleChooseRoute = (routeId: number) => {
    fetchDataTicketTypeRoute(routeId);
  };

  return (
    <>
      <Form {...formItemLayout} style={{ maxWidth: 1000 }}>
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
          >
            {companys.map((company: CompanyInfo, index: number) => (
              <Option key={index} value={`${company.id}`} label={company.name}>
                {`${company.name}`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Tuyến đường"
          name="route-id"
          rules={[{ required: true, message: "Vui lòng chọn tuyến đường" }]}
        >
          <Select
            placeholder="Chọn tuyến đường"
            onChange={(value) => handleChooseRoute(value)}
          >
            {routes?.map((route, index) => (
              <Option key={index} value={route.id}>
                {route.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Tên chuyến xe"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập chuyến xe" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày bán vé"
          name="open-ticket-date"
          rules={[{ required: true, message: "Hãy chọn ngày bán vé" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Ngày xuất phát (dự kiến)"
          name="estimated-start-date"
          rules={[{ required: true, message: "Hãy chọn ngày xuất phát" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Ngày hoàn thành chuyến (dự kiến)"
          name="estimated-end-date"
          rules={[{ required: true, message: "Hãy chọn ngày hoàn thành" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Tài xế"
          name="driver-id"
          rules={[{ required: true, message: "Hãy chọn tài xế" }]}
        >
          <Select
            showSearch
            placeholder="Chọn tài xế"
            optionFilterProp="children"
          >
            {users.map((user: UserInfoDetail, index: number) => (
              <Option key={index} value={`${user.id}`} label={user.email}>
                {`${user.email}`}
              </Option>
            ))}
          </Select>
        </Form.Item>

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
          <Select mode="multiple" placeholder="Chọn loại vé">
            {ticketTypes?.map((ticketType, index) => (
              <Option key={index} value={ticketType.id}>
                {ticketType.name}
              </Option>
            ))}
          </Select>
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
