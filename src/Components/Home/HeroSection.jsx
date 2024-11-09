import React from 'react';
import '../../assets/style/Home/HeroSection.scss';
import headerBackground from '../../assets/images/header-background.png'; // Update path if necessary

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Your Gateway to the World of Books</h1>
        <p>
          Explore a vast collection of books, from timeless classics to the latest releases.
          Dive into stories that ignite your imagination.
        </p>
        <button className="hero-button">Shop Now</button>
      </div>
      <div className="hero-image">
        <img src={headerBackground} alt="Books and Reading" />
      </div>
    </section>
  );
};

export default HeroSection;
