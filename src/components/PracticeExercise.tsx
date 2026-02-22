"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Exercise {
    title: string;
    description: string;
    code: string;
    hint?: string;
    preview?: ReactNode;
}

interface PracticeExerciseProps {
    sectionLabel: string;
    exercises: Exercise[];
}

export default function PracticeExercise({ sectionLabel, exercises }: PracticeExerciseProps) {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    const [revealedSet, setRevealedSet] = useState<Set<number>>(new Set());
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    const toggleReveal = (idx: number) => {
        setRevealedSet((prev) => {
            const next = new Set(prev);
            if (next.has(idx)) next.delete(idx);
            else next.add(idx);
            return next;
        });
    };

    const copyCode = (code: string, idx: number) => {
        navigator.clipboard.writeText(code);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 1500);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-border bg-background/40 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-dark text-card flex items-center justify-center text-sm font-bold">
                        ✍️
                    </span>
                    <div>
                        <h4 className="text-sm font-semibold text-text-primary">
                            Practice — {sectionLabel}
                        </h4>
                        <p className="text-xs text-text-secondary/60">
                            Try these in VS Code before peeking at the answer
                        </p>
                    </div>
                </div>

                {/* Exercises */}
                <div className="divide-y divide-border">
                    {exercises.map((ex, i) => {
                        const isRevealed = revealedSet.has(i);

                        return (
                            <div key={i}>
                                <button
                                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                                    className="w-full text-left px-6 py-4 flex items-center gap-3 hover:bg-background/30 transition-colors cursor-pointer group"
                                >
                                    <span className="w-6 h-6 rounded-full bg-background border border-border text-xs font-bold text-text-secondary flex items-center justify-center shrink-0">
                                        {i + 1}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-text-primary">
                                            {ex.title}
                                        </p>
                                        <p className="text-xs text-text-secondary/70 mt-0.5 truncate">
                                            {ex.description}
                                        </p>
                                    </div>
                                    <motion.span
                                        animate={{ rotate: openIdx === i ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-text-secondary/40 text-sm shrink-0"
                                    >
                                        ▼
                                    </motion.span>
                                </button>

                                <AnimatePresence>
                                    {openIdx === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5">
                                                <div className={ex.preview ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : ""}>
                                                    {/* Preview — always visible */}
                                                    {ex.preview && (
                                                        <div className="bg-white rounded-xl border border-border overflow-hidden">
                                                            <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-200 flex items-center gap-1.5">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-red-400/50" />
                                                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/50" />
                                                                <div className="w-1.5 h-1.5 rounded-full bg-green-400/50" />
                                                                <span className="text-[9px] text-gray-400 ml-1.5 font-medium">Expected Output</span>
                                                            </div>
                                                            <div className="p-4">
                                                                {ex.preview}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Code block — blurred by default */}
                                                    <div className="relative">
                                                        <div
                                                            className="bg-code-bg rounded-xl p-4 transition-all duration-300 h-full"
                                                            style={{
                                                                filter: isRevealed ? "none" : "blur(6px)",
                                                                pointerEvents: isRevealed ? "auto" : "none",
                                                                userSelect: isRevealed ? "auto" : "none",
                                                            }}
                                                        >
                                                            <div className="flex items-center justify-between mb-3">
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className="w-2 h-2 rounded-full bg-red-400/50" />
                                                                    <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                                                                    <div className="w-2 h-2 rounded-full bg-green-400/50" />
                                                                    <span className="text-white/25 text-[10px] ml-2">
                                                                        answer
                                                                    </span>
                                                                </div>
                                                                {isRevealed && (
                                                                    <button
                                                                        onClick={() => copyCode(ex.code, i)}
                                                                        className="text-[10px] text-white/30 hover:text-white/70 transition-colors px-2 py-0.5 rounded border border-white/10 hover:border-white/25 cursor-pointer"
                                                                    >
                                                                        {copiedIdx === i ? "Copied ✓" : "Copy"}
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <pre className="text-green-400 text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto">
                                                                {ex.code}
                                                            </pre>
                                                        </div>

                                                        {/* Reveal overlay */}
                                                        {!isRevealed && (
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <button
                                                                    onClick={() => toggleReveal(i)}
                                                                    className="bg-dark text-card px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-dark/80 transition-colors cursor-pointer flex items-center gap-2 shadow-lg"
                                                                >
                                                                    <span>👀</span> Show Answer
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Hide button — shown after reveal */}
                                                {isRevealed && (
                                                    <button
                                                        onClick={() => toggleReveal(i)}
                                                        className="mt-2 text-[11px] text-text-secondary/40 hover:text-text-secondary/70 transition-colors cursor-pointer"
                                                    >
                                                        Hide answer ↑
                                                    </button>
                                                )}

                                                {/* Hint */}
                                                {ex.hint && isRevealed && (
                                                    <p className="mt-3 text-xs text-text-secondary/50 italic flex items-center gap-1.5">
                                                        <span>💡</span> {ex.hint}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
