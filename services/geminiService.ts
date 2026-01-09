
import { GoogleGenAI } from "@google/genai";

// Initialize with the correct named parameter. process.env.API_KEY is assumed to be available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getRoyaltyInsights = async (earnings: number, plays: number) => {
  try {
    // Using correct model name 'gemini-3-flash-preview' and direct property access for .text
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
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short (2-3 sentences), professional, and encouraging endorsement bio for a collaborator named ${name} who is a ${role} and has collaborated on ${worksCount} shared works. Highlight their reliability and value in the music production ecosystem.`,
    });
    return response.text;
  } catch (error) {
    return `${name} is a highly valued ${role} with a consistent track record of excellence across ${worksCount} collaborative projects. Their professional approach makes them an asset to any creative network.`;
  }
};

export const explainCmoTerm = async (term: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain the music industry term "${term}" (e.g., CMO, PRO, Mechanical Royalty) in one simple, plain-english sentence for a beginner musician.`,
    });
    return response.text;
  } catch (error) {
    return "This term refers to organizations or processes that help music creators get paid for their creative work.";
  }
};

export const generateMusicalImage = async (prompt: string) => {
  try {
    // Using gemini-2.5-flash-image for image generation tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `High-quality, artistic, hyper-realistic, 3D render of ${prompt}, vibrant purple and blue neon lighting, cinematic depth of field, minimalist clean background, futuristic music industry aesthetic.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Correctly iterating through parts to find the image part in the GenerateContentResponse.
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};
