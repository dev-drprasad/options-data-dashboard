import { Layout, Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

import "./Skeleton.scss";

const { Content, Sider } = Layout;

interface Props {
  children: React.ReactNode;
}

enum MenuKey {
  CHART = "CHART",
  TABLE = "TABLE",
}

function Skeleton({ children }: Props) {
  const defaultSelectedKey = location.pathname === "/" ? MenuKey.CHART : location.pathname.slice(1);

  return (
    <Layout>
      <Sider>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[defaultSelectedKey]} defaultOpenKeys={[MenuKey.CHART]} mode="inline">
          <Menu.Item key={MenuKey.CHART}>
            <NavLink to="/">Charts</NavLink>
          </Menu.Item>
          <Menu.Item key={MenuKey.TABLE}>
            <NavLink to="table">Table</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content id="main">{children}</Content>
      </Layout>
    </Layout>
  );
}

export default Skeleton;
