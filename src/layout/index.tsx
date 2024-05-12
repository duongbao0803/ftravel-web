import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FloatButton, Layout, Menu, notification } from "antd";
import {
  PieChartOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";

interface LayoutProps {
  children: React.ReactNode;
}
interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label?: string;
  path?: string;
  children?: MenuItem[];
}

const { Content, Sider, Footer } = Layout;

function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  path?: string
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    path,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Chart", "1", <PieChartOutlined />, undefined, "/chart"),
  getItem(
    "User",
    "sub1",
    <UserOutlined />,
    [
      getItem("Admin", "3", undefined, undefined, "/admin"),
      getItem("Staff", "4", undefined, undefined, "/staff"),
      getItem("Customer", "5", undefined, undefined, "/customer"),
    ],
    "/user"
  ),
  getItem(
    "Team",
    "sub2",
    <TeamOutlined />,
    [
      getItem("Team 1", "6", undefined, undefined, "/option2"),
      getItem("Team 2", "7", undefined, undefined, "/option2"),
    ],
    "/team"
  ),
  getItem("Files", "8", <FileOutlined />, undefined, "/option2"),
];

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const storeDefaultSelectedKeys = (keys: string) => {
    sessionStorage.setItem("keys", keys);
  };

  const resetDefaultSelectedKeys = () => {
    const selectedKeys = sessionStorage.getItem("keys");
    return selectedKeys ? selectedKeys : ["1"];
  };

  const defaultSelectedKeys = useMemo(() => resetDefaultSelectedKeys(), []);

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      if (item && item.children && item.children.length > 0) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => storeDefaultSelectedKeys([item.key])}
          >
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        );
      }
    });
  };

  const handleLogout = () => {
    notification.success({
      message: "Logout Successful",
      description: "You have successfully logged out",
      duration: 2,
    });
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        width={230}
        breakpoint="lg"
        collapsedWidth="55"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="scrollbar sider overflow-auto min-h-screen left-0 top-0 bottom-0 box-border z-50 flex-none w-56 overflow-y-auto"
        theme="light"
        collapsible
      >
        <div className="demo-logo-vertical" />
        <div className="flex justify-center my-4">
          <img
            className="w-5/12 object-cover select-none"
            src="https://insacmau.com/wp-content/uploads/2023/02/logo-FPT-Polytechnic-.png"
            alt=""
          />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          className="select-none"
        >
          {renderMenuItems(items)}
        </Menu>
      </Sider>
      <Layout className="right-bar overflow-y-auto transition-all duration-[600ms] ease-in-out">
        <div className="header pr-4 flex justify-end gap-2 items-center fixed z-[1000] h-16 shadow-none bg-[#f8f8f8] bg-opacity-80 backdrop-blur-[6px]">
          <>
            <img
              className="w-[42px] h-[42px] rounded-full border object-cover ring-2 ring-gray-300 hover:ring-[#0077ff]"
              src="https://maimoikethon.com/sieu-nhan-gao-do-chibi/imager_5946.jpg"
            />
          </>

          <div className="flex flex-col">
            <strong>Dương Bảo</strong>
            <div
              className="text-[#5099ff] font-semibold hover:underline cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        </div>
        <Content className="mt-[80px] mx-4 ">
          <div className="rounded-xl overflow-x-auto min-w-[250px] bg-[#fff]">
            {children}
          </div>
        </Content>
        <Footer className="text-center">
          Copyright @2024 Baobatluc. All right reserved
        </Footer>
        <FloatButton.BackTop />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
