import fs from 'fs';
import path from 'path';

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${src} -> ${dest}`);
  }
}

function copyDirectory(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

if (fs.existsSync('dist')) {
  // 1. Clean redundant nested folder inside dist if present
  if (fs.existsSync('dist/Opossum_Ride_Adventure')) {
    fs.rmSync('dist/Opossum_Ride_Adventure', { recursive: true, force: true });
    console.log('Removed bloated nested dist/Opossum_Ride_Adventure directory');
  }

  // 2. Sync public/Assets into dist/Assets
  if (fs.existsSync('public/Assets')) {
    copyDirectory('public/Assets', 'dist/Assets');
  }

  // 3. Ensure CSS availability at Assets/CSS/style.css
  if (fs.existsSync('dist/CSS/style.css')) {
    copyFile('dist/CSS/style.css', 'dist/Assets/CSS/style.css');
  }

  // 4. Sync production .htaccess and VERSION.txt
  copyFile('public/.htaccess', 'dist/.htaccess');
  copyFile('public/VERSION.txt', 'dist/VERSION.txt');

  // 5. Ensure index.html references the clean production assets accurately
  const indexPath = 'dist/index.html';
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Normalize CSS link to Assets/CSS/style.css
    html = html.replace('href="./CSS/style.css"', 'href="Assets/CSS/style.css"');
    html = html.replace('href="CSS/style.css"', 'href="Assets/CSS/style.css"');
    
    // Normalize JS script to Assets/JS/index.js
    html = html.replace('src="./Assets/JS/index.js"', 'src="Assets/JS/index.js"');

    // Ensure link tag exists before </head> if not present
    if (!html.includes('Assets/CSS/style.css')) {
      html = html.replace('</head>', '  <link href="Assets/CSS/style.css" rel="stylesheet">\n</head>');
    }
    
    fs.writeFileSync(indexPath, html);
    console.log('✅ Cleaned and verified dist/index.html with Assets/CSS/style.css and Assets/JS/index.js');
  }

  console.log('✅ Production assets synchronized cleanly without bloated nesting!');
}
