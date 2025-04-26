import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/linekiller89.github.io/", // GitHub Pages 배포를 위한 base URL
});
