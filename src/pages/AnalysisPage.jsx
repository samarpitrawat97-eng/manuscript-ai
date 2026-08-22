import React, { useState } from 'react';
import { DEMO_MANUSCRIPT } from '../data/mockData';
import { ShieldCheck, AlertTriangle, Type, FileText } from 'lucide-react';
import manuscriptImg from '../assets/manuscript.jpeg'; 

export default function AnalysisPage() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="pt-28 px-8 max-w-[1600px] mx-auto pb-20">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start mb-8">
        <div>
            <div className="flex gap-2 mb-2">
                <span className="text-[10px] bg-gold/10 text-gold px-2 py-1 rounded font-bold uppercase tracking-wider border border-gold/20">AI Extraction Complete</span>
                <span className="text-[10px] bg-redInk/10 text-redInk px-2 py-1 rounded font-bold uppercase tracking-wider border border-redInk/20">Red Ink Detected</span>
            </div>
            <h1 className="text-4xl font-serif text-white">{DEMO_MANUSCRIPT.title}</h1>
            <p className="text-white/40 italic">{DEMO_MANUSCRIPT.author}</p>
        </div>
        <button 
          onClick={() => setIsVerified(true)} 
          className={`px-8 py-3 rounded-lg font-bold transition-all ${isVerified ? 'bg-green-600/20 text-green-400 border border-green-600/30' : 'bg-gold text-background hover:bg-goldLight shadow-lg shadow-gold/20'}`}
        >
            {isVerified ? '✓ Digitally Archived' : 'Verify & Save Results'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT COLUMN: THE ORIGINAL PHOTO */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-secondary shadow-2xl aspect-[3/4]">
          <img 
            src={manuscriptImg} 
            alt="Original Manuscript" 
            className="w-full h-full object-contain p-6 opacity-90"
          />
          {/* AI Scanning Line Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-full h-[3px] bg-gold/60 shadow-[0_0_20px_rgba(215,168,75,0.8)] animate-scan top-0" />
          </div>
          {/* Rubrication Detection Box */}
          <div className="absolute top-[10%] left-[15%] w-[70%] h-[45px] border-2 border-redInk bg-redInk/5 rounded animate-pulse">
            <div className="absolute -top-6 left-0 bg-redInk text-white text-[8px] px-2 py-0.5 rounded font-bold uppercase tracking-widest">
              Red Ink Detected
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE ANSWER (AI RESULTS) */}
        <div className="space-y-6 overflow-y-auto max-h-[1000px] pr-4 custom-scrollbar">
            
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-secondary p-4 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-white/30 uppercase mb-1 font-bold">AI Confidence</p>
                    <p className="text-2xl font-bold text-gold">{DEMO_MANUSCRIPT.confidence}%</p>
                </div>
                <div className="bg-secondary p-4 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-white/30 uppercase mb-1 font-bold">Language</p>
                    <p className="text-lg font-bold">Persian / Urdu</p>
                </div>
                <div className="bg-secondary p-4 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-white/30 uppercase mb-1 font-bold">Detected Script</p>
                    <p className="text-lg font-bold italic">Perso-Arabic</p>
                </div>
            </div>

            {/* THE RED INK ANSWER BOX */}
            <div className="bg-redInk/5 border border-redInk/20 rounded-2xl p-6 shadow-lg shadow-redInk/5">
                <div className="flex items-center gap-2 mb-3">
                    <FileText size={16} className="text-redInk" />
                    <h3 className="text-redInk text-[10px] font-black uppercase tracking-widest">Extracted Red Ink (Rubrication)</h3>
                </div>
                <p className="text-redInk font-serif text-2xl italic leading-tight">
                    {DEMO_MANUSCRIPT.redInk}
                </p>
            </div>

            {/* THE BLACK INK ANSWER BOX */}
            <div className="bg-secondary border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="flex bg-white/5 border-b border-white/10 px-8 py-4 items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-2">
                        <Type size={14} /> Main Manuscript Text (Black Ink)
                    </h3>
                    <span className="text-[10px] text-white/30 uppercase">Manuscript ID: MS-001</span>
                </div>
                <div className="p-8">
                    <textarea 
                        className="w-full min-h-[600px] bg-transparent border border-white/5 rounded-2xl p-8 font-serif text-2xl leading-[1.6] text-parchment/90 focus:outline-none focus:border-gold/30 transition-all resize-none"
                        defaultValue={DEMO_MANUSCRIPT.extractedText} 
                        readOnly={isVerified}
                    />
                </div>
            </div>

            {/* VERIFICATION WARNING */}
            {!isVerified && (
                <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/20 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-amber-500">Human Verification Required</p>
                        <p className="text-xs text-white/40 leading-relaxed italic">
                            The AI has flagged "Zulekha" and "Nasrat" for manual review. Please confirm the text before archival.
                        </p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}