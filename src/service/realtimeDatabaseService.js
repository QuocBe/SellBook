// src/service/realtimeDatabaseService.js
import { database } from '../firebaseConfig';
import { ref, set } from "firebase/database";

// Hàm thêm dữ liệu vào Realtime Database
const addBookToRealtimeDatabase = async (book) => {
  const bookRef = ref(database, 'books/' + book.id);
  try {
    await set(bookRef, book);
    console.log("Book added to Realtime Database");
  } catch (e) {
    console.error("Error adding book: ", e);
  }
};

// Ví dụ sử dụng hàm để thêm sách mới
addBookToRealtimeDatabase({
  id: "book1", // Sử dụng id để quản lý
  title: "New Book",
  author: "John Doe",
  price: 19.99
});
