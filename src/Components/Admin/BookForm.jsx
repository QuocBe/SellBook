import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { ref, get, update, push } from "firebase/database";
import { database } from "../../../firebaseConfig";

const { Option } = Select;

const BookForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Nhận ID sách từ URL nếu chỉnh sửa
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const snapshot = await get(ref(database, `Books/${id}`));
          if (snapshot.exists()) {
            const bookData = snapshot.val();
            form.setFieldsValue(bookData);
            if (bookData.image) {
              setFileList([
                {
                  uid: "-1",
                  name: "image.png",
                  status: "done",
                  url: bookData.image,
                },
              ]);
            }
          } else {
            message.error("Book not found!");
            navigate("/adminlayout/adminbooks");
          }
        } catch (error) {
          message.error("Failed to fetch book details.");
        }
      };
      fetchBook();
    }
  }, [id, form, navigate]);

  const handleSave = async (values) => {
    try {
      const imageUrl = fileList[0]?.url || null;
      const updatedValues = { ...values, image: imageUrl };

      if (id) {
        // Cập nhật sách
        await update(ref(database, `Books/${id}`), updatedValues);
        message.success("Book updated successfully!");
      } else {
        // Thêm sách mới
        const newBookRef = push(ref(database, "Books"));
        await update(newBookRef, updatedValues);
        message.success("Book added successfully!");
      }
      navigate("/adminlayout/adminbooks");
    } catch (error) {
      message.error("Failed to save book.");
    }
  };

  const handleUpload = ({ file }) => {
    if (file.status === "done") {
      const uploadedFile = {
        uid: file.uid,
        name: file.name,
        status: file.status,
        url: URL.createObjectURL(file.originFileObj),
      };
      setFileList([uploadedFile]);
    } else if (file.status === "removed") {
      setFileList([]);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>{id ? "Edit Book" : "Add Book"}</h2>
      <Form form={form} onFinish={handleSave} layout="vertical">
        <Form.Item name="name" label="Book Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select placeholder="Select a category">
            <Option value="Children">Children</Option>
            <Option value="History">History</Option>
            <Option value="Fiction">Fiction</Option>
            <Option value="Thriller">Thriller</Option>
            <Option value="Romance">Romance</Option>
            <Option value="Comics">Comics</Option>
          </Select>
        </Form.Item>
        <Form.Item name="language" label="Language">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="size" label="Size">
          <Input />
        </Form.Item>
        <Form.Item name="pages" label="Pages">
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="textBy" label="Text By">
          <Input />
        </Form.Item>
        <Form.Item label="Upload Image">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUpload}
            maxCount={1}
            beforeUpload={() => false} // Prevent automatic upload
          >
            {fileList.length < 1 && (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {id ? "Update Book" : "Add Book"}
          </Button>
          <Button style={{ marginLeft: "10px" }} onClick={() => navigate("/adminlayout/adminbooks")}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookForm;
