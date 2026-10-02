import fs from 'fs';
import path from 'path';

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${src} -> ${dest}`);
  }
}

if (fs.existsSync('dist')) {
  // 1. Generate user-requested index.html precisely
  // We use type="module" because the build is an ES module.
  const userHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Opossum Ride Adventure</title>
<link href="CSS/style.css" rel="stylesheet">
</head>
<body>
<div id="root"></div>
<script type="module" crossorigin src="Assets/JS/index.js"></script>
</body>
</html>`;

  fs.writeFileSync('dist/index.html', userHtml);
  
  // Ensure subdirectory compatibility
  fs.mkdirSync('dist/Opossum_Ride_Adventure', { recursive: true });
  fs.writeFileSync('dist/Opossum_Ride_Adventure/index.html', userHtml);
  
  // 2. Sync .htaccess
  copyFile('public/.htaccess', 'dist/.htaccess');
  copyFile('public/.htaccess', 'dist/Opossum_Ride_Adventure/.htaccess');

  // 3. Sync absolute fallbacks
  copyFile('dist/Assets/JS/index.js', 'dist/Opossum_Ride_Adventure/Assets/JS/index.js');
  copyFile('dist/CSS/style.css', 'dist/Opossum_Ride_Adventure/CSS/style.css');

  // 4. Sync Images and WebAssembly
  const images = 'public/Assets/Images/Opossum_Ride_Illustration.png';
  if (fs.existsSync(images)) {
    copyFile(images, 'dist/Assets/Images/Opossum_Ride_Illustration.png');
    copyFile(images, 'dist/Opossum_Ride_Adventure/Assets/Images/Opossum_Ride_Illustration.png');
  }

  const wasm = 'public/Assets/Web_Assembly/index.wasm';
  if (fs.existsSync(wasm)) {
    copyFile(wasm, 'dist/Assets/Web_Assembly/index.wasm');
    copyFile(wasm, 'dist/Opossum_Ride_Adventure/Assets/Web_Assembly/index.wasm');
  }

  console.log('✅ Production assets synchronized to user-requested paths with structural integrity!');
}
