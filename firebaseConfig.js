import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Thêm nếu sử dụng Realtime Database

// Cấu hình Firebase của bạn
export const firebaseConfig = {
  apiKey: "AIzaSyDYvydg6af1lf7n2D3nQrYmo2mUY_neISY",
  authDomain: "sellbook-edb0b.firebaseapp.com",
  databaseURL: "https://sellbook-edb0b-default-rtdb.firebaseio.com",
  projectId: "sellbook-edb0b",
  storageBucket: "sellbook-edb0b.firebasestorage.app",
  messagingSenderId: "88531585879",
  appId: "1:88531585879:web:98f9096dfb4edb622e8c12",
  measurementId: "G-F711RXV2DR",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Sử dụng Analytics nếu cần
const analytics = getAnalytics(app);

// Khởi tạo Realtime Database
const database = getDatabase(app);

// Export các biến cần thiết
export { app, analytics, database };
