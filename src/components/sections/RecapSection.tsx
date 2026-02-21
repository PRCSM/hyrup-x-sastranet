"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const items = [
    {
        label: "HTML",
        description: "Structure — the skeleton of every web page",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        label: "CSS",
        description: "Style — colors, fonts, and visual design",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        label: "Flexbox",
        description: "Layout — positioning and alignment control",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
            </svg>
        ),
    },
    {
        label: "Responsive",
        description: "Adaptability — works on every device",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
        ),
    },
    {
        label: "Transitions",
        description: "Polish — smooth micro-animations",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ),
    },
];

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const item = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};

export default function RecapSection() {
    return (
        <SectionWrapper
            id="recap"
            title="What You Learned Today"
            subtitle="A visual summary of everything you covered in Day 1."
        >
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
            >
                {items.map((i) => (
                    <motion.div
                        key={i.label}
                        variants={item}
                        className="bg-card rounded-2xl border border-border p-6 flex flex-col items-center text-center gap-3 hover:shadow-md hover:border-accent-dark transition-all duration-300"
                    >
                        <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-text-secondary">
                            {i.icon}
                        </div>
                        <h3 className="text-base font-semibold text-text-primary">
                            {i.label}
                        </h3>
                        <p className="text-xs text-text-secondary leading-relaxed">
                            {i.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </SectionWrapper>
    );
}
