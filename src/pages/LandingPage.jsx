import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Cpu, Search } from 'lucide-react';

export default function LandingPage({ onStart }) {
  return (
    <div className="pt-32 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-7xl md:text-9xl font-serif mb-6">
          Preserve the <br /> <span className="text-gold italic">written past.</span>
        </motion.h1>
        <p className="max-w-2xl mx-auto text-white/40 text-lg mb-12">Digitizing historical manuscripts with Computer Vision and Multimodal AI.</p>
        <button onClick={onStart} className="px-12 py-5 bg-gold text-background font-black rounded-full text-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(215,168,75,0.4)]">
          DIGITIZE MANUSCRIPT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto mt-32 pb-20">
        {[
          { icon: <Cpu />, title: "OpenCV Engine", desc: "Advanced noise reduction for faded ink." },
          { icon: <Zap />, title: "Red Ink Logic", desc: "Automatic separation of rubrication." },
          { icon: <Search />, title: "Multimodal AI", desc: "Deep understanding of Perso-Arabic scripts." },
          { icon: <Shield />, title: "Verified Archive", desc: "Human-in-the-loop verification system." }
        ].map((f, i) => (
          <div key={i} className="p-8 bg-secondary border border-white/5 rounded-3xl group hover:border-gold/30 transition-all">
            <div className="text-gold mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
            <h3 className="font-bold mb-2">{f.title}</h3>
            <p className="text-xs text-white/30 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}