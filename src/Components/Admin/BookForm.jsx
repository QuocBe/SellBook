import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { ref, get, update, push } from "firebase/database";
import { database, storage } from "../../../firebaseConfig";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";

const { Option } = Select;

const BookForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Nhận ID sách từ URL nếu chỉnh sửa
  const [fileList, setFileList] = useState([]); // Quản lý danh sách file
  const [uploading, setUploading] = useState(false);

  // Fetch dữ liệu sách nếu đang chỉnh sửa
  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const snapshot = await get(ref(database, `Books/${id}`));
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
          message.error("Failed to fetch book details.");
        }
      };
      fetchBook();
    }
  }, [id, form, navigate]);

  // Xử lý upload ảnh
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Xử lý lưu thông tin
  const handleSave = async (values) => {
    setUploading(true);
    try {
      const uploadPromises = fileList.map((file) => {
        if (file.originFileObj) {
          const storagePath = storageRef(storage, `Books/${file.name}`);
          const uploadTask = uploadBytesResumable(storagePath, file.originFileObj);

          return new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              null,
              (error) => {
                console.error("Upload failed:", error);
                reject(error);
              },
              async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
              }
            );
          });
        } else {
          return Promise.resolve(file.url); // URL đã có sẵn
        }
      });
      console.log(uploadPromises)
      const imageUrls = await Promise.all(uploadPromises);
      const updatedValues = { ...values, images: imageUrls };

      if (id) {
        await update(ref(database, `Books/${id}`), updatedValues);
        message.success("Book updated successfully!");
      } else {
        const newBookRef = push(ref(database, "Books"));
        await update(newBookRef, updatedValues);
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
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Enter price (e.g., 20.99)"
          />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
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
          <Input.TextArea
            rows={4}
            placeholder="Enter a short description of the book"
          />
        </Form.Item>
        <Form.Item name="size" label="Size">
          <Input placeholder="Enter size (e.g., 20x30cm)" />
        </Form.Item>
        <Form.Item name="pages" label="Pages">
          <InputNumber
            min={1}
            style={{ width: "100%" }}
            placeholder="Enter number of pages"
          />
        </Form.Item>
        <Form.Item name="textBy" label="Text By">
          <Input placeholder="Enter author's name (e.g., J.K. Rowling)" />
        </Form.Item>
        <Form.Item label="Upload Images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={(file) => {
              const isValid =
                file.type === "image/jpeg" || file.type === "image/png";
              if (!isValid) {
                message.error("Only JPG/PNG files are allowed.");
              }
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                message.error("Image must be smaller than 2MB.");
              }
              return isValid && isLt2M;
            }}
            maxCount={3}
          >
            {fileList.length < 3 && (
              <div>
                <UploadOutlined />
                <div>Upload</div>
              </div>
            )}
          </Upload>
          <p style={{ color: "#aaa" }}>
            You can upload up to 3 images (JPG/PNG, less than 2MB each)
          </p>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={uploading}>
            {id ? "Update Book" : "Add Book"}
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/adminlayout/adminbooks")}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookForm;
