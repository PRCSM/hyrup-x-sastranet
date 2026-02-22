"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const stages = [
    {
        id: "html",
        label: "HTML",
        styles: {
            background: "#ffffff",
            color: "#000000",
            fontFamily: "Times New Roman, serif",
            padding: "0px",
            borderRadius: "0px",
            boxShadow: "none",
            border: "none",
            maxWidth: "100%",
            textAlign: "left" as const,
        },
        buttonStyle: {
            background: "none",
            color: "#000000",
            border: "1px solid #000000",
            borderRadius: "0px",
            padding: "4px 8px",
            fontFamily: "Times New Roman, serif",
        },
    },
    {
        id: "css",
        label: "CSS",
        styles: {
            background: "#1a1a2e",
            color: "#ffffff",
            fontFamily: "'Inter', sans-serif",
            padding: "0px",
            borderRadius: "0px",
            boxShadow: "none",
            border: "none",
            maxWidth: "100%",
            textAlign: "left" as const,
        },
        buttonStyle: {
            background: "#ff6b6b",
            color: "#ffffff",
            border: "none",
            borderRadius: "0px",
            padding: "8px 16px",
            fontFamily: "'Inter', sans-serif",
        },
    },
    {
        id: "layout",
        label: "Layout",
        styles: {
            background: "#1a1a2e",
            color: "#ffffff",
            fontFamily: "'Inter', sans-serif",
            padding: "32px",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            border: "1px solid rgba(255,255,255,0.1)",
            maxWidth: "380px",
            textAlign: "center" as const,
        },
        buttonStyle: {
            background: "#ff6b6b",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            fontFamily: "'Inter', sans-serif",
        },
    },
];

export default function HeroSection() {
    const [stageIndex, setStageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStageIndex((prev) => (prev + 1) % stages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const stage = stages[stageIndex];

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
                        Day 1
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-semibold text-text-primary tracking-tight leading-[1.1]">
                        HTML, CSS &<br />
                        Web Fundamentals
                    </h1>
                    <p className="text-xl text-text-secondary mt-6 max-w-md leading-relaxed">
                        Build What You See
                    </p>
                    <p className="text-base text-text-secondary/70 mt-3 max-w-md">
                        Watch a plain HTML page transform into a modern website — interactively.
                    </p>

                    {/* Stage indicators */}
                    <div className="flex gap-2 mt-10">
                        {stages.map((s, i) => (
                            <button
                                key={s.id}
                                onClick={() => setStageIndex(i)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${i === stageIndex
                                    ? "bg-dark text-card"
                                    : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                                    }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Right — Animated preview */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex justify-center"
                >
                    <div className="w-full max-w-md bg-card rounded-2xl border border-border p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-400/60" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                            <div className="w-3 h-3 rounded-full bg-green-400/60" />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={stage.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <motion.div
                                    layout
                                    style={stage.styles}
                                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                                    className="transition-all"
                                >
                                    <h3
                                        style={{
                                            fontSize: stage.id === "html" ? "24px" : "20px",
                                            fontWeight: stage.id === "html" ? "normal" : "600",
                                            fontFamily: stage.styles.fontFamily,
                                            marginBottom: stage.id === "html" ? "4px" : "12px",
                                        }}
                                    >
                                        My Website
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: stage.id === "html" ? "16px" : "14px",
                                            fontFamily: stage.styles.fontFamily,
                                            opacity: 0.8,
                                            marginBottom: stage.id === "html" ? "4px" : "16px",
                                            lineHeight: "1.6",
                                        }}
                                    >
                                        Welcome to my page. This is a simple website built with HTML.
                                    </p>
                                    <button
                                        style={stage.buttonStyle}
                                        className="transition-all duration-300 cursor-pointer"
                                    >
                                        Click me
                                    </button>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-4 pt-3 border-t border-border">
                            <span className="text-xs font-medium text-text-secondary/60">
                                Stage: {stage.label}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
