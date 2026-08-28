// src/pages/AnalysisPage.jsx
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function AnalysisPage({ onVerifyAndSave }) {
  const manuscriptData = {
    title: 'The Tale of the Mutiny',
    author: 'Nawab Wazir Ali Khan Bahadur Nasrat Jang',
    language: 'Persian / Urdu',
    script: 'Perso-Arabic',
    confidence: '94%',
    extractedRedInk: 'The Tale of the Mutiny, narrated by Nawab Wazir Ali Khan Bahadur Nasrat Jang.',
    content: 'If the light of Ahmad (the Prophet) had not been made manifest, The earth would not exist, nor would this revolving sky. Neither the Divine Throne (Arsh) nor the Chair (Kursi) would exist, And nothing in this universe would have ever been...'
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Top Header Row with Title and Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white/5 border border-white/10 p-6 rounded-2xl">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">
            {manuscriptData.title}
          </h1>
          <p className="text-sm text-amber-200/70 italic mt-1">{manuscriptData.author}</p>
        </div>

        <button
          onClick={() => onVerifyAndSave && onVerifyAndSave(manuscriptData)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all border border-emerald-400/30 shrink-0"
        >
          <CheckCircle2 size={18} />
          Verify & Save Results
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Image Card */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-center justify-center min-h-[450px]">
          <span className="text-white/40 font-mono text-sm">[ Manuscript Image Preview ]</span>
        </div>

        {/* Right: Analysis Cards */}
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] text-white/40 uppercase tracking-wider block">AI Confidence</span>
              <span className="text-xl font-bold text-emerald-400">{manuscriptData.confidence}</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] text-white/40 uppercase tracking-wider block">Language</span>
              <span className="text-sm font-semibold text-white">{manuscriptData.language}</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] text-white/40 uppercase tracking-wider block">Detected Script</span>
              <span className="text-sm font-semibold text-amber-200">{manuscriptData.script}</span>
            </div>
          </div>

          <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl">
            <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block mb-1">
              Extracted Red Ink (Rubrication)
            </span>
            <p className="text-sm text-white/80 font-serif italic">
              {manuscriptData.extractedRedInk}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
            <span className="text-xs text-white/40 font-semibold uppercase tracking-wider block mb-3">
              Main Manuscript Text (Black Ink)
            </span>
            <p className="text-sm text-white/90 font-serif leading-relaxed bg-black/40 p-4 rounded-lg border border-white/5">
              {manuscriptData.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}