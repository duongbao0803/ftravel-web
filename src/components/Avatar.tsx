import React from "react";
import { Dropdown, MenuProps } from "antd";
import { Link } from "react-router-dom";

const Avatar: React.FC = () => {
  const items: MenuProps["items"] = [
    {
      label: (
        <div className="hover:bg-transparent pointer-events-none">
          <p>Duong Bao</p>
          <p>duongbao2k3@gmail.com</p>
        </div>
      ),
      key: "0",
      disabled: true,
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          View profile
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <Link to="/" rel="noopener noreferrer">
          Sign Out
        </Link>
      ),
      key: "2",
    },
  ];
  return (
    <>
      <div className="">
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          className="hover:bg-transparent"
        >
          <img
            src="https://insacmau.com/wp-content/uploads/2023/02/logo-FPT-Polytechnic-.png"
            alt=""
            className="w-10 h-10 rounded-full cursor-pointer object-cover ring-2 ring-gray-300 hover:ring-[orange]"
          />
        </Dropdown>
      </div>
    </>
  );
};

export default Avatar;
