import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src="/path-to-logo.svg" alt="Logo" />
        </div>
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            
          </ul>
        </nav>
        <div className="cart">
          <a href="#cart">
            <img src="/path-to-cart-icon.svg" alt="Cart" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
