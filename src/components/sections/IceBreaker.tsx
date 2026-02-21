"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const badSites = [
    {
        name: "lingscars.com",
        description: "A car leasing site that looks like a fever dream. Flashing colors, random dragons, moving text everywhere.",
        vibe: "Sensory overload",
    },
    {
        name: "arngren.net",
        description: "A Norwegian electronics store with every single product crammed onto one page. No whitespace. No mercy.",
        vibe: "Where's Waldo: Shopping Edition",
    },
    {
        name: "art.yale.edu (old)",
        description: "Yale's School of Art website — intentionally chaotic. Proves that even Ivy League doesn't guarantee good UI.",
        vibe: "Professional chaos",
    },
];

export default function IceBreaker() {
    const [revealed, setRevealed] = useState(false);
    const [currentSite, setCurrentSite] = useState(0);

    return (
        <SectionWrapper
            id="ice-breaker"
            title="Let's Start With a Question"
        >
            {/* The question */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center mb-12"
            >
                <h3 className="text-3xl lg:text-5xl font-bold text-text-primary leading-tight mb-8">
                    What is the <span className="italic">worst</span> website<br />
                    you have ever seen?
                </h3>
                <p className="text-text-secondary text-lg">
                    Think about it... we&apos;ve all seen some truly terrible ones.
                </p>
            </motion.div>

            {/* Reveal button */}
            {!revealed && (
                <div className="text-center mb-8">
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRevealed(true)}
                        className="px-8 py-3 bg-dark text-card rounded-xl text-sm font-semibold cursor-pointer transition-all hover:shadow-lg"
                    >
                        Show me some legendary bad websites
                    </motion.button>
                </div>
            )}

            {/* Bad websites showcase */}
            <AnimatePresence>
                {revealed && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Site tabs */}
                        <div className="flex gap-2 justify-center mb-6">
                            {badSites.map((site, i) => (
                                <button
                                    key={site.name}
                                    onClick={() => setCurrentSite(i)}
                                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${currentSite === i
                                            ? "bg-dark text-card"
                                            : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                                        }`}
                                >
                                    {site.name}
                                </button>
                            ))}
                        </div>

                        {/* Site info */}
                        <motion.div
                            key={currentSite}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="max-w-xl mx-auto bg-card rounded-2xl border border-border p-8 text-center"
                        >
                            <h4 className="text-xl font-semibold text-text-primary mb-2">
                                {badSites[currentSite].name}
                            </h4>
                            <p className="text-text-secondary text-sm leading-relaxed mb-4">
                                {badSites[currentSite].description}
                            </p>
                            <span className="inline-block px-3 py-1 bg-background text-text-secondary/70 rounded-full text-xs font-medium">
                                Vibe: {badSites[currentSite].vibe}
                            </span>
                        </motion.div>

                        {/* The hook */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center mt-10"
                        >
                            <div className="inline-block bg-dark rounded-2xl px-10 py-6">
                                <p className="text-lg font-semibold text-card">
                                    By the end of today, you&apos;ll be
                                </p>
                                <p className="text-2xl font-bold mt-1" style={{ color: "#E8652E" }}>
                                    BETTER than all of those.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
