"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

type Layer = "margin" | "border" | "padding" | "content";

const layers: {
    id: Layer;
    label: string;
    color: string;
    hoverColor: string;
    borderDefault: string;
    borderActive: string;
    labelColor: string;
    description: string;
    analogy: string;
    cssProperty: string;
}[] = [
        {
            id: "margin",
            label: "Margin",
            color: "rgba(249, 168, 77, 0.12)",
            hoverColor: "rgba(249, 168, 77, 0.32)",
            borderDefault: "rgba(249, 168, 77, 0.25)",
            borderActive: "rgba(249, 168, 77, 0.7)",
            labelColor: "text-orange-500/70",
            description: "Space OUTSIDE the element — pushes other elements away.",
            analogy: "Space between boxes on a shelf",
            cssProperty: "margin: 24px",
        },
        {
            id: "border",
            label: "Border",
            color: "rgba(251, 207, 100, 0.15)",
            hoverColor: "rgba(251, 207, 100, 0.4)",
            borderDefault: "rgba(251, 207, 100, 0.35)",
            borderActive: "rgba(251, 207, 100, 0.8)",
            labelColor: "text-yellow-600/70",
            description: "The visible edge of the element — the box itself.",
            analogy: "The cardboard box",
            cssProperty: "border: 3px solid",
        },
        {
            id: "padding",
            label: "Padding",
            color: "rgba(140, 198, 101, 0.12)",
            hoverColor: "rgba(140, 198, 101, 0.32)",
            borderDefault: "rgba(140, 198, 101, 0.25)",
            borderActive: "rgba(140, 198, 101, 0.7)",
            labelColor: "text-green-600/70",
            description: "Space INSIDE the element — between content and border.",
            analogy: "Bubble wrap around the item",
            cssProperty: "padding: 20px",
        },
        {
            id: "content",
            label: "Content",
            color: "rgba(100, 160, 230, 0.12)",
            hoverColor: "rgba(100, 160, 230, 0.32)",
            borderDefault: "rgba(100, 160, 230, 0.2)",
            borderActive: "rgba(100, 160, 230, 0.6)",
            labelColor: "text-blue-600/80",
            description: "The actual content — text, images, or child elements.",
            analogy: "The item you ordered",
            cssProperty: "width × height",
        },
    ];

export default function BoxModelDemo() {
    const [activeLayer, setActiveLayer] = useState<Layer | null>(null);

    const hoveredInfo = layers.find((l) => l.id === activeLayer);
    const margin = layers[0];
    const border = layers[1];
    const padding = layers[2];
    const content = layers[3];

    const isActive = (layer: Layer) => activeLayer === layer;

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
                        <div
                            onMouseEnter={() => setActiveLayer("margin")}
                            onMouseLeave={() => setActiveLayer(null)}
                            className="p-8 rounded-xl border-2 border-dashed cursor-pointer relative"
                            style={{
                                backgroundColor: isActive("margin") ? margin.hoverColor : margin.color,
                                borderColor: isActive("margin") ? margin.borderActive : margin.borderDefault,
                                transition: "background-color 0.3s ease, border-color 0.3s ease",
                            }}
                        >
                            <span className={`absolute top-2 left-3 text-xs font-medium ${margin.labelColor}`}>
                                margin
                            </span>

                            {/* Border */}
                            <div
                                onMouseEnter={(e) => {
                                    e.stopPropagation();
                                    setActiveLayer("border");
                                }}
                                onMouseLeave={(e) => {
                                    e.stopPropagation();
                                    setActiveLayer("margin");
                                }}
                                className="p-6 rounded-lg border-2 cursor-pointer relative"
                                style={{
                                    backgroundColor: isActive("border") ? border.hoverColor : border.color,
                                    borderColor: isActive("border") ? border.borderActive : border.borderDefault,
                                    transition: "background-color 0.3s ease, border-color 0.3s ease",
                                }}
                            >
                                <span className={`absolute top-1.5 left-2.5 text-xs font-medium ${border.labelColor}`}>
                                    border
                                </span>

                                {/* Padding */}
                                <div
                                    onMouseEnter={(e) => {
                                        e.stopPropagation();
                                        setActiveLayer("padding");
                                    }}
                                    onMouseLeave={(e) => {
                                        e.stopPropagation();
                                        setActiveLayer("border");
                                    }}
                                    className="p-6 rounded-md border-2 border-dashed cursor-pointer relative"
                                    style={{
                                        backgroundColor: isActive("padding") ? padding.hoverColor : padding.color,
                                        borderColor: isActive("padding") ? padding.borderActive : padding.borderDefault,
                                        transition: "background-color 0.3s ease, border-color 0.3s ease",
                                    }}
                                >
                                    <span className={`absolute top-1 left-2 text-xs font-medium ${padding.labelColor}`}>
                                        padding
                                    </span>

                                    {/* Content */}
                                    <div
                                        onMouseEnter={(e) => {
                                            e.stopPropagation();
                                            setActiveLayer("content");
                                        }}
                                        onMouseLeave={(e) => {
                                            e.stopPropagation();
                                            setActiveLayer("padding");
                                        }}
                                        className="w-40 h-20 rounded flex items-center justify-center cursor-pointer border-2"
                                        style={{
                                            backgroundColor: isActive("content") ? content.hoverColor : content.color,
                                            borderColor: isActive("content") ? content.borderActive : content.borderDefault,
                                            transition: "background-color 0.3s ease, border-color 0.3s ease",
                                        }}
                                    >
                                        <span className="text-sm font-medium text-blue-600/80">
                                            Content
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info panel */}
                <div>
                    <div
                        className="bg-card rounded-2xl border border-border p-8 min-h-[220px] flex flex-col justify-center"
                        style={{
                            opacity: hoveredInfo ? 1 : 0.4,
                            transition: "opacity 0.3s ease",
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {hoveredInfo ? (
                                <motion.div
                                    key={hoveredInfo.id}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.2 }}
                                >
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
                                    <code className="text-sm font-mono bg-dark text-card px-3 py-1.5 rounded-lg inline-block self-start">
                                        {hoveredInfo.cssProperty}
                                    </code>
                                </motion.div>
                            ) : (
                                <motion.p
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-text-secondary text-center"
                                >
                                    Hover over a layer in the box model to learn about it.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Layer legend */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        {layers.map((layer) => (
                            <div
                                key={layer.id}
                                onMouseEnter={() => setActiveLayer(layer.id)}
                                onMouseLeave={() => setActiveLayer(null)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer"
                                style={{
                                    backgroundColor: activeLayer === layer.id ? "var(--color-card)" : "transparent",
                                    border: activeLayer === layer.id ? "1px solid var(--color-border)" : "1px solid transparent",
                                    boxShadow: activeLayer === layer.id ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                                    transition: "all 0.2s ease",
                                }}
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
