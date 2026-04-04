import { GoogleGenerativeAI } from '@google/generative-ai';

// Native Gemini API Key from Vercel Environment Variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(request) {
  // 1. Method check
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // 2. Parse the request body using standard JSON()
    const { messages, instruction } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    // 3. Setup Gemini Model
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      systemInstruction: instruction,
    });

    // 4. Prepare conversation history
    const firstUserIndex = messages.findIndex(m => m.role === 'user');
    const conversationHistory = firstUserIndex !== -1 
      ? messages.slice(firstUserIndex, -1).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }))
      : [];

    const chat = model.startChat({
      history: conversationHistory,
      generationConfig: { maxOutputTokens: 500 },
    });

    // 5. Send message and get response
    const prompt = messages[messages.length - 1].content;
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    // 6. Return response using standard Response.json()
    return Response.json({ text });
  } catch (error) {
    console.error("Gemini Native Error:", error);
    return Response.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
