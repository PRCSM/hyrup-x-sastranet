"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

type PositionType = "static" | "relative" | "absolute" | "fixed" | "sticky";

const positions: {
    id: PositionType;
    label: string;
    emoji: string;
    analogy: string;
    description: string;
    css: string;
}[] = [
        {
            id: "static",
            label: "Static",
            emoji: "🧍",
            analogy: "Standing in a queue — you go where the line puts you.",
            description: "Default position. Element flows normally in the document. top/left/right/bottom have NO effect.",
            css: `position: static;\n/* top, left, etc. do NOTHING */`,
        },
        {
            id: "relative",
            label: "Relative",
            emoji: "🏃",
            analogy: "Leaning out of your spot in the queue — you move, but your space is still reserved.",
            description: "Moves FROM its normal position. The original space is preserved — other elements don't fill the gap.",
            css: `position: relative;\ntop: 20px;\nleft: 30px;\n/* Moves 20px down, 30px right from where it WOULD have been */`,
        },
        {
            id: "absolute",
            label: "Absolute",
            emoji: "🚀",
            analogy: "Leaving the queue entirely — you float to wherever you want, and the queue closes your gap.",
            description: "Removed from normal flow. Positions relative to the nearest positioned ancestor (or the page).",
            css: `position: absolute;\ntop: 10px;\nright: 10px;\n/* Flies to top-right of nearest positioned parent */`,
        },
        {
            id: "fixed",
            label: "Fixed",
            emoji: "📌",
            analogy: "A sticky note pinned to your monitor — scroll all you want, it's not moving.",
            description: "Stays in the same spot on screen even when you scroll. Removed from document flow. Think: navbars, cookie banners.",
            css: `position: fixed;\ntop: 0;\nleft: 0;\nwidth: 100%;\n/* Stays glued to the viewport */`,
        },
        {
            id: "sticky",
            label: "Sticky",
            emoji: "🍯",
            analogy: "A person in the queue who sticks to the ceiling when they reach it — normal until they hit a threshold.",
            description: "Behaves like relative UNTIL it reaches a scroll offset, then acts like fixed. The best of both worlds.",
            css: `position: sticky;\ntop: 0;\n/* Flows normally, then sticks when it hits the top */`,
        },
    ];

