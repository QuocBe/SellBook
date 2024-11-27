import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Tag, message, Descriptions } from "antd";
import { ref, get, remove } from "firebase/database";
import { database } from "../../../firebaseConfig";

const AdminDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Fetch accounts from Firebase
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const snapshot = await get(ref(database, "Account"));
      if (snapshot.exists()) {
        const accountsData = snapshot.val();
        setAccounts(Object.keys(accountsData).map((key) => ({ id: key, ...accountsData[key] })));
      }
    } catch (error) {
      message.error("Failed to fetch accounts.");
    } finally {
      setLoading(false);
    }
  };

  // Handle View action
  const handleViewAccount = (account) => {
    setSelectedAccount(account); // Set the selected account for the modal
    setAccountModalVisible(true); // Show the modal
  };

  // Handle Delete action
  const handleDeleteAccount = async (id) => {
    try {
      await remove(ref(database, `Account/${id}`));
      message.success("Account deleted successfully!");
      fetchAccounts(); // Refresh account list
    } catch (error) {
      message.error("Failed to delete account.");
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Columns for Account Table
  const accountColumns = [
    { title: "Name", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag color={role === "admin" ? "blue" : "green"}>{role}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleViewAccount(record)}>
            View
          </Button>
          <Button type="link" danger onClick={() => handleDeleteAccount(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <h3>Account Management</h3>
      <Table
        columns={accountColumns}
        dataSource={accounts}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* Account Details Modal */}
      <Modal
        title="Account Details"
        visible={isAccountModalVisible}
        onCancel={() => setAccountModalVisible(false)}
        footer={null}
      >
        {selectedAccount && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Name">{selectedAccount.username}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedAccount.email}</Descriptions.Item>
            <Descriptions.Item label="Phone Number">{selectedAccount.phoneNumber}</Descriptions.Item>
            <Descriptions.Item label="Address">{selectedAccount.address}</Descriptions.Item>
            <Descriptions.Item label="District">{selectedAccount.district}</Descriptions.Item>
            <Descriptions.Item label="Province">{selectedAccount.province}</Descriptions.Item>
            <Descriptions.Item label="Ward">{selectedAccount.ward}</Descriptions.Item>
            <Descriptions.Item label="Role">
              <Tag color={selectedAccount.role === "admin" ? "blue" : "green"}>
                {selectedAccount.role}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default AdminDashboard;
