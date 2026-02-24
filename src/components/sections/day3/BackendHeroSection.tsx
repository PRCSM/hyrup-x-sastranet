"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const loginSteps = [
    { label: "Frontend", detail: "User fills in email & password on the web page", icon: "🖥️", color: "#3b82f6", side: "left" },
    { label: "HTTP Request", detail: "Browser sends POST /api/login to the server", icon: "📡", color: "#8b5cf6", side: "center" },
    { label: "Express Server", detail: "Route handler receives & validates the data", icon: "⚙️", color: "#f59e0b", side: "right" },
    { label: "Database Query", detail: "Mongoose checks credentials in MongoDB", icon: "🗄️", color: "#10b981", side: "right" },
    { label: "Response", detail: "Server sends back 200 OK + auth token", icon: "✅", color: "#22c55e", side: "center" },
    { label: "Page Update", detail: "JavaScript updates the DOM — redirects to dashboard", icon: "🎉", color: "#3b82f6", side: "left" },
];

const typingLines = [
    "> node server.js",
    "Server running on port 3000...",
    "",
    "POST /api/login",
    "  → body: { email, password }",
    "  → db.users.findOne({ email })",
    "  → 200 OK { token: 'eyJhbGci...' }",
];

export default function BackendHeroSection() {
    const [activeStep, setActiveStep] = useState(-1);
    const [typedText, setTypedText] = useState("");
    const [lineIdx, setLineIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);

    const isFinished = activeStep >= loginSteps.length - 1;
    const hasStarted = activeStep >= 0;

    // Typing animation
    useEffect(() => {
        if (lineIdx >= typingLines.length) return;
        const line = typingLines[lineIdx];
        if (charIdx < line.length) {
            const t = setTimeout(() => {
                setTypedText((p) => p + line[charIdx]);
                setCharIdx((p) => p + 1);
            }, 30);
            return () => clearTimeout(t);
        } else {
            const t = setTimeout(() => {
                setTypedText((p) => p + "\n");
                setLineIdx((p) => p + 1);
                setCharIdx(0);
            }, 300);
            return () => clearTimeout(t);
        }
    }, [lineIdx, charIdx]);

    const nextStep = () => {
        if (activeStep < loginSteps.length - 1) {
            setActiveStep((p) => p + 1);
        }
    };

    const reset = () => {
        setActiveStep(-1);
    };

    return (
        <section className="min-h-screen flex items-center pt-14">
            <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <div className="text-sm font-semibold tracking-[0.2em] uppercase text-text-secondary mb-4">
                        Day 3
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-semibold text-text-primary tracking-tight leading-[1.1]">
                        Backend<br />
                        Development
                    </h1>
                    <p className="text-xl text-text-secondary mt-6 max-w-md leading-relaxed">
                        The Brain Behind Every Application
                    </p>
                    <p className="text-base text-text-secondary/70 mt-3 max-w-md">
                        When a user clicks &quot;Login&quot;… what actually happens?
                        The frontend collects input. But who verifies it? Who stores it?
                        That&apos;s the backend.
                    </p>

                    {/* Quick stat cards */}
                    <div className="grid grid-cols-3 gap-3 mt-8">
                        <div className="bg-card rounded-xl border border-border p-4">
                            <div className="text-xs font-semibold text-text-secondary/60 uppercase tracking-wider mb-2">Frontend</div>
                            <p className="text-sm text-text-primary font-medium">HTML · CSS · JS</p>
                        </div>
                        <div className="bg-card rounded-xl border border-border p-4">
                            <div className="text-xs font-semibold text-text-secondary/60 uppercase tracking-wider mb-2">Backend</div>
                            <p className="text-sm text-text-primary font-medium">Node + Express</p>
                        </div>
                        <div className="bg-card rounded-xl border border-border p-4">
                            <div className="text-xs font-semibold text-text-secondary/60 uppercase tracking-wider mb-2">Database</div>
                            <p className="text-sm text-text-primary font-medium">MongoDB</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right — Login Flow + Console */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col gap-4"
                >
                    {/* Login flow simulator — step-by-step */}
                    <div className="w-full bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background">
                            <div>
                                <h3 className="text-sm font-semibold text-text-primary">What happens when you click Login?</h3>
                                {hasStarted && (
                                    <p className="text-[10px] text-text-secondary mt-0.5">
                                        Step {activeStep + 1} of {loginSteps.length}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                {hasStarted && (
                                    <button
                                        onClick={reset}
                                        className="px-3 py-1.5 text-xs font-medium rounded-full border border-border text-text-secondary hover:bg-background transition-all cursor-pointer"
                                    >
                                        Reset
                                    </button>
                                )}
                                <button
                                    onClick={isFinished ? reset : nextStep}
                                    className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${isFinished
                                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                                            : "bg-dark text-card hover:shadow-lg"
                                        }`}
                                >
                                    {!hasStarted ? "Start →" : isFinished ? "Done ✓" : "Next Step →"}
                                </button>
                            </div>
                        </div>

                        {/* Pipeline visualization */}
                        <div className="p-5">
                            {/* Three-column layout: Frontend | Network | Backend */}
                            <div className="grid grid-cols-3 gap-1 mb-3">
                                <div className="text-center">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-blue-500/70">Frontend</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-purple-500/70">Network</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500/70">Backend</span>
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="space-y-1.5">
                                {loginSteps.map((step, i) => {
                                    const isActive = activeStep === i;
                                    const isPast = activeStep > i;
                                    const colStart = step.side === "left" ? "col-start-1" : step.side === "center" ? "col-start-2" : "col-start-3";

                                    return (
                                        <div key={i} className="grid grid-cols-3 gap-1">
                                            <motion.div
                                                animate={{
                                                    opacity: activeStep === -1 || isActive || isPast ? 1 : 0.3,
                                                }}
                                                className={`${colStart} flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all ${isActive
                                                    ? "shadow-sm"
                                                    : isPast
                                                        ? "border-green-200/60 bg-green-50/30"
                                                        : "border-border/50"
                                                    }`}
                                                style={isActive ? {
                                                    backgroundColor: step.color + "12",
                                                    borderColor: step.color + "50",
                                                } : {}}
                                            >
                                                <span className="text-base shrink-0">{step.icon}</span>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] font-bold text-text-primary leading-tight">{step.label}</p>
                                                    <p className="text-[9px] text-text-secondary leading-tight truncate">{step.detail}</p>
                                                </div>
                                                <AnimatePresence>
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: [1, 1.4, 1] }}
                                                            exit={{ scale: 0 }}
                                                            transition={{ repeat: Infinity, duration: 0.7 }}
                                                            className="w-2 h-2 rounded-full shrink-0"
                                                            style={{ backgroundColor: step.color }}
                                                        />
                                                    )}
                                                </AnimatePresence>
                                                {isPast && (
                                                    <span className="text-[10px] text-green-500 shrink-0">✓</span>
                                                )}
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Connection arrows between steps */}
                            <AnimatePresence>
                                {activeStep >= 0 && activeStep < loginSteps.length && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="mt-3 text-center"
                                    >
                                        <div className="inline-flex items-center gap-2 bg-background rounded-full px-3 py-1.5">
                                            <div
                                                className="w-2 h-2 rounded-full animate-pulse"
                                                style={{ backgroundColor: loginSteps[activeStep].color }}
                                            />
                                            <span className="text-[10px] font-medium text-text-secondary">
                                                {loginSteps[activeStep].detail}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Console */}
                    <div className="bg-code-bg rounded-xl border border-border overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                            <span className="text-xs font-mono text-code-text/50 ml-1">Terminal</span>
                        </div>
                        <pre className="p-4 text-sm font-mono text-green-400 leading-relaxed min-h-[80px] max-h-[140px] overflow-hidden">
                            {typedText}
                            <span className="animate-pulse">▊</span>
                        </pre>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
