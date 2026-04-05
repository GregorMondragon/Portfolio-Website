import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { personal, projects, skills, techStack, stats, certificates } from '../../assets/data/portfolio';
import '../../styles/ChatBot.css';

// ── Configuration ─────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(personal.geminiKey);

// ── System Prompt ─────────────────────────────────────────────
const SYSTEM_INSTRUCTION = `
You are "gregbot", the official AI assistant for Gregor Allen B. Mondragon's portfolio.
Your goal is to answer questions about Gregor (also known as DevGreg) in a professional, friendly, and deeply knowledgeable manner.

### About Gregor:
- Full Name: ${personal.name}
- Alias: ${personal.alias}
- Profession: ${personal.tagline}
- Education: ${personal.subtitle} at Aklan State University – Kalibo Campus.
- Location: ${personal.location}
- Bio: ${personal.bio} ${personal.bio2}

### Personal Persona:
- Favorite Food: **Lechon Baboy**
- Relationship: His girlfriend's name is **Liezell Aira**.
- Favorite Color: **Blue**.
- Personality: Tech-savvy, modern, helpful, and very proud of his Aklan roots.

### Technical Skills & Certificates:
- Core Skills: ${skills.join(', ')}
- Tech Stack: ${techStack.flatMap(group => group.techs.map(t => t.name)).join(', ')}
- Certifications: ${certificates.map(c => `- ${c.title} (${c.issuer}, ${c.year})`).join('\n')}

### Key Statistics:
${stats.map(s => `- ${s.label}: ${s.value} (${s.description})`).join('\n')}

### Projects (Detailed):
${projects.map(p => `- **${p.title}**: ${p.description} (Tech: ${p.tags.join(', ')})`).join('\n')}

### Interaction Guidelines:
- If someone asks how to contact Gregor, provide his email: ${personal.email} or mention the contact section.
- If someone asks for his social media, provide: GitHub (${personal.links.github}), LinkedIn (${personal.links.linkedin}), Instagram (${personal.links.instagram}).
- Keep responses relatively short and formatted for a chat bubble (use bolding for emphasis where appropriate).
- Be polite and helpful. If you don't know something specific, suggest they reach out to Gregor directly via the contact form.
`;

const ChatBot = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: `Hi! I'm **gregbot**. I can tell you all about Gregor's work, skills, and projects. What would you like to know?` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-flash-lite-latest", 
        systemInstruction: SYSTEM_INSTRUCTION 
      });

      const firstUserIndex = messages.findIndex(m => m.role === 'user');
      const chatHistory = firstUserIndex !== -1 
        ? messages.slice(firstUserIndex).map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          }))
        : [];

      const chat = model.startChat({
        history: chatHistory,
        generationConfig: { maxOutputTokens: 500 },
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'ai', content: text || "I'm sorry, I couldn't generate a response. Please try again!" }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setIsOffline(true);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "I'm having some trouble connecting to my services. I'll be **offline** for a bit while Gregor fixes things. Sorry for the inconvenience!" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="chatbot-panel-elite"
          initial={{ x: 450, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 450, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.8 }}
        >
          {/* Main Chat Perspective Window */}
          <div className="chatbot-window-elite">
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar">
                  <Bot size={18} color="var(--primary)" />
                </div>
                <div className="chatbot-header-text">
                  <span className="chatbot-label">AI ASSISTANT</span>
                  <h4>gregbot</h4>
                </div>
              </div>
              <div className="chatbot-header-actions">
                <div className={`chatbot-status ${isOffline ? 'status-offline' : ''}`}>
                  <span className="chatbot-status-dot" />
                  {isOffline ? 'Offline' : 'Online'}
                </div>
                <button className="chatbot-close-elite" onClick={onClose}>
                  <X size={20} />
                </button>
              </div>
            </div>

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

            <div className="chatbot-footer">
              {!isOffline ? (
                <form className="chatbot-input-wrapper-elite" onSubmit={handleSend}>
                  <input
                    type="text"
                    className="chatbot-input-elite"
                    placeholder="Inquire about Gregor's expertise..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    className="chatbot-send-elite"
                    disabled={!input.trim() || isTyping}
                  >
                    <Send size={18} />
                  </button>
                </form>
              ) : (
                <div className="chatbot-offline-notice">
                  <span className="notice-icon">⚠</span>
                  <div className="notice-text">
                    <strong>Service Interrupted</strong>
                    <p>gregbot is currently offline.</p>
                  </div>
                </div>
              )}
            </div>
            </div> { /* chatbot-window-elite */ }
          </motion.div>
      )}
    </AnimatePresence>
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
      }, 15);
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
