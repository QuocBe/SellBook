import React, { useState } from "react";
import { Table, Tag, Button, Space, message } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "../../assets/style/Admin/Order.scss"; 

const OrderManagement = () => {
  // Dữ liệu giả về đơn hàng
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "Nguyen Van A",
      date: "2024-12-01",
      total: 5500000,
      status: "Pending",
      items: [
        { title: "Book 1: Bestseller", quantity: 2 },
        { title: "Book 2: Discount", quantity: 1 },
      ],
    },
    {
      id: "ORD002",
      customer: "Tran Thi B",
      date: "2024-12-02",
      total: 3200000,
      status: "Completed",
      items: [{ title: "Book 3: New Arrival", quantity: 1 }],
    },
    {
      id: "ORD003",
      customer: "Le Van C",
      date: "2024-12-03",
      total: 7500000,
      status: "Cancelled",
      items: [
        { title: "Book 4: Trending", quantity: 3 },
        { title: "Book 5: Popular", quantity: 1 },
      ],
    },
  ]);

  // Xử lý cập nhật trạng thái đơn hàng
  const handleUpdateStatus = (id, status) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    message.success(`Order ${id} has been updated to ${status}`);
  };

  // Cột hiển thị cho bảng đơn hàng
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Total (VND)",
      dataIndex: "total",
      key: "total",
      render: (total) => `₫${total.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        if (status === "Pending") color = "gold";
        else if (status === "Completed") color = "green";
        else if (status === "Cancelled") color = "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          {record.status === "Pending" && (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleUpdateStatus(record.id, "Completed")}
              >
                Approve
              </Button>
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => handleUpdateStatus(record.id, "Cancelled")}
              >
                Cancel
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <h4>Order Items:</h4>
              <ul>
                {record.items.map((item, index) => (
                  <li key={index}>
                    {item.title} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default OrderManagement;
