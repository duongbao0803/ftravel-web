import React, { useState } from "react";
import { Button, Image, Input, Table, Tag } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, HomeOutlined } from "@ant-design/icons";
import ExportCompany from "./ExportCompany";
import AddCompanyModal from "./AddCompanyModal";
import useCompanyService from "@/services/companyService";
import { formatDate2 } from "@/util/validate";

export interface DataType {
  _id: string;
  key: string;
  name: string;
  image: string;
  description: string;
  quantity: number;
  typeOfProduct: string;
  price: number;
  rating: number;
}

const CompanyList: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { companys, totalCount, isFetching } = useCompanyService();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên nhà xe",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "img-url",
      width: "15%",
      render: (image) => (
        <Image
          src={image}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "100%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Email quản lý",
      dataIndex: "manager-email",
      width: "25%",
    },
    {
      title: "Mô tả ngắn gọn",
      dataIndex: "short-description",
      width: "15%",
    },
    {
      title: "Ngày tạo",
      dataIndex: "create-date",
      width: "10%",
    },

    {
      title: "Trạng thái",
      dataIndex: "is-deleted",
      render: (isDeleted) => {
        let statusText = "";
        let tagColor = "";
        switch (isDeleted) {
          case false:
            statusText = "ACTIVE";
            tagColor = "green";
            break;
          case true:
            statusText = "INACTIVE";
            tagColor = "pink";
            break;
          default:
            statusText = "UNKNOWN";
            tagColor = "gray";
            break;
        }
        return <Tag color={tagColor}>{statusText}</Tag>;
      },
      width: "10%",
    },
    // {
    //   title: "",
    //   dataIndex: "",
    //   render: (_, record) => (
    //     <>
    //       {" "}
    //       <DropdownCompanyFunc />
    //     </>
    //   ),
    // },
  ];

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <Input
            placeholder="Search by..."
            className="h-8 max-w-lg rounded-lg sm:mb-5 sm:w-[300px]"
          />
          <Button className="flex items-center" type="primary">
            <FilterOutlined className="align-middle" />
            Sắp xếp
          </Button>
        </div>
        <div className="flex gap-x-2">
          <div>
            <ExportCompany />
          </div>
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <HomeOutlined className="mr-1 text-lg" /> Thêm công ty
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={companys?.map(
          (record: { id: unknown; "create-date": string | Date }) => ({
            ...record,
            key: record.id,
            "create-date": formatDate2(record["create-date"]),
          }),
        )}
        pagination={{
          current: currentPage,
          total: totalCount || 0,
          pageSize: 5,
        }}
        onChange={handleTableChange}
        loading={isFetching}
        rowKey={(record) => record._id}
      />
      <AddCompanyModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default CompanyList;
