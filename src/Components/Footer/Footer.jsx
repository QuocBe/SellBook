// Checkout.jsx
import React from 'react';
import { Col, Row } from "antd";
import "../../assets/style/Footer/Footer.scss";
import Visa from "../../assets/images/visa.jpg";
import MasterCard from "../../assets/images/MasterCard.jpg";
import Jcb from "../../assets/images/JCB.jpg";
import Atm from "../../assets/images/Atm.jpg";
import Cash from "../../assets/images/Cash.jpg";
import Card from "../../assets/images/Payoo.jpg";
import Vinabook from "../../assets/images/Vinabook.jpg";
import VietnamPost from "../../assets/images/VietnamPost.jpg";
import DHL from "../../assets/images/DHL.jpg";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <h3>VỀ CÔNG TY</h3>
            <ul>
              <li>Giới thiệu công ty</li>
              <li>Tuyển dụng</li>
              <li>Chương trình đại lý</li>
              <li>Chính sách bảo mật</li>
              <li>Chính sách đổi trả</li>
            </ul>
          </Col>
          <Col span={6}>
            <h3>TRỢ GIÚP</h3>
            <ul>
              <li>Quy định sử dụng</li>
              <li>Hướng dẫn mua hàng</li>
              <li>Phương thức thanh toán</li>
              <li>Phương thức vận chuyển</li>
              <li>Ứng dụng đọc ebook</li>
            </ul>
          </Col>
          <Col span={6}>
            <h3>TIN TỨC SÁCH</h3>
            <ul>
              <li>Tin tức</li>
              <li>Chân dung</li>
              <li>Điểm sách</li>
              <li>Phê bình</li>
            </ul>
          </Col>
          <Col span={6}>
            <h3>CHẤP NHẬN THANH TOÁN</h3>
            <div className="payment-logos">
              <img src={Visa} alt="Visa" />
              <img src={MasterCard} alt="MasterCard" />
              <img src={Jcb} alt="JCB" />
              <img src={Atm} alt="ATM" />
              <img src={Cash} alt="Cash" />
              <img src={Card} alt="Card" />
            </div>
            <h3>ĐỐI TÁC VẬN CHUYỂN</h3>
            <div className="partner-logos">
              <img className="partner-logos-img" src={Vinabook} alt="Vinabook" />
              <img className="partner-logos-img" src={VietnamPost} alt="GHN" />
              <img className="partner-logos-img" src={DHL} alt="DHL" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
