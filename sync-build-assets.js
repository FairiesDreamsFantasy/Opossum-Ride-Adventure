import fs from 'fs';
import path from 'path';

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log('Copied: ' + src + ' -> ' + dest);
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
      if (entry.name === 'index.js' || entry.name === 'style.css') {
         console.log('Skipping legacy overwrite: ' + srcPath);
         continue;
      }
      copyFile(srcPath, destPath);
    }
  }
}

if (fs.existsSync('dist')) {
  if (fs.existsSync('dist/Opossum_Ride_Adventure')) {
    fs.rmSync('dist/Opossum_Ride_Adventure', { recursive: true, force: true });
  }
  if (fs.existsSync('public/Assets')) {
    copyDirectory('public/Assets', 'dist/Assets');
  }
  if (fs.existsSync('dist/CSS/style.css')) {
    copyFile('dist/CSS/style.css', 'dist/Assets/CSS/style.css');
  }
  copyFile('public/.htaccess', 'dist/.htaccess');
  copyFile('public/VERSION.txt', 'dist/VERSION.txt');

  const indexPath = 'dist/index.html';
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');
    const versionParam = 'v=0.1.0.7.5-' + Date.now();
    
    // Use string search and replace to avoid regex escaping hell in node -e
    html = html.split('src="Assets/JS/index.js"').join('src="Assets/JS/index.js?' + versionParam + '"');
    html = html.split('href="Assets/CSS/style.css"').join('href="Assets/CSS/style.css?' + versionParam + '"');
    
    fs.writeFileSync(indexPath, html);
    console.log('Applied Cache Busting: ' + versionParam);
  }
  console.log('✅ Clean production sync completed.');
}