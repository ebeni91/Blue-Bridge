import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

const AI_RESPONSES: Record<string, { text: string; suggestions?: string[] }> = {
  greeting: {
    text: "Hello! I'm your Blue Bridge AI assistant. I can help you find the perfect agricultural products. What are you looking for today?",
    suggestions: ['Show me organic vegetables', 'I need farming equipment', 'Find fresh fruits', 'Seeds for planting'],
  },
  vegetables: {
    text: "We have a great selection of organic vegetables! I found tomatoes, carrots, potatoes, and corn. Would you like to see more details about any specific vegetable?",
    suggestions: ['Tell me about tomatoes', 'Show carrots', 'What about potatoes?'],
  },
  fruits: {
    text: "Fresh fruits are available from local farmers! We have strawberries, apples, and seasonal fruits. All are freshly harvested. Which one interests you?",
    suggestions: ['Strawberries details', 'Show me apples', 'What else is available?'],
  },
  equipment: {
    text: "We offer various farming equipment and supplies including organic fertilizers, seeds, and tools. What type of equipment are you looking for?",
    suggestions: ['Fertilizers', 'Seeds', 'Show all equipment'],
  },
  seeds: {
    text: "We have premium quality seeds including wheat, corn, and vegetable seeds. All our seeds are tested for quality and have high germination rates. Interested in any specific type?",
    suggestions: ['Wheat seeds', 'Vegetable seeds', 'Show all seeds'],
  },
  default: {
    text: "I can help you find products, compare prices, or learn more about our farmers. What would you like to know?",
    suggestions: ['Browse products', 'Compare prices', 'About our farmers'],
  },
};

export function AiChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: AI_RESPONSES.greeting.text,
      sender: 'ai',
      timestamp: new Date(),
      suggestions: AI_RESPONSES.greeting.suggestions,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAiResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('vegetable') || lowerMessage.includes('tomato') || lowerMessage.includes('carrot') || lowerMessage.includes('potato')) {
      return AI_RESPONSES.vegetables;
    } else if (lowerMessage.includes('fruit') || lowerMessage.includes('strawberr') || lowerMessage.includes('apple')) {
      return AI_RESPONSES.fruits;
    } else if (lowerMessage.includes('equipment') || lowerMessage.includes('tool') || lowerMessage.includes('fertilizer')) {
      return AI_RESPONSES.equipment;
    } else if (lowerMessage.includes('seed')) {
      return AI_RESPONSES.seeds;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return AI_RESPONSES.greeting;
    } else {
      return AI_RESPONSES.default;
    }
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = getAiResponse(text);
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-emerald-200 overflow-hidden max-w-4xl mx-auto">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3>AI Shopping Assistant</h3>
            <p className="text-sm text-emerald-100">Always here to help you find what you need</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-emerald-50/30">
        {messages.map(message => (
          <div key={message.id}>
            <div
              className={`flex gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-emerald-600' : 'bg-teal-600'
                }`}
              >
                {message.sender === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-emerald-900 border-2 border-emerald-200'
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-emerald-100' : 'text-emerald-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            {/* Suggestions */}
            {message.suggestions && message.sender === 'ai' && (
              <div className="flex flex-wrap gap-2 mt-3 ml-11">
                {message.suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-white hover:bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm border border-emerald-300 transition-all hover:border-emerald-500"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t-2 border-emerald-200 bg-white">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about products..."
            className="flex-1 px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2 disabled:bg-emerald-300 disabled:cursor-not-allowed"
            disabled={!inputValue.trim()}
          >
            <Send className="w-5 h-5" />
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  );
}