"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

type Layer = "margin" | "border" | "padding" | "content";

const layers: {
    id: Layer;
    label: string;
    color: string;
    hoverColor: string;
    description: string;
    analogy: string;
    cssProperty: string;
}[] = [
        {
            id: "margin",
            label: "Margin",
            color: "rgba(249, 168, 77, 0.15)",
            hoverColor: "rgba(249, 168, 77, 0.35)",
            description: "Space OUTSIDE the element — pushes other elements away.",
            analogy: "Space between boxes on a shelf",
            cssProperty: "margin: 24px",
        },
        {
            id: "border",
            label: "Border",
            color: "rgba(251, 207, 100, 0.2)",
            hoverColor: "rgba(251, 207, 100, 0.45)",
            description: "The visible edge of the element — the box itself.",
            analogy: "The cardboard box",
            cssProperty: "border: 3px solid",
        },
        {
            id: "padding",
            label: "Padding",
            color: "rgba(140, 198, 101, 0.15)",
            hoverColor: "rgba(140, 198, 101, 0.35)",
            description: "Space INSIDE the element — between content and border.",
            analogy: "Bubble wrap around the item",
            cssProperty: "padding: 20px",
        },
        {
            id: "content",
            label: "Content",
            color: "rgba(100, 160, 230, 0.15)",
            hoverColor: "rgba(100, 160, 230, 0.35)",
            description: "The actual content — text, images, or child elements.",
            analogy: "The item you ordered",
            cssProperty: "width × height",
        },
    ];

export default function BoxModelDemo() {
    const [activeLayer, setActiveLayer] = useState<Layer | null>(null);

    const hoveredInfo = layers.find((l) => l.id === activeLayer);

    return (
        <SectionWrapper
            id="box-model"
            title="The Box Model"
            subtitle="Every HTML element is a box with 4 layers. Hover each to understand."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Interactive box model */}
                <div className="flex justify-center">
                    <div className="relative select-none">
                        {/* Margin */}
                        <motion.div
                            onMouseEnter={() => setActiveLayer("margin")}
                            onMouseLeave={() => setActiveLayer(null)}
                            animate={{
                                backgroundColor: activeLayer === "margin" ? layers[0].hoverColor : layers[0].color,
                            }}
                            className="p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300"
                            style={{
                                borderColor: activeLayer === "margin" ? "rgba(249, 168, 77, 0.7)" : "rgba(249, 168, 77, 0.3)",
                            }}
                        >
                            <span className="absolute top-2 left-3 text-xs font-medium text-orange-500/70">
                                margin
                            </span>

                            {/* Border */}
                            <motion.div
                                onMouseEnter={(e) => {
                                    e.stopPropagation();
                                    setActiveLayer("border");
                                }}
                                onMouseLeave={(e) => {
                                    e.stopPropagation();
                                    setActiveLayer(null);
                                }}
                                animate={{
                                    backgroundColor: activeLayer === "border" ? layers[1].hoverColor : layers[1].color,
                                }}
                                className="p-6 rounded-lg border-2 cursor-pointer relative transition-all duration-300"
                                style={{
                                    borderColor: activeLayer === "border" ? "rgba(251, 207, 100, 0.8)" : "rgba(251, 207, 100, 0.4)",
                                }}
                            >
                                <span className="absolute top-1.5 left-2.5 text-xs font-medium text-yellow-600/70">
                                    border
                                </span>

                                {/* Padding */}
                                <motion.div
                                    onMouseEnter={(e) => {
                                        e.stopPropagation();
                                        setActiveLayer("padding");
                                    }}
                                    onMouseLeave={(e) => {
                                        e.stopPropagation();
                                        setActiveLayer(null);
                                    }}
                                    animate={{
                                        backgroundColor: activeLayer === "padding" ? layers[2].hoverColor : layers[2].color,
                                    }}
                                    className="p-6 rounded-md border-2 border-dashed cursor-pointer relative transition-all duration-300"
                                    style={{
                                        borderColor: activeLayer === "padding" ? "rgba(140, 198, 101, 0.7)" : "rgba(140, 198, 101, 0.3)",
                                    }}
                                >
                                    <span className="absolute top-1 left-2 text-xs font-medium text-green-600/70">
                                        padding
                                    </span>

                                    {/* Content */}
                                    <motion.div
                                        onMouseEnter={(e) => {
                                            e.stopPropagation();
                                            setActiveLayer("content");
                                        }}
                                        onMouseLeave={(e) => {
                                            e.stopPropagation();
                                            setActiveLayer(null);
                                        }}
                                        animate={{
                                            backgroundColor: activeLayer === "content" ? layers[3].hoverColor : layers[3].color,
                                        }}
                                        className="w-40 h-20 rounded flex items-center justify-center cursor-pointer transition-all duration-300 border-2"
                                        style={{
                                            borderColor: activeLayer === "content" ? "rgba(100, 160, 230, 0.6)" : "rgba(100, 160, 230, 0.25)",
                                        }}
                                    >
                                        <span className="text-sm font-medium text-blue-600/80">
                                            Content
                                        </span>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Info panel */}
                <div>
                    <motion.div
                        animate={{ opacity: hoveredInfo ? 1 : 0.4 }}
                        className="bg-card rounded-2xl border border-border p-8 min-h-[220px] flex flex-col justify-center transition-all duration-300"
                    >
                        {hoveredInfo ? (
                            <>
                                <h3 className="text-2xl font-semibold text-text-primary mb-3">
                                    {hoveredInfo.label}
                                </h3>
                                <p className="text-text-secondary leading-relaxed mb-4">
                                    {hoveredInfo.description}
                                </p>
                                <div className="flex items-start gap-2 p-3 bg-background rounded-xl mb-3">
                                    <span className="text-xs font-medium text-text-secondary/50 shrink-0">
                                        Analogy:
                                    </span>
                                    <p className="text-sm text-text-secondary italic">
                                        {hoveredInfo.analogy}
                                    </p>
                                </div>
                                <code className="text-sm font-mono text-accent-dark bg-dark text-card px-3 py-1.5 rounded-lg inline-block self-start">
                                    {hoveredInfo.cssProperty}
                                </code>
                            </>
                        ) : (
                            <p className="text-text-secondary text-center">
                                Hover over a layer in the box model to learn about it.
                            </p>
                        )}
                    </motion.div>

                    {/* Layer legend */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        {layers.map((layer) => (
                            <div
                                key={layer.id}
                                onMouseEnter={() => setActiveLayer(layer.id)}
                                onMouseLeave={() => setActiveLayer(null)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${activeLayer === layer.id ? "bg-card border border-border shadow-sm" : ""
                                    }`}
                            >
                                <div
                                    className="w-3 h-3 rounded-sm"
                                    style={{ backgroundColor: layer.hoverColor }}
                                />
                                <span className="text-sm text-text-secondary font-medium">
                                    {layer.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
