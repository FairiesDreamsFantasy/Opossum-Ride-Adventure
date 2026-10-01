import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    assetsDir: "Assets",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "Assets/[name].js",
        chunkFileNames: "Assets/[name].js",
        assetFileNames: "Assets/[name].[ext]"
      }
    }
  }
});
