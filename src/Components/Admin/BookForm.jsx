import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { ref as databaseRef, get, update, push } from "firebase/database";
import { database, storage } from "../../../firebaseConfig";
import { uploadBytesResumable, getDownloadURL, ref as storageRef } from "firebase/storage";

const { Option } = Select;

const BookForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const snapshot = await get(databaseRef(database, `Books/${id}`));
          if (snapshot.exists()) {
            const bookData = snapshot.val();
            form.setFieldsValue(bookData);

            if (bookData.images) {
              const formattedFiles = bookData.images.map((url, index) => ({
                uid: `-${index}`,
                name: `image${index + 1}.png`,
                status: "done",
                url,
              }));
              setFileList(formattedFiles);
            }
          } else {
            message.error("Book not found!");
            navigate("/adminlayout/adminbooks");
          }
        } catch (error) {
          console.error("Failed to fetch book details:", error);
          message.error("Failed to fetch book details.");
        }
      };
      fetchBook();
    }
  }, [id, form, navigate]);

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSave = async (values) => {
    setUploading(true);
    try {
      const uploadPromises = fileList.map((file) => {
        if (file.originFileObj) {
          const storagePath = storageRef(storage, `Books/${file.originFileObj.name}`);
          const uploadTask = uploadBytesResumable(storagePath, file.originFileObj);

          return new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
              },
              (error) => {
                console.error("Upload error:", error);
                reject(error);
              },
              async () => {
                try {
                  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                  resolve(downloadURL);
                } catch (error) {
                  console.error("Error getting download URL:", error);
                  reject(error);
                }
              }
            );
          });
        } else {
          return Promise.resolve(file.url);
        }
      });

      const imageUrls = await Promise.all(uploadPromises);
      const updatedValues = { ...values, images: imageUrls };

      if (id) {
        await update(databaseRef(database, `Books/${id}`), updatedValues);
        message.success("Book updated successfully!");
      } else {
        const newBookRef = push(databaseRef(database, "Books"));
        await update(databaseRef(database, `Books/${newBookRef.key}`), updatedValues);
        message.success("Book added successfully!");
      }
      navigate("/adminlayout/adminbooks");
    } catch (error) {
      console.error("Error saving book:", error);
      message.error("Failed to save book.");
    } finally {
      setUploading(false);
    }
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
        <Form.Item name="language" label="Language" rules={[{ required: true }]}>
          <Input placeholder="Enter book language (e.g., English)" />
        </Form.Item>
        <Form.Item name="pages" label="Number of Pages" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} placeholder="Enter number of pages" />
        </Form.Item>
        <Form.Item name="size" label="Size">
          <Input placeholder="Enter book size (e.g., 8.5 x 11 inches)" />
        </Form.Item>
        <Form.Item name="content" label="Content">
          <Input.TextArea rows={4} placeholder="Enter book content description" />
        </Form.Item>
        <Form.Item label="Upload Images">
          <Upload
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={(file) => {
              const isValid = file.type === "image/jpeg" || file.type === "image/png";
              if (!isValid) {
                message.error("Only JPG/PNG files are allowed.");
                return Upload.LIST_IGNORE;
              }
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                message.error("Image must be smaller than 2MB.");
                return Upload.LIST_IGNORE;
              }
              return true;
            }}
            maxCount={5}
            multiple
          >
            <Button icon={<UploadOutlined />}>Select Files</Button>
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