export default function PositionPlayground() {
    const [activePos, setActivePos] = useState<PositionType>("static");
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const active = positions.find((p) => p.id === activePos)!;

    // Compute the demo box styles based on position type
    const getBoxStyle = (): React.CSSProperties => {
        switch (activePos) {
            case "static":
                return {};
            case "relative":
                return { position: "relative", top: "20px", left: "30px" };
            case "absolute":
                return { position: "absolute", top: "12px", right: "12px" };
            case "fixed":
                return {}; // We simulate fixed with a special element
            case "sticky":
                return { position: "sticky", top: "0px" };
            default:
                return {};
        }
    };

    return (
        <SectionWrapper
            id="position-property"
            title="CSS Position — Where Things Live"
            subtitle={`"Position is like assigning seats — static is the default, but the others give you superpowers."`}
        >
            {/* Position type selector */}
            <div className="flex flex-wrap gap-2 mb-8">
                {positions.map((p) => (
                    <motion.button
                        key={p.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                            setActivePos(p.id);
                            setDragOffset({ x: 0, y: 0 });
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${activePos === p.id
                            ? "bg-dark text-card shadow-md"
                            : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                            }`}
                    >
                        {p.emoji} {p.label}
                    </motion.button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left — Interactive demo */}
                <div>
                    {/* Explanation card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePos}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="bg-card rounded-2xl border border-border p-5 mb-4"
                        >
                            <div className="flex items-start gap-3 mb-3">
                                <span className="text-3xl">{active.emoji}</span>
                                <div>
                                    <h4 className="text-base font-semibold text-text-primary">
                                        position: {active.label.toLowerCase()}
                                    </h4>
                                    <p className="text-sm text-text-secondary italic mt-1">
                                        {active.analogy}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {active.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* CSS code */}
                    <div className="bg-code-bg rounded-xl p-4 font-mono text-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                            <span className="text-white/30 text-xs ml-2">style.css</span>
                        </div>
                        <pre className="text-green-400 whitespace-pre-wrap leading-relaxed text-xs">
                            {active.css}
                        </pre>
                    </div>
                </div>

                {/* Right — Visual playground */}
                <div className="bg-card rounded-2xl border border-border overflow-hidden">
                    {/* Playground label */}
                    <div className="px-4 py-2 border-b border-border bg-background/50 flex items-center justify-between">
                        <span className="text-xs font-medium text-text-secondary/60">
                            Live Preview
                        </span>
                        <span className="text-xs text-text-secondary/40">
                            {activePos === "static" && "Element flows normally"}
                            {activePos === "relative" && "Shifted from original spot (drag it!)"}
                            {activePos === "absolute" && "Flies to top-right of parent"}
                            {activePos === "fixed" && "Pinned to viewport (see mini demo)"}
                            {activePos === "sticky" && "Scroll the box to see it stick"}
                        </span>
                    </div>

                    {/* Playground area */}
                    <div
                        className="relative p-6"
                        style={{ minHeight: activePos === "sticky" ? "auto" : "280px" }}
                    >
                        {/* Queue visualization for static / relative / absolute */}
                        {(activePos === "static" || activePos === "relative" || activePos === "absolute") && (
                            <div className="space-y-3">
                                {/* Box 1 */}
                                <div className="h-12 rounded-xl bg-background border border-border flex items-center px-4">
                                    <span className="text-xs text-text-secondary font-medium">Box 1 — Normal flow</span>
                                </div>

                                {/* THE box — the one that moves */}
                                <motion.div
                                    drag={activePos === "relative"}
                                    dragConstraints={{ left: -50, right: 100, top: -30, bottom: 60 }}
                                    onDrag={(_, info) => setDragOffset({ x: info.offset.x, y: info.offset.y })}
                                    animate={
                                        activePos === "absolute"
                                            ? { x: 0, y: 0 }
                                            : activePos === "static"
                                                ? { x: 0, y: 0 }
                                                : {}
                                    }
                                    className={`h-12 rounded-xl flex items-center px-4 font-semibold text-sm z-10
                    ${activePos === "relative" ? "cursor-grab active:cursor-grabbing" : ""}
                  `}
                                    style={{
                                        background: "#E8652E",
                                        color: "#fff",
                                        ...getBoxStyle(),
                                    }}
                                >
                                    <span>
                                        {activePos === "static" && "📦 I'm static — just in line"}
                                        {activePos === "relative" && `📦 Drag me! I'm relative (${Math.round(dragOffset.x)}px, ${Math.round(dragOffset.y)}px)`}
                                        {activePos === "absolute" && "🚀 I'm absolute — top-right!"}
                                    </span>
                                </motion.div>

                                {/* Ghost box for relative — shows original position */}
                                {activePos === "relative" && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="h-12 rounded-xl border-2 border-dashed border-orange-300/40 flex items-center px-4 -mt-[60px]"
                                    >
                                        <span className="text-xs text-text-secondary/40 italic">
                                            ↑ My original spot (still reserved)
                                        </span>
                                    </motion.div>
                                )}

                                {/* Box 3 */}
                                <div className={`h-12 rounded-xl bg-background border border-border flex items-center px-4 ${activePos === "absolute" ? "mt-0" : ""}`}>
                                    <span className="text-xs text-text-secondary font-medium">
                                        Box 3 — {activePos === "absolute" ? "Moved up! Gap closed." : "Normal flow"}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Fixed demo — mini scrollable viewport */}
                        {activePos === "fixed" && (
                            <div>
                                <p className="text-xs text-text-secondary mb-3">
                                    The orange bar is &quot;fixed&quot; — it stays pinned while you scroll:
                                </p>
                                <div
                                    className="relative rounded-xl border border-border overflow-hidden bg-background"
                                    style={{ height: "220px" }}
                                >
                                    {/* Fixed bar */}
                                    <div
                                        className="sticky top-0 left-0 right-0 z-10 px-4 py-2 text-sm font-semibold text-white flex items-center gap-2"
                                        style={{ background: "#E8652E" }}
                                    >
                                        📌 I&apos;m fixed — scroll down, I stay here
                                    </div>

                                    {/* Scrollable content */}
                                    <div className="overflow-y-auto p-4 space-y-3" style={{ height: "180px" }}>
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-10 rounded-lg bg-card border border-border flex items-center px-3"
                                            >
                                                <span className="text-xs text-text-secondary">
                                                    Content block {i + 1} — keep scrolling ↓
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sticky demo — scrollable with sticky header */}
                        {activePos === "sticky" && (
                            <div>
                                <p className="text-xs text-text-secondary mb-3">
                                    The orange bar flows normally, then &quot;sticks&quot; when it reaches the top:
                                </p>
                                <div
                                    className="rounded-xl border border-border overflow-hidden bg-background overflow-y-auto"
                                    style={{ height: "240px" }}
                                >
                                    {/* Content before sticky */}
                                    <div className="p-4 space-y-3">
                                        <div className="h-10 rounded-lg bg-card border border-border flex items-center px-3">
                                            <span className="text-xs text-text-secondary">Content above — scroll down ↓</span>
                                        </div>
                                        <div className="h-10 rounded-lg bg-card border border-border flex items-center px-3">
                                            <span className="text-xs text-text-secondary">More content above ↓</span>
                                        </div>
                                    </div>

                                    {/* Sticky element */}
                                    <div
                                        className="sticky top-0 z-10 px-4 py-2 text-sm font-semibold text-white flex items-center gap-2"
                                        style={{ background: "#E8652E" }}
                                    >
                                        🍯 I&apos;m sticky — I flow, then stick at the top!
                                    </div>

                                    {/* Content after sticky */}
                                    <div className="p-4 space-y-3">
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-10 rounded-lg bg-card border border-border flex items-center px-3"
                                            >
                                                <span className="text-xs text-text-secondary">
                                                    Content block {i + 1} — keep scrolling ↓
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick cheat sheet */}
            <div className="mt-8 bg-card rounded-2xl border border-border overflow-hidden">
                <div className="px-5 py-3 border-b border-border bg-background/50">
                    <span className="text-xs font-semibold text-text-secondary/70 uppercase tracking-wider">
                        Cheat Sheet
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-border">
                    {positions.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => {
                                setActivePos(p.id);
                                setDragOffset({ x: 0, y: 0 });
                            }}
                            className={`p-4 text-center transition-all duration-200 cursor-pointer hover:bg-background/50 ${activePos === p.id ? "bg-background/80" : ""
                                }`}
                        >
                            <span className="text-lg block mb-1">{p.emoji}</span>
                            <span className="text-xs font-semibold text-text-primary block">{p.label}</span>
                            <span className="text-[10px] text-text-secondary/60 block mt-0.5 leading-tight">
                                {p.id === "static" && "Default flow"}
                                {p.id === "relative" && "Shift from self"}
                                {p.id === "absolute" && "Fly to parent"}
                                {p.id === "fixed" && "Glued to screen"}
                                {p.id === "sticky" && "Flow then stick"}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
