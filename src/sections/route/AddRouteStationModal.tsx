import React, { useEffect, useState } from "react";
import { Modal, Form, Select } from "antd";
import useRouteService from "@/services/routeService";
import useStationService from "@/services/stationService";
import { StationInfo } from "@/types/station.types";
import { RouteDetailInfo } from "@/types/route.types";

export interface AddRouteStationProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  buscompanyId: number | undefined;
  route: RouteDetailInfo | undefined;
}

const AddRouteStationModal: React.FC<AddRouteStationProps> = React.memo(
  (props) => {
    const { Option } = Select;
    const { setIsOpen, isOpen, buscompanyId, route } = props;
    const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
    const { addNewRouteStationItem } = useRouteService();
    const { fetchStationByBuscompany } = useStationService();
    const [form] = Form.useForm();
    const [stations, setStaions] = useState<StationInfo[]>();

    useEffect(() => {
      if (buscompanyId) {
        const fetchData = async () => {
          const res = await fetchStationByBuscompany(buscompanyId);
          if (res && res.status === 200) {
            setStaions(res.data);
          }
        };
        fetchData();
      }
    }, [buscompanyId]);

    const handleOk = async () => {
      try {
        const values = await form.validateFields();
        const updateValues = {...values, "route-id":route?.id }
        setIsConfirmLoading(true);
        setTimeout(async () => {
          try {
            await addNewRouteStationItem(updateValues);
            form.resetFields();
            setIsConfirmLoading(false);
            setIsOpen(false);
          } catch (error) {
            setIsConfirmLoading(false);
            setIsOpen(true);
          }
        }, 1500);
      } catch (errorInfo) {
        console.error("Validation failed:", errorInfo);
      }
    };

    const handleCancel = () => {
      setIsOpen(false);
      form.resetFields();
    };

    const filterOption = (
      input: string,
      option?: { label: string; value: string },
    ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    return (
      <Modal
        title={<p className="text-lg text-[red]">Thêm trạm dừng</p>}
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
            <span className="font-bold">{route?.name}</span>
          </p>
        </div>
        <Form name="normal_login" className="login-form" form={form}>
          <Form.Item
            name="station-id"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn trạm",
              },
            ]}
            colon={true}
            label="Tên trạm"
            labelCol={{ span: 24 }}
          >
            <Select
              showSearch
              placeholder="Chọn trạm"
              optionFilterProp="children"
              filterOption={filterOption}
            >
              {stations &&
                stations.map((station: StationInfo, index: number) => (
                  <Option key={index} value={station.id} label={station.name}>
                    {`${station.name}`}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="station-index"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thứ tự trạm",
              },
            ]}
            colon={true}
            label="Thứ tự trạm"
            labelCol={{ span: 24 }}
            className="formItem"
          >
            <Select placeholder="Thứ tự" optionFilterProp="children">
              <Option value={1}>Trạm 1</Option>
              <Option value={2}>Trạm 2</Option>
              <Option value={3}>Trạm 3</Option>
              <Option value={4}>Trạm 4</Option>
              <Option value={5}>Trạm 5</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  },
);

export default AddRouteStationModal;
