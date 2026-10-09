/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Pre-Flight Boot Sentinel
 * Scientific degassing & self-healing engine for development server lifecycle.
 * Inspired by controlled degassing columns (Lake Nyos safety principles).
 */

import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

console.log('⚡ [Sentinel] Running pre-flight dev server integrity check...');

// 1. Purge rogue shadow archives and zip files to prevent memory & disk thrashing
function degasShadowArchives(targetDir) {
  if (!fs.existsSync(targetDir)) return;
  try {
    const entries = fs.readdirSync(targetDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(targetDir, entry.name);
      if (entry.isFile() && entry.name.endsWith('.zip')) {
        fs.rmSync(fullPath, { force: true });
        console.log(`🧹 [Sentinel] Degassed shadow archive: ${fullPath}`);
      }
    }
  } catch (err) {
    console.warn(`⚠️ [Sentinel] Non-critical warning scanning ${targetDir}:`, err.message);
  }
}

degasShadowArchives(path.join(ROOT_DIR, 'public'));
degasShadowArchives(path.join(ROOT_DIR, 'dist'));

// 2. Self-healing integrity check for core application files
const ESSENTIAL_FILES = [
  {
    path: path.join(ROOT_DIR, 'src', 'main.tsx'),
    template: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
  },
  {
    path: path.join(ROOT_DIR, 'src', 'index.css'),
    template: `@import "tailwindcss";

:root {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: dark;
  color: rgba(255, 255, 255, 0.95);
  background-color: #000000;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-height: 100dvh;
}
`
  },
  {
    path: path.join(ROOT_DIR, 'vite.config.ts'),
    template: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: "0.0.0.0"
  },
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
`
  },
  {
    path: path.join(ROOT_DIR, 'tsconfig.json'),
    template: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "sync-build-assets.js", "scripts"]
}
`
  }
];

let healedCount = 0;
for (const item of ESSENTIAL_FILES) {
  if (!fs.existsSync(item.path)) {
    fs.mkdirSync(path.dirname(item.path), { recursive: true });
    fs.writeFileSync(item.path, item.template, 'utf8');
    console.log(`🛡️ [Sentinel] Self-healed missing file: ${path.relative(ROOT_DIR, item.path)}`);
    healedCount++;
  }
}

// 3. Verify Version Synchronization
try {
  const versionPath = path.join(ROOT_DIR, 'VERSION.txt');
  if (fs.existsSync(versionPath)) {
    const v = fs.readFileSync(versionPath, 'utf8').trim();
    const publicV = path.join(ROOT_DIR, 'public', 'VERSION.txt');
    if (fs.existsSync(publicV)) {
      const pv = fs.readFileSync(publicV, 'utf8').trim();
      if (pv !== v) {
        fs.writeFileSync(publicV, v, 'utf8');
        console.log(`🔄 [Sentinel] Synchronized public/VERSION.txt to ${v}`);
      }
    }
  }
} catch (e) {
  console.warn('⚠️ [Sentinel] Version check notice:', e.message);
}

if (healedCount === 0) {
  console.log('✅ [Sentinel] Dev server integrity 100% verified. Launching Vite...');
} else {
  console.log(`✅ [Sentinel] Dev server restored (${healedCount} items healed). Launching Vite...`);
}
