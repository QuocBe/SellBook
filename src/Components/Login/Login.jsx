import React, { useState } from "react";
import { Button, Form, Input, Typography, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth"; 
import { firebaseConfig } from "../../../firebaseConfig"; 

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const auth = getAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      message.success("Login successful!");
      console.log("Logged in user:", userCredential.user);
      navigate("/LoginManager"); 
    } catch (error) {
      console.error("Login error:", error);
      message.error("Failed to login. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleFailure = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Spin
      spinning={loading}
      tip="Logging in..."
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        {...formItemLayout}
        onFinish={handleSubmit}
        onFinishFailed={handleFailure}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Login
        </Title>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default Login;
