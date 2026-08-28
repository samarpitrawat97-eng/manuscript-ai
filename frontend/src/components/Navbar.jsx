import React from 'react';
import { Book } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-white/10 flex items-center justify-between px-8 py-4">
      <div 
        className="flex items-center gap-3 cursor-pointer" 
        onClick={() => onNavigate && onNavigate('landing')}
      >
        <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          <Book size={24} className="text-background" />
        </div>
        <div>
          <h1 className="font-serif font-bold text-2xl tracking-tight text-gold">MANUSCRIPT AI</h1>
          <p className="text-[9px] text-white/40 tracking-[0.3em] uppercase leading-none">Digital Heritage Preservation</p>
        </div>
      </div>

      <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest text-white/70">
        {['Home', 'Digitize', 'Archive', 'About'].map((item) => (
          <button
            key={item}
            onClick={() => onNavigate && onNavigate(item.toLowerCase())}
            className="hover:text-gold transition-colors cursor-pointer"
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}