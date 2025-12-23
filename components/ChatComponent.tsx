
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { geminiService } from '../services/gemini';

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '반갑습니다. 신비한 Geni 솔루션의 상담원, 제니입니다. 당신의 비즈니스에 깃든 잠재력을 일깨우기 위해 제가 여기 있습니다. 어떤 고민이 있으신가요?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const assistantMsgId = (Date.now() + 1).toString();
      let fullContent = '';
      
      const assistantPlaceholder: Message = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, assistantPlaceholder]);

      const stream = geminiService.streamChat([...messages, userMsg].map(m => ({ role: m.role, content: m.content })));
      
      for await (const chunk of stream) {
        fullContent += chunk;
        setMessages(prev => 
          prev.map(m => m.id === assistantMsgId ? { ...m, content: fullContent } : m)
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="consulting" className="max-w-4xl mx-auto my-12 px-4">
      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/20 border border-indigo-500/30 flex flex-col h-[700px]">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 px-6 py-4 flex items-center justify-between border-b border-indigo-500/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 border-2 border-indigo-400">
                <img src="https://picsum.photos/id/64/200/200" alt="Geni" className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-bold text-slate-100">신비한 제니</h3>
              <p className="text-xs text-indigo-300">실시간 상담 중...</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-indigo-300 transition-colors p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Chat Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-indigo-600/50 flex-shrink-0 flex items-center justify-center text-xs">
                    🧞
                  </div>
                )}
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-900/40' 
                    : 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-slate-700/50'
                }`}>
                  {msg.content || (isLoading && msg.role === 'assistant' ? (
                    <div className="flex gap-1 py-1">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  ) : null)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="p-6 bg-slate-900/40 border-t border-indigo-500/10">
          <div className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="제니에게 당신의 비즈니스 고민을 말해보세요..."
              className="w-full bg-slate-800/50 border border-slate-700 focus:border-indigo-500 rounded-2xl py-4 pl-6 pr-16 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
          <p className="mt-3 text-[10px] text-center text-slate-500 uppercase tracking-widest font-medium">
            Sinbihan Geni는 당신의 비즈니스 비밀을 안전하게 보관합니다
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
