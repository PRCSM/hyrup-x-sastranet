"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

const variables = [
    {
        keyword: "var",
        color: "#ef4444",
        properties: ["Old way (before ES6)", "Function scoped", "Avoid using now"],
        badge: "Avoid",
        badgeColor: "bg-red-100 text-red-700",
    },
    {
        keyword: "let",
        color: "#22c55e",
        properties: ["Block scoped", "Can be reassigned", "Use for changing values"],
        badge: "Recommended",
        badgeColor: "bg-green-100 text-green-700",
    },
    {
        keyword: "const",
        color: "#3b82f6",
        properties: ["Block scoped", "Cannot be reassigned", "Use by default"],
        badge: "Default Choice",
        badgeColor: "bg-blue-100 text-blue-700",
    },
];

export default function VariablesSection() {
    const [active, setActive] = useState<number>(1);
    const [varName, setVarName] = useState("name");
    const [varValue, setVarValue] = useState('"Anagha"');
    const [selectedKeyword, setSelectedKeyword] = useState<"let" | "const">("let");

    const generatedCode = `${selectedKeyword} ${varName} = ${varValue};
console.log(${varName});
// → ${varValue.replace(/"/g, '')}`;

    return (
        <SectionWrapper
            id="variables"
            title="Variables"
            subtitle="Variables store data. Think of them as labeled boxes that hold values."
        >
            {/* Three column comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {variables.map((v, i) => (
                    <motion.button
                        key={v.keyword}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActive(i)}
                        className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${active === i
                                ? "bg-dark text-card border-dark shadow-lg"
                                : "bg-card text-text-primary border-border hover:border-accent-dark"
                            }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <code
                                className="text-xl font-bold font-mono"
                                style={{ color: active === i ? "#fff" : v.color }}
                            >
                                {v.keyword}
                            </code>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${active === i ? "bg-white/20 text-white" : v.badgeColor
                                }`}>
                                {v.badge}
                            </span>
                        </div>
                        <ul className="space-y-2">
                            {v.properties.map((prop) => (
                                <li key={prop} className={`text-sm flex items-start gap-2 ${active === i ? "text-white/80" : "text-text-secondary"
                                    }`}>
                                    <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{
                                        background: active === i ? "#fff" : v.color,
                                    }} />
                                    {prop}
                                </li>
                            ))}
                        </ul>
                    </motion.button>
                ))}
            </div>

            {/* Live playground */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="text-base font-semibold text-text-primary mb-4">
                        Try It — Create a Variable
                    </h3>

                    <div className="space-y-4">
                        {/* Keyword toggle */}
                        <div>
                            <label className="text-xs font-medium text-text-secondary/60 block mb-2">Keyword</label>
                            <div className="flex gap-2">
                                {(["let", "const"] as const).map((kw) => (
                                    <button
                                        key={kw}
                                        onClick={() => setSelectedKeyword(kw)}
                                        className={`px-4 py-2 text-sm font-mono font-medium rounded-lg transition-all cursor-pointer ${selectedKeyword === kw
                                                ? "bg-dark text-card"
                                                : "bg-background text-text-secondary border border-border"
                                            }`}
                                    >
                                        {kw}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Name input */}
                        <div>
                            <label className="text-xs font-medium text-text-secondary/60 block mb-2">Variable Name</label>
                            <input
                                type="text"
                                value={varName}
                                onChange={(e) => setVarName(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono text-text-primary focus:outline-none focus:border-accent-dark transition-colors"
                                placeholder="myVariable"
                            />
                        </div>

                        {/* Value input */}
                        <div>
                            <label className="text-xs font-medium text-text-secondary/60 block mb-2">Value</label>
                            <input
                                type="text"
                                value={varValue}
                                onChange={(e) => setVarValue(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono text-text-primary focus:outline-none focus:border-accent-dark transition-colors"
                                placeholder='"Hello"'
                            />
                        </div>
                    </div>
                </div>

                {/* Generated code */}
                <div>
                    <div className="text-xs font-medium text-text-secondary/60 mb-2">Generated Code</div>
                    <CodeBlock code={generatedCode} language="javascript" />
                </div>
            </div>
        </SectionWrapper>
    );
}
