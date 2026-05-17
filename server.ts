import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes - These mimic the webhook endpoints requested by the user
  
  // Send demand to automation engine
  app.post("/api/demands", async (req, res) => {
    const demand = req.body;
    console.log("[CGOS] New demand received at webhook:", demand.title);
    // In a real n8n setup, we'd axios.post to n8n here.
    // For this build, we'll return success and let the frontend handle the "AI Enrichment" 
    // to comply with the Gemni API skill constraints (frontend-only AI calls).
    res.json({ 
      status: "queued", 
      message: "Demand transmitted to CGOS Automation Engine (n8n Simulation)",
      receivedAt: new Date().toISOString()
    });
  });

  // Snap & Send report
  app.post("/api/reports", async (req, res) => {
    const report = req.body;
    console.log("[CGOS] New evidence report received at webhook:", report.type);
    res.json({ 
      status: "processing", 
      message: "Evidence sealed and sent to Vision Analysis",
      receivedAt: new Date().toISOString()
    });
  });

  // Budget check trigger
  app.post("/api/budget/check", async (req, res) => {
    console.log("[CGOS] Budget matching engine triggered");
    res.json({ 
      status: "analyzing", 
      message: "Cross-referencing demand with fiscal year allocations",
      receivedAt: new Date().toISOString()
    });
  });

  // AI Scoring Engine (The Logic provided by user)
  app.post("/api/score", (req, res) => {
    const demand = req.body;
    let score = 0;

    // Urgency (Default to 5 if not provided)
    score += (demand.urgency || 5) * 2;

    // Impact
    score += (demand.impact || 5) * 2;

    // Population affected
    score += Math.min((demand.people_affected || 0) / 1000, 20);

    // Cost efficiency
    if ((demand.cost_estimate || 0) < 1000000) score += 10;
    else score += 5;

    // Emergency boost
    if (demand.category === "security") score += 15;

    const finalScore = Math.min(score, 100);
    res.json({ score: finalScore });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Correctly derive __dirname for ES Modules
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CGOS] Core Hub running on port ${PORT}`);
    console.log(`[CGOS] Automation Webhooks active at http://0.0.0.0:${PORT}/api/*`);
  });
}

startServer();
