
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getRoyaltyInsights = async (earnings: number, plays: number) => {
  try {
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

    for (const part of response.candidates[0].content.parts) {
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
