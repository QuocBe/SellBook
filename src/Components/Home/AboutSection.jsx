// AboutSection.jsx
import React from 'react';
import '../../assets/style/Home/AboutSection.scss';

const AboutSection = () => {
  return (
    <section className="about-us">
      {/* Header Section */}
      <div className="about-us__header">
        <h1>About Us</h1>
        <p>Connecting Readers to Their Next Adventure</p>
      </div>

      {/* Who We Are Section */}
      <div className="about-us__section who-we-are">
        <h2>Who We Are</h2>
        <p>
          At BookBe, we believe that books are more than just knowledge; they
          are bridges to new worlds. We provide a modern platform where people
          can easily discover, shop, and share their favorite books.
        </p>
      </div>

      {/* Mission and Vision Section */}
      <div className="about-us__section mission-vision">
        <div className="mission">
          <h3>Our Mission</h3>
          <p>
            To bring the world of books closer to everyone, promoting a reading
            culture and connecting readers with meaningful stories.
          </p>
        </div>
        <div className="vision">
          <h3>Our Vision</h3>
          <p>
            To become the leading platform in online book sales, where readers
            worldwide find everything they need for personal growth.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="about-us__section core-values">
        <h2>Our Core Values</h2>
        <ul>
          <li>
            <strong>Quality:</strong> Committed to offering books from trusted
            publishers.
          </li>
          <li>
            <strong>Diversity:</strong> Catering to all needs with thousands of
            book titles.
          </li>
          <li>
            <strong>Service:</strong> Ensuring the best book shopping
            experience.
          </li>
          <li>
            <strong>Community:</strong> Building a space to connect and share
            the love for books.
          </li>
        </ul>
      </div>

      {/* Our Story Section */}
      <div className="about-us__section our-story">
        <h2>Our Story</h2>
        <p>
          Starting from a small group of book lovers, BookBe has grown into a
          trusted platform in online book sales. Here are some key milestones
          in our journey:
        </p>
        <ul>
          <li>2020: Founded the company.</li>
          <li>2021: Launched our website and reached 10,000 orders.</li>
          <li>2023: Voted as "Most Loved Book Platform."</li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="about-us__section contact">
        <h2>Contact Us</h2>
        <p>Email: support@bookbe.com</p>
        <p>Phone: <a href="tel:+840329554964">+840329554964</a></p>
        <p>Address: Cong Hoa Garden Building No. 20 Cong Hoa, Ward 12, Tan Binh District, Ho Chi Minh City</p>
      </div>
    </section>
  );
};

export default AboutSection;
