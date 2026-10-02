import fs from 'fs';
import path from 'path';

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  }
}

// Ensure dist directory exists
if (fs.existsSync('dist')) {
  const indexHtml = 'dist/index.html';
  const jsIndex = 'dist/Assets/index.js';
  const cssIndex = 'dist/Assets/index.css';
  const htaccess = 'public/.htaccess';

  // 1. Sync index.html to subdirectories
  copyFile(indexHtml, 'dist/Opossum_Ride_Adventure/index.html');
  copyFile(indexHtml, 'dist/Assets/index.html');
  copyFile(indexHtml, 'dist/Assets/JS/index.html');
  copyFile(indexHtml, 'dist/Assets/CSS/index.html');
  copyFile(indexHtml, 'dist/Assets/Images/index.html');
  copyFile(indexHtml, 'dist/Assets/Web_Assembly/index.html');
  copyFile(indexHtml, 'dist/Opossum_Ride_Adventure/Assets/index.html');
  copyFile(indexHtml, 'dist/Opossum_Ride_Adventure/Assets/JS/index.html');
  copyFile(indexHtml, 'dist/Opossum_Ride_Adventure/Assets/CSS/index.html');

  // 2. Sync compiled JS bundle to all expected paths
  copyFile(jsIndex, 'dist/Assets/JS/index.js');
  copyFile(jsIndex, 'dist/Opossum_Ride_Adventure/Assets/index.js');
  copyFile(jsIndex, 'dist/Opossum_Ride_Adventure/Assets/JS/index.js');
  copyFile(jsIndex, 'public/Assets/JS/index.js');

  // 3. Sync compiled CSS to all expected paths
  copyFile(cssIndex, 'dist/Assets/CSS/style.css');
  copyFile(cssIndex, 'dist/Assets/CSS/index.css');
  copyFile(cssIndex, 'dist/Opossum_Ride_Adventure/Assets/index.css');
  copyFile(cssIndex, 'dist/Opossum_Ride_Adventure/Assets/CSS/style.css');
  copyFile(cssIndex, 'public/Assets/CSS/style.css');

  // 4. Sync WebAssembly and Images
  copyFile('public/Assets/Web_Assembly/index.wasm', 'dist/Assets/Web_Assembly/index.wasm');
  copyFile('public/Assets/Web_Assembly/index.wasm', 'dist/Opossum_Ride_Adventure/Assets/Web_Assembly/index.wasm');
  copyFile('public/Assets/Images/Opossum_Ride_Illustration.png', 'dist/Assets/Images/Opossum_Ride_Illustration.png');
  copyFile('public/Assets/Images/Opossum_Ride_Illustration.png', 'dist/Opossum_Ride_Adventure/Assets/Images/Opossum_Ride_Illustration.png');

  // 5. Sync .htaccess
  copyFile(htaccess, 'dist/.htaccess');
  copyFile(htaccess, 'dist/Opossum_Ride_Adventure/.htaccess');

  console.log('✅ All assets successfully synchronized across all structure paths!');
}
