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
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: "0.0.0.0"
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Output JS exactly to Assets/JS/index.js
        entryFileNames: "Assets/JS/index.js",
        chunkFileNames: "Assets/JS/[name].js",
        // Output CSS exactly to CSS/style.css
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'CSS/style.css';
          }
          return 'Assets/[name].[ext]';
        }
      }
    }
  }
});
