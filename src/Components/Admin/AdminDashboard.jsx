import React, { useEffect, useState } from 'react';
import { Layout, Menu, Table, Button, Modal, Form, Input, Tag, message } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ref, get, remove, update } from 'firebase/database';
import { database } from '../../../firebaseConfig'; // Đảm bảo đường dẫn chính xác
import '../../assets/style/Admin/Admin.scss';

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null); // Lưu tài khoản đang chỉnh sửa
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const dbRef = ref(database, 'Account');
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const accountsData = snapshot.val();
        const formattedAccounts = Object.keys(accountsData).map((key) => ({
          id: key,
          ...accountsData[key],
        }));
        setAccounts(formattedAccounts);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
      message.error('Failed to fetch accounts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleEdit = (account) => {
    setEditingAccount(account);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const accountRef = ref(database, `Account/${id}`);
      await remove(accountRef);
      message.success('Account deleted successfully!');
      fetchAccounts(); // Refresh the account list
    } catch (error) {
      console.error('Error deleting account:', error);
      message.error('Failed to delete account.');
    }
  };

  const handleSave = async (values) => {
    try {
      const accountRef = ref(database, `Account/${editingAccount.id}`);
      await update(accountRef, values);
      message.success('Account updated successfully!');
      setIsModalVisible(false);
      setEditingAccount(null);
      fetchAccounts();
    } catch (error) {
      console.error('Error updating account:', error);
      message.error('Failed to update account.');
    }
  };

  const columns = [
    
    { title: 'Name', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role', render: (role) => <Tag color={role === 'admin' ? 'blue' : 'green'}>{role}</Tag> },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="admin-sider">
        <div className="logo">SellBook</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Manage Accounts
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="admin-header">
          <h2>Admin Dashboard</h2>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <h3>Account Management</h3>
          <Table
            columns={columns}
            dataSource={accounts}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 5 }}
          />
        </Content>
      </Layout>

      {/* Modal for editing account */}
      <Modal
        title="Edit Account"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={editingAccount}
          onFinish={handleSave}
          layout="vertical"
        >
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input the username!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select the role!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AdminDashboard;
