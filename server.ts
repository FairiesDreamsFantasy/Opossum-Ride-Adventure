import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json({ limit: "10mb" }));

  // Fullstack Gemini Proxy Endpoint for Player-Provided API Keys
  app.post("/api/gemini/generate", async (req, res) => {
    try {
      const { apiKey, model, contents, systemInstruction } = req.body;
      if (!apiKey) {
        return res.status(400).json({ error: "Missing player API Key in request body." });
      }

      const targetModel = model || "gemini-flash-latest";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;

      const payload: any = {
        contents: contents || []
      };

      if (systemInstruction) {
        payload.systemInstruction = {
          parts: [{ text: systemInstruction }]
        };
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "aistudio-build"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errText = await response.text();
        return res.status(response.status).json({ error: `Gemini API Error: ${errText}` });
      }

      const data = await response.json();
      return res.json(data);
    } catch (error: any) {
      console.error("[Fullstack Gemini Proxy Error]:", error);
      return res.status(500).json({ error: error.message || "Fullstack Gemini Proxy internal error." });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Mount Vite development middleware in non-production environments
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: Number(PORT) },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Fullstack Opossum Ride Adventure Server running on http://localhost:${PORT}`);
  });
}

startServer();
