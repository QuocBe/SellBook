// src/service/firestoreService.js
import { firestore } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

// Hàm thêm dữ liệu vào Firestore
const addBookToFirestore = async (book) => {
  try {
    const docRef = await addDoc(collection(firestore, "books"), book);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Ví dụ sử dụng hàm để thêm sách mới
addBookToFirestore({
  title: "New Book",
  author: "John Doe",
  price: 19.99
});
