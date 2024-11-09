import { database } from '../../firebaseConfig';
import { ref, get, child } from "firebase/database";

// Hàm kiểm tra thông tin đăng nhập của người dùng
const checkUserCredentials = async (email, password) => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, 'users'));
    if (snapshot.exists()) {
      const users = snapshot.val();
      for (let key in users) {
        if (users[key].email === email && users[key].password === password) {
          return users[key].role; // Trả về vai trò của người dùng (admin hoặc user)
        }
      }
    }
    return null; // Không tìm thấy tài khoản phù hợp
  } catch (error) {
    console.error("Error checking user credentials: ", error);
    return null;
  }
};

export { checkUserCredentials };
