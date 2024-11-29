import React, { useState } from "react";
import "../../assets/style/Home/HomeSection.scss";
import Book1 from "../../assets/images/Book1.jpg";
import Book2 from "../../assets/images/Book2.jpg";
import Book3 from "../../assets/images/Book3.jpg";

const Header = () => {
  const books = [
    {
      id: 1,
      name: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: "120,000",
      img: Book1,
    },
    {
      id: 2,
      name: "To Kill a Mockingbird",
      author: "Harper Lee",
      originalPrice: "150,000",
      price: "130,000",
      img: Book2,
    },
    {
      id: 3,
      name: "1984",
      author: "George Orwell",
      price: "115,000",
      img: Book3,
    },
    {
      id: 4,
      name: "Pride and Prejudice",
      author: "Jane Austen",
      price: "110,000",
      img: Book1,
    },
    {
      id: 5,
      name: "Moby Dick",
      author: "Herman Melville",
      price: "125,000",
      img: Book2,
    },
    {
      id: 6,
      name: "The Catcher in the Rye",
      author: "J.D. Salinger",
      price: "140,000",
      img: Book3,
    },
    {
      id: 7,
      name: "The Catcher in the Rye",
      author: "J.D. Salinger",
      price: "140,000",
      img: Book1,
    },
    {
      id: 8,
      name: "The Catcher in the Rye",
      author: "J.D. Salinger",
      price: "140,000",
      img: Book2,
    },
    {
      id: 9,
      name: "The Catcher in the Rye",
      author: "J.D. Salinger",
      price: "140,000",
      img: Book3,
    },
  ];

  const [visibleBooks, setVisibleBooks] = useState(6); // Bắt đầu hiển thị 6 sách

  const handleLoadMore = () => {
    setVisibleBooks((prevVisible) => prevVisible + 6); // Tăng thêm 6 sách mỗi lần bấm
  };

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

    // <div className="home">
    //   {/* Hero Section */}
    //   <section className="home__hero">
    //     <div className="hero-content">
    //       <h1>Discover Your Next Adventure with BookBe</h1>
    //       <p>Explore, shop, and share your favorite books with us.</p>
    //       <button className="btn btn-primary">Browse Books</button>
    //     </div>
    //   </section>

    //   {/* Featured Products Section */}
    //   <section className="home__featured">
    //     <h2>Featured Books</h2>
    //     <div className="featured-grid">
    //       <div className="product-card">
    //         <img src={Book1} alt="Book 1" />
    //         <h3>Book Title 1</h3>
    //         <p>$20.00</p>
    //         <button className="btn">Buy Now</button>
    //       </div>
    //       <div className="product-card">
    //         <img src={Book2} alt="Book 2" />
    //         <h3>Book Title 2</h3>
    //         <p>$25.00</p>
    //         <button className="btn">Buy Now</button>
    //       </div>
    //       <div className="product-card">
    //         <img src={Book3} alt="Book 3" />
    //         <h3>Book Title 3</h3>
    //         <p>$15.00</p>
    //         <button className="btn">Buy Now</button>
    //       </div>
    //     </div>
    //   </section>

    //   {/* About Us Section */}
    //   <section className="home__about">
    //     <h2>About BookBe</h2>
    //     <p>
    //       At BookBe, we connect readers with meaningful stories. Discover a
    //       world of books with us and join our journey to promote a culture of
    //       reading.
    //     </p>
    //     <button className="btn">Read More</button>
    //   </section>

    //   {/* Testimonials Section */}
    //   <section className="home__testimonials">
    //     <h2>What Our Customers Say</h2>
    //     <div className="testimonials">
    //       <blockquote>
    //         "BookBe helped me find my favorite books easily. Great service!"
    //         <cite>- Nguyễn Văn A</cite>
    //       </blockquote>
    //       <blockquote>
    //         "The quality of books is amazing, and delivery was fast."
    //         <cite>- Trần Thị B</cite>
    //       </blockquote>
    //     </div>
    //   </section>

    //   {/* Blog Section */}
    //   <section className="home__blog">
    //     <h2>Latest from Our Blog</h2>
    //     <div className="blog-grid">
    //       <div className="blog-card">
    //         <h3>10 Must-Read Books This Winter</h3>
    //         <p>Discover the books you can't miss this season.</p>
    //         <button className="btn">Read More</button>
    //       </div>
    //       <div className="blog-card">
    //         <h3>How to Build a Reading Habit</h3>
    //         <p>Tips to develop a consistent reading routine.</p>
    //         <button className="btn">Read More</button>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Newsletter Section */}
    //   <section className="home__newsletter">
    //     <h2>Stay Updated</h2>
    //     <p>Subscribe to our newsletter to get the latest news and deals.</p>
    //     <form>
    //       <input type="email" placeholder="Your Email" required />
    //       <button type="submit" className="btn btn-primary">
    //         Subscribe
    //       </button>
    //     </form>
    //   </section>
    // </div>

    <div className="home">
      <h1 className="home__title">NEW BOOKS</h1>
      <div className="home__products">
        {books.slice(0, visibleBooks).map((book) => (
          <div className="product-card" key={book.id}>
            <img src={book.img} alt={book.name} />
            <h3>{book.name}</h3>
            <p className="author">{book.author}</p>
            {book.originalPrice && (
              <p className="original-price">{book.originalPrice} đ</p>
            )}
            <p className="price">{book.price} đ</p>
          </div>
        ))}
      </div>
      {visibleBooks < books.length && ( // Ẩn nút khi hiển thị hết sách
        <button className="load-more-btn" onClick={handleLoadMore}>
          VIEW MORE
        </button>
      )}
    </div>
  );
};

export default Header;
