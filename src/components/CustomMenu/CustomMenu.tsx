import React from "react";
import { UserOutlined, SolutionOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: <Link to="/todos">Список задач</Link>,
    icon: <SolutionOutlined />,
  },
  {
    key: "sub2",
    label: <Link to="/profile">Профиль</Link>,
    icon: <UserOutlined />,
  },
];

const CustomMenu: React.FC = () => {
  return (
    <Menu
      style={{ width: "300px", height: "100%" }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="vertical"
      items={items}
    />
  );
};

export default CustomMenu;
