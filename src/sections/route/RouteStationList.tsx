import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Table,
  Tag,
  Form,
  Input,
  Space,
  Typography,
  Card,
  Row,
  Col,
} from "antd";
import type { TablePaginationConfig } from "antd";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import useRouteService from "@/services/routeService";
import { StationInfo } from "@/types/station.types";
import { CommonStatusString } from "@/enums/enums";
import { RouteDetailInfo } from "@/types/route.types";
import { ColumnsType } from "antd/es/table";
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
  const [, setCurrentPage] = useState<number>(1);
  const [fileChange, setFileChange] = useState<string>("");
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };
  const [routeDetail, setRouteDetail] = useState<RouteDetailInfo | undefined>(
    undefined,
  );
  const { fetchRouteDetail, isFetching } = useRouteService();
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
    form.setFieldsValue({ "img-url": fileChange });
  }, [fileChange, form]);

  const routeStations = routeDetail?.["route-stations"]?.map(
    (routeStationDetail) => routeStationDetail?.station,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = useCallback((newFileChange: string) => {
    setFileChange(newFileChange);
  }, []);

  const saveService = () => {
    console.log("aaaaa");
  };

  // useEffect(() => {
  //   form.setFieldsValue({
  //     stations: routeStations,
  //   });
  // }, [routeStations, form]);

  console.log("Check station route", routeStations);

  return (
    <>
      <AddRouteStationModal setIsOpen={setIsOpen} isOpen={isOpen} />

        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{
                display: "flex",
                rowGap: 16,
                flexDirection: "column",
              }}
            >
              {routeStations &&
                routeStations.length &&
                routeStations.map((station, stationIndex) =>
                    <Card
                      size="small"
                      title={`Trạm ${stationIndex + 1}: ${station?.name || ""}`}
                      key={station.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(station.name);
                          }}
                        />
                      }
                    >
                        <Form.List name={[station.name, "list"]}>
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
                                        name="img-url"
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
                                          onFileChange={handleFileChange}
                                          initialImage={""}
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
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                          <Form.Item
                                            noStyle
                                            name={[
                                              subField.name,
                                              "default-price",
                                            ]}
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Vui lòng nhập giá dịch vụ",
                                              },
                                              {
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
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>

                                      <Form.Item
                                        noStyle
                                        name={[
                                          subField.name,
                                          "short-description",
                                        ]}
                                      >
                                        <Input
                                          className="mb-3"
                                          placeholder="Mô tả ngắn"
                                        />
                                      </Form.Item>
                                      <Form.Item
                                        noStyle
                                        name={[
                                          subField.name,
                                          "full-description",
                                        ]}
                                      >
                                        <TextArea
                                          className="mb-3"
                                          placeholder="Mô tả"
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
                                + Thêm dịch vụ cho trạm
                              </Button>
                            </div>
                          )}
                        </Form.List>
                    </Card>
                )}

              <Button type="dashed" onClick={() => setIsOpen(true)} block>
                + Thêm trạm
              </Button>
            </div>
          )}
        </Form.List>

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
