import { GoogleGenAI, Type } from "@google/genai";
import type { UXReport } from '../types';

// Fix: Use process.env.API_KEY directly and ensure it is set.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const reportSchema = {
  type: Type.OBJECT,
  properties: {
    overallScore: { type: Type.NUMBER, description: "Overall UX score from 0 to 100." },
    performance: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER, description: "Performance score from 0 to 100." },
        summary: { type: Type.STRING, description: "Brief summary of performance aspects." }
      },
      required: ['score', 'summary']
    },
    accessibility: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER, description: "Accessibility score from 0 to 100." },
        summary: { type: Type.STRING, description: "Brief summary of accessibility." }
      },
       required: ['score', 'summary']
    },
    seo: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER, description: "SEO score from 0 to 100." },
        summary: { type: Type.STRING, description: "Brief summary of SEO aspects." }
      },
       required: ['score', 'summary']
    },
    designConsistency: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER, description: "Design consistency score from 0 to 100." },
        summary: { type: Type.STRING, description: "Brief summary of design consistency." }
      },
       required: ['score', 'summary']
    },
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3-5 key UX strengths."
    },
    suggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3-5 actionable improvement suggestions."
    },
  },
  required: ['overallScore', 'performance', 'accessibility', 'seo', 'designConsistency', 'strengths', 'suggestions']
};

export const generateUXReport = async (url: string): Promise<UXReport> => {
    const prompt = `
    Act as a world-class UX analysis engine. You have been provided with the URL: ${url}. 
    Perform a thorough audit of this website. Synthesize all available information about this site, including common user feedback, known performance metrics, accessibility compliance, and design language. 
    Your analysis should be as detailed and accurate as if you had conducted a live review using professional tools.

    Generate a detailed UX report in the required JSON format. The report must be realistic, insightful, and actionable.

    The report must cover these key areas:
    1.  **Performance**: Speed, responsiveness, and efficiency.
    2.  **Accessibility**: Adherence to WCAG guidelines, usability for people with disabilities.
    3.  **SEO**: Search engine visibility and optimization.
    4.  **Design Consistency**: Coherence of visual elements, branding, and layout.

    Provide an overall UX Score from 0-100, and individual scores for each of the four areas mentioned above. Also, include a list of key strengths and a separate list of concrete, actionable suggestions for improvement.`;

  try {
    const response = await ai.models.generateContent({
      // Fix: Use a more capable model for complex analysis tasks.
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: reportSchema,
        temperature: 0.2,
      },
    });

    const reportJsonString = response.text;
    if (!reportJsonString) {
      throw new Error("Received an empty response from the API.");
    }
    
    const cleanedJson = reportJsonString.replace(/^```json\s*|```$/g, '').trim();

    return JSON.parse(cleanedJson) as UXReport;

  } catch (error) {
    console.error("Error generating UX report:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};