import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Space,
  Descriptions,
} from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ref, get, push, update, remove } from "firebase/database";
import { database } from "../../../firebaseConfig";

const { Option } = Select;

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const [form] = Form.useForm();

  // Fetch books from Firebase
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const snapshot = await get(ref(database, "Books"));
      if (snapshot.exists()) {
        const booksData = snapshot.val();
        setBooks(Object.keys(booksData).map((key) => ({ id: key, ...booksData[key] })));
      }
    } catch (error) {
      message.error("Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  // Save or update book
  const handleSave = async (values) => {
    try {
      if (editingBook) {
        await update(ref(database, `Books/${editingBook.id}`), values);
        message.success("Book updated successfully!");
      } else {
        const newBookRef = push(ref(database, "Books"));
        await update(newBookRef, values);
        message.success("Book added successfully!");
      }
      fetchBooks();
      setIsModalVisible(false);
      setEditingBook(null);
      form.resetFields();
    } catch (error) {
      message.error("Failed to save book.");
    }
  };

  // Delete a book
  const handleDeleteBook = async (id) => {
    try {
      await remove(ref(database, `Books/${id}`));
      message.success("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      message.error("Failed to delete book.");
    }
  };

  // View book details
  const handleViewBook = (book) => {
    setSelectedBook(book);
    setIsViewModalVisible(true);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Columns for the table
  const columns = [
    { title: "Book ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price", render: (price) => `$${price}` },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Book" style={{ width: 50 }} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => { setEditingBook(record); setIsModalVisible(true); }}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteBook(record.id)}>
            Delete
          </Button>
          <Button onClick={() => handleViewBook(record)}>View</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => { setEditingBook(null); setIsModalVisible(true); }} style={{ marginBottom: 16 }}>
        Add Book
      </Button>
      <Table columns={columns} dataSource={books} rowKey="id" loading={loading} />

      {/* Modal for Adding/Editing Books */}
      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        title={editingBook ? "Edit Book" : "Add Book"}
      >
        <Form form={form} onFinish={handleSave} layout="vertical" initialValues={editingBook}>
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
          <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="language" label="Language">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="size" label="Size">
            <Input />
          </Form.Item>
          <Form.Item name="pages" label="Pages">
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingBook ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Viewing Book Details */}
      <Modal
        visible={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={null}
        title="Book Details"
      >
        {selectedBook && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Book ID">{selectedBook.id}</Descriptions.Item>
            <Descriptions.Item label="Name">{selectedBook.name}</Descriptions.Item>
            <Descriptions.Item label="Price">${selectedBook.price}</Descriptions.Item>
            <Descriptions.Item label="Category">{selectedBook.category}</Descriptions.Item>
            <Descriptions.Item label="Language">{selectedBook.language}</Descriptions.Item>
            <Descriptions.Item label="Description">{selectedBook.description}</Descriptions.Item>
            <Descriptions.Item label="Size">{selectedBook.size}</Descriptions.Item>
            <Descriptions.Item label="Pages">{selectedBook.pages}</Descriptions.Item>
            <Descriptions.Item label="Image">
              <img src={selectedBook.image} alt={selectedBook.name} style={{ width: "100%" }} />
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default AdminBooks;
