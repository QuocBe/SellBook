import React from "react";
import { Layout, Menu } from "antd";
import { Outlet, Link } from "react-router-dom";
import {
  DashboardOutlined,
  BookOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "../../assets/style/Admin/Admin.scss";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="admin-sider">
        <div className="logo">SellBook Admin</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: <Link to="dashboard">Dashboard</Link>,
            },
            {
              key: "adminbooks",
              icon: <BookOutlined />,
              label: <Link to="adminbooks">Books</Link>,
            },
            {
              key: "categories",
              icon: <UnorderedListOutlined />,
              label: <Link to="categories">Categories</Link>,
            },
            {
              key: "orders",
              icon: <ShoppingCartOutlined />,
              label: <Link to="orders">Orders</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="admin-header">
          <h2>Admin Dashboard</h2>
        </Header>
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
