"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const units = [
    {
        name: "px",
        label: "Pixels",
        description: "Fixed size — never changes regardless of context",
        color: "#E8652E",
        example: "16px is always 16px. Period.",
    },
    {
        name: "%",
        label: "Percentage",
        description: "Relative to the parent element's size",
        color: "#3B82F6",
        example: "50% = half the parent. Parent shrinks? So do you.",
    },
    {
        name: "em",
        label: "Em",
        description: "Relative to the parent's font-size — can compound!",
        color: "#8B5CF6",
        example: "2em inside a 16px parent = 32px. But nesting multiplies!",
    },
    {
        name: "rem",
        label: "Root Em",
        description: "Relative to the root (html) font-size — predictable",
        color: "#10B981",
        example: "2rem always = 2× root font-size. No surprises.",
    },
];

export default function CSSUnits() {
    const [rootSize, setRootSize] = useState(16);
    const [parentSize, setParentSize] = useState(16);
    const [activeUnit, setActiveUnit] = useState(0);

    // Calculate sizes for the live comparison
    const getSizeForUnit = (value: number, unit: string): number => {
        switch (unit) {
            case "px": return value;
            case "%": return (value / 100) * 300; // 300px container
            case "em": return value * parentSize;
            case "rem": return value * rootSize;
            default: return value;
        }
    };

    const comparisonValue = 2; // 2 of each unit

    return (
        <SectionWrapper
            id="css-units"
            title="CSS Units"
            subtitle="Not all sizes are created equal. Understanding when to use which is a superpower."
        >
            {/* Unit selector tabs */}
            <div className="flex flex-wrap gap-3 mb-10">
                {units.map((u, i) => (
                    <button
                        key={u.name}
                        onClick={() => setActiveUnit(i)}
                        className={`
                            px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer border
                            ${activeUnit === i
                                ? "text-white border-transparent shadow-lg"
                                : "bg-card text-text-secondary border-border hover:border-dark/20"
                            }
                        `}
                        style={activeUnit === i ? { background: u.color } : {}}
                    >
                        {u.name}
                        <span className="ml-2 opacity-60">{u.label}</span>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left — Info + Controls */}
                <div className="space-y-6">
                    {/* Active unit card */}
                    <motion.div
                        key={activeUnit}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card rounded-2xl border border-border p-6"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <span
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                                style={{ background: units[activeUnit].color }}
                            >
                                {units[activeUnit].name}
                            </span>
                            <div>
                                <h3 className="text-lg font-semibold text-text-primary">
                                    {units[activeUnit].label}
                                </h3>
                                <p className="text-sm text-text-secondary">
                                    {units[activeUnit].description}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-text-secondary/70 bg-background rounded-lg px-4 py-3 mt-4 border border-border">
                            {units[activeUnit].example}
                        </p>
                    </motion.div>

                    {/* Sliders */}
                    <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
                        <h4 className="text-sm font-semibold text-text-primary">
                            Adjust sizes — watch what happens
                        </h4>

                        {/* Root font-size */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs text-text-secondary font-medium">
                                    Root font-size (html)
                                </label>
                                <span className="text-xs font-mono px-2 py-0.5 bg-background rounded border border-border text-text-primary">
                                    {rootSize}px
                                </span>
                            </div>
                            <input
                                type="range"
                                min={8}
                                max={32}
                                value={rootSize}
                                onChange={(e) => setRootSize(Number(e.target.value))}
                                className="w-full accent-emerald-500"
                            />
                        </div>

                        {/* Parent font-size */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs text-text-secondary font-medium">
                                    Parent font-size
                                </label>
                                <span className="text-xs font-mono px-2 py-0.5 bg-background rounded border border-border text-text-primary">
                                    {parentSize}px
                                </span>
                            </div>
                            <input
                                type="range"
                                min={8}
                                max={32}
                                value={parentSize}
                                onChange={(e) => setParentSize(Number(e.target.value))}
                                className="w-full accent-violet-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Right — Live Comparison */}
                <div className="bg-card rounded-2xl border border-border p-6">
                    <h4 className="text-sm font-semibold text-text-primary mb-6">
                        Live comparison — all set to <span className="font-mono">2</span>
                    </h4>

                    <div className="space-y-5">
                        {units.map((u, i) => {
                            const computedPx = getSizeForUnit(comparisonValue, u.name);
                            const barWidth = Math.min(computedPx, 300);

                            return (
                                <motion.div
                                    key={u.name}
                                    className={`transition-opacity duration-300 ${activeUnit === i ? "opacity-100" : "opacity-50"}`}
                                >
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-xs font-semibold text-text-primary">
                                            {comparisonValue}{u.name}
                                        </span>
                                        <span className="text-xs font-mono text-text-secondary">
                                            = {Math.round(computedPx)}px
                                        </span>
                                    </div>
                                    <div className="h-8 bg-background rounded-lg border border-border overflow-hidden relative">
                                        <motion.div
                                            className="h-full rounded-lg flex items-center justify-end pr-2"
                                            style={{ background: u.color }}
                                            animate={{ width: barWidth }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        >
                                            {barWidth > 40 && (
                                                <span className="text-[10px] font-bold text-white/80">
                                                    {Math.round(computedPx)}px
                                                </span>
                                            )}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Key insight */}
                    <div className="mt-6 text-xs text-text-secondary/60 bg-background rounded-lg px-4 py-3 border border-border">
                        <span className="font-semibold text-text-secondary">The takeaway:</span>{" "}
                        Use <span className="font-mono" style={{ color: "#10B981" }}>rem</span> for font sizes,{" "}
                        <span className="font-mono" style={{ color: "#E8652E" }}>px</span> for borders/shadows,{" "}
                        <span className="font-mono" style={{ color: "#3B82F6" }}>%</span> for widths. Avoid{" "}
                        <span className="font-mono" style={{ color: "#8B5CF6" }}>em</span> unless you explicitly want compounding.
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
