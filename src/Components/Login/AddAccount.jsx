import React, { useState } from "react";
import { Button, Form, Input, Typography, message, Select, Spin } from "antd";
import axios from "axios";
import { firebaseConfig } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import '../../assets/style/Pages/AddAccount.scss';
import Navbar from "../../Components/Header/HeaderHome";

const { Title } = Typography;

const AddAccount = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Tạo tài khoản Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const userUID = userCredential.user.uid;

      // Lưu thông tin tài khoản vào Firebase Realtime Database
      await axios.post(`${firebaseConfig.databaseURL}/Account.json`, {
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role,
        userId: userUID,
      });

      message.success("User added successfully!");
      form.resetFields();
      // Điều hướng về trang đăng nhập sau khi tạo tài khoản
      navigate("/login");  // Đảm bảo điều hướng đúng trang đăng nhập
    } catch (error) {
      console.error("Error adding user:", error);
      message.error("Failed to add user.");
    } finally {
      setLoading(false);
    }
  };

  const handleFailure = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="add-account-page">
      <Navbar /> {/* Include the header */}
      <div className="add-account-container">
        <Spin spinning={loading} tip="Submitting...">
          <Form
            name="add-account"
            className="add-account-form"
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={handleFailure}
          >
            <Title level={3} className="add-account-title">
              Add New Account
            </Title>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please input the Username!" }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, type: "email", message: "Please input a valid email!" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input the Password!" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="role"
              rules={[{ required: true, message: "Please select the Role!" }]}
            >
              <Select placeholder="Select a Role">
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="guest">Guest</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="add-account-button">
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              <div className="already-have-account">
                <Button type="link" onClick={() => navigate("/login")}>
                ALREADY HAVE AN ACCOUNT?
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default AddAccount;
