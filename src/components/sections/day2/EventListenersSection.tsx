"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

const eventTypes = [
    { name: "click", icon: "👆", description: "User clicks an element" },
    { name: "keydown", icon: "⌨️", description: "User presses a key" },
    { name: "submit", icon: "📤", description: "Form is submitted" },
    { name: "mouseover", icon: "🖱️", description: "Mouse enters an element" },
    { name: "load", icon: "🔄", description: "Page finishes loading" },
];

export default function EventListenersSection() {
    const [clicks, setClicks] = useState(0);
    const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
    const [activeEvent, setActiveEvent] = useState(0);
    const [consoleLog, setConsoleLog] = useState<string[]>([]);

    const handleDemoClick = (e: React.MouseEvent) => {
        setClicks((p) => p + 1);
        setConsoleLog((p) => [...p.slice(-4), `"Button Clicked!" (${clicks + 1})`]);

        // Spawn particles
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const newParticles = Array.from({ length: 6 }, (_, i) => ({
            id: Date.now() + i,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }));
        setParticles((p) => [...p, ...newParticles]);
        setTimeout(() => {
            setParticles((p) => p.filter((pp) => !newParticles.find((np) => np.id === pp.id)));
        }, 800);
    };

    return (
        <SectionWrapper
            id="events"
            title="Event Listeners"
            subtitle="JavaScript responds to user actions — clicks, typing, scrolling, and more."
        >
            {/* Event types */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
                {eventTypes.map((evt, i) => (
                    <motion.button
                        key={evt.name}
                        whileHover={{ scale: 1.05, y: -2 }}
                        onClick={() => setActiveEvent(i)}
                        className={`px-4 py-3 rounded-xl text-sm transition-all cursor-pointer ${activeEvent === i
                                ? "bg-dark text-card shadow-md"
                                : "bg-card text-text-primary border border-border hover:border-accent-dark"
                            }`}
                    >
                        <span className="text-lg mr-2">{evt.icon}</span>
                        <span className="font-mono font-medium">{evt.name}</span>
                    </motion.button>
                ))}
            </div>
            <div className="text-center text-sm text-text-secondary mb-12">
                {eventTypes[activeEvent].description}
            </div>

            {/* Interactive demo */}
            <div className="max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* The button */}
                <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="text-base font-semibold text-text-primary mb-2">
                        Try It — Click the Button
                    </h3>
                    <p className="text-xs text-text-secondary/60 mb-6">
                        Each click triggers the event listener
                    </p>

                    {/* Demo button */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDemoClick}
                                className="px-8 py-4 bg-dark text-card rounded-xl text-base font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-shadow relative overflow-visible"
                            >
                                Click Me!
                                {clicks > 0 && (
                                    <motion.span
                                        key={clicks}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                                    >
                                        {clicks}
                                    </motion.span>
                                )}
                            </motion.button>

                            {/* Particles */}
                            <AnimatePresence>
                                {particles.map((p) => (
                                    <motion.div
                                        key={p.id}
                                        initial={{
                                            opacity: 1,
                                            scale: 1,
                                            x: p.x,
                                            y: p.y,
                                        }}
                                        animate={{
                                            opacity: 0,
                                            scale: 0,
                                            x: p.x + (Math.random() - 0.5) * 100,
                                            y: p.y - Math.random() * 60 - 20,
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="absolute w-2 h-2 rounded-full pointer-events-none"
                                        style={{
                                            background: ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff6b9d"][Math.floor(Math.random() * 5)],
                                        }}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Console output */}
                    <div className="bg-code-bg rounded-xl p-3 min-h-[80px]">
                        <div className="text-[10px] text-code-text/40 mb-1 font-mono">Console:</div>
                        {consoleLog.length === 0 ? (
                            <span className="text-code-text/30 text-xs font-mono italic">
                                Waiting for clicks...
                            </span>
                        ) : (
                            consoleLog.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-green-400 text-xs font-mono"
                                >
                                    &gt; {log}
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Code */}
                <div>
                    <div className="text-xs font-medium text-text-secondary/60 mb-2">
                        The code behind it
                    </div>
                    <CodeBlock
                        code={`let btn = document.querySelector("button");

btn.addEventListener("click", function() {
  alert("Button Clicked!");
});

// Arrow function version:
btn.addEventListener("click", () => {
  alert("Button Clicked!");
});`}
                        language="javascript"
                        highlightLines={[3, 4, 5]}
                    />
                </div>
            </div>
        </SectionWrapper>
    );
}
