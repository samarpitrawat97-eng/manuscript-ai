import React from 'react';
import { Upload, Database, Clock, CheckCircle, FileText, Search } from 'lucide-react';

// 1. IMPORT THE IMAGE HERE
import manuscriptImg from '../assets/manuscript.jpeg'; 

export default function Dashboard({ onAnalyze }) {
  return (
    <div className="pt-32 px-8 max-w-7xl mx-auto">
      {/* ... (keep your header and statistics code the same) ... */}

      {/* Main Upload Zone */}
      <div onClick={onAnalyze} className="border-2 border-dashed border-white/10 rounded-[2rem] p-16 bg-secondary/30 hover:bg-secondary/50 hover:border-gold/40 transition-all cursor-pointer text-center mb-16">
        <div className="w-20 h-20 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Upload className="text-gold" size={32} />
        </div>
        <h3 className="text-2xl font-serif text-white mb-3">Digitize New Manuscript</h3>
        <button className="px-10 py-4 bg-gold text-background font-black rounded-full text-xs uppercase tracking-widest hover:bg-goldLight">
            Use Demo Manuscript
        </button>
      </div>

      <h3 className="text-xs font-bold text-white/20 uppercase tracking-[0.4em] mb-8">Recent Archives</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
        {[1, 2, 3].map((item, i) => (
          <div key={i} className="group bg-secondary p-5 rounded-2xl border border-white/5 flex gap-5 items-center hover:border-gold/30 transition-all">
            <div className="w-20 h-20 bg-white/5 rounded-xl overflow-hidden border border-white/5 shrink-0">
               {/* 2. USE THE IMPORTED VARIABLE HERE */}
               <img 
                 src={manuscriptImg} 
                 className="object-cover h-full w-full opacity-60 group-hover:opacity-100 transition-all" 
                 alt="Thumbnail"
               />
            </div>
            <div>
              <p className="font-serif text-white truncate">The Tale of the Mutiny</p>
              <p className="text-[10px] text-white/30 uppercase font-bold tracking-wider">Verified • MS-00{i+1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}