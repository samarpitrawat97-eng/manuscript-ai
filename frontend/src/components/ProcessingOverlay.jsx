import React from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, X } from 'lucide-react';

const steps = [
    'Enhancing Image',
    'Isolating Script',
    'Detecting Red Ink',
    'AI Text Extraction',
    'Neural Translation',
];

export default function ProcessingOverlay({
                                              currentStep,
                                              error,
                                              onCancel,
                                          }) {
    const activeIndex = Math.max(
        0,
        steps.findIndex((step) => step === currentStep)
    );

    return (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center px-6">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                className="w-20 h-20 border-t-4 border-gold rounded-full mb-12"
            />

            <div className="w-full max-w-md">
                <p className="text-center text-gold text-xs uppercase tracking-[0.3em] font-bold mb-8">
                    Manuscript Processing
                </p>

                <div className="space-y-4">
                    {steps.map((text, index) => {
                        const completed = index < activeIndex;
                        const active = index === activeIndex;

                        return (
                            <div
                                key={text}
                                className={`flex items-center justify-between transition-colors ${
                                    completed || active
                                        ? 'text-white'
                                        : 'text-white/20'
                                }`}
                            >
                <span className="text-sm font-medium">
                  {text}
                </span>

                                {completed && (
                                    <Check
                                        size={16}
                                        className="text-gold"
                                    />
                                )}

                                {active && !error && (
                                    <Loader2
                                        size={16}
                                        className="animate-spin text-gold"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {error && (
                    <div className="mt-8 p-4 rounded-xl border border-redInk/30 bg-redInk/10">
                        <div className="flex items-start gap-3">
                            <X
                                size={18}
                                className="text-redInk shrink-0"
                            />
                            <div>
                                <p className="text-sm font-bold text-redInk">
                                    Analysis failed
                                </p>
                                <p className="text-xs text-white/60 mt-1">
                                    {error}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onCancel}
                            className="mt-4 px-4 py-2 rounded-lg bg-white/10 text-xs font-bold hover:bg-white/20"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}