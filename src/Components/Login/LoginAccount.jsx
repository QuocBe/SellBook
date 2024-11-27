import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { checkUserCredentials } from "../../service/checkUserCredentials"; // Adjust the path
import "../../assets/style/Pages/Login.scss";
import Navbar from "../../Components/Header/HeaderHome"; // Adjust the path

const { Title, Text } = Typography;

const LoginAccount = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const role = await checkUserCredentials(values.email, values.password);
      if (role === "admin") {
        message.success("Login successful as Admin!");
        localStorage.setItem("userEmail", values.email); // Save email
        localStorage.setItem("userName", "Admin"); // Admin name
        navigate("/adminlayout"); // Redirect to admin page
      } else if (role === "guest") {
        message.success("Login successful as Guest!");
        localStorage.setItem("userEmail", values.email); // Save email
        localStorage.setItem("userName", values.email.split("@")[0]); // Example: Set userName as email prefix
        navigate("/guest"); // Redirect to home page
      } else {
        message.error("Invalid credentials!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <Form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Title level={3} className="login-title">Sell Book</Title>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Login
            </Button>
          </Form.Item>
          <div className="login-links">
            <Text>Don't have an account?</Text>
            <Button type="link" onClick={() => navigate("/addaccount")}>
              Sign up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginAccount;
