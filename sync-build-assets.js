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

if (fs.existsSync("dist")) {
  let indexSrc = null;
  if (fs.existsSync("dist/app/applet/index.html")) {
    indexSrc = "dist/app/applet/index.html";
  } else if (fs.existsSync("dist/index.html")) {
    indexSrc = "dist/index.html";
  }

  if (indexSrc) {
    let content = fs.readFileSync(indexSrc, "utf-8");
    // Normalize relative asset paths from ../../Assets/ or ../Assets/ to Assets/
    content = content.replace(/\.\.\/\.\.\/Assets\//g, "Assets/");
    content = content.replace(/\.\.\/Assets\//g, "Assets/");
    content = content.replace(/src="\/src\/main\.tsx"/g, "src=\"Assets/index.js\"");
    content = content.replace(/\/src\/main\.tsx/g, "Assets/index.js");

    fs.writeFileSync("dist/index.html", content);
    console.log("✅ Written normalized dist/index.html");
  }

  copyFile("public/.htaccess", "dist/.htaccess");

  const jsIndex = "dist/Assets/index.js";
  const cssIndex = "dist/Assets/index.css";

  copyFile(jsIndex, "dist/Assets/JS/index.js");
  copyFile(jsIndex, "dist/Assets/JS/style.js");
  copyFile(jsIndex, "dist/Assets/JS/app.js");
  copyFile(jsIndex, "dist/Assets/JS/main.js");

  copyFile(cssIndex, "dist/Assets/CSS/index.css");
  copyFile(cssIndex, "dist/Assets/CSS/style.css");
  copyFile(cssIndex, "dist/Assets/CSS/main.css");

  copyFile(jsIndex, "public/Assets/JS/index.js");
  copyFile(cssIndex, "public/Assets/CSS/style.css");
  copyFile(cssIndex, "public/Assets/CSS/index.css");

  if (fs.existsSync("public/Assets/Images/Opossum_Ride_Illustration.png")) {
    copyFile("public/Assets/Images/Opossum_Ride_Illustration.png", "dist/Assets/Opossum_Ride_Illustration.png");
    copyFile("public/Assets/Images/Opossum_Ride_Illustration.png", "dist/Assets/Images/Opossum_Ride_Illustration.png");
  }

  if (fs.existsSync("public/Assets/Web_Assembly/index.wasm")) {
    copyFile("public/Assets/Web_Assembly/index.wasm", "dist/Assets/index.wasm");
    copyFile("public/Assets/Web_Assembly/index.wasm", "dist/Assets/Web_Assembly/index.wasm");
  }

  console.log("✅ Production build assets and .htaccess synchronized cleanly!");
}
