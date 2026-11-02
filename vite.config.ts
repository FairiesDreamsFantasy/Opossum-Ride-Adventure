import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "./",
  publicDir: "public",
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: "0.0.0.0"
  },
  optimizeDeps: {
    include: ["react", "react-dom", "motion", "lucide-react", "@google/genai"],
    holdUntilCrawlEnd: true
  },
  build: {
    outDir: "dist",
    assetsDir: "Assets",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        entryFileNames: "Assets/[name].js",
        chunkFileNames: "Assets/[name]-[hash].js",
        assetFileNames: "Assets/[name]-[hash].[ext]",
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('src/System/Registry')) {
            return 'registry';
          }
        }
      }
    }
  }
});
