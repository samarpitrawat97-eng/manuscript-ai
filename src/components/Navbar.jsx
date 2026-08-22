import React from 'react';
import { Book } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-white/5 px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
        <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(215,168,75,0.3)]">
          <Book size={24} className="text-background" />
        </div>
        <div>
          <h1 className="font-serif font-bold text-2xl tracking-tight text-gold">MANUSCRIPT AI</h1>
          <p className="text-[9px] text-white/40 tracking-[0.3em] uppercase leading-none">Digital Heritage Preservation</p>
        </div>
      </div>
      <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest text-white/50">
        {['Home', 'Digitize', 'Archive', 'About'].map(item => (
          <button key={item} className="hover:text-gold transition-colors">{item}</button>
        ))}
      </div>
      <button onClick={() => onNavigate('dashboard')} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-gold hover:text-background transition-all">TRY DEMO</button>
    </nav>
  );
}