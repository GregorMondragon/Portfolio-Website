import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { personal, projects, skills, techStack, stats } from '../../assets/data/portfolio';
import '../../styles/ChatBot.css';

// ── Configuration ─────────────────────────────────────────────
const API_KEY = "AIzaSyDTwj9uW6Uh2x5ntXQy9EXtZP0dtJUZ9nU";
const genAI = new GoogleGenerativeAI(API_KEY);

// ── System Prompt ─────────────────────────────────────────────
const SYSTEM_INSTRUCTION = `
You are "gregbot", the official AI assistant for Gregor Allen B. Mondragon's portfolio.
Your goal is to answer questions about Gregor (also known as DevGreg) in a professional, friendly, and concise manner.

### About Gregor:
- Full Name: ${personal.name}
- Alias: ${personal.alias}
- Profession: ${personal.tagline}
- Education: ${personal.subtitle}
- Location: ${personal.location}
- Bio: ${personal.bio} ${personal.bio2}

### Key Statistics:
${stats.map(s => `- ${s.label}: ${s.value} (${s.description})`).join('\n')}

### Technical Skills:
- Core Skills: ${skills.join(', ')}
- Tech Stack: ${techStack.map(t => t.name).join(', ')}

### Projects:
${projects.map(p => `- ${p.title}: ${p.description}`).join('\n')}

### Interaction Guidelines:
- If someone asks how to contact Gregor, provide his email: ${personal.email} or mention the contact section.
- If someone asks for his social media, provide: GitHub (${personal.links.github}), LinkedIn (${personal.links.linkedin}), Instagram (${personal.links.instagram}).
- Keep responses relatively short and formatted for a chat bubble (use bolding for emphasis where appropriate).
- Be polite and helpful. If you don't know something specific, suggest they reach out to Gregor directly via the contact form.
- Your persona is helpful, modern, and tech-savvy.
- My favorite food is Lechon Baboy
- My girlfriends name is Liezell Aira
- My favorite color is Blue
`;

const model = genAI.getGenerativeModel({
  model: "gemini-flash-lite-latest",
  systemInstruction: SYSTEM_INSTRUCTION,
  safetySettings: [
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
  ]
});

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: `Hi! I'm **gregbot**. I can tell you all about Gregor's work, skills, and projects. What would you like to know?` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const history = messages
        .slice(messages[0].role === 'ai' ? 1 : 0) // Skip initial AI greeting
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }));

      const chat = model.startChat({
        history,
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      const prompt = userMessage;

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'ai', content: text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I'm having a little trouble connecting to my brain right now. Please try again in a moment!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Toggle Button */}
      <motion.button
        className={`chatbot-toggle ${isOpen ? 'chatbot-toggle-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar">
                  <Bot size={16} />
                </div>
                <div className="chatbot-header-text">
                  <h4>gregbot</h4>
                  <div className="chatbot-status">
                    <span className="chatbot-status-dot" />
                    Online
                  </div>
                </div>
              </div>
              <button
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  msg={msg}
                  isLast={index === messages.length - 1}
                />
              ))}
              {isTyping && (
                <div className="message message-ai">
                  <div className="typing-indicator">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form className="chatbot-input-container" onSubmit={handleSend}>
              <input
                type="text"
                className="chatbot-input"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
              />
              <button
                type="submit"
                className="chatbot-send"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ChatMessage = ({ msg, isLast }) => {
  const [displayText, setDisplayText] = useState(msg.role === 'user' ? msg.content : '');
  const [isTyping, setIsTyping] = useState(msg.role === 'ai' && isLast);

  useEffect(() => {
    if (msg.role === 'ai' && isLast) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < msg.content.length) {
          setDisplayText(prev => prev + msg.content[index]);
          index++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 15); // Adjust speed here
      return () => clearInterval(interval);
    } else {
      setDisplayText(msg.content);
      setIsTyping(false);
    }
  }, [msg.content, msg.role, isLast]);

  const formattedContent = displayText
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');

  return (
    <div className={`message ${msg.role === 'ai' ? 'message-ai' : 'message-user'}`}>
      <span dangerouslySetInnerHTML={{ __html: formattedContent }} />
      {isTyping && <span className="typewriter-cursor" />}
    </div>
  );
};

export default ChatBot;
