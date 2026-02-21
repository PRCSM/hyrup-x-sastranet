"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

type DisplayMode = "block" | "inline" | "inline-block";

const displayModes: {
    id: DisplayMode;
    label: string;
    emoji: string;
    analogy: string;
    description: string;
    traits: string[];
}[] = [
        {
            id: "block",
            label: "Block",
            emoji: "🧱",
            analogy: "A paragraph in a book — always starts on a NEW line and takes the FULL width.",
            description:
                "Takes up the entire width available. Stacks vertically. You CAN set width, height, padding, and margin on all sides.",
            traits: [
                "Starts on a new line",
                "Takes full width by default",
                "Width & height work ✅",
                "Vertical margin works ✅",
            ],
        },
        {
            id: "inline",
            label: "Inline",
            emoji: "📝",
            analogy: "A word in a sentence — flows with the text, never breaks the line.",
            description:
                "Only takes as much width as its content. Flows horizontally. Width/height are IGNORED. Vertical margin/padding don't push other elements.",
            traits: [
                "Flows with text, no line break",
                "Width & height IGNORED ❌",
                "Vertical margin IGNORED ❌",
                "Horizontal margin/padding works ✅",
            ],
        },
        {
            id: "inline-block",
            label: "Inline-Block",
            emoji: "🧩",
            analogy: "A LEGO brick in a sentence — flows inline, but you CAN control its size.",
            description:
                "Best of both worlds: flows inline like text, but respects width, height, and all margin/padding. Perfect for buttons in a row.",
            traits: [
                "Flows inline (no line break)",
                "Width & height work ✅",
                "All margin/padding works ✅",
                "Sits next to other elements",
            ],
        },
    ];

// Common HTML tags with their default display behavior
const htmlTags = [
    { tag: "<div>", display: "block", desc: "Generic container", icon: "📦" },
    { tag: "<p>", display: "block", desc: "Paragraph", icon: "📄" },
    { tag: "<h1>-<h6>", display: "block", desc: "Headings", icon: "🔤" },
    { tag: "<section>", display: "block", desc: "Section container", icon: "📁" },
    { tag: "<header>", display: "block", desc: "Page header", icon: "🏷️" },
    { tag: "<footer>", display: "block", desc: "Page footer", icon: "👟" },
    { tag: "<ul> / <ol>", display: "block", desc: "Lists", icon: "📋" },
    { tag: "<form>", display: "block", desc: "Form container", icon: "📝" },
    { tag: "<span>", display: "inline", desc: "Inline wrapper", icon: "✨" },
    { tag: "<a>", display: "inline", desc: "Links", icon: "🔗" },
    { tag: "<strong>", display: "inline", desc: "Bold text", icon: "💪" },
    { tag: "<em>", display: "inline", desc: "Italic text", icon: "📐" },
    { tag: "<img>", display: "inline", desc: "Images (special!)", icon: "🖼️" },
    { tag: "<button>", display: "inline-block", desc: "Buttons", icon: "🔘" },
    { tag: "<input>", display: "inline-block", desc: "Form inputs", icon: "⌨️" },
    { tag: "<select>", display: "inline-block", desc: "Dropdowns", icon: "📋" },
];

