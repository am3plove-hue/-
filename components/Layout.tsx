
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <header className="sticky top-0 z-50 glass-panel border-b border-indigo-500/20 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <span className="text-xl">✨</span>
          </div>
          <div>
            <h1 className="text-xl font-mystic font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-200 tracking-wider">
              SINBIHAN GENI
            </h1>
            <p className="text-[10px] text-indigo-400 font-medium uppercase tracking-widest">Premium AI Solution</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-indigo-300 transition-colors">홈</a>
          <a href="#features" className="hover:text-indigo-300 transition-colors">솔루션 안내</a>
          <a href="#consulting" className="hover:text-indigo-300 transition-colors">상담실</a>
        </nav>
        <button className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
          로그인
        </button>
      </header>

      <main className="flex-1 overflow-auto">
        {children}
      </main>

      <footer className="py-12 border-t border-slate-900 bg-slate-950/50 text-center">
        <p className="text-slate-500 text-sm">
          &copy; 2024 Sinbihan Geni Solution. All rights reserved by Mystical Tech.
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <span className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center hover:border-indigo-500 transition-colors cursor-pointer">𝕏</span>
          <span className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center hover:border-indigo-500 transition-colors cursor-pointer">in</span>
          <span className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center hover:border-indigo-500 transition-colors cursor-pointer">IG</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
