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
      // Prevent overwriting fresh builds with old stubs
      if (entry.name === 'index.js' || entry.name === 'style.css') {
        console.log(`Skipping legacy overwrite: ${srcPath}`);
        continue;
      }
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

  // 5. Ensure index.html references the clean production assets with ROBUST CACHE BUSTING
  const indexPath = 'dist/index.html';
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');

    const buildTimestamp = Date.now();
    const versionParam = `v=0.1.0.7.5-${buildTimestamp}`;
    console.log(`Applying Cache Busting parameter: ${versionParam}`);

    // Pre-normalize ALL possible path types to a clean standard
    html = html.replace('href="./CSS/style.css"', 'href="Assets/CSS/style.css"');
    html = html.replace('href="CSS/style.css"', 'href="Assets/CSS/style.css"');
    html = html.replace('src="./Assets/JS/index.js"', 'src="Assets/JS/index.js"');
    html = html.replace('src="Assets/JS/index.js"', 'src="Assets/JS/index.js"');

    // Perform final query parameter injection on the normalized paths
    html = html.split('src="Assets/JS/index.js"').join(`src="Assets/JS/index.js?${versionParam}"`);
    html = html.split('href="Assets/CSS/style.css"').join(`href="Assets/CSS/style.css?${versionParam}"`);

    // Fallback regex safety check in case Vite alters import quotes or formatting
    if (!html.includes('?v=')) {
      html = html.replace(/src=["']\.\/Assets\/JS\/index\.js["']/, `src="Assets/JS/index.js?${versionParam}"`);
      html = html.replace(/href=["']\.\/CSS\/style\.css["']/, `href="Assets/CSS/style.css?${versionParam}"`);
    }

    fs.writeFileSync(indexPath, html);
    console.log('✅ Cleaned, normalized, and verified dist/index.html with cache busting!');
  }
  console.log('✅ Production assets synchronized cleanly!');
}
