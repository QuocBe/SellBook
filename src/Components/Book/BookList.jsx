import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import { storage } from "../../../firebaseConfig"; // Import cấu hình Firebase
import "../../assets/style/Book/BookList.scss"; // CSS cho giao diện

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookRef = ref(storage, "Book/"); // Đường dẫn đến thư mục trong Firebase Storage
        const snapshot = await listAll(bookRef);

        const booksData = await Promise.all(
          snapshot.items.map(async (item) => {
            const url = await getDownloadURL(item); // Lấy URL công khai của file
            return {
              id: item.name, // Dùng tên file làm ID
              title: item.name.replace(/\.[^/.]+$/, ""), // Loại bỏ phần đuôi file trong tên
              price: Math.floor(Math.random() * 5000000) + 1000000, // Giá ngẫu nhiên
              discountPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 4000000) + 1000000 : null, // Random giá giảm
              isBestseller: Math.random() > 0.5, // Random bestseller
              image: url, // URL ảnh
            };
          })
        );

        setBooks(booksData);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <div className="book-image">
            <img src={book.image} alt={book.title} />
            {book.isBestseller && <span className="bestseller-badge">Bestseller</span>}
            {book.discountPrice && <span className="discount-badge">Discount</span>}
          </div>
          <div className="book-details">
            <h3>{book.title}</h3>
            <div className="book-pricing">
              {book.discountPrice ? (
                <>
                  <span className="original-price">₫{book.price.toLocaleString()}</span>
                  <span className="discount-price">₫{book.discountPrice.toLocaleString()}</span>
                </>
              ) : (
                <span className="price">₫{book.price.toLocaleString()}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
