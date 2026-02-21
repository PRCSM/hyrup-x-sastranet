"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import Image from "next/image";

const badSites = [
    {
        name: "lingscars.com",
        description: "A car leasing site that looks like a fever dream. Flashing colors, random dragons, moving text everywhere.",
        vibe: "Sensory overload 🤯",
        image: "/images/lings-cars-bad-website-design.jpg.avif",
    },
    {
        name: "bella-de-soto.com",
        description: "No visual hierarchy, inconsistent fonts, random clip-art. It's like a Word document from 2003 gained sentience.",
        vibe: "Lost in time 🕰️",
        image: "/images/bella-de-soto-bad-website-design.jpg.avif",
    },
    {
        name: "art.yale.edu (old)",
        description: "Yale's School of Art website — intentionally chaotic. Proves that even Ivy League doesn't guarantee good UI.",
        vibe: "Professional chaos 🎨",
        image: "/images/yale.png",
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
                        <div className="flex gap-2 justify-center mb-8">
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

                        {/* Site info + image */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSite}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-3xl mx-auto"
                            >
                                {/* Info card */}
                                <div className="bg-card rounded-2xl border border-border p-6 text-center mb-4">
                                    <h4 className="text-xl font-semibold text-text-primary mb-2">
                                        {badSites[currentSite].name}
                                    </h4>
                                    <p className="text-text-secondary text-sm leading-relaxed mb-3">
                                        {badSites[currentSite].description}
                                    </p>
                                    <span className="inline-block px-3 py-1 bg-background text-text-secondary/70 rounded-full text-xs font-medium">
                                        Vibe: {badSites[currentSite].vibe}
                                    </span>
                                </div>

                                {/* Screenshot preview */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.15, duration: 0.4 }}
                                    className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
                                >
                                    {/* Browser chrome */}
                                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/50">
                                        <div className="w-3 h-3 rounded-full bg-red-400/60" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                                        <div className="w-3 h-3 rounded-full bg-green-400/60" />
                                        <div className="ml-3 flex-1 bg-card rounded-lg px-3 py-1 text-xs text-text-secondary/50 font-mono">
                                            {badSites[currentSite].name}
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
                                        <Image
                                            src={badSites[currentSite].image}
                                            alt={`Screenshot of ${badSites[currentSite].name}`}
                                            fill
                                            className="object-cover object-top"
                                            sizes="(max-width: 768px) 100vw, 768px"
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>

                        {/* The hook */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-center mt-12"
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
