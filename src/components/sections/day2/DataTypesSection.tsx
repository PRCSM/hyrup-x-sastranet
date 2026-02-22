"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const types = [
    { name: "String", example: '"Hello"', icon: "Aa", color: "#22c55e" },
    { name: "Number", example: "25", icon: "#", color: "#3b82f6" },
    { name: "Boolean", example: "true / false", icon: "⊤", color: "#f59e0b" },
    { name: "Null", example: "null", icon: "∅", color: "#ef4444" },
    { name: "Undefined", example: "undefined", icon: "?", color: "#8b5cf6" },
    { name: "BigInt", example: "9007199254740991n", icon: "∞", color: "#06b6d4" },
    { name: "Symbol", example: "Symbol('id')", icon: "✦", color: "#ec4899" },
];

const quizValues = [
    { value: '"Hello World"', answer: "String" },
    { value: '42', answer: "Number" },
    { value: 'true', answer: "Boolean" },
    { value: 'null', answer: "Null" },
    { value: 'undefined', answer: "Undefined" },
    { value: '"3.14"', answer: "String" },
    { value: 'false', answer: "Boolean" },
    { value: '0', answer: "Number" },
];

export default function DataTypesSection() {
    const [quizIdx, setQuizIdx] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);

    const current = quizValues[quizIdx];
    const isCorrect = selected === current.answer;
    const quizFinished = quizIdx >= quizValues.length;

    const handleGuess = (type: string) => {
        if (selected) return;
        setSelected(type);
        if (type === current.answer) {
            setScore((p) => p + 1);
            setStreak((p) => p + 1);
        } else {
            setStreak(0);
        }
    };

    const nextQuestion = () => {
        setQuizIdx((p) => p + 1);
        setSelected(null);
    };

    const restart = () => {
        setQuizIdx(0);
        setSelected(null);
        setScore(0);
        setStreak(0);
    };

    return (
        <SectionWrapper
            id="data-types"
            title="Data Types"
            subtitle="JavaScript has 7 primitive data types. Every value you create belongs to one of these."
        >
            {/* Type cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-16">
                {types.map((t) => (
                    <motion.div
                        key={t.name}
                        whileHover={{ scale: 1.05, y: -4 }}
                        className="bg-card rounded-xl border border-border p-4 text-center hover:shadow-md transition-shadow cursor-default"
                    >
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold mx-auto mb-3"
                            style={{ background: t.color + "15", color: t.color }}
                        >
                            {t.icon}
                        </div>
                        <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                        <p className="text-xs font-mono text-text-secondary/70 mt-1">{t.example}</p>
                    </motion.div>
                ))}
            </div>

            {/* Type guessing game */}
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-text-primary">
                        Guess the Type
                    </h3>
                    <span className="text-sm font-semibold text-text-primary">
                        Score: {score}/{quizValues.length}
                        {streak >= 3 && <span className="ml-2 text-amber-500">🔥 {streak} streak!</span>}
                    </span>
                </div>

                <AnimatePresence mode="wait">
                    {!quizFinished ? (
                        <motion.div
                            key={quizIdx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Progress */}
                            <div className="w-full h-1.5 bg-card rounded-full mb-6 overflow-hidden">
                                <motion.div
                                    className="h-full bg-dark rounded-full"
                                    animate={{ width: `${((quizIdx + (selected ? 1 : 0)) / quizValues.length) * 100}%` }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>

                            {/* Value display */}
                            <div className="bg-code-bg rounded-2xl p-8 text-center mb-6">
                                <code className="text-3xl font-mono text-green-400 font-bold">
                                    {current.value}
                                </code>
                                <p className="text-xs text-code-text/40 mt-3">
                                    What type is this value?
                                </p>
                            </div>

                            {/* Options */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                                {["String", "Number", "Boolean", "Null", "Undefined"].map((type) => {
                                    let cls = "bg-card text-text-primary border-border hover:border-accent-dark";
                                    if (selected) {
                                        if (type === current.answer) {
                                            cls = "bg-green-50 text-green-800 border-green-300";
                                        } else if (type === selected && !isCorrect) {
                                            cls = "bg-red-50 text-red-700 border-red-300";
                                        } else {
                                            cls = "bg-card text-text-secondary/50 border-border";
                                        }
                                    }
                                    return (
                                        <motion.button
                                            key={type}
                                            whileHover={!selected ? { scale: 1.03 } : {}}
                                            whileTap={!selected ? { scale: 0.97 } : {}}
                                            onClick={() => handleGuess(type)}
                                            disabled={!!selected}
                                            className={`px-4 py-3 text-sm font-medium rounded-xl border-2 transition-all cursor-pointer ${cls} ${selected ? "cursor-default" : ""}`}
                                        >
                                            {type}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Feedback */}
                            <AnimatePresence>
                                {selected && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className={`p-4 rounded-xl text-sm mb-4 ${isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"
                                            }`}>
                                            <span className="font-semibold">
                                                {isCorrect ? "Correct! " : `Not quite — it's a ${current.answer}. `}
                                            </span>
                                            {isCorrect
                                                ? `${current.value} is a ${current.answer}.`
                                                : `Values wrapped in quotes are always Strings, even "${current.value}".`}
                                        </div>
                                        <button
                                            onClick={nextQuestion}
                                            className="px-6 py-2.5 bg-dark text-card rounded-xl text-sm font-medium cursor-pointer hover:shadow-lg transition-all"
                                        >
                                            {quizIdx < quizValues.length - 1 ? "Next Value →" : "See Results"}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="text-5xl mb-4">
                                {score === quizValues.length ? "🏆" : score >= 6 ? "🎉" : score >= 4 ? "💪" : "📚"}
                            </div>
                            <h3 className="text-3xl font-bold text-text-primary mb-2">
                                {score}/{quizValues.length}
                            </h3>
                            <p className="text-text-secondary mb-6">
                                {score === quizValues.length
                                    ? "Perfect! You're a type master."
                                    : score >= 6
                                        ? "Great job! You know your types."
                                        : "Keep practicing! Types are fundamental."}
                            </p>
                            <button
                                onClick={restart}
                                className="px-6 py-2.5 bg-dark text-card rounded-xl text-sm font-medium cursor-pointer hover:shadow-lg transition-all"
                            >
                                Play Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SectionWrapper>
    );
}
