"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";

const nodes = [
    {
        id: "browser",
        label: "Browser",
        icon: "🌐",
        description: "You type a URL — the browser sends a request to find the website.",
        analogy: "You (the customer) looking at the menu and placing an order.",
    },
    {
        id: "dns",
        label: "DNS",
        icon: "📖",
        description: "DNS translates the domain name (google.com) into an IP address the internet understands.",
        analogy: "The phonebook — looks up the restaurant's actual address from its name.",
    },
    {
        id: "server",
        label: "Server",
        icon: "🖥️",
        description: "The server receives your request, processes it, and prepares the response (HTML, CSS, JS files).",
        analogy: "The kitchen — receives your order, cooks the food, and plates it.",
    },
    {
        id: "response",
        label: "Response",
        icon: "📄",
        description: "The server sends back HTML, CSS, and JavaScript. Your browser renders it into the page you see.",
        analogy: "Your food arrives — beautifully plated and ready to eat.",
    },
];

export default function WebFlowDiagram() {
    const [activeNode, setActiveNode] = useState<string | null>(null);

    return (
        <SectionWrapper
            id="how-web-works"
            title="How The Web Works"
            subtitle="Click each step to see what happens when you visit a website."
        >
            {/* Nodes row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">
                {nodes.map((node, i) => (
                    <div key={node.id} className="flex items-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                                setActiveNode(activeNode === node.id ? null : node.id)
                            }
                            className={`
                relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                w-36 min-h-[120px]
                ${activeNode === node.id
                                    ? "bg-dark text-card border-dark shadow-lg"
                                    : "bg-card text-text-primary border-border hover:border-accent-dark hover:shadow-md"
                                }
              `}
                        >
                            <span className="text-3xl">{node.icon}</span>
                            <span className="text-sm font-semibold">{node.label}</span>
                        </motion.button>

                        {/* Arrow */}
                        {i < nodes.length - 1 && (
                            <div className="hidden md:flex items-center mx-2">
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.15 }}
                                    className="w-12 h-[2px] bg-border origin-left"
                                />
                                <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    className="text-border -ml-px"
                                >
                                    <path d="M0 0 L10 5 L0 10 Z" fill="currentColor" />
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Explanation panel */}
            <AnimatePresence>
                {activeNode && (
                    <motion.div
                        key={activeNode}
                        initial={{ opacity: 0, y: 16, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: 8, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="mt-8 overflow-hidden"
                    >
                        {(() => {
                            const node = nodes.find((n) => n.id === activeNode);
                            if (!node) return null;
                            return (
                                <div className="bg-card rounded-2xl border border-border p-8 max-w-2xl mx-auto">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-2xl">{node.icon}</span>
                                        <h3 className="text-xl font-semibold text-text-primary">
                                            {node.label}
                                        </h3>
                                    </div>
                                    <p className="text-text-secondary leading-relaxed mb-4">
                                        {node.description}
                                    </p>
                                    <div className="flex items-start gap-2 p-4 bg-background rounded-xl">
                                        <span className="text-sm font-medium text-text-secondary/60 shrink-0">
                                            Analogy:
                                        </span>
                                        <p className="text-sm text-text-secondary italic">
                                            {node.analogy}
                                        </p>
                                    </div>
                                </div>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
