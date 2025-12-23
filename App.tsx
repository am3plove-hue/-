
import React from 'react';
import Layout from './components/Layout';
import ChatComponent from './components/ChatComponent';
import { FEATURES } from './constants';

const App: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-[0.2em]">
            Mystical Intelligence for Business
          </div>
          <h1 className="text-5xl md:text-7xl font-mystic font-bold leading-tight">
            신비한 <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient">Geni 솔루션</span><br />
            비즈니스의 마법이 시작됩니다
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
            데이터 속의 은하계를 탐험하고 당신의 성공을 위한 가장 정밀한 지도를 그려드립니다.<br />
            제니와 함께라면 불가능은 단지 또 다른 시작일 뿐입니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-xl shadow-indigo-600/30 hover:-translate-y-1">
              지금 상담 시작하기
            </button>
            <button className="px-8 py-4 rounded-full border border-slate-700 hover:border-indigo-500/50 text-slate-300 font-bold transition-all hover:bg-slate-900">
              더 알아보기
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-mystic font-bold">마법 같은 네 가지 기능</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-3xl hover:border-indigo-500/50 transition-all hover:-translate-y-2 group">
                <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-300 inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting Chat Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent -z-10"></div>
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-mystic font-bold">1:1 신비한 컨설팅</h2>
          <p className="text-slate-400">제니에게 무엇이든 물어보세요. 당신의 비즈니스를 위한 최적의 해답을 제안합니다.</p>
        </div>
        <ChatComponent />
      </section>

      {/* Social Proof / Call to Action */}
      <section className="py-24 px-6 bg-indigo-950/20">
        <div className="max-w-4xl mx-auto glass-panel p-12 rounded-[3rem] text-center border-2 border-indigo-500/20 shadow-2xl shadow-indigo-950/50 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
          
          <h2 className="text-4xl font-mystic font-bold mb-6">신비로운 변화를 경험한<br />수많은 파트너들</h2>
          <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="text-2xl font-bold">AETHER</span>
            <span className="text-2xl font-bold">LUMOS</span>
            <span className="text-2xl font-bold">NOVA</span>
            <span className="text-2xl font-bold">ORACLE</span>
            <span className="text-2xl font-bold">ZENITH</span>
          </div>
          <p className="mt-10 text-slate-300 italic">
            "제니 솔루션 도입 후 마케팅 효율이 300% 마법처럼 향상되었습니다. 단순히 AI가 아니라 미래를 보는 통찰력을 가졌습니다."
          </p>
          <p className="mt-4 font-bold text-indigo-400">— Lumos Corp, CEO Jane Doe</p>
        </div>
      </section>
    </Layout>
  );
};

export default App;
