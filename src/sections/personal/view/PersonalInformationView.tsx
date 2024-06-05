import React, { useCallback, useState } from "react";
import UploadImageUser from "../UploadImageUser";
import { Divider, Progress, Tag } from "antd";
import AccountInfo from "../AccountInfo";
import useAuth from "@/hooks/useAuth";
import { ROLE } from "@/constants";

const PersonalInformationView: React.FC = React.memo(() => {
  const role = useAuth((state) => state.role);
  const [, setFileChange] = useState<string>("");

  const handleFileChange = useCallback((newFileChange: string) => {
    setFileChange(newFileChange);
  }, []);

  return (
    <>
      <div className="rounded-t-xl p-5">
        <p className="text-2xl font-bold text-[#000000]">Thông tin cá nhân</p>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-1 rounded-3xl border border-gray-100 p-5 shadow-md">
            <div className="flex flex-col items-center">
              <div className="h-[110px]">
                <UploadImageUser
                  initialImage={""}
                  onFileChange={handleFileChange}
                />
              </div>
              <strong className="text-2xl">Duong Bao</strong>
              <Tag
                color={role === "ADMIN" ? "blue" : "red"}
                className="mt-2 rounded-md px-4 py-1"
              >
                {role}
              </Tag>
            </div>
            <Divider />
            <div>
              <strong>Tiến trình</strong>
              <Progress strokeLinecap="butt" percent={70} />
            </div>
            <Divider />
            <div className="">
              <strong className="">Mô tả bản thân</strong>
              {role === ROLE.ADMIN ? (
                <p>Tôi là admin quản lý hệ thống</p>
              ) : (
                <p>Tôi là công ty chuyên cung cấp các chuyến xe du lịch. </p>
              )}
            </div>
          </div>
          <div className="col-span-2 rounded-3xl border border-gray-100 p-5 shadow-md">
            <AccountInfo />
          </div>
        </div>
      </div>
    </>
  );
});

export default PersonalInformationView;
