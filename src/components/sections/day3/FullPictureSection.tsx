"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const layers = [
    { id: "frontend", label: "Frontend (HTML, CSS & JS)", icon: "🌐", color: "bg-blue-100 border-blue-300", position: "left", detail: "User interacts with the web page. Clicks a button, fills a form." },
    { id: "http", label: "HTTP Request", icon: "📨", color: "bg-purple-100 border-purple-300", position: "arrow", detail: "The browser sends an HTTP request to the server (POST /api/login)." },
    { id: "express", label: "Express Route", icon: "🎛️", color: "bg-amber-100 border-amber-300", position: "right", detail: "Express receives the request, matches it to a route handler." },
    { id: "logic", label: "Backend Logic", icon: "⚙️", color: "bg-green-100 border-green-300", position: "right", detail: "Validates data, hashes passwords, applies business rules." },
    { id: "mongoose", label: "Mongoose Query", icon: "🧑‍💼", color: "bg-teal-100 border-teal-300", position: "right", detail: "Mongoose translates the request into a MongoDB query." },
    { id: "mongodb", label: "MongoDB", icon: "🗄️", color: "bg-orange-100 border-orange-300", position: "right", detail: "Database stores or retrieves the actual data." },
    { id: "response", label: "JSON Response", icon: "📦", color: "bg-indigo-100 border-indigo-300", position: "arrow", detail: "Server sends JSON response back through HTTP." },
    { id: "ui", label: "UI Updates", icon: "✨", color: "bg-pink-100 border-pink-300", position: "left", detail: "JavaScript updates the DOM with the received data. User sees the result." },
];

export default function FullPictureSection() {
    const [activeLayer, setActiveLayer] = useState<number | null>(null);
    const [animating, setAnimating] = useState(false);

    const animate = async () => {
        if (animating) return;
        setAnimating(true);
        setActiveLayer(null);

        for (let i = 0; i < layers.length; i++) {
            setActiveLayer(i);
            await new Promise(r => setTimeout(r, 1200));
        }
        await new Promise(r => setTimeout(r, 1000));
        setAnimating(false);
    };

    return (
        <SectionWrapper
            id="full-picture"
            title="The Full Picture"
            subtitle="Trace a single user action from frontend to database and back. Every concept we learned, in one flow."
        >
            <div className="max-w-3xl mx-auto">
                {/* Animate button */}
                <div className="text-center mb-8">
                    <button
                        onClick={animate}
                        disabled={animating}
                        className={`px-6 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${animating ? "bg-green-100 text-green-700" : "bg-dark text-card hover:shadow-lg"
                            }`}
                    >
                        {animating ? "Tracing the request..." : "Trace a Request →"}
                    </button>
                    <p className="text-xs text-text-secondary mt-2">
                        Watch a login request travel through the entire stack
                    </p>
                </div>

                {/* Flow */}
                <div className="space-y-2">
                    {layers.map((layer, i) => {
                        const isActive = activeLayer === i;
                        const isPast = activeLayer !== null && activeLayer > i;
                        const isFuture = activeLayer !== null && activeLayer < i;

                        return (
                            <motion.div
                                key={layer.id}
                                animate={{ opacity: activeLayer === null ? 1 : isFuture ? 0.3 : 1 }}
                                className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition-all ${isActive ? `${layer.color} shadow-sm` : isPast ? "bg-green-50/50 border-green-200/50" : "border-border"
                                    }`}
                            >
                                <span className="text-2xl">{layer.icon}</span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold text-text-primary">{layer.label}</p>
                                        {isPast && <span className="text-green-500 text-xs">✓</span>}
                                        {isActive && (
                                            <motion.div
                                                animate={{ scale: [1, 1.4, 1] }}
                                                transition={{ repeat: Infinity, duration: 0.7 }}
                                                className="w-2 h-2 bg-blue-500 rounded-full"
                                            />
                                        )}
                                    </div>
                                    <AnimatePresence>
                                        {(isActive || isPast) && (
                                            <motion.p
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="text-xs text-text-secondary mt-1 overflow-hidden"
                                            >
                                                {layer.detail}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <span className="text-xs text-text-secondary/40 font-mono">
                                    {i + 1}/{layers.length}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Connection lines */}
                <AnimatePresence>
                    {activeLayer !== null && activeLayer === layers.length - 1 && !animating && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center"
                        >
                            <p className="text-sm font-semibold text-green-800">Complete cycle!</p>
                            <p className="text-xs text-green-600 mt-1">
                                One click by the user → HTTP → Express → Logic → Mongoose → MongoDB → Response → UI update.
                                <br />That&apos;s full-stack development.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SectionWrapper>
    );
}
