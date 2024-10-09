import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database"; // Import các hàm cần thiết
import { auth } from "../../../firebaseConfig"; // Import cấu hình Firebase
import { Table, Spin } from "antd"; // Sử dụng Ant Design Table để hiển thị dữ liệu

const LoginManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data từ Realtime Database
  const fetchData = () => {
    const database = getDatabase(); // Khởi tạo đối tượng database
    const usersRef = ref(database, 'account'); // Lấy tham chiếu tới 'account'

    // Sử dụng onValue để lấy dữ liệu
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Chuyển đổi dữ liệu từ object sang array
        const userList = Object.entries(data).map(([key, value]) => ({
          id: key,
          username: value.username,
          email: value.email,
          role: value.role,
          department: value.department,
        }));
        setUsers(userList); // Cập nhật state với danh sách người dùng
      } else {
        setUsers([]);
      }
      setLoading(false); // Đặt loading thành false khi dữ liệu đã được lấy
    }, (error) => {
      console.error("Error fetching data: ", error);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData(); // Gọi hàm fetchData khi component được mount
  }, []);

  // Cấu hình cột cho Table
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
  ];

  return (
    <div>
      <h1>User List</h1>
      {loading ? (
        <Spin tip="Loading..."/>
      ) : (
        <Table 
          dataSource={users} 
          columns={columns} 
          rowKey="id" // Sử dụng id làm khóa cho mỗi hàng
        />
      )}
    </div>
  );
};

export default LoginManager;
