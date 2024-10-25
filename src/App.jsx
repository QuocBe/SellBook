import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import LoginAdd from './Components/Login/LoginAdd';
import LoginManager from './Components/Login/LoginManager';
import TeacherDashboard from './Components/Teacher/TeacherDashboard';
import StudentDashboard from './Components/Student/StudentDashboard';
import SupervisorDashboard from './Components/Supervisor/SupervisorDashboard';
import GuestDashboard from './Components/Guest/GuestDashboard';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import SidebarLeft from './Components/SidebarLeft';
import Subject from './Components/Teacher/Subject';
import NewSubject from './Components/Teacher/NewSubject';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route cho trang đăng nhập không có layout */}
        <Route path="/login" element={<Login />} />

        {/* Route cho các trang khác sẽ bao gồm Layout */}
        <Route path="/" element={<Layout />}>
        <Route path="Header" element={<Header />} />
          <Route index element={<Home />} />
          <Route path="loginadd" element={<LoginAdd />} />
          <Route path="loginmanager" element={<LoginManager />} />
          {/* Dashboard cho các vai trò */}
          <Route path="sidebarLeft" element={<SidebarLeft />} />
          <Route path="teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="student-dashboard" element={<StudentDashboard />} />
          <Route path="supervisor-dashboard" element={<SupervisorDashboard />} />
          <Route path="guest-dashboard" element={<GuestDashboard />} />
          <Route path="subject" element={<Subject />} />
          <Route path="new-subject" element={<NewSubject />} />
          {/* Xử lý trang không tìm thấy */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
