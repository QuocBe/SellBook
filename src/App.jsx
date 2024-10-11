import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";

import Layout from './Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import LoginAdd from './Components/Login/LoginAdd';
import LoginManager from './Components/Login/LoginManager';
import TeacherDashboard from './Components/Teacher/TeacherDashboard';
import StudentDashboard from './Components/Student/StudentDashboard';
import SupervisorDashboard from './Components/Supervisor/SupervisorDashboard';
import GuestDashboard from './Components/Guest/GuestDashboard';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Sidebar from "./Components/SidebarLeft";


const { Content } = Layout;

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={handleLogin} />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <Layout style={{ minHeight: "100vh" }}>
              {user && <Sidebar role={user.role} />}
              <Layout style={{ marginLeft: user ? 200 : 0 }}>
                <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                  <div style={{ padding: 24 }}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="loginadd" element={<LoginAdd />} />
                      <Route path="loginmanager" element={<LoginManager />} />
                      {/* Dashboard cho các vai trò */}
                      <Route path="teacher-dashboard" element={<TeacherDashboard />} />
                      <Route path="student-dashboard" element={<StudentDashboard />} />
                      <Route path="supervisor-dashboard" element={<SupervisorDashboard />} />
                      <Route path="guest-dashboard" element={<GuestDashboard />} />
                      {/* Xử lý trang không tìm thấy */}
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </div>
                </Content>
              </Layout>
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
