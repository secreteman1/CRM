import React from "react";
import {
  UserOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";

type MenuItem = Required<MenuProps>["items"][number];

const CustomMenu: React.FC = () => {
  const isAdmin = useSelector((state: RootStore) => state.Admin.isAdmin);

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
    ...(isAdmin
      ? [
          {
            key: "sub3",
            label: <Link to="/users">Пользователи</Link>,
            icon: <TeamOutlined />,
          },
        ]
      : []),
  ];

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
