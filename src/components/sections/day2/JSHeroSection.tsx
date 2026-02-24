"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const withoutJS = {
    bg: "#e8e8e8",
    heading: "My Website",
    text: "This is a boring static page. Nothing happens when you click. No animations. No interaction.",
    buttonText: "Click me (nothing happens)",
    textColor: "#555",
};

const withJS = {
    bg: "#1a1a2e",
    heading: "My Website ✨",
    text: "This page is alive! Buttons respond, content updates dynamically, animations play smoothly.",
    buttonText: "Click me!",
    textColor: "#e2e8f0",
};

const typingLines = [
    'console.log("Hello World!");',
    "// → Hello World!",
];

export default function JSHeroSection() {
    const [jsEnabled, setJsEnabled] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [lineIdx, setLineIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    // Typing animation
    useEffect(() => {
        if (lineIdx >= typingLines.length) return;
        const line = typingLines[lineIdx];
        if (charIdx < line.length) {
            const t = setTimeout(() => {
                setTypedText((p) => p + line[charIdx]);
                setCharIdx((p) => p + 1);
            }, 50);
            return () => clearTimeout(t);
        } else {
            const t = setTimeout(() => {
                setTypedText((p) => p + "\n");
                setLineIdx((p) => p + 1);
                setCharIdx(0);
            }, 400);
            return () => clearTimeout(t);
        }
    }, [lineIdx, charIdx]);

    const current = jsEnabled ? withJS : withoutJS;

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
                        Day 2
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-semibold text-text-primary tracking-tight leading-[1.1]">
                        JavaScript<br />
                        Fundamentals
                    </h1>
                    <p className="text-xl text-text-secondary mt-6 max-w-md leading-relaxed">
                        Make Things Happen
                    </p>
                    <p className="text-base text-text-secondary/70 mt-3 max-w-md">
                        JavaScript is a scripting language that enables you to create dynamically updating content and build interactive web applications.
                    </p>

                    {/* Browser vs Server */}
                    <div className="grid grid-cols-2 gap-3 mt-8">
                        <div className="bg-card rounded-xl border border-border p-4">
                            <div className="text-xs font-semibold text-text-secondary/60 uppercase tracking-wider mb-2">Browser</div>
                            <p className="text-sm text-text-primary font-medium">V8 Engine</p>
                            <p className="text-xs text-text-secondary/70 mt-1">Chrome reads and executes JS code</p>
                        </div>
                        {/* <div className="bg-card rounded-xl border border-border p-4">
                            <div className="text-xs font-semibold text-text-secondary/60 uppercase tracking-wider mb-2">Server</div>
                            <p className="text-sm text-text-primary font-medium">Node.js</p>
                            <p className="text-xs text-text-secondary/70 mt-1">Handle DB, build API, backend logic</p>
                        </div> */}
                    </div>

                    {/* Toggle */}
                    <div className="flex gap-2 mt-8">
                        <button
                            onClick={() => setJsEnabled(false)}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${!jsEnabled ? "bg-dark text-card" : "bg-card text-text-secondary border border-border hover:border-accent-dark"}`}
                        >
                            Without JS
                        </button>
                        <button
                            onClick={() => setJsEnabled(true)}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${jsEnabled ? "bg-dark text-card" : "bg-card text-text-secondary border border-border hover:border-accent-dark"}`}
                        >
                            With JS
                        </button>
                    </div>
                </motion.div>

                {/* Right — Animated preview & console */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col gap-4"
                >
                    {/* Browser preview */}
                    <div className="w-full bg-card rounded-2xl border border-border p-6 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-400/60" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                            <div className="w-3 h-3 rounded-full bg-green-400/60" />
                            <div className="flex-1 mx-3">
                                <div className="bg-background rounded-md px-3 py-1 text-xs text-text-secondary/50 font-mono text-center">
                                    mywebsite.com
                                </div>
                            </div>
                        </div>

                        <div className="bg-background rounded-xl p-6 text-center">
                            <h3 className="text-lg font-semibold text-text-primary mb-2">
                                Welcome to My Website
                            </h3>
                            <p className="text-sm text-text-secondary mb-5 max-w-xs mx-auto">
                                A simple page with a button. Try clicking it!
                            </p>
                            <button
                                onClick={() => {
                                    if (jsEnabled) {
                                        setShowAlert(true);
                                        setClickCount(p => p + 1);
                                        setTimeout(() => setShowAlert(false), 2000);
                                    }
                                }}
                                className="px-6 py-2.5 bg-dark text-card text-sm font-medium rounded-xl cursor-pointer hover:shadow-lg transition-all active:scale-95"
                            >
                                Click Me!
                            </button>
                        </div>

                        {/* Cool animated alert — only appears in JS mode */}
                        <AnimatePresence>
                            {showAlert && jsEnabled && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                                    transition={{ type: "spring", damping: 15, stiffness: 300 }}
                                    className="absolute inset-0 flex items-center justify-center bg-dark/40 backdrop-blur-sm rounded-2xl"
                                >
                                    <motion.div
                                        initial={{ scale: 0.5 }}
                                        animate={{ scale: 1 }}
                                        className="bg-card rounded-2xl shadow-2xl p-6 mx-6 text-center border border-border max-w-xs"
                                    >
                                        <motion.div
                                            initial={{ rotate: -20, scale: 0 }}
                                            animate={{ rotate: 0, scale: 1 }}
                                            transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
                                            className="text-4xl mb-3"
                                        >
                                            🎉
                                        </motion.div>
                                        <p className="text-base font-semibold text-text-primary mb-1">
                                            Button Clicked!
                                        </p>
                                        <p className="text-xs text-text-secondary">
                                            {clickCount === 1
                                                ? "JavaScript made this happen!"
                                                : `You've clicked ${clickCount} times!`}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-4 pt-3 border-t border-border">
                            <span className="text-xs font-medium text-text-secondary/60">
                                {jsEnabled ? "JavaScript adds behavior → button triggers an alert" : "Static HTML — button does nothing on click"}
                            </span>
                        </div>
                    </div>

                    {/* Console output */}
                    <div className="bg-code-bg rounded-xl border border-border overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                            <span className="text-xs font-mono text-code-text/50 ml-1">Console</span>
                        </div>
                        <pre className="p-4 text-sm font-mono text-green-400 leading-relaxed min-h-[60px]">
                            {typedText}
                            <span className="animate-pulse">▊</span>
                        </pre>
                    </div>
                </motion.div>
            </div>

            {/* Speaker notes */}
            <SpeakerNotes />
        </section>
    );
}

function SpeakerNotes() {
    const [open, setOpen] = useState(false);
    return (
        <div className="fixed bottom-4 right-4 z-40">
            <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-dark text-card flex items-center justify-center text-sm cursor-pointer shadow-lg hover:shadow-xl transition-all"
                title="Speaker Notes"
            >
                🎤
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-12 right-0 w-72 bg-card rounded-xl border border-border shadow-xl p-4"
                    >
                        <h4 className="text-sm font-semibold text-text-primary mb-2">Speaker Notes</h4>
                        <ul className="text-xs text-text-secondary space-y-1.5 leading-relaxed">
                            <li>HTML gives structure, CSS gives styling, JavaScript gives <strong>behavior</strong></li>
                            <li>Without JS, websites are just static pages</li>
                            <li>With JS, they become <strong>applications</strong></li>
                            <li>Scripting = interpreted at runtime, not compiled ahead of time</li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
