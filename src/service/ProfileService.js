import { ref, get, update } from "firebase/database";
import { database } from "../../firebaseConfig";

export const fetchProfileData = async (email, form, setUserId, handleProvinceChange, handleDistrictChange) => {
  try {
    const dbRef = ref(database, "Account");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const accounts = snapshot.val();

      for (const key in accounts) {
        if (accounts[key].email === email) {
          // Lấy userId từ dữ liệu tài khoản
          const accountData = { ...accounts[key] };
          if (accountData.userId) {
            setUserId(accountData.userId); // Lưu userId để sử dụng khi cập nhật
          } else {
            setUserId(key); // Nếu không có userId, sử dụng key Firebase
          }

          // Xóa trường password để không hiển thị
          delete accountData.password;

          // Set dữ liệu vào form
          form.setFieldsValue(accountData);

          // Nếu đã có province/district, tự động tải districts và wards
          if (accountData.province) {
            handleProvinceChange(accountData.province);
          }
          if (accountData.district) {
            handleDistrictChange(accountData.district);
          }

          return; // Thoát sau khi tìm thấy tài khoản
        }
      }
    }

    throw new Error("User not found in the database.");
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};


export const updateProfileData = async (userId, values) => {
  if (!userId) {
    throw new Error("User ID not found.");
  }

  const userRef = ref(database, `Account/${userId}`);
  const updatedData = { ...values };

  // Loại bỏ các trường không cần thiết
  delete updatedData.currentPassword;
  delete updatedData.newPassword;
  delete updatedData.confirmPassword;

  try {
    await update(userRef, updatedData);
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

