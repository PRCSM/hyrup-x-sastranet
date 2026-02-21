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
    const [lightboxOpen, setLightboxOpen] = useState(false);

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

                        {/* Site info card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSite}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-xl mx-auto"
                            >
                                <div className="bg-card rounded-2xl border border-border p-8 text-center">
                                    <h4 className="text-xl font-semibold text-text-primary mb-2">
                                        {badSites[currentSite].name}
                                    </h4>
                                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                                        {badSites[currentSite].description}
                                    </p>
                                    <span className="inline-block px-3 py-1 bg-background text-text-secondary/70 rounded-full text-xs font-medium mb-5">
                                        Vibe: {badSites[currentSite].vibe}
                                    </span>

                                    {/* Click to preview button */}
                                    <div>
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => setLightboxOpen(true)}
                                            className="px-5 py-2.5 text-sm font-medium rounded-xl border-2 border-dashed border-border hover:border-dark text-text-secondary hover:text-text-primary cursor-pointer transition-all duration-300 flex items-center gap-2 mx-auto"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <path d="M21 15l-5-5L5 21" />
                                            </svg>
                                            See the screenshot
                                        </motion.button>
                                    </div>
                                </div>
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

            {/* ─── Lightbox Modal ─── */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                        onClick={() => setLightboxOpen(false)}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                        {/* Modal content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            className="relative w-full max-w-4xl max-h-[85vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Browser chrome */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#2a2a2a] rounded-t-2xl">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                    <div className="w-3 h-3 rounded-full bg-[#fdbc40]" />
                                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                                </div>
                                <div className="flex-1 mx-4 bg-[#1a1a1a] rounded-lg px-4 py-1.5 text-xs text-white/40 font-mono text-center">
                                    {badSites[currentSite].name}
                                </div>
                                <button
                                    onClick={() => setLightboxOpen(false)}
                                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Screenshot */}
                            <div className="relative w-full overflow-auto bg-white rounded-b-2xl" style={{ maxHeight: "calc(85vh - 48px)" }}>
                                <Image
                                    src={badSites[currentSite].image}
                                    alt={`Screenshot of ${badSites[currentSite].name}`}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto"
                                    sizes="(max-width: 900px) 100vw, 900px"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
