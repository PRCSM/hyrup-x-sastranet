"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const timeline = [
    { year: "1995", event: "JavaScript born — runs only in browsers", icon: "🌐", detail: "Created by Brendan Eich in 10 days. Could only run inside Netscape Navigator." },
    { year: "2008", event: "V8 Engine by Google — blazing fast JS", icon: "⚡", detail: "Google built V8 for Chrome. It compiles JS to machine code, making it incredibly fast." },
    { year: "2009", event: "Node.js created — JS escapes the browser", icon: "🚀", detail: "Ryan Dahl took V8 and wrapped it with OS-level APIs. JavaScript could now run on servers." },
    { year: "2010+", event: "Full-stack JS — one language everywhere", icon: "🌍", detail: "Developers could now build frontend AND backend with the same language. npm ecosystem exploded." },
];

const browserPowers = [
    { label: "Change button colors", icon: "🎨" },
    { label: "Validate forms", icon: "📋" },
    { label: "Animate elements", icon: "✨" },
    { label: "Handle clicks", icon: "👆" },
];

const nodePowers = [
    { label: "Create servers", icon: "🖥️", desc: "Listen for HTTP requests" },
    { label: "Handle HTTP requests", icon: "📡", desc: "Parse, route, and respond" },
    { label: "Access file system", icon: "📂", desc: "Read/write files on disk" },
    { label: "Connect to databases", icon: "🗄️", desc: "MongoDB, PostgreSQL, etc." },
];

export default function NodeJSSection() {
    const [activeTimeline, setActiveTimeline] = useState<number | null>(null);
    const [revealedPowers, setRevealedPowers] = useState<Set<number>>(new Set());

    const togglePower = (i: number) => {
        setRevealedPowers(prev => {
            const next = new Set(prev);
            if (next.has(i)) next.delete(i);
            else next.add(i);
            return next;
        });
    };

    return (
        <SectionWrapper
            id="nodejs"
            title="Node.js — JS Outside the Browser"
            subtitle="Node.js is not a new language. It is JavaScript with server capabilities. And that changed everything."
        >
            {/* Timeline */}
            <div className="max-w-3xl mx-auto mb-16">
                <h3 className="text-lg font-semibold text-text-primary mb-6">The Evolution</h3>
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

                    <div className="space-y-4">
                        {timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative pl-16 cursor-pointer"
                                onClick={() => setActiveTimeline(activeTimeline === i ? null : i)}
                            >
                                <div className="absolute left-3 w-7 h-7 rounded-full bg-card border-2 border-border flex items-center justify-center text-sm z-10">
                                    {item.icon}
                                </div>
                                <div className={`bg-card rounded-xl border p-4 transition-all ${activeTimeline === i ? "border-dark shadow-sm" : "border-border hover:border-accent-dark"}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-text-secondary bg-background px-2 py-0.5 rounded">{item.year}</span>
                                        <p className="text-sm font-semibold text-text-primary">{item.event}</p>
                                    </div>
                                    <AnimatePresence>
                                        {activeTimeline === i && (
                                            <motion.p
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="text-xs text-text-secondary mt-2 leading-relaxed overflow-hidden"
                                            >
                                                {item.detail}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Before / After comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                {/* Browser JS */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">🌐</span>
                        <h4 className="text-sm font-bold text-red-800">JS in Browser (Before)</h4>
                    </div>
                    <div className="space-y-2">
                        {browserPowers.map((p) => (
                            <div key={p.label} className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
                                <span>{p.icon}</span>
                                <span className="text-xs text-red-700">{p.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 bg-red-100 rounded-lg px-3 py-2">
                        <p className="text-xs text-red-600 font-medium text-center">❌ Cannot create servers, access files, or connect to databases</p>
                    </div>
                </div>

                {/* Node JS */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">🚀</span>
                        <h4 className="text-sm font-bold text-green-800">JS with Node.js (After)</h4>
                    </div>
                    <div className="space-y-2">
                        {nodePowers.map((p, i) => (
                            <motion.div
                                key={p.label}
                                onClick={() => togglePower(i)}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 cursor-pointer"
                            >
                                <span>{p.icon}</span>
                                <div className="flex-1">
                                    <span className="text-xs text-green-700 font-medium">{p.label}</span>
                                    <AnimatePresence>
                                        {revealedPowers.has(i) && (
                                            <motion.p
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="text-[10px] text-green-600 overflow-hidden"
                                            >
                                                {p.desc}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <span className="text-xs text-green-400">{revealedPowers.has(i) ? "−" : "+"}</span>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-4 bg-green-100 rounded-lg px-3 py-2">
                        <p className="text-xs text-green-700 font-medium text-center">✅ Same JS language + server superpowers</p>
                    </div>
                </div>
            </div>

            {/* Key insight */}
            <div className="max-w-lg mx-auto bg-card rounded-xl border border-border p-4 text-center">
                <p className="text-sm font-semibold text-text-primary mb-1">Node.js is NOT a new language</p>
                <p className="text-xs text-text-secondary">
                    It uses the same V8 engine from Chrome, but removes browser restrictions and gives JavaScript new powers.
                    Now developers build both frontend and backend using one language.
                </p>
            </div>
        </SectionWrapper>
    );
}
