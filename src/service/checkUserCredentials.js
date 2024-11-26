import { ref, get, child } from "firebase/database";
import { database } from "../../firebaseConfig";

// Hàm kiểm tra thông tin đăng nhập
export const checkUserCredentials = async (email, password) => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `Account`)); // Lấy tất cả tài khoản từ Firebase
    if (snapshot.exists()) {
      const accounts = snapshot.val();
      for (let key in accounts) {
        if (
          accounts[key].email === email &&
          accounts[key].password === password
        ) {
          return accounts[key].role; // Trả về vai trò (admin hoặc guest)
        }
      }
    }
    return null; // Không tìm thấy tài khoản phù hợp
  } catch (error) {
    console.error("Error checking user credentials: ", error);
    return null;
  }
};

