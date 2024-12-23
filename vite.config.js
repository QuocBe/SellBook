import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "./", // Thư mục gốc chứa index.html
  build: {
    outDir: "dist", // Thư mục xuất build (dist)
    assetsDir: "assets", // Nơi lưu trữ tài nguyên như ảnh, css, js
    rollupOptions: {
      input: "./index.html" // Tệp đầu vào chính
    }
  }
});
