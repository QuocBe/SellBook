import React, { useEffect, useState } from "react";
import { Table, Button, message, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ref, get, remove } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleDeleteBook = async (id) => {
    try {
      await remove(ref(database, `Books/${id}`));
      message.success("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      message.error("Failed to delete book.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const columns = [
    { title: "Book ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price", render: (price) => `$${price}` },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/adminlayout/adminbooks/edit/${record.id}`)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteBook(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => navigate("/adminlayout/adminbooks/add")}
        style={{ marginBottom: 16 }}
      >
        Add Book
      </Button>
      <Table columns={columns} dataSource={books} rowKey="id" loading={loading} />
    </>
  );
};

export default AdminBooks;
