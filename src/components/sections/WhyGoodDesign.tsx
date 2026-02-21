"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import Image from "next/image";

const principles = [
    {
        id: "hierarchy",
        label: "Visual Hierarchy",
        icon: "👁️",
        description: "Guide the eye. Big = important. Small = secondary. People scan, they don't read.",
        bad: "Everything the same size, nothing stands out.",
        good: "Clear headings, supporting text, obvious CTA.",
    },
    {
        id: "whitespace",
        label: "Whitespace",
        icon: "🫧",
        description: "Space isn't wasted — it's breathing room. Cramped designs feel stressful. Clean designs feel premium.",
        bad: "Every pixel filled. No room to breathe.",
        good: "Generous padding, clear sections, calm layout.",
    },
    {
        id: "typography",
        label: "Typography",
        icon: "✏️",
        description: "One good font changes everything. Size, weight, and spacing turn text into design.",
        bad: "Comic Sans, 5 different fonts, unreadable sizes.",
        good: "One professional font (Inter, Outfit), consistent scale.",
    },
    {
        id: "color",
        label: "Color & Contrast",
        icon: "🎨",
        description: "2-3 colors max. High contrast for readability. Accent colors draw attention where you want it.",
        bad: "Rainbow explosion. Low contrast text. Eye strain.",
        good: "Dark background, white text, one accent color.",
    },
    {
        id: "consistency",
        label: "Consistency",
        icon: "🔁",
        description: "Same padding everywhere. Same border radius. Same font sizes. Consistency = trust.",
        bad: "Every section looks like a different website.",
        good: "Design tokens: same values reused everywhere.",
    },
];

const whyStats = [
    { value: "94%", label: "of first impressions are design-related", icon: "⚡" },
    { value: "88%", label: "of users won't return after a bad experience", icon: "🚪" },
    { value: "3.8s", label: "is all you get to make a first impression", icon: "⏱️" },
    { value: "75%", label: "of credibility comes from website design", icon: "🏆" },
];

export default function WhyGoodDesign() {
    const [activePrinciple, setActivePrinciple] = useState("hierarchy");
    const [showComparison, setShowComparison] = useState(false);

    const current = principles.find((p) => p.id === activePrinciple)!;

    return (
        <SectionWrapper
            id="why-good-design"
            title="What Makes a Website Beautiful?"
            subtitle="The difference between 'meh' and 'wow' is just a few principles."
        >
            {/* Why it matters — stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                {whyStats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="bg-card rounded-2xl border border-border p-5 text-center"
                    >
                        <span className="text-2xl block mb-2">{stat.icon}</span>
                        <div className="text-2xl font-bold text-text-primary mb-1" style={{ color: "#E8652E" }}>
                            {stat.value}
                        </div>
                        <p className="text-xs text-text-secondary leading-relaxed">
                            {stat.label}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* The Need callout */}
            <div className="bg-dark rounded-2xl p-8 mb-16 text-center max-w-3xl mx-auto">
                <h3 className="text-xl font-semibold text-card mb-3">
                    Why Do We Need Good Frontend?
                </h3>
                <p className="text-sm text-card/70 leading-relaxed max-w-xl mx-auto">
                    Your backend can be the fastest in the world, your database perfectly normalized, your API flawless —
                    but if your frontend looks like it was built in 2004,
                    <span className="font-semibold text-card"> nobody will trust it.</span>
                    {" "}Frontend is the first and last thing a user sees. It&apos;s your handshake, your outfit, your first impression.
                </p>
            </div>

            {/* Principles explorer */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-text-primary mb-6">
                    The 5 Principles of Beautiful Design
                </h3>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {principles.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => setActivePrinciple(p.id)}
                            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${activePrinciple === p.id
                                    ? "bg-dark text-card"
                                    : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                                }`}
                        >
                            {p.icon} {p.label}
                        </button>
                    ))}
                </div>

                {/* Active principle detail */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activePrinciple}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="bg-card rounded-2xl border border-border p-8"
                    >
                        <div className="flex items-start gap-4 mb-6">
                            <span className="text-3xl">{current.icon}</span>
                            <div>
                                <h4 className="text-lg font-semibold text-text-primary mb-1">
                                    {current.label}
                                </h4>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    {current.description}
                                </p>
                            </div>
                        </div>

                        {/* Good vs Bad */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="rounded-xl border-2 border-red-200 bg-red-50/50 p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm">❌</span>
                                    <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">Bad</span>
                                </div>
                                <p className="text-sm text-red-700/80 leading-relaxed">
                                    {current.bad}
                                </p>
                            </div>
                            <div className="rounded-xl border-2 border-green-200 bg-green-50/50 p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm">✅</span>
                                    <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">Good</span>
                                </div>
                                <p className="text-sm text-green-800/80 leading-relaxed">
                                    {current.good}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Real-world example — Oura & Co */}
            <div className="mt-16">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary">
                            A Real-World Example
                        </h3>
                        <p className="text-sm text-text-secondary">
                            See all 5 principles applied in one design.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowComparison((v) => !v)}
                        className="px-4 py-2 text-sm font-medium rounded-xl bg-card text-text-secondary border border-border hover:border-accent-dark cursor-pointer transition-all"
                    >
                        {showComparison ? "Hide annotations" : "Show annotations"}
                    </button>
                </div>

                {/* Oura screenshot in browser chrome */}
                <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm relative">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/50">
                        <div className="w-3 h-3 rounded-full bg-red-400/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                        <div className="w-3 h-3 rounded-full bg-green-400/60" />
                        <div className="ml-3 flex-1 bg-card rounded-lg px-3 py-1 text-xs text-text-secondary/50 font-mono">
                            oura-co.com — interior design agency
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                        <Image
                            src="/images/Oura & Co_ interior design agency website.jpg"
                            alt="Oura & Co interior design agency — example of beautiful website design"
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 1200px) 100vw, 1200px"
                        />

                        {/* Annotation overlays */}
                        <AnimatePresence>
                            {showComparison && (
                                <>
                                    <AnnotationPill label="Visual Hierarchy" position="top-[8%] left-[5%]" color="#E8652E" />
                                    <AnnotationPill label="Whitespace" position="top-[40%] right-[5%]" color="#10b981" />
                                    <AnnotationPill label="Typography" position="top-[18%] left-[30%]" color="#6366f1" />
                                    <AnnotationPill label="Color Palette" position="bottom-[15%] left-[5%]" color="#f59e0b" />
                                    <AnnotationPill label="Consistency" position="bottom-[25%] right-[10%]" color="#ec4899" />
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Caption */}
                <p className="text-xs text-text-secondary/60 text-center mt-4 italic">
                    Oura & Co — Notice the clean hierarchy, generous whitespace, minimal color palette, and consistent spacing.
                    This is what CSS mastery looks like.
                </p>
            </div>
        </SectionWrapper>
    );
}

/* ─── Annotation Pill ─── */
function AnnotationPill({
    label,
    position,
    color,
}: {
    label: string;
    position: string;
    color: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute ${position} z-10`}
        >
            <div
                className="px-3 py-1.5 rounded-full text-white text-xs font-semibold shadow-lg backdrop-blur-sm"
                style={{ background: `${color}dd` }}
            >
                {label}
            </div>
        </motion.div>
    );
}
