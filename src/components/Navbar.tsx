"use client";

import { motion, useScroll } from "framer-motion";

export default function Navbar() {
    const { scrollYProgress } = useScroll();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm tracking-wide">
                    <span className="font-extrabold" style={{ color: "#E8652E" }}>
                        HYRUP
                    </span>
                    <span className="text-text-secondary/50 font-light">×</span>
                    <span className="font-semibold text-text-primary" style={{ fontFamily: "'Georgia', serif" }}>
                        Sastranet
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <span className="px-3 py-1.5 text-sm font-medium bg-dark text-card rounded-full">
                        Day 1
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium text-text-secondary/40 cursor-not-allowed">
                        Day 2
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium text-text-secondary/40 cursor-not-allowed">
                        Day 3
                    </span>
                </div>

                <div className="w-16" />
            </div>

            {/* Scroll progress bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-dark origin-left"
                style={{ scaleX: scrollYProgress }}
            />
        </nav>
    );
}
