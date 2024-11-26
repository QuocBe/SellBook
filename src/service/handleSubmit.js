import { ref, set } from "firebase/database";
import { database } from "../../firebaseConfig";
import { fetchSignInMethodsForEmail } from "firebase/auth";

const handleSubmit = async (values) => {
  setLoading(true);
  try {
    // Kiểm tra nếu email đã tồn tại
    const existingMethods = await fetchSignInMethodsForEmail(auth, values.email);
    if (existingMethods.length > 0) {
      message.error("Email is already in use.");
      setLoading(false);
      return;
    }

    // Tạo tài khoản Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    const userUID = userCredential.user.uid;

    // Lưu thông tin tài khoản vào Firebase Realtime Database
    await set(ref(database, `Account/${userUID}`), {
      username: values.username,
      email: values.email,
      password: values.password,
      role: "guest",
      userId: userUID,
    });

    message.success("User added successfully!");
    navigate("/login"); // Điều hướng về trang đăng nhập
  } catch (error) {
    console.error("Error adding user: ", error);
    message.error("Failed to add user.");
  } finally {
    setLoading(false);
  }
};


