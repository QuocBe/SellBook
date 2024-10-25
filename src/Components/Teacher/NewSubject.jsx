import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createSubject } from "../../service/firestoreService"; // Import hàm tạo môn học

const { TextArea } = Input;

const NewSubject = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Hàm xử lý khi ấn "Submit"
  const onFinish = async (values) => {
    try {
      const subjectData = {
        ...values,
        createdAt: new Date().toISOString(), // Ngày tạo
      };

      const result = await createSubject(subjectData);

      if (result.success) {
        message.success("Subject added successfully!");
        navigate("/subject"); // Điều hướng về trang quản lý môn học
      } else {
        message.error("Failed to add subject");
      }
    } catch (error) {
      console.error("Error creating subject:", error);
      message.error("An error occurred while creating the subject.");
    }
  };

  return (
    <div style={{ padding: "24px 0", background: "#fff", maxWidth: "1000px", margin: "auto" }}>
      <h2>Add New Subject</h2>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="Name Subject" name="name" rules={[{ required: true, message: "Please input the subject name!" }]}>
          <Input placeholder="Enter subject name" />
        </Form.Item>

        {/* Chuyển Description sang Department */}
        <Form.Item label="Department" name="department" rules={[{ required: true, message: "Please input the department!" }]}>
          <TextArea rows={4} placeholder="Enter department" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Subject
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewSubject;
