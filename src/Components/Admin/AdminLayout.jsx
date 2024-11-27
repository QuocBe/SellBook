import React from "react";
import { Layout, Menu } from "antd";
import { Outlet, Link } from "react-router-dom";
import { DashboardOutlined, BookOutlined } from "@ant-design/icons";
import "../../assets/style/Admin/Admin.scss";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="admin-sider">
        <div className="logo">SellBook</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="dashboard">All Accounts</Link>
          </Menu.Item>
          <Menu.Item key="adminbooks" icon={<BookOutlined />}>
            <Link to="adminbooks">Books Management</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="admin-header">
          <h2>Admin Panel</h2>
        </Header>
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
