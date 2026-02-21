"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const homeworkLinks = [
    {
        name: "Flexbox Froggy",
        url: "https://flexboxfroggy.com/",
        description: "A game where you help Froggy reach the lilypads using Flexbox.",
        tag: "Game",
    },
    {
        name: "CSS Diner",
        url: "https://flukeout.github.io/",
        description: "Practice CSS selectors by selecting food on a table.",
        tag: "Game",
    },
    {
        name: "Bonus Challenge",
        url: "#",
        description: "Try adding a second card next to the first using Flexbox.",
        tag: "Challenge",
    },
];

export default function NextDayTeaser() {
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <SectionWrapper id="next-day" className="pb-32">
            <div className="max-w-3xl mx-auto">
                {/* Homework */}
                <div className="mb-20">
                    <h2 className="text-2xl font-semibold text-text-primary mb-2">
                        Tonight&apos;s Homework
                    </h2>
                    <p className="text-sm text-text-secondary mb-6">
                        Optional... but strongly encouraged. These are genuinely fun.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {homeworkLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                target={link.url !== "#" ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                whileHover={{ y: -4 }}
                                className="bg-card rounded-2xl border border-border p-5 block hover:shadow-md hover:border-accent-dark transition-all duration-300"
                            >
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-background text-text-secondary/60 mb-3 inline-block">
                                    {link.tag}
                                </span>
                                <h4 className="text-base font-semibold text-text-primary mb-1">
                                    {link.name}
                                </h4>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    {link.description}
                                </p>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Day 2 Teaser */}
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-text-secondary mb-4">
                            Coming Tomorrow
                        </p>
                        <h2 className="text-4xl lg:text-5xl font-semibold text-text-primary tracking-tight mb-6">
                            Day 2 — JavaScript
                        </h2>
                        <p className="text-lg text-text-secondary max-w-lg mx-auto leading-relaxed mb-4">
                            Your card looks great. But click the button. Nothing happens.
                        </p>
                        <p className="text-base text-text-secondary/70 max-w-lg mx-auto mb-12">
                            Tomorrow, we fix that. Tomorrow, we add the <span className="font-semibold text-text-primary">BRAIN</span>.
                            JavaScript makes your website think, react, and talk to the internet.
                        </p>
                    </motion.div>

                    {/* Interactive button demo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-block"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            onClick={() => setClicked(true)}
                            className="relative px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-500 cursor-pointer"
                            style={{
                                background: clicked
                                    ? "#10b981"
                                    : hovered
                                        ? "#E8652E"
                                        : "#E6E8E7",
                                color: clicked || hovered ? "#ffffff" : "#6B6F72",
                                boxShadow: clicked
                                    ? "0 8px 32px rgba(16, 185, 129, 0.3)"
                                    : hovered
                                        ? "0 8px 32px rgba(232, 101, 46, 0.3)"
                                        : "none",
                            }}
                        >
                            {clicked
                                ? "It worked! See you tomorrow."
                                : hovered
                                    ? "Go ahead, click me!"
                                    : "This button does nothing... yet"}
                        </motion.button>
                    </motion.div>

                    {clicked && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-text-secondary mt-6"
                        >
                            Tomorrow, every button on your page will come alive with JavaScript.
                        </motion.p>
                    )}

                    {/* Footer */}
                    <div className="mt-20 pt-8 border-t border-border">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="font-extrabold text-sm" style={{ color: "#E8652E" }}>
                                HYRUP
                            </span>
                            <span className="text-text-secondary/40 font-light text-sm">×</span>
                            <span className="font-semibold text-sm text-text-primary" style={{ fontFamily: "'Georgia', serif" }}>
                                sastranet
                            </span>
                        </div>
                        <p className="text-xs text-text-secondary/50">
                            Web Dev Bootcamp — Day 1 Complete
                        </p>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
