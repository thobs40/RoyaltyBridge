import { GoogleGenAI } from "@google/genai";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Standard initialization for text tasks
const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Low-latency insights using Gemini 2.5 Flash Lite
 */
export const getFastInsight = async (topic: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite-latest",
      contents: `Provide a extremely concise (max 15 words), professional music industry insight or status update regarding: ${topic}. Use futuristic technical language.`,
    });
    return response.text;
  } catch (error) {
    console.error("Fast Insight Error:", error);
    return "Node synchronized. Market volatility within expected parameters.";
  }
};

/**
 * Low-latency chat suggestions using Gemini 2.5 Flash Lite
 */
export const getFastChatReply = async (lastMessage: string, contactName: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite-latest",
      contents: `The contact "${contactName}" just said: "${lastMessage}". Provide 3 extremely short quick-reply options (max 4 words each) for a professional music collaborator. Return as a comma-separated list.`,
    });
    return response.text?.split(',').map(s => s.trim()) || [];
  } catch (error) {
    console.error("Fast Chat Reply Error:", error);
    return ["Understood", "Checking ledger", "Proceed with sync"];
  }
};

export const getRoyaltyInsights = async (earnings: number, plays: number) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Given a music creator has earned $${earnings} from ${plays} plays this period, provide 3 short, encouraging bullet points about their performance and 1 simple tip for increasing future earnings. Keep it concise and use music industry friendly language.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Keep creating great music! Focus on engaging your top listeners and registering all your latest splits accurately.";
  }
};

export const getTrackAnalysis = async (title: string, plays: number, earnings: number, cmo: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this specific music track performance: Title: "${title}", Plays: ${plays}, Earnings: $${earnings}, Collection Society: ${cmo}. 
      Provide:
      1. A one-sentence performance analysis.
      2. One specific tactical tip for the artist to maximize this track's future revenue.
      Keep the tone professional, insightful, and concise.`,
    });
    return response.text;
  } catch (error) {
    console.error("Track Analysis Error:", error);
    return "This track is showing stable collection patterns. Ensure your ISRC is correctly mapped across all DSPs to prevent royalty leakage.";
  }
};

export const getContactBio = async (name: string, role: string, worksCount: number) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short (2-3 sentences), professional, and encouraging endorsement bio for a collaborator named ${name} who is a ${role} and has collaborated on ${worksCount} shared works. Highlight their reliability and value in the music production ecosystem.`,
    });
    return response.text;
  } catch (error) {
    return `${name} is a highly valued ${role} with a consistent track record of excellence across ${worksCount} collaborative projects. Their professional approach makes them an asset to any creative network.`;
  }
};

/**
 * Generates high-quality musical assets using Gemini 3 Pro Image (Nano Banana Pro).
 */
export const generateMusicalImage = async (prompt: string, imageSize: "1K" | "2K" | "4K" = "1K", retryCount = 0): Promise<string | null> => {
  const MAX_RETRIES = 4;
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: `High-fidelity, professional 3D render of ${prompt}. 
            Aesthetic: Futuristic music industry, vibrant neon blue and deep slate colors, 
            cinematic studio lighting, sharp focus, clean minimalist background.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: imageSize
        }
      }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    return null;
  } catch (error: any) {
    const errorMsg = JSON.stringify(error).toLowerCase();
    
    if (errorMsg.includes("401") || errorMsg.includes("unauthenticated") || errorMsg.includes("credentials_missing") || errorMsg.includes("not supported by this api")) {
      throw new Error("AUTH_REQUIRED");
    }

    if (errorMsg.includes("503") || errorMsg.includes("unavailable") || errorMsg.includes("overloaded")) {
      if (retryCount < MAX_RETRIES) {
        const backoffDelay = (Math.pow(2, retryCount) * 2000) + (Math.random() * 1000);
        await delay(backoffDelay);
        return generateMusicalImage(prompt, imageSize, retryCount + 1);
      }
      throw new Error("MODEL_OVERLOADED");
    }

    if (errorMsg.includes("403") || errorMsg.includes("permission_denied")) {
      throw new Error("PERMISSION_DENIED");
    }

    console.error(`Unhandled Image Gen Error:`, error);
    return null;
  }
};