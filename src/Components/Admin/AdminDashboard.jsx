import React from 'react';
import { Layout, Menu, Table, Tag, DatePicker } from 'antd';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  LineChartOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  GiftOutlined,
} from '@ant-design/icons';
import '../../assets/style/Admin/Admin.scss';

const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;

const columns = [
  { title: 'Id', dataIndex: 'id', key: 'id' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Price', dataIndex: 'price', key: 'price' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color = status === 'Pending' ? 'red' : status === 'Completed' ? 'green' : 'blue';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  { title: 'Action', key: 'action', render: () => <a>Settings</a> },
];

const data = [
  {
    id: '#2632',
    name: 'Brooklyn Zoe',
    address: '302 Snider Street, RUTLAND, VT, 05701',
    date: '31 Jul 2020',
    price: '$64.00',
    status: 'Pending',
  },
  // Thêm dữ liệu khác ở đây
];

const AdminDashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="admin-sider">
        <div className="logo">eProduct</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
            Order
          </Menu.Item>
          <Menu.Item key="3" icon={<LineChartOutlined />}>
            Statistic
          </Menu.Item>
          <Menu.Item key="4" icon={<AppstoreOutlined />}>
            Product
          </Menu.Item>
          <Menu.Item key="5" icon={<DatabaseOutlined />}>
            Stock
          </Menu.Item>
          <Menu.Item key="6" icon={<GiftOutlined />}>
            Offer
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="admin-header">
          <div className="header-content">
            <span>Order</span>
            <RangePicker />
          </div>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <h2>28 orders found</h2>
          <Table columns={columns} dataSource={data} rowClassName={(record) => (record.status === 'Pending' ? 'row-pending' : '')} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
