"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

type JustifyContent = "flex-start" | "center" | "space-between" | "space-around";
type AlignItems = "flex-start" | "center" | "flex-end" | "stretch";
type FlexDirection = "row" | "column";
type FlexWrap = "nowrap" | "wrap";

const boxColors = [
    "bg-blue-400/20 border-blue-400/40 text-blue-700",
    "bg-emerald-400/20 border-emerald-400/40 text-emerald-700",
    "bg-orange-400/20 border-orange-400/40 text-orange-700",
    "bg-purple-400/20 border-purple-400/40 text-purple-700",
    "bg-rose-400/20 border-rose-400/40 text-rose-700",
];

const boxSizes = [
    { w: "w-16", h: "h-16" },
    { w: "w-20", h: "h-12" },
    { w: "w-14", h: "h-20" },
    { w: "w-24", h: "h-14" },
    { w: "w-12", h: "h-16" },
];

export default function FlexboxPlayground() {
    const [direction, setDirection] = useState<FlexDirection>("row");
    const [justify, setJustify] = useState<JustifyContent>("flex-start");
    const [align, setAlign] = useState<AlignItems>("flex-start");
    const [wrap, setWrap] = useState<FlexWrap>("nowrap");
    const [gap, setGap] = useState(8);

    const cssOutput = `display: flex;
flex-direction: ${direction};
justify-content: ${justify};
align-items: ${align};
flex-wrap: ${wrap};
gap: ${gap}px;`;

    return (
        <SectionWrapper
            id="flexbox-playground"
            title="Flexbox Playground"
            subtitle="Experiment with Flexbox properties and watch the layout change live."
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Direction */}
                    <div>
                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                            flex-direction
                        </label>
                        <div className="flex gap-2">
                            {(["row", "column"] as FlexDirection[]).map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDirection(d)}
                                    className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 cursor-pointer ${direction === d
                                            ? "bg-dark text-card"
                                            : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                                        }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Justify */}
                    <div>
                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                            justify-content
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {(["flex-start", "center", "space-between", "space-around"] as JustifyContent[]).map(
                                (j) => (
                                    <button
                                        key={j}
                                        onClick={() => setJustify(j)}
                                        className={`px-3 py-1.5 text-xs rounded-lg transition-all duration-200 cursor-pointer ${justify === j
                                                ? "bg-dark text-card"
                                                : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                                            }`}
                                    >
                                        {j}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    {/* Align */}
                    <div>
                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                            align-items
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {(["flex-start", "center", "flex-end", "stretch"] as AlignItems[]).map(
                                (a) => (
                                    <button
                                        key={a}
                                        onClick={() => setAlign(a)}
                                        className={`px-3 py-1.5 text-xs rounded-lg transition-all duration-200 cursor-pointer ${align === a
                                                ? "bg-dark text-card"
                                                : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                                            }`}
                                    >
                                        {a}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    {/* Wrap */}
                    <div>
                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                            flex-wrap
                        </label>
                        <div className="flex gap-2">
                            {(["nowrap", "wrap"] as FlexWrap[]).map((w) => (
                                <button
                                    key={w}
                                    onClick={() => setWrap(w)}
                                    className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 cursor-pointer ${wrap === w
                                            ? "bg-dark text-card"
                                            : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                                        }`}
                                >
                                    {w}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gap */}
                    <div>
                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                            gap: {gap}px
                        </label>
                        <input
                            type="range"
                            min={0}
                            max={32}
                            value={gap}
                            onChange={(e) => setGap(Number(e.target.value))}
                            className="w-full accent-dark"
                        />
                    </div>

                    {/* CSS output */}
                    <div className="bg-code-bg rounded-xl p-4">
                        <pre className="text-sm font-mono text-code-text leading-relaxed whitespace-pre">
                            {cssOutput}
                        </pre>
                    </div>
                </div>

                {/* Live preview */}
                <div className="lg:col-span-2">
                    <div className="bg-card rounded-2xl border border-border p-4 min-h-[400px]">
                        <p className="text-xs text-text-secondary mb-3 font-medium">.container</p>
                        <motion.div
                            layout
                            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                            className="border-2 border-dashed border-accent rounded-xl p-4 min-h-[340px]"
                            style={{
                                display: "flex",
                                flexDirection: direction,
                                justifyContent: justify,
                                alignItems: align,
                                flexWrap: wrap,
                                gap: `${gap}px`,
                            }}
                        >
                            {boxSizes.map((size, i) => (
                                <motion.div
                                    key={i}
                                    layout
                                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                    className={`
                    ${align === "stretch" ? size.w : `${size.w} ${size.h}`}
                    ${boxColors[i]}
                    border-2 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0
                  `}
                                    style={{
                                        minHeight: align === "stretch" ? undefined : undefined,
                                    }}
                                >
                                    {i + 1}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
