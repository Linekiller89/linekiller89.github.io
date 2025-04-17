import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      "/github": {
        target: "https://github.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/github/, ""),
      },
      "/api/github": {
        target: "https://api.github.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/github/, ""),
      },
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
