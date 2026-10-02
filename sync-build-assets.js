import fs from "fs";
import path from "path";

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log("Copied: " + src + " -> " + dest);
  }
}

if (fs.existsSync("dist")) {
  const userHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset=\"UTF-8\" />
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
<title>Opossum Ride Adventure</title>
<link href=\"CSS/style.css\" rel=\"stylesheet\">
</head>
<body>
<div id=\"root\"></div>
<script type=\"module\" crossorigin src=\"Assets/JS/index.js\"></script>
</body>
</html>`;

  fs.writeFileSync("dist/index.html", userHtml);
  fs.mkdirSync("dist/Opossum_Ride_Adventure", { recursive: true });
  fs.writeFileSync("dist/Opossum_Ride_Adventure/index.html", userHtml);
  console.log("✅ Wrote user-requested index.html");

  copyFile("public/.htaccess", "dist/.htaccess");
  copyFile("public/.htaccess", "dist/Opossum_Ride_Adventure/.htaccess");

  const jsIndex = "dist/Assets/index.js";
  const cssIndex = "dist/Assets/index.css";

  // Match user requested paths exactly
  copyFile(jsIndex, "dist/Assets/JS/index.js");
  copyFile(jsIndex, "dist/Opossum_Ride_Adventure/Assets/JS/index.js");
  
  copyFile(cssIndex, "dist/CSS/style.css");
  copyFile(cssIndex, "dist/Opossum_Ride_Adventure/CSS/style.css");

  // Fallbacks
  copyFile(jsIndex, "dist/Assets/index.js");
  copyFile(cssIndex, "dist/Assets/index.css");

  // Images and Wasm
  const img = "public/Assets/Images/Opossum_Ride_Illustration.png";
  if (fs.existsSync(img)) {
    copyFile(img, "dist/Assets/Images/Opossum_Ride_Illustration.png");
    copyFile(img, "dist/Opossum_Ride_Adventure/Assets/Images/Opossum_Ride_Illustration.png");
  }
  
  const wasm = "public/Assets/Web_Assembly/index.wasm";
  if (fs.existsSync(wasm)) {
    copyFile(wasm, "dist/Assets/Web_Assembly/index.wasm");
    copyFile(wasm, "dist/Opossum_Ride_Adventure/Assets/Web_Assembly/index.wasm");
  }

  console.log("✅ Production build assets and .htaccess synchronized cleanly!");
}
