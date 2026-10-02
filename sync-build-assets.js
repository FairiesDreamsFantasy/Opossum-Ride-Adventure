import fs from 'fs';
import path from 'path';

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${src} -> ${dest}`);
  } else {
    console.warn(`Source file missing: ${src}`);
  }
}

if (fs.existsSync('dist')) {
  const indexHtml = 'dist/index.html';
  const jsIndex = 'dist/Assets/index.js';
  const cssIndex = 'dist/Assets/index.css';
  const htaccess = 'public/.htaccess';

  // Explicitly ensure dist/Opossum_Ride_Adventure directory exists
  fs.mkdirSync('dist/Opossum_Ride_Adventure', { recursive: true });

  // Copy index.html and .htaccess to dist/Opossum_Ride_Adventure
  copyFile(indexHtml, 'dist/Opossum_Ride_Adventure/index.html');
  copyFile(htaccess, 'dist/Opossum_Ride_Adventure/.htaccess');
  copyFile(htaccess, 'dist/.htaccess');

  // Copy assets to dist/Assets/ and dist/Opossum_Ride_Adventure/Assets/
  const assetBases = ['dist/Assets', 'dist/Opossum_Ride_Adventure/Assets'];

  for (const base of assetBases) {
    // JS variations
    copyFile(indexHtml, `${base}/index.html`);
    copyFile(indexHtml, `${base}/JS/index.html`);
    copyFile(jsIndex, `${base}/index.js`);
    copyFile(jsIndex, `${base}/JS/index.js`);
    copyFile(jsIndex, `${base}/JS/style.js`);
    copyFile(jsIndex, `${base}/JS/app.js`);
    copyFile(jsIndex, `${base}/JS/main.js`);

    // CSS variations
    copyFile(indexHtml, `${base}/CSS/index.html`);
    copyFile(cssIndex, `${base}/index.css`);
    copyFile(cssIndex, `${base}/CSS/index.css`);
    copyFile(cssIndex, `${base}/CSS/style.css`);
    copyFile(cssIndex, `${base}/CSS/main.css`);

    // Images
    copyFile(indexHtml, `${base}/Images/index.html`);
    if (fs.existsSync('public/Assets/Images/Opossum_Ride_Illustration.png')) {
      copyFile('public/Assets/Images/Opossum_Ride_Illustration.png', `${base}/Opossum_Ride_Illustration.png`);
      copyFile('public/Assets/Images/Opossum_Ride_Illustration.png', `${base}/Images/Opossum_Ride_Illustration.png`);
    }

    // WebAssembly
    copyFile(indexHtml, `${base}/Web_Assembly/index.html`);
    if (fs.existsSync('public/Assets/Web_Assembly/index.wasm')) {
      copyFile('public/Assets/Web_Assembly/index.wasm', `${base}/index.wasm`);
      copyFile('public/Assets/Web_Assembly/index.wasm', `${base}/Web_Assembly/index.wasm`);
    }
    if (fs.existsSync('public/Assets/Web_Assembly/index.wat')) {
      copyFile('public/Assets/Web_Assembly/index.wat', `${base}/index.wat`);
      copyFile('public/Assets/Web_Assembly/index.wat', `${base}/Web_Assembly/index.wat`);
    }
  }

  // Also sync directly to public folder so local repository matches
  copyFile(jsIndex, 'public/Assets/JS/index.js');
  copyFile(cssIndex, 'public/Assets/CSS/style.css');
  copyFile(cssIndex, 'public/Assets/CSS/index.css');

  console.log('✅ All asset files and case-insensitive Apache rewrite rules synchronized flawlessly!');
}
