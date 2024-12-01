import { storage } from "./firebaseConfig"; // Đường dẫn chính xác đến file cấu hình
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const testUpload = async () => {
  const testFile = new File(["Hello Firebase"], "test.txt", {
    type: "text/plain",
  });

  const storagePath = storageRef(storage, `Test/${testFile.name}`);

  try {
    // Upload file
    await uploadBytes(storagePath, testFile);

    // Lấy URL download
    const downloadURL = await getDownloadURL(storagePath);
    console.log("Uploaded file URL:", downloadURL);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

testUpload();
