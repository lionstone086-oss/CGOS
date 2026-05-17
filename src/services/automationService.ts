import { GoogleGenAI, Type } from "@google/genai";
import axios from "axios";
import { db, auth } from "../lib/firebase";
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  updateDoc 
} from "firebase/firestore";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface AutomationResult {
  category: string;
  urgency: number;
  impact: number;
  score: number;
  feasibility?: string;
}

export const automationEngine = {
  /**
   * Automates the intake of a new citizen demand.
   * Logic: Classify -> Score -> Notify -> Store
   */
  processNewDemand: async (title: string, description: string) => {
    console.log("[Automation] Initiating Demand Intake Workflow...");

    // 1. AI Classification (n8n Workflow 1 simulation)
    const classificationResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Classify this civic issue into: road, water, health, education, security. 
      Analyze the text: "Title: ${title}. Description: ${description}".
      Return JSON: { "category": string, "urgency": number (1-10), "impact": number (1-10) }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            urgency: { type: Type.NUMBER },
            impact: { type: Type.NUMBER }
          },
          required: ["category", "urgency", "impact"]
        }
      }
    });

    const aiResult = JSON.parse(classificationResponse.text);

    // 2. AI Scoring Engine (n8n Simulation via Backend Webhook)
    const scoreResponse = await axios.post("/api/score", {
      ...aiResult,
      title,
      description,
      people_affected: 5000 // Mocked for now
    });
    
    // 3. Notify Backend Webhook (n8n Integration Simulation)
    await axios.post("/api/demands", {
      title,
      ...aiResult,
      score: scoreResponse.data.score
    });

    return {
      ...aiResult,
      score: scoreResponse.data.score
    };
  },

  /**
   * Snap & Send processing for image uploads.
   * Logic: Vision Analysis -> GPS Extraction -> Ticket Creation
   */
  processEvidence: async (imageBase64: string, mimeType: string) => {
    console.log("[Automation] Initiating Snap & Send Workflow...");

    // 1. AI Vision Analysis (n8n Workflow 2 simulation)
    const visionResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          inlineData: {
            mimeType: mimeType,
            data: imageBase64
          }
        },
        {
          text: `Identify the civic issue in this image. Classify as: road damage, crime, water leak, electricity, garbage, other.
          Also extract any visible landmarks or environmental context.
          Return JSON: { "issueType": string, "confidence": number, "description": string }`
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    const visionResult = JSON.parse(visionResponse.text);

    // 2. Notify Backend Webhook
    await axios.post("/api/reports", visionResult);

    return visionResult;
  },

  /**
   * Cross-references demand with budget data.
   * Logic: Cost Estimate -> Budget Check -> Recommendation
   */
  analyzeBudgetMatching: async (demandId: string, costEstimate: string, budgetData: string) => {
    console.log("[Automation] Initiating Budget Matching Workflow...");

    // 1. AI Evaluation (n8n Workflow 3 simulation)
    const budgetResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Given a demand cost estimate of ${costEstimate} and the regional budget details: ${budgetData}.
      Return JSON: { "feasible": boolean, "partialFundingOption": string, "recommendation": string, "feasibilityScore": number }`,
      config: { responseMimeType: "application/json" }
    });

    const budgetResult = JSON.parse(budgetResponse.text);

    // 2. Notify Backend Webhook
    await axios.post("/api/budget/check", { demandId, ...budgetResult });

    return budgetResult;
  }
};
