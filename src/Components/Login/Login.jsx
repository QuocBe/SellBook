import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../assets/style/Pages/Login.scss';
import { checkAdminCredentials } from '../../service/realtimeDatabaseService';

const { Title } = Typography;

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const isAdmin = await checkAdminCredentials(values.username, values.password);
    if (isAdmin) {
      navigate('/admin'); // Điều hướng tới trang Admin
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Title level={2}>Admin Login</Title>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
