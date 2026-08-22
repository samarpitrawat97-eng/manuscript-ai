import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

const steps = ["Enhancing Image", "Isolating Script", "Detecting Red Ink", "AI Text Extraction", "Neural Translation"];

export default function ProcessingOverlay() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s < steps.length - 1 ? s + 1 : s));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-20 h-20 border-t-4 border-gold rounded-full mb-12" />
      <div className="w-full max-w-xs space-y-4">
        {steps.map((text, i) => (
          <div key={i} className={`flex items-center justify-between ${i <= step ? 'text-white' : 'text-white/20'}`}>
            <span className="text-sm font-medium">{text}</span>
            {i < step ? <Check size={16} className="text-gold" /> : i === step ? <Loader2 size={16} className="animate-spin text-gold" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}