import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { ref, get, update, push } from "firebase/database";
import { database, storage } from "../../../firebaseConfig";
import { uploadBytesResumable, getDownloadURL, ref as storageRef } from "firebase/storage";

const { Option } = Select;

const BookForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Nhận ID sách từ URL nếu chỉnh sửa
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

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
    setUploading(true);
    try {
      let imageUrl = null;
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        const storageReference = storageRef(storage, `Books/${file.name}`);
        const uploadTask = uploadBytesResumable(storageReference, file);

        imageUrl = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      }

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
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = ({ file, fileList }) => {
    setFileList(fileList.slice(-1));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>{id ? "Edit Book" : "Add Book"}</h2>
      <Form form={form} onFinish={handleSave} layout="vertical">
        <Form.Item name="name" label="Book Name" rules={[{ required: true }]}>
          <Input placeholder="Enter book name (e.g., Harry Potter)" />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} placeholder="Enter price (e.g., 20.99)" />
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
          <Input placeholder="Enter book language (e.g., English, Vietnamese)" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} placeholder="Enter a short description of the book" />
        </Form.Item>
        <Form.Item name="size" label="Size">
          <Input placeholder="Enter size (e.g., 20x30cm)" />
        </Form.Item>
        <Form.Item name="pages" label="Pages">
          <InputNumber min={1} style={{ width: "100%" }} placeholder="Enter number of pages" />
        </Form.Item>
        <Form.Item name="textBy" label="Text By">
          <Input placeholder="Enter author's name (e.g., J.K. Rowling)" />
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
          <Button type="primary" htmlType="submit" loading={uploading}>
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
