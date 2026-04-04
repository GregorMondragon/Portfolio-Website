import { GoogleGenerativeAI } from '@google/generative-ai';

// Note: Use 'GEMINI_API_KEY' for Vercel, not 'VITE_GEMINI_API_KEY' on the backend.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, instruction } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages format' });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      systemInstruction: instruction,
    });

    // Prepare history (Gemini requires starting with a user message)
    // We slice from the first user message
    const firstUserIndex = messages.findIndex(m => m.role === 'user');
    const conversationHistory = firstUserIndex !== -1 
      ? messages.slice(firstUserIndex, -1).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }))
      : [];

    const chat = model.startChat({
      history: conversationHistory,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    // The prompt is the very last user message
    const prompt = messages[messages.length - 1].content;
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ text });
  } catch (error) {
    console.error("Gemini Backend Error:", error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}
