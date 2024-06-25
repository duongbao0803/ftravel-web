import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Space, Card, Row, Col } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import useRouteService from "@/services/routeService";
import { RouteDetailInfo } from "@/types/route.types";
import { UploadImage } from "@/components";
import AddRouteStationModal from "./AddRouteStationModal";

export interface DataType {
  _id: string;
  key: string;
  name: string;
  defaultPrice: number;
  imgUrl: [];
  quantity: number;
  shortDescription: string;
  fullDescription: string;
}

export interface RouteStationListProps {
  routeId: number;
}

const RouteStationList: React.FC<RouteStationListProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { routeId } = props;
  const [fileChange, setFileChange] = useState<string>("");
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [routeDetail, setRouteDetail] = useState<RouteDetailInfo | undefined>(
    undefined,
  );
  const { fetchRouteDetail, fetchServiceByStation } = useRouteService();
  const [serviceByStation, setServiceByStation] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchRouteDetail(routeId);
      if (res && res.status === 200) {
        setRouteDetail(res.data);
      }
    };

    fetchData();
  }, [routeId]);

  useEffect(() => {
    const routeStationsDetail = routeDetail?.["route-stations"]?.map(
      (routeStationDetail) => routeStationDetail?.station,
    );

    const fetchServiceStation = async (stationId: number) => {
      try {
        const res = await fetchServiceByStation(stationId);
        if (res && res.status === 200) {
          setServiceByStation(res.data);
        }
      } catch (error) {
        console.error(`Error fetching data for stationId ${stationId}:`, error);
      }
    };

    if (routeStationsDetail) {
      const routeStationIds = routeStationsDetail.map(
        (routeStation) => routeStation.id,
      );

      const fetchAllData = async () => {
        const fetchPromises = routeStationIds.map((routeStationId) =>
          fetchServiceStation(routeStationId),
        );
        await Promise.all(fetchPromises);
      };

      fetchAllData();
    }
  }, [routeDetail]);
  const routeStations = routeDetail?.["route-stations"]?.map(
    (routeStationDetail) => routeStationDetail,
  );

  useEffect(() => {
    form.setFieldsValue({ "img-url": fileChange });
  }, [fileChange, form]);

  const saveService = () => {
    console.log("aaaaa");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = useCallback((newFileChange: string) => {
    setFileChange(newFileChange);
  }, []);

  function remove(name: string | undefined) {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <AddRouteStationModal setIsOpen={setIsOpen} isOpen={isOpen} />

      <>
        {routeStations &&
          routeStations.length > 0 &&
          routeStations.map((station, stationIndex) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
              key={stationIndex}
            >
              <Card
                size="small"
                title={`Trạm ${station["station-index"]}: ${station?.station.name || ""}`}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(station?.station.name);
                    }}
                  />
                }
              >
                <Form
                  form={form}
                  name={`dynamic_form_complex_${stationIndex}`}
                  style={{ maxWidth: 600 }}
                  autoComplete="off"
                  initialValues={{ items: [{}] }}
                >
                  <Form.Item>
                    <Form.List name={[stationIndex, "list"]}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <Space key={subField.key}>
                              <Row gutter={24}>
                                <Col span={6}>
                                  <Form.Item
                                    name={[subField.name, "img-url"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Vui lòng chọn hình ảnh",
                                      },
                                    ]}
                                    colon={true}
                                    label="Hình ảnh"
                                    labelCol={{ span: 24 }}
                                    className="formItem"
                                  >
                                    <UploadImage
                                      onFileChange={(file) =>
                                        handleFileChange(file)
                                      }
                                      initialImage={
                                        serviceByStation?.[stationIndex]?.[
                                          "img-url"
                                        ] || ""
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={18}>
                                  <Row gutter={24}>
                                    <Col span={12}>
                                      <Form.Item
                                        noStyle
                                        name={[subField.name, "name"]}
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Vui lòng nhập tên dịch vụ",
                                          },
                                          {
                                            min: 5,
                                            message:
                                              "Tên phải có ít nhất 5 kí tự",
                                          },
                                        ]}
                                      >
                                        <Input
                                          placeholder="Tên dịch vụ"
                                          className="mb-3"
                                          defaultValue={
                                            serviceByStation?.[stationIndex]
                                              ?.name || ""
                                          }
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                      <Form.Item
                                        noStyle
                                        name={[subField.name, "default-price"]}
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Vui lòng nhập giá dịch vụ",
                                          },
                                          {
                                            type: "number",
                                            min: 1,
                                            max: 999,
                                            message:
                                              "Giá phải trong khoảng 1 đến 999",
                                          },
                                        ]}
                                      >
                                        <Input
                                          placeholder="Giá mặc định"
                                          type="number"
                                          className="mb-3"
                                          defaultValue={
                                            serviceByStation?.[stationIndex]?.[
                                              "default-price"
                                            ] || ""
                                          }
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>

                                  <Form.Item
                                    noStyle
                                    name={[subField.name, "short-description"]}
                                  >
                                    <Input
                                      className="mb-3"
                                      placeholder="Mô tả ngắn"
                                      defaultValue={
                                        serviceByStation?.[stationIndex]?.[
                                          "short-description"
                                        ] || ""
                                      }
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    noStyle
                                    name={[subField.name, "full-description"]}
                                  >
                                    <TextArea
                                      className="mb-3"
                                      placeholder="Mô tả"
                                      defaultValue={
                                        serviceByStation?.[stationIndex]?.[
                                          "full-description"
                                        ] || ""
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={24} className="text-right">
                                  <Form.Item>
                                    <Button
                                      type="primary"
                                      onClick={() => saveService()}
                                    >
                                      Lưu
                                    </Button>
                                  </Form.Item>
                                </Col>
                              </Row>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </Space>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => subOpt.add()}
                            block
                          >
                            + Add Sub Item
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          ))}
      </>

      {/* <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item> */}
    </>
  );
};

export default RouteStationList;
