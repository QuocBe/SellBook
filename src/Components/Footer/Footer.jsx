import React from 'react';
import '../../../src/assets/style/Footer/Footer.scss'; // Đảm bảo bạn đã tạo file SCSS cho style

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Information */}
        <div className="footer-section">
          <h3>HUNG TAM HOLDINGS</h3>
          <p>Address: 135/58 Tran Hung Dao, Cau Ong Lanh Ward, District 1, Ho Chi Minh City</p>
          <p>Business License No: 0312935520</p>
          <p>Phone: 028 3836 7123 / 0945 378 809</p>
          <p>Email: <a href="mailto:glabvn@gmail.com">glabvn@gmail.com</a></p>
        </div>

        {/* Services and Support */}
        <div className="footer-section">
          <h3>Services & Support</h3>
          <ul>
            <li>Warranty Policy</li>
            <li>Privacy Policy</li>
            <li>Shipping Policy</li>
            <li>Return & Refund Policy</li>
            <li>Payment Policy</li>
            <li>Product Storage Policy</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2023 HUNG TAM HOLDINGS</p>
      </div>
    </footer>
  );
}

export default Footer;
