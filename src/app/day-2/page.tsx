"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import JSHeroSection from "@/components/sections/day2/JSHeroSection";
import VariablesSection from "@/components/sections/day2/VariablesSection";
import DataTypesSection from "@/components/sections/day2/DataTypesSection";
import NullUndefinedSection from "@/components/sections/day2/NullUndefinedSection";
import OperatorsSection from "@/components/sections/day2/OperatorsSection";
import ConditionalsSection from "@/components/sections/day2/ConditionalsSection";
import LoopsSection from "@/components/sections/day2/LoopsSection";
import FunctionsSection from "@/components/sections/day2/FunctionsSection";
import DOMTreeSection from "@/components/sections/day2/DOMTreeSection";
import QuerySelectorSection from "@/components/sections/day2/QuerySelectorSection";
import EventListenersSection from "@/components/sections/day2/EventListenersSection";
import AsyncSection from "@/components/sections/day2/AsyncSection";
import ES6FeaturesSection from "@/components/sections/day2/ES6FeaturesSection";
import FrontendBackendSection from "@/components/sections/day2/FrontendBackendSection";
import JSQuizSection from "@/components/sections/day2/JSQuizSection";
import JSRecapSection from "@/components/sections/day2/JSRecapSection";

/* ── Change this passkey to whatever you want ── */
const PASSKEY = "js2025";

function QuoteBanner({ quote, author }: { quote: string; author?: string }) {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <p className="text-xl lg:text-2xl font-medium text-text-secondary/80 italic leading-relaxed">
                &ldquo;{quote}&rdquo;
            </p>
            {author && (
                <p className="text-sm text-text-secondary/50 mt-3 font-medium">
                    — {author}
                </p>
            )}
        </div>
    );
}

/* ── Passkey Gate ── */
function PasskeyGate({ onUnlock }: { onUnlock: () => void }) {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim().toLowerCase() === PASSKEY.toLowerCase()) {
            sessionStorage.setItem("day2-unlocked", "true");
            onUnlock();
        } else {
            setError(true);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-sm"
            >
                <div className="text-center mb-8">
                    <div className="text-4xl mb-4">🔒</div>
                    <h1 className="text-2xl font-semibold text-text-primary mb-2">
                        Day 2 is Locked
                    </h1>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        Enter the passkey shared by your instructor to unlock JavaScript content.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <motion.div
                        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => { setInput(e.target.value); setError(false); }}
                            placeholder="Enter passkey..."
                            autoFocus
                            className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium text-center tracking-widest uppercase bg-card text-text-primary outline-none transition-all ${error
                                    ? "border-red-400 bg-red-50"
                                    : "border-border focus:border-dark"
                                }`}
                        />
                    </motion.div>

                    <AnimatePresence>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-xs text-red-500 text-center mt-2 font-medium"
                            >
                                Wrong passkey. Try again!
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        className="w-full mt-4 px-4 py-3 bg-dark text-card rounded-xl text-sm font-medium cursor-pointer hover:shadow-lg transition-all active:scale-[0.98]"
                    >
                        Unlock Day 2 →
                    </button>
                </form>

                <p className="text-xs text-text-secondary/40 text-center mt-6">
                    Complete Day 1 first, then ask your instructor for the passkey.
                </p>
            </motion.div>
        </div>
    );
}

export default function Day2Page() {
    const [unlocked, setUnlocked] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const stored = sessionStorage.getItem("day2-unlocked");
        if (stored === "true") setUnlocked(true);
        setChecking(false);
    }, []);

    if (checking) return null;

    if (!unlocked) {
        return <PasskeyGate onUnlock={() => setUnlocked(true)} />;
    }

    return (
        <>
            {/* ── Hero ───────────────────────────────────────── */}
            <JSHeroSection />

            {/* ── Fundamentals ───────────────────────────────── */}
            <VariablesSection />
            <DataTypesSection />
            <NullUndefinedSection />

            <QuoteBanner
                quote="First, solve the problem. Then, write the code."
                author="John Johnson"
            />

            {/* ── Operators & Control Flow ────────────────────── */}
            <OperatorsSection />
            <ConditionalsSection />
            <LoopsSection />

            <QuoteBanner
                quote="Talk is cheap. Show me the code."
                author="Linus Torvalds"
            />

            {/* ── Functions ──────────────────────────────────── */}
            <FunctionsSection />

            {/* ── DOM & Events ────────────────────────────────── */}
            <DOMTreeSection />
            <QuerySelectorSection />
            <EventListenersSection />

            <QuoteBanner
                quote="The best error message is the one that never shows up."
                author="Thomas Fuchs"
            />

            {/* ── Advanced ────────────────────────────────────── */}
            <AsyncSection />
            <ES6FeaturesSection />
            <FrontendBackendSection />

            <QuoteBanner
                quote="Any application that can be written in JavaScript, will eventually be written in JavaScript."
                author="Atwood's Law"
            />

            {/* ── Quiz & Recap ────────────────────────────────── */}
            <JSQuizSection />
            <JSRecapSection />
        </>
    );
}

