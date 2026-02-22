"use client";

import { motion, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

const days = [
    { label: "Day 1", href: "/day-1" },
    { label: "Day 2", href: "/day-2" },
    { label: "Day 3", href: "" },
];

export default function Navbar() {
    const { scrollYProgress } = useScroll();
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm tracking-wide">
                    <span className="font-black text-base tracking-wide" style={{ color: "#E8652E" }}>
                        HYRUP
                    </span>
                    <span className="text-text-secondary/50 font-light">×</span>
                    <span className="font-semibold text-text-primary" style={{ fontFamily: "'Tanheadline', serif" }}>
                        sastranet
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    {days.map((day) => {
                        const isActive = pathname === day.href;
                        const isDisabled = !day.href;

                        if (isDisabled) {
                            return (
                                <span
                                    key={day.label}
                                    className="px-3 py-1.5 text-sm font-medium text-text-secondary/40 cursor-not-allowed"
                                >
                                    {day.label}
                                </span>
                            );
                        }

                        return (
                            <Link
                                key={day.label}
                                href={day.href}
                                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${isActive
                                    ? "bg-dark text-card"
                                    : "text-text-secondary hover:text-text-primary"
                                    }`}
                            >
                                {day.label}
                            </Link>
                        );
                    })}
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
