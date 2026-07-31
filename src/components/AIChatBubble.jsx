import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faPaperPlane,
  faXmark,
  faSpinner,
  faTrash,
  faRobot,
  faUser
} from '@fortawesome/free-solid-svg-icons';
const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, '');

const MarkdownComponents = {
  // Paragraf
  p: ({ children }) => (
    <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
  ),
  // Bold
  strong: ({ children }) => (
    <strong className="font-black">{children}</strong>
  ),
  // Italic
  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),
  // Inline code
  code: ({ inline, children }) =>
    inline ? (
      <code className="bg-nb-yellow border border-black px-1 py-0.5 rounded text-[11px] font-mono font-bold">
        {children}
      </code>
    ) : (
      <pre className="bg-gray-900 text-green-400 p-2 rounded-lg text-[11px] font-mono overflow-x-auto my-2 border-2 border-black">
        <code>{children}</code>
      </pre>
    ),
  // Unordered list
  ul: ({ children }) => (
    <ul className="list-none space-y-1 my-1">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="flex gap-1.5 items-start">
      <span className="text-nb-pink font-black mt-0.5 flex-shrink-0">•</span>
      <span>{children}</span>
    </li>
  ),
  // Ordered list
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-1 my-1">{children}</ol>
  ),
  // Headings
  h1: ({ children }) => <h1 className="font-black text-base uppercase tracking-tight border-b-2 border-black pb-1 mb-2">{children}</h1>,
  h2: ({ children }) => <h2 className="font-black text-sm uppercase tracking-tight border-b border-black pb-1 mb-1">{children}</h2>,
  h3: ({ children }) => <h3 className="font-black text-sm uppercase mb-1">{children}</h3>,
  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-nb-pink pl-3 my-2 italic text-gray-700 bg-nb-cream rounded-r-lg py-1">
      {children}
    </blockquote>
  ),
  // Horizontal rule
  hr: () => <hr className="border-t-2 border-black my-2" />,
  // Links
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-nb-cyan underline font-bold hover:text-nb-pink transition-colors">
      {children}
    </a>
  ),
  // TABLE: full GFM support dengan scroll horizontal
  table: ({ children }) => (
    <div className="overflow-x-auto my-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
      <table className="w-full text-xs border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-nb-yellow border-b-2 border-black">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-black/20">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-nb-cream/60 transition-colors">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-2 py-1.5 text-left font-black uppercase tracking-tight text-black border-r border-black/20 last:border-r-0 whitespace-nowrap">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-2 py-1.5 text-black border-r border-black/10 last:border-r-0 align-top">
      {children}
    </td>
  ),
};

