"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const selectorExamples = [
    {
        selector: '"h1"',
        method: "querySelector",
        code: 'document.querySelector("h1")',
        description: "Selects the first <h1> element",
        matches: ["h1"],
    },
    {
        selector: '".card"',
        method: "querySelector",
        code: 'document.querySelector(".card")',
        description: "Selects the first element with class 'card'",
        matches: ["card-1"],
    },
    {
        selector: '"#main-title"',
        method: "querySelector",
        code: 'document.querySelector("#main-title")',
        description: "Selects the element with id 'main-title'",
        matches: ["h1"],
    },
    {
        selector: '"p"',
        method: "querySelectorAll",
        code: 'document.querySelectorAll("p")',
        description: "Selects ALL <p> elements — returns a list",
        matches: ["p-1", "p-2", "p-3"],
    },
    {
        selector: '".card"',
        method: "querySelectorAll",
        code: 'document.querySelectorAll(".card")',
        description: "Selects ALL elements with class 'card'",
        matches: ["card-1", "card-2"],
    },
];

const htmlElements = [
    { id: "h1", tag: "h1", text: "Welcome", className: "", domId: "main-title" },
    { id: "p-1", tag: "p", text: "First paragraph of text here.", className: "", domId: "" },
    { id: "card-1", tag: "div", text: "Card 1 Content", className: "card", domId: "" },
    { id: "p-2", tag: "p", text: "Another paragraph below.", className: "", domId: "" },
    { id: "card-2", tag: "div", text: "Card 2 Content", className: "card", domId: "" },
    { id: "p-3", tag: "p", text: "Final paragraph at the bottom.", className: "", domId: "" },
];

export default function QuerySelectorSection() {
    const [activeSelector, setActiveSelector] = useState(0);
    const current = selectorExamples[activeSelector];

    return (
        <SectionWrapper
            id="selectors"
            title="querySelector"
            subtitle="How JavaScript finds HTML elements on the page."
        >
            {/* Selector notation */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
                {[
                    { prefix: ".", meaning: "class", example: '.className' },
                    { prefix: "#", meaning: "id", example: '#idName' },
                    { prefix: '""', meaning: "tag", example: '"h1"' },
                ].map((item) => (
                    <div key={item.prefix} className="bg-card rounded-xl border border-border px-5 py-3 text-center">
                        <code className="text-xl font-bold font-mono text-text-primary">{item.prefix}</code>
                        <p className="text-xs text-text-secondary mt-1">→ {item.meaning}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Selector buttons + code */}
                <div>
                    <div className="space-y-2 mb-4">
                        {selectorExamples.map((ex, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveSelector(i)}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-mono transition-all cursor-pointer flex items-center justify-between ${activeSelector === i
                                    ? "bg-dark text-card"
                                    : "bg-card text-text-primary border border-border hover:border-accent-dark"
                                    }`}
                            >
                                <span>{ex.code}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans ${activeSelector === i
                                    ? "bg-white/20"
                                    : "bg-background text-text-secondary/60"
                                    }`}>
                                    {ex.method === "querySelectorAll" ? "Multiple" : "Single"}
                                </span>
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSelector}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-background rounded-xl p-4"
                        >
                            <p className="text-sm text-text-secondary">
                                {current.description}
                            </p>
                            <p className="text-xs text-text-secondary/50 mt-2">
                                Matched: <strong className="text-text-primary">{current.matches.length}</strong> element{current.matches.length !== 1 ? "s" : ""}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Mini page preview */}
                <div className="bg-white rounded-2xl border border-border overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                        <span className="text-[10px] text-gray-400 ml-1">Preview — Matched elements glow</span>
                    </div>
                    <div className="p-4 space-y-3">
                        {htmlElements.map((el) => {
                            const isMatched = current.matches.includes(el.id);
                            return (
                                <motion.div
                                    key={el.id}
                                    animate={{
                                        boxShadow: isMatched
                                            ? "0 0 0 2px #3b82f6, 0 0 12px rgba(59,130,246,0.3)"
                                            : "0 0 0 0px transparent",
                                        scale: isMatched ? 1.02 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`rounded-lg p-3 transition-all ${el.className === "card"
                                        ? "bg-gray-50 border border-gray-200"
                                        : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                            &lt;{el.tag}{el.className ? ` class="${el.className}"` : ""}{el.domId ? ` id="${el.domId}"` : ""}&gt;
                                        </span>
                                        {isMatched && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded"
                                            >
                                                MATCHED
                                            </motion.span>
                                        )}
                                    </div>
                                    <p className={`mt-1 ${el.tag === "h1"
                                        ? "font-bold text-lg text-gray-900"
                                        : "text-sm text-gray-700"
                                        }`}>
                                        {el.text}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
