import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Realtime Database
import { getStorage } from "firebase/storage"; // Firebase Storage

// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDYvydg6af1lf7n2D3nQrYmo2mUY_neISY",
  authDomain: "sellbook-edb0b.firebaseapp.com",
  databaseURL: "https://sellbook-edb0b-default-rtdb.firebaseio.com",
  projectId: "sellbook-edb0b",
  storageBucket: "sellbook-edb0b.appspot.com", // Fixed bucket name
  messagingSenderId: "88531585879",
  appId: "1:88531585879:web:98f9096dfb4edb622e8c12",
  measurementId: "G-F711RXV2DR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const analytics = getAnalytics(app); // Optional: Use only if needed
const database = getDatabase(app);
const storage = getStorage(app); // Initialize storage

// Export the required Firebase instances
export { app, analytics, database, storage };
