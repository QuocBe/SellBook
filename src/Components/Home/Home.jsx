import React from 'react';
import '../../assets/style/Home/HomeSection.scss';
import Book1 from '../../assets/images/Book1.jpg';
import Book2 from '../../assets/images/Book2.jpg';
import Book3 from '../../assets/images/Book3.jpg';


const Header = () => {
  return (
    // <header className="header">
    //   <div className="container">
    //     <div className="logo">
    //       <img src="/path-to-logo.svg" alt="Logo" />
    //     </div>
    //     <nav className="nav">
    //       <ul className="nav-links">
    //         <li><a href="#home">Home</a></li>
            
    //       </ul>
    //     </nav>
    //     <div className="cart">
    //       <a href="#cart">
    //         <img src="/path-to-cart-icon.svg" alt="Cart" />
    //       </a>
    //     </div>
    //   </div>
    // </header>

<div className="home">
{/* Hero Section */}
<section className="home__hero">
  <div className="hero-content">
    <h1>Discover Your Next Adventure with BookBe</h1>
    <p>Explore, shop, and share your favorite books with us.</p>
    <button className="btn btn-primary">Browse Books</button>
  </div>
</section>

{/* Featured Products Section */}
<section className="home__featured">
  <h2>Featured Books</h2>
  <div className="featured-grid">
    <div className="product-card">
      <img src={Book1} alt="Book 1" />
      <h3>Book Title 1</h3>
      <p>$20.00</p>
      <button className="btn">Buy Now</button>
    </div>
    <div className="product-card">
      <img src={Book2} alt="Book 2" />
      <h3>Book Title 2</h3>
      <p>$25.00</p>
      <button className="btn">Buy Now</button>
    </div>
    <div className="product-card">
      <img src={Book3} alt="Book 3" />
      <h3>Book Title 3</h3>
      <p>$15.00</p>
      <button className="btn">Buy Now</button>
    </div>
  </div>
</section>

{/* About Us Section */}
<section className="home__about">
  <h2>About BookBe</h2>
  <p>
    At BookBe, we connect readers with meaningful stories. Discover a
    world of books with us and join our journey to promote a culture of
    reading.
  </p>
  <button className="btn">Read More</button>
</section>

{/* Testimonials Section */}
<section className="home__testimonials">
  <h2>What Our Customers Say</h2>
  <div className="testimonials">
    <blockquote>
      "BookBe helped me find my favorite books easily. Great service!"
      <cite>- Nguyễn Văn A</cite>
    </blockquote>
    <blockquote>
      "The quality of books is amazing, and delivery was fast."
      <cite>- Trần Thị B</cite>
    </blockquote>
  </div>
</section>

{/* Blog Section */}
<section className="home__blog">
  <h2>Latest from Our Blog</h2>
  <div className="blog-grid">
    <div className="blog-card">
      <h3>10 Must-Read Books This Winter</h3>
      <p>Discover the books you can't miss this season.</p>
      <button className="btn">Read More</button>
    </div>
    <div className="blog-card">
      <h3>How to Build a Reading Habit</h3>
      <p>Tips to develop a consistent reading routine.</p>
      <button className="btn">Read More</button>
    </div>
  </div>
</section>

{/* Newsletter Section */}
<section className="home__newsletter">
  <h2>Stay Updated</h2>
  <p>Subscribe to our newsletter to get the latest news and deals.</p>
  <form>
    <input type="email" placeholder="Your Email" required />
    <button type="submit" className="btn btn-primary">Subscribe</button>
  </form>
</section>
</div>
  );
};

export default Header;
