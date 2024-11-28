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
            <h3>ABOUT US</h3>
            <ul>
              <li>Company Introduction</li>
              <li>Recruitment</li>
              <li>Affiliate Program</li>
              <li>Privacy Policy</li>
              <li>Return Policy</li>
            </ul>
          </Col>
          <Col span={6}>
            <h3>HELP</h3>
            <ul>
              <li>Terms of Use</li>
              <li>Buying Guide</li>
              <li>Payment Method</li>
              <li>Shipping Method</li>
              <li>Ebook Reading App</li>
            </ul>
          </Col>
          <Col span={6}>
            <h3>BOOK NEWS</h3>
            <ul>
              <li>News</li>
              <li>Portrait</li>
              <li>Book Review</li>
              <li>Criticize</li>
            </ul>
          </Col>
          <Col span={6}>
            <h3>PAYMENT ACCEPTANCE</h3>
            <div className="payment-logos">
              <img src={Visa} alt="Visa" />
              <img src={MasterCard} alt="MasterCard" />
              <img src={Jcb} alt="JCB" />
              <img src={Atm} alt="ATM" />
              <img src={Cash} alt="Cash" />
              <img src={Card} alt="Card" />
            </div>
            <h3>SHIPPING PARTNERS</h3>
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
