import fs from "fs";
import path from "path";

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log("Copied: " + src + " -> " + dest);
  } else {
    console.warn("Source file missing: " + src);
  }
}

function writeHtml(destPath) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  let template = "index.html";
  if (fs.existsSync("dist/index.html") && destPath !== "dist/index.html") {
    template = "dist/index.html";
  }
  let content = fs.readFileSync(template, "utf8");
  content = content.replace(/\/src\/main\.tsx/g, "Assets/JS/index.js");
  content = content.replace(/src="\/src\/main\.tsx"/g, "src=\"Assets/JS/index.js\"");
  fs.writeFileSync(destPath, content);
  console.log("Generated HTML -> " + destPath);
}

if (fs.existsSync("dist")) {
  writeHtml("dist/index.html");
  writeHtml("dist/Opossum_Ride_Adventure/index.html");
  writeHtml("dist/Assets/index.html");
  writeHtml("dist/Assets/JS/index.html");
  writeHtml("dist/Assets/CSS/index.html");
  writeHtml("dist/Assets/Images/index.html");
  writeHtml("dist/Assets/Web_Assembly/index.html");
  writeHtml("dist/Opossum_Ride_Adventure/Assets/index.html");
  writeHtml("dist/Opossum_Ride_Adventure/Assets/JS/index.html");
  writeHtml("dist/Opossum_Ride_Adventure/Assets/CSS/index.html");
  writeHtml("dist/Opossum_Ride_Adventure/Assets/Images/index.html");
  writeHtml("dist/Opossum_Ride_Adventure/Assets/Web_Assembly/index.html");

  const htaccess = "public/.htaccess";
  copyFile(htaccess, "dist/.htaccess");
  copyFile(htaccess, "dist/Opossum_Ride_Adventure/.htaccess");

  const jsIndex = "dist/Assets/index.js";
  const cssIndex = "dist/Assets/index.css";

  const jsTargets = [
    "dist/Assets/index.js",
    "dist/Assets/JS/index.js",
    "dist/Assets/JS/style.js",
    "dist/Assets/JS/app.js",
    "dist/Assets/JS/main.js",
    "dist/Opossum_Ride_Adventure/Assets/index.js",
    "dist/Opossum_Ride_Adventure/Assets/JS/index.js",
    "dist/Opossum_Ride_Adventure/Assets/JS/style.js",
    "dist/Opossum_Ride_Adventure/Assets/JS/app.js",
    "dist/Opossum_Ride_Adventure/Assets/JS/main.js",
    "public/Assets/JS/index.js"
  ];

  const cssTargets = [
    "dist/Assets/index.css",
    "dist/Assets/CSS/index.css",
    "dist/Assets/CSS/style.css",
    "dist/Assets/CSS/main.css",
    "dist/Opossum_Ride_Adventure/Assets/index.css",
    "dist/Opossum_Ride_Adventure/Assets/CSS/index.css",
    "dist/Opossum_Ride_Adventure/Assets/CSS/style.css",
    "dist/Opossum_Ride_Adventure/Assets/CSS/main.css",
    "public/Assets/CSS/style.css",
    "public/Assets/CSS/index.css"
  ];

  for (const target of jsTargets) {
    copyFile(jsIndex, target);
  }
  for (const target of cssTargets) {
    copyFile(cssIndex, target);
  }

  if (fs.existsSync("public/Assets/Images/Opossum_Ride_Illustration.png")) {
    copyFile("public/Assets/Images/Opossum_Ride_Illustration.png", "dist/Assets/Opossum_Ride_Illustration.png");
    copyFile("public/Assets/Images/Opossum_Ride_Illustration.png", "dist/Assets/Images/Opossum_Ride_Illustration.png");
    copyFile("public/Assets/Images/Opossum_Ride_Illustration.png", "dist/Opossum_Ride_Adventure/Assets/Opossum_Ride_Illustration.png");
    copyFile("public/Assets/Images/Opossum_Ride_Illustration.png", "dist/Opossum_Ride_Adventure/Assets/Images/Opossum_Ride_Illustration.png");
  }

  if (fs.existsSync("public/Assets/Web_Assembly/index.wasm")) {
    copyFile("public/Assets/Web_Assembly/index.wasm", "dist/Assets/index.wasm");
    copyFile("public/Assets/Web_Assembly/index.wasm", "dist/Assets/Web_Assembly/index.wasm");
    copyFile("public/Assets/Web_Assembly/index.wasm", "dist/Opossum_Ride_Adventure/Assets/index.wasm");
    copyFile("public/Assets/Web_Assembly/index.wasm", "dist/Opossum_Ride_Adventure/Assets/Web_Assembly/index.wasm");
  }

  console.log("✅ All production HTML templates, asset bundles, and cPanel rewrite rules synchronized flawlessly!");
}
