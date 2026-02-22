"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const flowSteps = [
    {
        id: "user",
        label: "User",
        icon: "👆",
        description: "User clicks the 'Load Posts' button on the page",
        detail: "The browser detects the click event and triggers the JavaScript event handler.",
    },
    {
        id: "js",
        label: "JavaScript",
        icon: "⚡",
        description: "JS runs fetch() to request data from an API",
        detail: 'The code calls `fetch("https://api.example.com/posts")` which sends an HTTP GET request.',
    },
    {
        id: "api",
        label: "Backend API",
        icon: "🖥️",
        description: "Server receives the request, queries the database",
        detail: "The server processes the request — authentication, validation, DB query — then builds a response.",
    },
    {
        id: "json",
        label: "JSON Response",
        icon: "📦",
        description: "Server sends back data as JSON",
        detail: '{ "posts": [{ "title": "Hello World", "author": "Anagha" }] }',
    },
    {
        id: "ui",
        label: "UI Update",
        icon: "🎨",
        description: "JavaScript receives JSON and updates the DOM",
        detail: "JS parses the JSON, creates HTML elements, and inserts them into the page. The user sees the posts!",
    },
];

export default function FrontendBackendSection() {
    const [activeStep, setActiveStep] = useState<number | null>(null);
    const [simulating, setSimulating] = useState(false);
    const [simStep, setSimStep] = useState(-1);

    const simulate = async () => {
        if (simulating) return;
        setSimulating(true);
        setActiveStep(null);
        for (let i = 0; i < flowSteps.length; i++) {
            setSimStep(i);
            setActiveStep(i);
            await new Promise((r) => setTimeout(r, 1000));
        }
        setSimulating(false);
        setSimStep(-1);
    };

    return (
        <SectionWrapper
            id="frontend-backend"
            title="Frontend ↔ Backend"
            subtitle="How your JavaScript in the browser talks to a server and gets data back."
        >
            {/* Flow diagram */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="flex flex-wrap justify-center items-start gap-2">
                    {flowSteps.map((step, i) => (
                        <div key={step.id} className="flex items-start">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveStep(activeStep === i ? null : i)}
                                className={`flex flex-col items-center p-4 rounded-2xl transition-all cursor-pointer min-w-[90px] ${activeStep === i
                                        ? "bg-dark text-card shadow-lg"
                                        : "bg-card text-text-primary border border-border hover:border-accent-dark"
                                    }`}
                            >
                                <span className="text-2xl mb-2">{step.icon}</span>
                                <span className="text-xs font-semibold text-center">{step.label}</span>
                                {simulating && simStep === i && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.6 }}
                                        className="w-2 h-2 bg-green-400 rounded-full mt-2"
                                    />
                                )}
                            </motion.button>
                            {i < flowSteps.length - 1 && (
                                <div className="flex items-center pt-8 px-1">
                                    <motion.div
                                        animate={{
                                            backgroundColor: simulating && simStep >= i
                                                ? "#22c55e"
                                                : "#e5e7eb",
                                        }}
                                        className="w-6 h-0.5 rounded"
                                    />
                                    <div className="text-text-secondary/30 text-xs">→</div>
                                    <motion.div
                                        animate={{
                                            backgroundColor: simulating && simStep > i
                                                ? "#22c55e"
                                                : "#e5e7eb",
                                        }}
                                        className="w-6 h-0.5 rounded"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Simulate button */}
            <div className="text-center mb-8">
                <button
                    onClick={simulate}
                    disabled={simulating}
                    className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${simulating
                            ? "bg-green-100 text-green-700"
                            : "bg-dark text-card hover:shadow-lg"
                        }`}
                >
                    {simulating ? "Simulating..." : "Simulate the Flow →"}
                </button>
            </div>

            {/* Step detail panel */}
            <AnimatePresence>
                {activeStep !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="max-w-lg mx-auto bg-card rounded-2xl border border-border p-6"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{flowSteps[activeStep].icon}</span>
                            <h4 className="text-base font-semibold text-text-primary">
                                Step {activeStep + 1}: {flowSteps[activeStep].label}
                            </h4>
                        </div>
                        <p className="text-sm text-text-primary mb-2">
                            {flowSteps[activeStep].description}
                        </p>
                        <div className="bg-background rounded-lg p-3">
                            <p className="text-xs text-text-secondary font-mono leading-relaxed">
                                {flowSteps[activeStep].detail}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
