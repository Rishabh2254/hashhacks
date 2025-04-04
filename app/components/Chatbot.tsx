"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! How can I help with your healthcare needs today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    if (isOpen) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus on input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot reply after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: generateResponse(input),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  // Simple response generator based on keywords
  const generateResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("appointment") || lowerQuery.includes("book")) {
      return "You can book an appointment by going to the 'Book Appointment' tab. Would you like me to guide you through the process?";
    } else if (lowerQuery.includes("doctor") || lowerQuery.includes("specialist")) {
      return "We have various specialists available. You can view all doctors in the appointment booking section. Do you have a specific specialty in mind?";
    } else if (lowerQuery.includes("record") || lowerQuery.includes("medical history")) {
      return "Your medical records can be found in the 'Medical Records' tab. Is there something specific you're looking for?";
    } else if (lowerQuery.includes("prescription") || lowerQuery.includes("medicine")) {
      return "You can view your prescriptions in the 'Medical Records' section. Would you like me to help you find something specific?";
    } else if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
      return "Hello! How can I assist with your healthcare needs today?";
    } else {
      return "Thank you for your message. How else can I help you with your healthcare needs today?";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white">
                <MessageSquare size={16} />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">HealthConnect Assistant</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-70 block mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
          
          {/* Input area */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="ml-2 bg-primary text-white rounded-full p-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white rounded-full p-3 shadow-lg hover:bg-primary/90 transition-transform duration-300 ease-in-out transform hover:scale-110"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageSquare size={24} />
        )}
      </button>
    </div>
  );
}