export default function DisplayTypes() {
    const [activeMode, setActiveMode] = useState<DisplayMode>("block");
    const [showWidthHeight, setShowWidthHeight] = useState(false);
    const [highlightFilter, setHighlightFilter] = useState<DisplayMode | "all">("all");

    const active = displayModes.find((m) => m.id === activeMode)!;

    return (
        <SectionWrapper
            id="display-types"
            title="Inline vs Block vs Inline-Block"
            subtitle={`"Every HTML element is either a bully (block), a team player (inline), or a flexible hybrid (inline-block)."`}
        >
            {/* Mode selector */}
            <div className="flex flex-wrap gap-2 mb-8">
                {displayModes.map((m) => (
                    <motion.button
                        key={m.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                            setActiveMode(m.id);
                            setShowWidthHeight(false);
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${activeMode === m.id
                                ? "bg-dark text-card shadow-md"
                                : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                            }`}
                    >
                        {m.emoji} {m.label}
                    </motion.button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                {/* Left — Explanation + traits */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeMode}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="bg-card rounded-2xl border border-border p-6 mb-4">
                            <div className="flex items-start gap-3 mb-4">
                                <span className="text-3xl">{active.emoji}</span>
                                <div>
                                    <h4 className="text-base font-semibold text-text-primary">
                                        display: {active.id}
                                    </h4>
                                    <p className="text-sm text-text-secondary italic mt-1">
                                        {active.analogy}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-text-secondary leading-relaxed mb-4">
                                {active.description}
                            </p>

                            {/* Traits */}
                            <div className="space-y-2">
                                {active.traits.map((trait) => (
                                    <div
                                        key={trait}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${trait.includes("❌") ? "bg-red-400" : "bg-green-400"
                                                }`}
                                        />
                                        <span
                                            className={`${trait.includes("❌")
                                                    ? "text-red-600/80"
                                                    : "text-text-secondary"
                                                }`}
                                        >
                                            {trait}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CSS code */}
                        <div className="bg-[#1a1a2e] rounded-xl p-4 font-mono text-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                                <span className="text-white/30 text-xs ml-2">style.css</span>
                            </div>
                            <pre className="text-green-400 whitespace-pre-wrap leading-relaxed text-xs">
                                {`.element {\n  display: ${active.id};${showWidthHeight
                                        ? `\n  width: 150px;    /* ${active.id === "inline" ? "⚠️ IGNORED!" : "✅ Works!"} */\n  height: 60px;    /* ${active.id === "inline" ? "⚠️ IGNORED!" : "✅ Works!"} */`
                                        : ""
                                    }\n}`}
                            </pre>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Right — Live visual demo */}
                <div className="bg-card rounded-2xl border border-border overflow-hidden">
                    <div className="px-4 py-2 border-b border-border bg-background/50 flex items-center justify-between">
                        <span className="text-xs font-medium text-text-secondary/60">
                            Live Preview
                        </span>
                        <button
                            onClick={() => setShowWidthHeight((v) => !v)}
                            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${showWidthHeight
                                    ? "bg-dark text-card"
                                    : "bg-background text-text-secondary border border-border hover:border-accent-dark"
                                }`}
                        >
                            {showWidthHeight ? "Width/Height: ON" : "Try adding width/height"}
                        </button>
                    </div>

                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeMode}-${showWidthHeight}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                {/* Block demo */}
                                {activeMode === "block" && (
                                    <div className="space-y-3">
                                        <motion.div
                                            layout
                                            className="rounded-lg px-4 py-3 text-sm font-medium text-white"
                                            style={{
                                                background: "#E8652E",
                                                width: showWidthHeight ? "150px" : "100%",
                                                height: showWidthHeight ? "60px" : "auto",
                                            }}
                                        >
                                            Block A
                                        </motion.div>
                                        <motion.div
                                            layout
                                            className="rounded-lg px-4 py-3 text-sm font-medium text-white"
                                            style={{
                                                background: "#6366f1",
                                                width: showWidthHeight ? "150px" : "100%",
                                                height: showWidthHeight ? "60px" : "auto",
                                            }}
                                        >
                                            Block B
                                        </motion.div>
                                        <motion.div
                                            layout
                                            className="rounded-lg px-4 py-3 text-sm font-medium text-white"
                                            style={{
                                                background: "#10b981",
                                                width: showWidthHeight ? "150px" : "100%",
                                                height: showWidthHeight ? "60px" : "auto",
                                            }}
                                        >
                                            Block C
                                        </motion.div>
                                        <p className="text-xs text-text-secondary/50 italic mt-2">
                                            ↑ Each block starts on a new line{showWidthHeight ? " — width/height respected ✅" : " — takes full width"}
                                        </p>
                                    </div>
                                )}

                                {/* Inline demo */}
                                {activeMode === "inline" && (
                                    <div>
                                        <p className="text-sm text-text-primary leading-loose">
                                            Here is some text with{" "}
                                            <span
                                                className="rounded px-2 py-1 text-white font-medium"
                                                style={{
                                                    background: "#E8652E",
                                                    width: showWidthHeight ? "150px" : undefined,
                                                    height: showWidthHeight ? "60px" : undefined,
                                                    display: "inline",
                                                }}
                                            >
                                                Inline A
                                            </span>{" "}
                                            and{" "}
                                            <span
                                                className="rounded px-2 py-1 text-white font-medium"
                                                style={{
                                                    background: "#6366f1",
                                                    width: showWidthHeight ? "150px" : undefined,
                                                    height: showWidthHeight ? "60px" : undefined,
                                                    display: "inline",
                                                }}
                                            >
                                                Inline B
                                            </span>{" "}
                                            flowing in the same line like words in a sentence, and{" "}
                                            <span
                                                className="rounded px-2 py-1 text-white font-medium"
                                                style={{
                                                    background: "#10b981",
                                                    width: showWidthHeight ? "150px" : undefined,
                                                    height: showWidthHeight ? "60px" : undefined,
                                                    display: "inline",
                                                }}
                                            >
                                                Inline C
                                            </span>{" "}
                                            just keeps going.
                                        </p>
                                        <p className="text-xs text-text-secondary/50 italic mt-4">
                                            ↑ Elements flow with text{showWidthHeight ? " — width/height IGNORED ❌ (nothing changed!)" : " — no line breaks"}
                                        </p>
                                        {showWidthHeight && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600"
                                            >
                                                ⚠️ Notice nothing changed! Inline elements completely ignore width and height. That&apos;s their limitation.
                                            </motion.div>
                                        )}
                                    </div>
                                )}

                                {/* Inline-block demo */}
                                {activeMode === "inline-block" && (
                                    <div>
                                        <div className="flex flex-wrap gap-3">
                                            <motion.div
                                                layout
                                                className="rounded-lg px-4 py-3 text-sm font-medium text-white text-center"
                                                style={{
                                                    background: "#E8652E",
                                                    display: "inline-block",
                                                    width: showWidthHeight ? "150px" : "auto",
                                                    height: showWidthHeight ? "60px" : "auto",
                                                }}
                                            >
                                                IB-A
                                            </motion.div>
                                            <motion.div
                                                layout
                                                className="rounded-lg px-4 py-3 text-sm font-medium text-white text-center"
                                                style={{
                                                    background: "#6366f1",
                                                    display: "inline-block",
                                                    width: showWidthHeight ? "150px" : "auto",
                                                    height: showWidthHeight ? "60px" : "auto",
                                                }}
                                            >
                                                IB-B
                                            </motion.div>
                                            <motion.div
                                                layout
                                                className="rounded-lg px-4 py-3 text-sm font-medium text-white text-center"
                                                style={{
                                                    background: "#10b981",
                                                    display: "inline-block",
                                                    width: showWidthHeight ? "150px" : "auto",
                                                    height: showWidthHeight ? "60px" : "auto",
                                                }}
                                            >
                                                IB-C
                                            </motion.div>
                                        </div>
                                        <p className="text-xs text-text-secondary/50 italic mt-4">
                                            ↑ Side by side like inline{showWidthHeight ? " — but width/height WORKS ✅ (best of both!)" : " — but can control size"}
                                        </p>
                                        {showWidthHeight && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-3 px-3 py-2 rounded-lg bg-green-50 border border-green-200 text-xs text-green-700"
                                            >
                                                ✅ Width/height applied! Inline-block = inline flow + block sizing. This is what buttons use.
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Default HTML Tags — interactive reference */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="px-5 py-3 border-b border-border bg-background/50 flex items-center justify-between">
                    <div>
                        <span className="text-sm font-semibold text-text-primary">
                            Default Display of Common HTML Tags
                        </span>
                        <span className="text-xs text-text-secondary/50 ml-2">
                            (yes, browsers have opinions!)
                        </span>
                    </div>
                    <div className="flex gap-1">
                        {(["all", "block", "inline", "inline-block"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setHighlightFilter(f)}
                                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${highlightFilter === f
                                        ? "bg-dark text-card"
                                        : "text-text-secondary/60 hover:text-text-primary"
                                    }`}
                            >
                                {f === "all" ? "All" : f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
                    {htmlTags
                        .filter(
                            (t) => highlightFilter === "all" || t.display === highlightFilter
                        )
                        .map((t) => (
                            <motion.div
                                key={t.tag}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`p-3 border-b border-r border-border text-center transition-colors cursor-default hover:bg-background/50 ${highlightFilter !== "all" && t.display === highlightFilter
                                        ? "bg-background/60"
                                        : ""
                                    }`}
                            >
                                <span className="text-lg block mb-1">{t.icon}</span>
                                <code className="text-xs font-mono font-semibold text-text-primary block mb-0.5">
                                    {t.tag}
                                </code>
                                <span
                                    className={`text-[10px] font-semibold uppercase tracking-wider block mb-0.5 ${t.display === "block"
                                            ? "text-orange-500"
                                            : t.display === "inline"
                                                ? "text-indigo-500"
                                                : "text-emerald-500"
                                        }`}
                                >
                                    {t.display}
                                </span>
                                <span className="text-[10px] text-text-secondary/50 block leading-tight">
                                    {t.desc}
                                </span>
                            </motion.div>
                        ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
