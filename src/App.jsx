import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import các component cần thiết
import Layout from './Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/LoginAccount';
import AddAccount from './Components/Login/AddAccount';
import AdminDashboard from './Components/Admin/AdminDashboard'; // Thêm AdminDashboard vào đây
import AdminLayout from './Components/Admin/AdminLayout';
import BookList from './Components/Book/BookList';
import Cart from './Components/Cart/CartList';
import Checkout from './Components/Cart/Checkout';
import AboutSection from './Components/Home/AboutSection';
import ExploreLibrary from './Components/Home/ExploreLibrary';
import PackagesSection from './Components/Home/PackagesSection';
import EventsSection from './Components/Home/EventsSection';
import LatestNewsSection from './Components/Home/LatestNewsSection';
import GallerySection from './Components/Home/GallerySection';
import Footer from './Components/Footer/Footer';
import Profile from './Components/Guest/Profile';
import AdminBooks from './Components/Admin/AdminBooks';
import BookForm from './Components/Admin/BookForm';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route cho trang đăng nhập không có layout */}
        <Route path="/login" element={<Login/>} />
        <Route path="/addaccount" element={<AddAccount />} />
        
        {/* Route cho trang Admin */}
         {/* Route cho trang Admin */}
         <Route path="/adminlayout" element={<AdminLayout />}>
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="adminbooks">
    <Route index element={<AdminBooks />} />
    <Route path="add" element={<BookForm />} />
    <Route path="edit/:id" element={<BookForm />} />
  </Route>
</Route>


        <Route path="/Profileguest" element={<Profile />} />
        {/* Route cho các trang khác sẽ bao gồm Layout */}
        <Route path="/" element={<Layout />}>
          {/* Trang chính (Home) */}
          <Route index element={<Home />} />

          {/* Các trang của phần Home */}
          <Route path="about" element={<AboutSection />} />
          <Route path="explore" element={<ExploreLibrary />} />
          <Route path="packages" element={<PackagesSection />} />
          <Route path="events" element={<EventsSection />} />
          <Route path="latest-news" element={<LatestNewsSection />} />
          <Route path="gallery" element={<GallerySection />} />

          {/* Các trang liên quan đến sách */}
          <Route path="books" element={<BookList />} />
          

          {/* Giỏ hàng và thanh toán */}
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />

          {/* Footer */}
          <Route path="footer" element={<Footer />} />

          {/* Xử lý trang không tìm thấy */}
          {/* Thêm các route khác nếu cần */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
