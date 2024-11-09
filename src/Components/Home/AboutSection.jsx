// AboutSection.jsx
import React from 'react';
import '../../assets/style/Home/AboutSection.scss';

const AboutSection = () => {
  return (
    <section className="about-section">
      <h2>About Al Muheet</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac eros eleifend, imperdiet dui eget.</p>
      <div className="about-image">
        <img src="/path-to-about-image.svg" alt="About Al Muheet" />
      </div>
    </section>
  );
};

export default AboutSection;
