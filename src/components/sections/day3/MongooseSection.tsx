"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

const features = [
    { icon: "🔗", label: "Connects Node → MongoDB", desc: "Bridges your server code to the database" },
    { icon: "📋", label: "Adds Structure (Schemas)", desc: "Define what your data should look like" },
    { icon: "✅", label: "Adds Validation", desc: "Reject bad data before it enters the DB" },
    { icon: "🛠️", label: "Adds Methods", desc: "Built-in CRUD operations and custom methods" },
    { icon: "✨", label: "Cleaner Queries", desc: "Readable, JavaScript-native query syntax" },
];

const connectionCode = `const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/myapp");

// Connection events
mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("❌ Connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ Disconnected from MongoDB");
});`;

export default function MongooseSection() {
    const [connStatus, setConnStatus] = useState<"idle" | "connecting" | "connected" | "error">("idle");
    const [revealedFeature, setRevealedFeature] = useState<number | null>(null);

    const simulateConnection = async () => {
        if (connStatus === "connecting") return;
        setConnStatus("connecting");
        await new Promise(r => setTimeout(r, 1500));
        setConnStatus("connected");
        await new Promise(r => setTimeout(r, 3000));
        setConnStatus("idle");
    };

    return (
        <SectionWrapper
            id="mongoose"
            title="Mongoose — The Warehouse Manager"
            subtitle="Mongoose is a Node.js library that helps you talk to MongoDB properly. It adds structure, validation, and convenience."
        >
            {/* Direct vs Manager comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">😵</span>
                        <h4 className="text-sm font-bold text-red-800">Without Mongoose</h4>
                    </div>
                    <p className="text-xs text-red-600 mb-3">Direct MongoDB access — chaotic</p>
                    <div className="space-y-2">
                        {["No structure enforcement", "No validation", "Verbose query syntax", "Manual error handling"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
                                <span className="text-red-400 text-xs">❌</span>
                                <span className="text-xs text-red-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">🧑‍💼</span>
                        <h4 className="text-sm font-bold text-green-800">With Mongoose</h4>
                    </div>
                    <p className="text-xs text-green-600 mb-3">Managed access — organized</p>
                    <div className="space-y-2">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                onClick={() => setRevealedFeature(revealedFeature === i ? null : i)}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 cursor-pointer"
                            >
                                <span className="text-lg">{f.icon}</span>
                                <div className="flex-1">
                                    <span className="text-xs text-green-700 font-medium">{f.label}</span>
                                    <AnimatePresence>
                                        {revealedFeature === i && (
                                            <motion.p
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="text-[10px] text-green-600 overflow-hidden"
                                            >
                                                {f.desc}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Connection code */}
            <div className="max-w-3xl mx-auto mb-8">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Connecting to MongoDB</h3>
                <CodeBlock code={connectionCode} language="javascript" highlightLines={[4]} />
            </div>

            {/* Connection simulator */}
            <div className="max-w-md mx-auto">
                <div className="bg-card rounded-2xl border border-border p-5 text-center">
                    <h4 className="text-sm font-semibold text-text-primary mb-4">Connection Status Simulator</h4>
                    <button
                        onClick={simulateConnection}
                        disabled={connStatus === "connecting"}
                        className={`px-6 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all mb-4 ${connStatus === "connecting" ? "bg-amber-100 text-amber-700" :
                                connStatus === "connected" ? "bg-green-100 text-green-700" :
                                    "bg-dark text-card hover:shadow-lg"
                            }`}
                    >
                        {connStatus === "idle" && "mongoose.connect() →"}
                        {connStatus === "connecting" && "⏳ Connecting..."}
                        {connStatus === "connected" && "✅ Connected!"}
                        {connStatus === "error" && "❌ Error — Retry"}
                    </button>

                    <div className="space-y-2">
                        {[
                            { event: "connected", status: connStatus === "connected", icon: "✅", label: "on('connected')" },
                            { event: "connecting", status: connStatus === "connecting", icon: "⏳", label: "on('connecting')" },
                            { event: "disconnected", status: connStatus === "idle" && false, icon: "⚠️", label: "on('disconnected')" },
                        ].map((e) => (
                            <div
                                key={e.event}
                                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-all ${e.status ? "bg-green-50 border border-green-200" : "bg-background"
                                    }`}
                            >
                                <span>{e.status ? e.icon : "○"}</span>
                                <code className="font-mono text-text-secondary">{e.label}</code>
                                {e.status && <span className="text-green-600 text-[10px] ml-auto">fired!</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
