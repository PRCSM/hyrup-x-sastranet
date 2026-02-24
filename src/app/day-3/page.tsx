"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackendHeroSection from "@/components/sections/day3/BackendHeroSection";
import FrontendVsBackendSection from "@/components/sections/day3/FrontendVsBackendSection";
import HTTPExplainerSection from "@/components/sections/day3/HTTPExplainerSection";
import RestaurantAnalogySection from "@/components/sections/day3/RestaurantAnalogySection";
import APIEndpointsSection from "@/components/sections/day3/APIEndpointsSection";
import WhatIsServerSection from "@/components/sections/day3/WhatIsServerSection";
import NodeJSSection from "@/components/sections/day3/NodeJSSection";
import JSRecapSection from "@/components/sections/day3/JSRecapSection";
import ExpressJSSection from "@/components/sections/day3/ExpressJSSection";
import MongoDBSection from "@/components/sections/day3/MongoDBSection";
import MongooseSection from "@/components/sections/day3/MongooseSection";
import SchemaModelSection from "@/components/sections/day3/SchemaModelSection";
import FullPictureSection from "@/components/sections/day3/FullPictureSection";
import BackendQuizSection from "@/components/sections/day3/BackendQuizSection";
import BackendRecapSection from "@/components/sections/day3/BackendRecapSection";

const PASSKEY = "backend2026";

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

function PasskeyGate({ onUnlock }: { onUnlock: () => void }) {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim().toLowerCase() === PASSKEY.toLowerCase()) {
            sessionStorage.setItem("day3-unlocked", "true");
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
                        Day 3 is Locked
                    </h1>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        Enter the passkey shared by your instructor to unlock Backend Development content.
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
                        Unlock Day 3 →
                    </button>
                </form>

                <p className="text-xs text-text-secondary/40 text-center mt-6">
                    Complete Day 2 first, then ask your instructor for the passkey.
                </p>
            </motion.div>
        </div>
    );
}

export default function Day3Page() {
    const [unlocked, setUnlocked] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const stored = sessionStorage.getItem("day3-unlocked");
        if (stored === "true") setUnlocked(true);
        setChecking(false);
    }, []);

    if (checking) return null;

    if (!unlocked) {
        return <PasskeyGate onUnlock={() => setUnlocked(true)} />;
    }

    return (
        <>
            {/* ── Hero & Motivation ─────────────────────────── */}
            <BackendHeroSection />
            <FrontendVsBackendSection />

            <QuoteBanner
                quote="The best way to predict the future is to implement it."
                author="David Heinemeier Hansson"
            />

            {/* ── HTTP & APIs ───────────────────────────────── */}
            <HTTPExplainerSection />
            <RestaurantAnalogySection />
            <APIEndpointsSection />

            <QuoteBanner
                quote="First, solve the problem. Then, write the code."
                author="John Johnson"
            />

            {/* ── Node.js & Express ─────────────────────────── */}
            <WhatIsServerSection />
            <NodeJSSection />
            <JSRecapSection />
            <ExpressJSSection />

            <QuoteBanner
                quote="Any application that can be written in JavaScript, will eventually be written in JavaScript."
                author="Atwood's Law"
            />

            {/* ── MongoDB & Mongoose ────────────────────────── */}
            <MongoDBSection />
            <MongooseSection />
            <SchemaModelSection />

            <QuoteBanner
                quote="Simplicity is the soul of efficiency."
                author="Austin Freeman"
            />

            {/* ── Full Picture, Quiz & Recap ─────────────────── */}
            <FullPictureSection />
            <BackendQuizSection />
            <BackendRecapSection />
        </>
    );
}
