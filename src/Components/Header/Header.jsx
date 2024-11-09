import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import '../../assets/style/Header/Header.scss';
import logo from '../../assets/images/Logo_BookBe.png';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    setUserEmail(localStorage.getItem('userEmail'));
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Al Muheet Publishing" />
        </div>
        <nav className="nav">
          <ul className="nav-links">
            {['home', 'about', 'events', 'publications', 'contact'].map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  className={activeLink === link ? 'active' : ''}
                  onClick={() => handleLinkClick(link)}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1).replace('-', ' ')}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="search-cart">
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <button>
              <SearchOutlined style={{ color: '#007acc', fontSize: '18px' }} />
            </button>
          </div>
          <div className="icons">
            {userEmail ? (
              <span>{userEmail}</span> // Hiển thị email của người dùng sau khi đăng nhập
            ) : (
              <Link to="/login">
                <UserOutlined style={{ fontSize: '20px', color: '#007acc', cursor: 'pointer' }} />
              </Link>
            )}
            <div className="cart-icon">
              <ShoppingCartOutlined style={{ fontSize: '20px', color: '#007acc' }} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
