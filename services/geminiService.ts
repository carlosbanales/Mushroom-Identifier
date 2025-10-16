
import { GoogleGenAI, Type } from "@google/genai";
import type { MushroomAnalysis } from '../types';
import { Edibility } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeMushroomImage(
  imageBase64: string,
  mimeType: string
): Promise<MushroomAnalysis> {

  const imagePart = {
    inlineData: { data: imageBase64, mimeType },
  };

  const textPart = {
    text: `Identify the mushroom in this image. Provide its common and scientific name, its edibility status, a confidence score from 0 to 1, and a short description.`,
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        systemInstruction: `You are an expert mycologist. Analyze mushroom images with extreme caution. Your primary goal is safety and education. For any identification, you MUST include a strong disclaimer that AI identification is not 100% accurate and no one should ever eat a wild mushroom based on an app's identification. Structure your response strictly according to the provided JSON schema.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            species: {
              type: Type.STRING,
              description: 'The common and scientific name of the mushroom.',
            },
            edibility: {
              type: Type.STRING,
              enum: [Edibility.EDIBLE, Edibility.POISONOUS, Edibility.INEDIBLE, Edibility.UNKNOWN],
              description: 'The edibility status of the mushroom.',
            },
            description: {
              type: Type.STRING,
              description: 'A brief description of the mushroom, its characteristics, habitat, and look-alikes. Crucially, start this description with a warning about the dangers of misidentification.',
            },
            confidence: {
              type: Type.NUMBER,
              description: 'A confidence score for the identification, from 0.0 to 1.0.',
            },
          },
          required: ['species', 'edibility', 'description', 'confidence'],
        },
      },
    });

    const jsonText = response.text.trim();
    // A simple validation to ensure we have a parseable object.
    if (!jsonText.startsWith('{') || !jsonText.endsWith('}')) {
        throw new Error("Received malformed JSON response from API.");
    }
    return JSON.parse(jsonText) as MushroomAnalysis;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
}
