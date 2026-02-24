"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const scenarios = [
    { question: "Show a button on screen?", answer: true, who: "Frontend", explanation: "HTML + CSS renders the button in the browser." },
    { question: "Verify if a password is correct?", answer: false, who: "Backend", explanation: "Passwords are stored securely on the server. Frontend never sees them." },
    { question: "Animate a dropdown menu?", answer: true, who: "Frontend", explanation: "CSS transitions & JavaScript handle UI animations." },
    { question: "Store 10,000 user records?", answer: false, who: "Backend + Database", explanation: "Data is stored in a database managed by backend logic." },
    { question: "Validate an email format?", answer: true, who: "Frontend (+ Backend)", explanation: "Frontend can check format, but backend must verify it exists." },
    { question: "Send an email to the user?", answer: false, who: "Backend", explanation: "Email services need server-side credentials and SMTP access." },
    { question: "Handle 1000 users logging in at once?", answer: false, who: "Backend + Server", explanation: "Concurrency and load balancing happen on the server side." },
    { question: "Show a dark/light theme toggle?", answer: true, who: "Frontend", explanation: "Theme switching is purely a UI concern." },
];

const frontendCapabilities = [
    { icon: "🎨", label: "UI & Styling", desc: "HTML, CSS, layouts, colors" },
    { icon: "👆", label: "User Interactions", desc: "Clicks, forms, inputs" },
    { icon: "✨", label: "Animations", desc: "Transitions, motion effects" },
    { icon: "📱", label: "Responsive Design", desc: "Adapt to any screen size" },
];

const backendCapabilities = [
    { icon: "🔐", label: "Authentication", desc: "Login, signup, tokens" },
    { icon: "🗄️", label: "Data Storage", desc: "Database CRUD operations" },
    { icon: "🛡️", label: "Security", desc: "Encryption, validation" },
    { icon: "⚡", label: "Business Logic", desc: "Decisions, calculations" },
];

export default function FrontendVsBackendSection() {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(0);

    const scenario = scenarios[currentScenario];

    const handleAnswer = (userAnswer: boolean) => {
        if (revealed) return;
        setRevealed(true);
        setAnswered((p) => p + 1);
        if (userAnswer === scenario.answer) {
            setScore((p) => p + 1);
        }
    };

    const nextScenario = () => {
        setRevealed(false);
        setCurrentScenario((p) => (p + 1) % scenarios.length);
    };

    return (
        <SectionWrapper
            id="frontend-vs-backend"
            title="Frontend vs Backend"
            subtitle="Frontend is the face. Backend is the brain. Both essential, completely different jobs."
        >
            {/* Comparison cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
                {/* Frontend */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">🖥️</div>
                        <div>
                            <h3 className="text-base font-bold text-blue-900">Frontend</h3>
                            <p className="text-xs text-blue-600">What the user sees</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {frontendCapabilities.map((cap) => (
                            <div key={cap.label} className="flex items-center gap-3 bg-white/60 rounded-xl px-3 py-2">
                                <span className="text-lg">{cap.icon}</span>
                                <div>
                                    <p className="text-sm font-semibold text-blue-900">{cap.label}</p>
                                    <p className="text-xs text-blue-600">{cap.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-blue-500 mt-4 font-medium text-center">HTML · CSS · JavaScript</p>
                </div>

                {/* Backend */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-lg">⚙️</div>
                        <div>
                            <h3 className="text-base font-bold text-amber-900">Backend</h3>
                            <p className="text-xs text-amber-600">What runs behind the scenes</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {backendCapabilities.map((cap) => (
                            <div key={cap.label} className="flex items-center gap-3 bg-white/60 rounded-xl px-3 py-2">
                                <span className="text-lg">{cap.icon}</span>
                                <div>
                                    <p className="text-sm font-semibold text-amber-900">{cap.label}</p>
                                    <p className="text-xs text-amber-600">{cap.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-amber-500 mt-4 font-medium text-center">Node.js · Express · MongoDB</p>
                </div>
            </div>

            {/* Interactive quiz: Can frontend do this? */}
            <div className="max-w-lg mx-auto">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-text-primary">Can the frontend do this?</h3>
                    <p className="text-sm text-text-secondary mt-1">Test your understanding</p>
                    {answered > 0 && (
                        <p className="text-xs text-text-secondary/60 mt-2">{score}/{answered} correct</p>
                    )}
                </div>

                <div className="bg-card rounded-2xl border border-border p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentScenario}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <p className="text-base font-semibold text-text-primary text-center mb-6">
                                &ldquo;{scenario.question}&rdquo;
                            </p>

                            {!revealed ? (
                                <div className="flex gap-3 justify-center">
                                    <button
                                        onClick={() => handleAnswer(true)}
                                        className="px-8 py-3 bg-green-100 text-green-700 rounded-xl text-sm font-semibold hover:bg-green-200 transition-all cursor-pointer"
                                    >
                                        Yes, Frontend ✅
                                    </button>
                                    <button
                                        onClick={() => handleAnswer(false)}
                                        className="px-8 py-3 bg-red-100 text-red-700 rounded-xl text-sm font-semibold hover:bg-red-200 transition-all cursor-pointer"
                                    >
                                        No, Backend ❌
                                    </button>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <div className={`rounded-xl p-4 text-center mb-4 ${scenario.answer ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}>
                                        <p className="text-sm font-bold mb-1" style={{ color: scenario.answer ? "#15803d" : "#b45309" }}>
                                            {scenario.answer ? "✅ Yes, Frontend can!" : "❌ No, that's the Backend's job"}
                                        </p>
                                        <p className="text-xs text-text-secondary">{scenario.who}</p>
                                    </div>
                                    <p className="text-xs text-text-secondary text-center mb-4">{scenario.explanation}</p>
                                    <div className="text-center">
                                        <button
                                            onClick={nextScenario}
                                            className="px-6 py-2 bg-dark text-card rounded-xl text-sm font-medium cursor-pointer hover:shadow-lg transition-all"
                                        >
                                            Next Question →
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </SectionWrapper>
    );
}
