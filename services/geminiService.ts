import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePackageDescription = async (description: string): Promise<AIAnalysisResult | null> => {
  if (!description.trim()) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following package description for shipping purposes. Estimate weight and dimensions if implied, identify the category, and provide handling advice.
      
      Description: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            weightEstimate: { type: Type.STRING, description: "Estimated weight (e.g., '2kg')" },
            dimensionEstimate: { type: Type.STRING, description: "Estimated dimensions (e.g., '30x20x10cm')" },
            category: { type: Type.STRING, description: "Category of the item (e.g., Electronics, Clothing)" },
            handlingAdvice: { type: Type.STRING, description: "Specific handling advice (e.g., Fragile, Keep Dry)" }
          }
        }
      }
    });

    if (response.text) {
        return JSON.parse(response.text) as AIAnalysisResult;
    }
    return null;

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
        handlingAdvice: "Could not analyze. Please enter details manually."
    };
  }
};