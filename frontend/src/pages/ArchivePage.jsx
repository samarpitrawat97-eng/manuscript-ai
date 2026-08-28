// src/pages/ArchivePage.jsx
import React from 'react';
import { BookCheck, FileText, Calendar, Hash, CheckCircle2 } from 'lucide-react';

export default function ArchivePage({ manuscripts = [] }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6 pt-2">
        <div>
          <h1 className="text-3xl font-serif font-bold text-amber-100">Digital Archive</h1>
          <p className="text-sm text-white/50 mt-1">
            Verified and digitally preserved historical records
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs text-white/70">
          Total Preserved: <span className="text-amber-400 font-bold ml-1">{manuscripts.length}</span>
        </div>
      </div>

      {manuscripts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] border border-dashed border-white/10 rounded-2xl p-8 text-center bg-white/[0.02]">
          <BookCheck size={48} className="text-white/20 mb-4" />
          <h3 className="text-xl font-serif text-amber-200 mb-2">No Archived Manuscripts Yet</h3>
          <p className="text-sm text-white/50 max-w-md">
            Verify manuscripts in the Digitize section to store them permanently in the digital heritage archive.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manuscripts.map((item) => (
            <div 
              key={item.id} 
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-amber-400/40 transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md flex items-center gap-1 font-semibold">
                    <CheckCircle2 size={12} /> DIGITALLY ARCHIVED
                  </span>
                  <span className="text-xs text-white/40 flex items-center gap-1 font-mono">
                    <Hash size={12} /> {item.id}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-white mb-1">
                  {item.title}
                </h3>
                {item.author && (
                  <p className="text-xs text-amber-200/60 italic mb-3">{item.author}</p>
                )}

                <p className="text-xs text-white/70 line-clamp-4 mb-4 font-mono bg-black/40 p-3 rounded-lg border border-white/5 leading-relaxed">
                  {item.content || item.extractedText}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs text-white/40">
                <span className="flex items-center gap-1">
                  <FileText size={14} /> {item.language}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {new Date(item.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}