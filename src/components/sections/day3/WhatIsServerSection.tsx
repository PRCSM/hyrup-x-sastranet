"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const myths = [
    { myth: "A server is a special, expensive machine", reality: "It's just software — a program — that listens for HTTP requests", icon: "🖥️" },
    { myth: "Only big companies can have servers", reality: "You can run a server on your own laptop with a few lines of code", icon: "💻" },
    { myth: "Servers are always on 24/7 hardware", reality: "In development, it's just a process running on your computer", icon: "⏰" },
];

const incomingRequests = [
    { method: "GET", path: "/api/users", delay: 0 },
    { method: "POST", path: "/api/login", delay: 800 },
    { method: "GET", path: "/api/products", delay: 1600 },
    { method: "DELETE", path: "/api/orders/5", delay: 2400 },
];

export default function WhatIsServerSection() {
    const [listening, setListening] = useState(false);
    const [requests, setRequests] = useState<{ method: string; path: string; status: string }[]>([]);

    const simulateServer = async () => {
        if (listening) return;
        setListening(true);
        setRequests([]);

        for (const req of incomingRequests) {
            await new Promise(r => setTimeout(r, 800));
            setRequests(prev => [...prev, { ...req, status: "processing" }]);
            await new Promise(r => setTimeout(r, 600));
            setRequests(prev =>
                prev.map((r, i) => i === prev.length - 1 ? { ...r, status: "done" } : r)
            );
        }
        await new Promise(r => setTimeout(r, 500));
        setListening(false);
    };

    return (
        <SectionWrapper
            id="what-is-server"
            title="What is a Server?"
            subtitle="A server is simply a program that waits for incoming HTTP requests and responds to them. Not a magical machine."
        >
            {/* Myth busting */}
            <div className="max-w-3xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Myth vs Reality</h3>
                <div className="space-y-3">
                    {myths.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="bg-card rounded-xl border border-border p-4"
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">{m.icon}</span>
                                <div>
                                    <p className="text-sm text-red-500 line-through mb-1">{m.myth}</p>
                                    <p className="text-sm font-medium text-green-700">{m.reality}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Server visualization */}
            <div className="max-w-xl mx-auto">
                <div className="bg-code-bg rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={listening ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${listening ? "bg-green-500/20" : "bg-white/10"
                                    }`}
                            >
                                {listening ? "👂" : "💤"}
                            </motion.div>
                            <div>
                                <p className="text-sm font-semibold text-code-text">
                                    {listening ? "Server is listening..." : "Server idle"}
                                </p>
                                <p className="text-xs text-code-text/50">Port 3000</p>
                            </div>
                        </div>
                        <button
                            onClick={simulateServer}
                            disabled={listening}
                            className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all ${listening ? "bg-green-500/20 text-green-400" : "bg-white/10 text-code-text hover:bg-white/20"
                                }`}
                        >
                            {listening ? "Receiving..." : "Start Server →"}
                        </button>
                    </div>

                    {/* Request log */}
                    <div className="space-y-2 min-h-[120px]">
                        <AnimatePresence>
                            {requests.map((req, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2"
                                >
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${req.method === "GET" ? "bg-green-500/20 text-green-400" :
                                            req.method === "POST" ? "bg-blue-500/20 text-blue-400" :
                                                req.method === "DELETE" ? "bg-red-500/20 text-red-400" :
                                                    "bg-amber-500/20 text-amber-400"
                                        }`}>
                                        {req.method}
                                    </span>
                                    <span className="text-xs font-mono text-code-text/70 flex-1">{req.path}</span>
                                    {req.status === "processing" ? (
                                        <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <span className="text-xs text-green-400">200 OK ✓</span>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {!listening && requests.length === 0 && (
                            <p className="text-xs text-code-text/30 text-center py-8">
                                Waiting for incoming requests...
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
