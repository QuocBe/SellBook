import mongoose from 'mongoose';
import express from 'express';

const uri = "mongodb+srv://haquocphap28:<db_0933030165Phap>@cluster0.v1w9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Thay <db_password> bằng mật khẩu thực tế của bạn.
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("Failed to connect to MongoDB:", err));

// Giữ server chạy
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
