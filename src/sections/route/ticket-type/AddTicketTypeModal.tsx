import React, { useEffect, useState } from "react";
import { Modal, Form, Select, InputNumber, notification } from "antd";
import useRouteService from "@/services/routeService";
import { RouteDetailInfo } from "@/types/route.types";
import useTicketService from "@/services/ticketService";

export interface AddTicketTypeProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  routeId: number;
  ticketTypeName: string[] | undefined;
}

const AddTicketTypeModal: React.FC<AddTicketTypeProps> = React.memo((props) => {
  const { Option } = Select;
  const { setIsOpen, isOpen, routeId, ticketTypeName } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { fetchRouteDetail } = useRouteService();
  const { addNewTicketTypeItem, fetchTicketTypeRoute } =
    useTicketService(routeId);
  const [form] = Form.useForm();
  const [routeDetail, setRouteDetail] = useState<RouteDetailInfo>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchRouteDetail(routeId);
      if (res && res.status === 200) {
        setRouteDetail(res.data);
      }
    };

    fetchData();
  }, [routeId]);

  // useEffect(() => {
  //   if (buscompanyId) {
  //     const fetchData = async () => {
  //       const res = await fetchStationByBuscompany(buscompanyId);
  //       if (res && res.status === 200) {
  //         setStaions(res.data);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [buscompanyId]);

  const handleOk = async () => {
    try {
      console.log("check ticketTypeName", ticketTypeName);
      const values = await form.validateFields();
      console.log(values.name);
      if (ticketTypeName) {
        const nameExists = Array.isArray(ticketTypeName)
          ? ticketTypeName.includes(values?.name)
          : ticketTypeName === values?.name;
        if (nameExists) {
          notification.warning({
            message: "Thêm không thành công",
            description: "Vé đã tồn tại",
            duration: 2,
          });
        }
        return;
      }
      const updateValues = { ...values, "route-id": routeId };
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewTicketTypeItem(updateValues);
          form.resetFields();
          setIsConfirmLoading(false);
          setIsOpen(false);
        } catch (error) {
          setIsConfirmLoading(false);
          setIsOpen(true);
        }
      }, 1500);
      console.log("chjeck routeId", routeId);
      await fetchTicketTypeRoute(routeId);
    } catch (errorInfo) {
      console.error("Validation failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Thêm loại vé</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
      okText="Tạo mới"
      cancelText="Hủy"
    >
      <div>
        <p>
          Tuyến đường áp dụng:{" "}
          <span className="font-bold">{routeDetail?.name}</span>
        </p>
      </div>
      <Form name="normal_login" className="login-form" form={form}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại vé",
            },
          ]}
          colon={true}
          label="Loại vé"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Select placeholder="Loại vé" optionFilterProp="children">
            <Option value="Normal">Vé thường</Option>
            <Option value="VIP">Vé VIP</Option>
            <Option value="SVIP">Vé SVIP</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="price"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giá vé",
            },
          ]}
          colon={true}
          label="Giá vé (FToken)"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <InputNumber className="w-full" type="number" min={10} max={10000} />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default AddTicketTypeModal;
