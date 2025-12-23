
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async chat(messages: { role: string; content: string }[]) {
    try {
      // Map messages to Gemini format
      const history = messages.slice(0, -1).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const lastMessage = messages[messages.length - 1].content;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            ...history.map(h => ({ role: h.role, parts: h.parts })),
            { role: 'user', parts: [{ text: lastMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.8,
          topP: 0.9,
          maxOutputTokens: 2048,
        },
      });

      return response.text || "죄송합니다, 잠시 연결이 불안정합니다. 마법의 힘을 다시 모으고 있어요.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "무언가 신비로운 방해가 발생했습니다. 잠시 후 다시 시도해주세요.";
    }
  }

  async *streamChat(messages: { role: string; content: string }[]) {
    try {
      const history = messages.slice(0, -1).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const lastMessage = messages[messages.length - 1].content;

      const responseStream = await this.ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: [
            ...history.map(h => ({ role: h.role, parts: h.parts })),
            { role: 'user', parts: [{ text: lastMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.8,
        },
      });

      for await (const chunk of responseStream) {
        yield chunk.text || "";
      }
    } catch (error) {
      console.error("Gemini Streaming Error:", error);
      yield "오류가 발생했습니다.";
    }
  }
}

export const geminiService = new GeminiService();
