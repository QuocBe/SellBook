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
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    // Fetch username from localStorage after login
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName);
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleLogout = () => {
    // Clear user data and reload page
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
          <img src={logo} alt="Book Store Logo" />
        </div>
        <nav className="nav">
          <ul className="nav-links">
            {["home", "about", "events", "publications", "contact"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  className={activeLink === link ? "active" : ""}
                  onClick={() => handleLinkClick(link)}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </a>
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
              <span
                onClick={toggleDropdown}
                style={{
                  fontWeight: "bold",
                }}
              >
                {userName}
              </span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/guest" className="dropdown-item">
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
              <Link to="/login">
                <SearchOutlined />
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