export default function AIChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize chat with welcome message if empty
  useEffect(() => {
    const key = 'chatbot_history_web_porto';
    const savedMessages = localStorage.getItem(key);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const initialMessage = {
        sender: 'assistant',
        text: 'Halo! Saya asisten AI Rafly. Ada yang bisa saya bantu terkait profil, keahlian, atau proyek Rafly?',
        timestamp: new Date().toISOString()
      };
      setMessages([initialMessage]);
      localStorage.setItem(key, JSON.stringify([initialMessage]));
    }
  }, []);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const saveMessages = (newMessages) => {
    setMessages(newMessages);
    localStorage.setItem('chatbot_history_web_porto', JSON.stringify(newMessages));
  };

  const clearChat = () => {
    const initialMessage = {
      sender: 'assistant',
      text: 'Halo! Saya asisten AI Rafly. Ada yang bisa saya bantu terkait profil, keahlian, atau proyek Rafly?',
      timestamp: new Date().toISOString()
    };
    saveMessages([initialMessage]);
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessageText = input.trim();
    setInput('');

    const updatedMessages = [
      ...messages,
      { sender: 'user', text: userMessageText, timestamp: new Date().toISOString() }
    ];
    saveMessages(updatedMessages);
    setIsLoading(true);

    const result = await sendMessageToGateway(userMessageText, updatedMessages);

    if (result.success) {
      const { content } = result.data;
      saveMessages([
        ...updatedMessages,
        { sender: 'assistant', text: content, timestamp: new Date().toISOString() }
      ]);
    } else {
      saveMessages([
        ...updatedMessages,
        { sender: 'system', text: result.error, timestamp: new Date().toISOString() }
      ]);
    }
    setIsLoading(false);
  };

  const sendMessageToGateway = async (messageText, allMessages) => {
    const history = allMessages
      .filter(m => m.sender === 'user' || m.sender === 'assistant')
      .slice(0, -1)
      .slice(-10)
      .map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }));

    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText, history }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const content = data.reply || "";
      return { success: true, data: { content } };
    } catch (error) {
      console.error("Gagal terhubung ke backend AI:", error);
      return { success: false, error: "Gagal terhubung ke asisten AI. Pastikan backend aktif." };
    }
  };

  return (
    <div className="fixed bottom-6 left-4 sm:bottom-10 sm:left-6 md:left-10 z-[9998] font-sans">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-nb-pink border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all flex items-center justify-center text-black"
          aria-label="Open AI Assistant"
        >
          <FontAwesomeIcon icon={faComments} className="text-lg sm:text-xl" />
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[300px] sm:w-[360px] h-[400px] sm:h-[460px] bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-nb-yellow border-b-[3px] border-black p-3 sm:p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-black">
                <FontAwesomeIcon icon={faRobot} className="text-sm text-nb-yellow" />
              </div>
              <div>
                <h3 className="font-black text-sm sm:text-base uppercase tracking-tight text-black leading-none">Stellochron</h3>
                <span className="text-[10px] uppercase font-bold text-gray-600 bg-white border border-black px-1.5 py-0.5 rounded">AI Assistant</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                title="Clear Chat History"
                className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center text-black hover:bg-red-200 transition-colors"
              >
                <FontAwesomeIcon icon={faTrash} className="text-xs" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center text-black hover:bg-nb-pink transition-colors"
                aria-label="Close Chat"
              >
                <FontAwesomeIcon icon={faXmark} className="text-sm" />
              </button>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-nb-cream min-h-0">
            {messages.map((msg, index) => {
              const isAssistant = msg.sender === 'assistant';
              const isSystem = msg.sender === 'system';

              if (isSystem) {
                return (
                  <div key={index} className="flex justify-center my-2">
                    <div className="bg-red-100 border-2 border-red-500 text-red-700 text-xs px-3 py-1.5 rounded-lg max-w-[90%] font-semibold shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              return (
                <div key={index} className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
                  <div className={`flex gap-2 ${isAssistant ? 'max-w-full flex-row' : 'max-w-[80%] flex-row-reverse'}`}>
                    {/* Avatar */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border border-black flex-shrink-0 mt-1 ${isAssistant ? 'bg-nb-yellow' : 'bg-nb-pink'}`}>
                      <FontAwesomeIcon icon={isAssistant ? faRobot : faUser} />
                    </div>

                    {/* Bubble */}
                    <div className={`
                      px-3 py-2.5 rounded-2xl border-2 border-black text-xs sm:text-sm
                      shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                      ${isAssistant
                        ? 'bg-white text-black rounded-tl-sm'
                        : 'bg-nb-pink text-black rounded-tr-sm'}
                    `}>
                      {isAssistant ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={MarkdownComponents}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      ) : (
                        <p className="leading-relaxed">{msg.text}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading / Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-nb-yellow flex items-center justify-center text-[10px] border border-black flex-shrink-0 mt-1">
                    <FontAwesomeIcon icon={faRobot} />
                  </div>
                  <div className="px-3 py-2.5 rounded-2xl rounded-tl-sm border-2 border-black bg-white text-black text-xs flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-nb-pink" />
                    <span className="font-bold uppercase tracking-wider animate-pulse">Mengetik...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSend} className="p-3 border-t-[3px] border-black bg-white flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan sesuatu..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 border-2 border-black rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-nb-cream bg-white text-black font-semibold placeholder-gray-400 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-nb-pink border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-40 disabled:pointer-events-none transition-all flex-shrink-0"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
