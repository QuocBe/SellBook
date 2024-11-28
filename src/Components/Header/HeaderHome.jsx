import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "../../assets/style/Header/HeaderHome.scss";
import logo from "../../assets/images/Logo_BookBe.png";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("home");
  const [userName, setUserName] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const isHomePage = location.pathname === "/guest"; // Cập nhật kiểm tra trang chủ

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2] || "home"; // Lấy phần sau "/guest/"
    setActiveLink(currentPath);

    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName);
  }, [location.pathname]);

  const toggleDropdown = () => setShowDropdown((prevState) => !prevState);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    setUserName(null);
    setShowDropdown(false);
    window.location.reload();
  };

  return (
    <header className={`navbar ${isHomePage ? "home-page" : "other-page"}`}>
      <div className="container">
        <div className="logo">
          <Link to="/guest">
            <img src={logo} alt="Book Store Logo" />
          </Link>
        </div>
        <nav className="nav">
          <ul className="nav-links">
            {["home", "about", "events", "publications", "contact"].map((link) => (
              <li key={link}>
                <Link
                  to={`/guest/${link === "home" ? "" : link}`} // Đảm bảo liên kết đúng
                  className={activeLink === link ? "active" : ""}
                  onClick={() => setActiveLink(link)}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)} {/* Viết hoa chữ cái đầu */}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="search-cart">
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <button>
              <SearchOutlined />
            </button>
          </div>
          <div className="icons">
            {userName ? (
              <div className="user-dropdown">
                <span onClick={toggleDropdown} style={{ fontWeight: "bold" }}>
                  {userName}
                </span>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/Profileguest" className="dropdown-item">
                      Your Profile
                    </Link>
                    <Link to="/orders" className="dropdown-item">
                      Your Order
                    </Link>
                    <span onClick={handleLogout} className="dropdown-item">
                      Logout
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-link">
                Login
              </Link>
            )}
            <ShoppingCartOutlined />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
