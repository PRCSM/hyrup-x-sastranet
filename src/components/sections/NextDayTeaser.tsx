"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

export default function NextDayTeaser() {
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <SectionWrapper id="next-day" className="pb-32">
            <div className="text-center max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-sm font-semibold tracking-[0.2em] uppercase text-text-secondary mb-4">
                        Coming Tomorrow
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-semibold text-text-primary tracking-tight mb-4">
                        Day 2 — JavaScript
                    </h2>
                    <p className="text-lg text-text-secondary mb-12">
                        Make it interactive. Add the brain.
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
                                    ? "#ff6b6b"
                                    : "#E6E8E7",
                            color: clicked || hovered ? "#ffffff" : "#6B6F72",
                            boxShadow: clicked
                                ? "0 8px 32px rgba(16, 185, 129, 0.3)"
                                : hovered
                                    ? "0 8px 32px rgba(255, 107, 107, 0.3)"
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
                    <p className="text-xs text-text-secondary/50">
                        Web Dev Bootcamp — Day 1 Complete
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}
