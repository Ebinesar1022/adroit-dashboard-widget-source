import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "service_z/app/",
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
  },
});
