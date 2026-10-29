import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen,
    Brain,
    CheckCircle,
    Languages,
    ShieldCheck,
    ScanText,
    Database,
} from 'lucide-react';

export default function AboutPage() {
    const navigate = useNavigate();

    return (
        <div className="pt-32 px-8 max-w-7xl mx-auto pb-24">

            {/* Hero */}
            <section className="max-w-4xl mx-auto text-center mb-20">
                <p className="text-gold text-xs uppercase tracking-[0.35em] font-bold mb-4">
                    About Manuscript AI
                </p>

                <h1 className="text-5xl md:text-6xl font-serif text-white leading-tight">
                    Preserving History,
                    <span className="text-gold"> One Manuscript at a Time.</span>
                </h1>

                <p className="mt-7 text-white/50 text-base md:text-lg leading-relaxed">
                    Manuscript AI is an AI-assisted digital heritage platform built
                    to help researchers, historians, archivists, and scholars analyze
                    historical Indian manuscripts.
                </p>
            </section>

            {/* What it does */}
            <section className="grid md:grid-cols-2 gap-12 items-stretch mb-20">

                <div className="bg-secondary border border-white/10 rounded-3xl p-8">
                    <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                        <BookOpen className="text-gold" size={24} />
                    </div>

                    <h2 className="text-2xl font-serif text-white mb-4">
                        What is Manuscript AI?
                    </h2>

                    <p className="text-white/50 leading-relaxed">
                        Manuscript AI combines historical manuscript analysis with
                        modern multimodal AI. A user can upload a manuscript image and
                        receive an AI-assisted analysis of its language, script,
                        transcription, red-ink material, translation, and uncertain
                        readings.
                    </p>

                    <p className="text-white/50 leading-relaxed mt-4">
                        The goal is not to replace historians or paleographers.
                        Instead, the system provides a structured first interpretation
                        that can be reviewed and corrected by a human.
                    </p>
                </div>

                <div className="bg-secondary border border-white/10 rounded-3xl p-8">
                    <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                        <Brain className="text-gold" size={24} />
                    </div>

                    <h2 className="text-2xl font-serif text-white mb-4">
                        AI-Assisted, Not AI-Only
                    </h2>

                    <p className="text-white/50 leading-relaxed">
                        Manuscript AI uses Google Gemini to analyze the actual manuscript
                        image rather than relying solely on conventional OCR.
                    </p>

                    <p className="text-white/50 leading-relaxed mt-4">
                        The model is guided to identify historical languages and scripts,
                        preserve historical terminology, distinguish red-ink markings,
                        translate readable material, and flag uncertain readings instead
                        of inventing text.
                    </p>
                </div>

            </section>

            {/* Features */}
            <section className="mb-20">
                <div className="text-center mb-10">
                    <p className="text-gold text-xs uppercase tracking-[0.3em] font-bold">
                        Core Capabilities
                    </p>

                    <h2 className="text-3xl font-serif text-white mt-3">
                        Built for Historical Manuscripts
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    <Feature
                        icon={<ScanText size={22} />}
                        title="Transcription"
                        text="AI-assisted transcription of visible manuscript text while preserving historical wording and terminology."
                    />

                    <Feature
                        icon={<Languages size={22} />}
                        title="Translation"
                        text="English translation designed to retain historical, cultural, literary, and contextual meaning."
                    />

                    <Feature
                        icon={<BookOpen size={22} />}
                        title="Script Identification"
                        text="Identification of scripts and languages commonly encountered in historical Indian manuscripts."
                    />

                    <Feature
                        icon={<span className="text-xl font-bold">अ</span>}
                        title="Red-Ink Detection"
                        text="Separate handling of red-ink text, rubrication, headings, annotations, and other visually distinct markings."
                    />

                    <Feature
                        icon={<ShieldCheck size={22} />}
                        title="Uncertainty Detection"
                        text="Potentially unclear, damaged, or ambiguous readings are flagged for human review."
                    />

                    <Feature
                        icon={<Database size={22} />}
                        title="Archival Provenance"
                        text="Original AI output and human-verified output are preserved separately in the archive."
                    />

                </div>
            </section>

            {/* Human verification */}
            <section className="bg-secondary border border-gold/20 rounded-3xl p-8 md:p-12 mb-20">

                <div className="flex flex-col md:flex-row gap-8 items-start">

                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                        <CheckCircle className="text-gold" size={28} />
                    </div>

                    <div>
                        <p className="text-gold text-xs uppercase tracking-[0.3em] font-bold mb-3">
                            Human-in-the-Loop
                        </p>

                        <h2 className="text-3xl font-serif text-white mb-5">
                            AI Assists. Humans Verify.
                        </h2>

                        <p className="text-white/50 leading-relaxed max-w-4xl">
                            Historical manuscripts can contain faded characters, damaged
                            pages, unusual spellings, complex scripts, and ambiguous
                            readings. Because of this, Manuscript AI does not treat the
                            AI output as final scholarly truth.
                        </p>

                        <div className="grid md:grid-cols-4 gap-4 mt-8">
                            {[
                                'AI Analysis',
                                'Review',
                                'Correction',
                                'Verification',
                            ].map((step, index) => (
                                <div
                                    key={step}
                                    className="bg-white/5 border border-white/5 rounded-xl p-4"
                                >
                                    <p className="text-[10px] text-gold uppercase tracking-widest font-bold">
                                        0{index + 1}
                                    </p>

                                    <p className="text-white text-sm font-semibold mt-2">
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Architecture */}
            <section className="mb-20">
                <div className="text-center mb-10">
                    <p className="text-gold text-xs uppercase tracking-[0.3em] font-bold">
                        Technology
                    </p>

                    <h2 className="text-3xl font-serif text-white mt-3">
                        How It Works
                    </h2>
                </div>

                <div className="grid md:grid-cols-5 gap-3">
                    {[
                        'Manuscript Image',
                        'Spring Boot API',
                        'Gemini Analysis',
                        'Human Review',
                        'Verified Archive',
                    ].map((step, index) => (
                        <React.Fragment key={step}>
                            <div className="bg-secondary border border-white/10 rounded-2xl p-6 text-center">
                                <p className="text-gold text-xs font-bold mb-2">
                                    0{index + 1}
                                </p>

                                <p className="text-white text-sm font-semibold">
                                    {step}
                                </p>
                            </div>

                            {index < 4 && (
                                <div className="hidden md:flex items-center justify-center text-gold/40 text-xl">
                                    →
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="text-center border-t border-white/5 pt-16">
                <p className="text-white/40 text-sm mb-6">
                    Explore the manuscript analysis workflow.
                </p>

                <button
                    onClick={() => navigate('/dashboard')}
                    className="px-8 py-4 bg-gold text-background font-black rounded-full text-xs uppercase tracking-widest hover:bg-goldLight transition-all"
                >
                    Digitize a Manuscript
                </button>
            </section>

        </div>
    );
}

function Feature({ icon, title, text }) {
    return (
        <div className="bg-secondary border border-white/5 rounded-2xl p-6 hover:border-gold/20 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-5">
                {icon}
            </div>

            <h3 className="text-white font-semibold mb-2">
                {title}
            </h3>

            <p className="text-white/40 text-sm leading-relaxed">
                {text}
            </p>
        </div>
    );
}