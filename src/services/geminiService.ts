import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const summarizeBudget = async (budgetData: any) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this county budget data for Kenyan citizens: ${JSON.stringify(budgetData)}. 
    Explain the recurrent vs development spending balance, highlight the top 3 projects, and provide a 2-sentence summary of what this means for a local citizen. 
    Use simple, non-expert language. Return as Markdown.`,
  });
  
  return response.text;
};

export const analyzeProposals = async (proposals: any[]) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze these citizen proposals for civic governance: ${JSON.stringify(proposals)}. 
    Identify the top 3 themes, potential budget overlaps, and provide a strategic recommendation for the county planning committee. 
    Format as JSON: { "themes": ["string"], "overlaps": ["string"], "recommendation": "string" }`,
    config: { responseMimeType: "application/json" }
  });
  return JSON.parse(response.text);
};

export const summarizeDiscussion = async (messages: any[]) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Summarize this multi-party negotiation discussion: ${JSON.stringify(messages.map(m => m.content))}. 
    What is the current consensus status? What are the remaining points of contention?
    Format as JSON: { "consensus": "string", "contention": ["string"], "nextSteps": "string" }`,
    config: { responseMimeType: "application/json" }
  });
  return JSON.parse(response.text);
};

export const generateCivicReport = async (data: any) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a production-grade civic audit report based on these project metrics and citizen reports: ${JSON.stringify(data)}. 
    Use professional but accessible tone. Highlight transparency score and accountability recommendations.`,
  });
  return response.text;
};

export const estimateProjectCost = async (demand: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `As a civic governance AI, estimate the typical cost and timeline for the following infrastructure demand in a Kenyan context: "${demand}". 
    Provide a realistic budget range (in KES), estimated duration, and 3 key dependencies or risks. 
    Format as JSON: { "estimatedCost": "string", "duration": "string", "risks": ["string"] }`,
    config: {
      responseMimeType: "application/json",
    }
  });
  
  try {
    const text = response.text;
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse AI cost estimation", e);
    return null;
  }
};
