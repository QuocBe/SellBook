import React from 'react';
import '../../assets/style/Home/ContactSection.scss';

function ContactSection() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for reaching out! We'll get back to you shortly.");
      };
    

    return (
        <section className="contact-us">
        {/* Header */}
        <header className="contact-us__header">
          <h1>We'd Love to Hear from You!</h1>
          <p>
            Have questions, feedback, or need support? Get in touch with us today.
            We're here to help.
          </p>
        </header>
  
        {/* Contact Information */}
        <section className="contact-us__info">
          <h2>Contact Information</h2>
          <p><strong>Address:</strong> Cong Hoa Garden Building No. 20 Cong Hoa, Ward 12, Tan Binh District, Ho Chi Minh City</p>
          <p><strong>Email:</strong> <a href="mailTo:support@bookbe.com">support@bookbe.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+840329554964">+840329554964</a></p>
          <p><strong>Working Hours:</strong> Monday to Friday, 9:00 AM - 6:00 PM</p>
        </section>
  
        {/* Contact Form */}
        <section className="contact-us__form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone (optional)</label>
              <input type="tel" id="phone" placeholder="Your Phone Number" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Your Message" required />
            </div>
            <button type="submit" className="btn">Send Message</button>
          </form>
        </section>
  
        {/* Social Media Links */}
        <section className="contact-us__social">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </section>
  
        {/* Google Map */}
        <section className="contact-us__map">
          <h2>Our Location</h2>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4260.996117717212!2d106.64992607535964!3d10.803972058684352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529f1e1b3981b%3A0x322ddae404071dcc!2zQ-G7mW5nIGhvw6AgR2FyZGVu!5e1!3m2!1sen!2s!4v1732812199230!5m2!1sen!2s"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </section>
      </section>
    );
}

export default ContactSection;