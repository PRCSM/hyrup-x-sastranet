"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const reassignmentSteps = [
    { code: 'let score = 0;', output: '// score → 0', type: "let", success: true, desc: "Declare with let" },
    { code: 'score = 10;', output: '// score → 10  ✓ Reassigned!', type: "let", success: true, desc: "Reassign let works" },
    { code: 'score = score + 5;', output: '// score → 15  ✓ Updated!', type: "let", success: true, desc: "Update let works" },
    { code: 'const name = "Anagha";', output: '// name → "Anagha"', type: "const", success: true, desc: "Declare with const" },
    { code: 'name = "Khush";', output: '// ❌ TypeError: Assignment to constant variable!', type: "const", success: false, desc: "Reassign const fails!" },
];

export default function VariablesSection() {
    const [active, setActive] = useState<number>(1);
    const [varName, setVarName] = useState("name");
    const [varValue, setVarValue] = useState('"Anagha"');
    const [selectedKeyword, setSelectedKeyword] = useState<"let" | "const">("let");
    const [reassignStep, setReassignStep] = useState(0);

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

            {/* Reassignment Demo */}
            <div className="max-w-3xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                    let vs const — Reassignment
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                    Step through to see why <code className="bg-background px-1.5 py-0.5 rounded font-mono text-xs">let</code> allows reassignment but <code className="bg-background px-1.5 py-0.5 rounded font-mono text-xs">const</code> doesn&apos;t.
                </p>

                <div className="bg-card rounded-2xl border border-border p-6">
                    {/* Code lines */}
                    <div className="bg-code-bg rounded-xl p-4 mb-4 font-mono text-sm space-y-1">
                        {reassignmentSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    opacity: i <= reassignStep ? 1 : 0.2,
                                }}
                                className="flex items-start gap-3"
                            >
                                <span className="text-code-text/30 w-4 text-right shrink-0 text-xs leading-6">
                                    {i + 1}
                                </span>
                                <div className="flex-1">
                                    <span className={i <= reassignStep ? "text-code-text" : "text-code-text/30"}>
                                        {step.code}
                                    </span>
                                    <AnimatePresence>
                                        {i <= reassignStep && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={`ml-3 text-xs ${step.success ? "text-green-400" : "text-red-400"}`}
                                            >
                                                {step.output}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Current step description */}
                    <div className="flex items-center justify-between">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={reassignStep}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-sm font-medium px-3 py-1.5 rounded-lg ${reassignmentSteps[reassignStep].success
                                        ? "bg-green-50 text-green-700"
                                        : "bg-red-50 text-red-700"
                                    }`}
                            >
                                {reassignmentSteps[reassignStep].desc}
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setReassignStep(0)}
                                disabled={reassignStep === 0}
                                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background text-text-secondary border border-border cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:border-accent-dark transition-all"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setReassignStep((p) => Math.min(p + 1, reassignmentSteps.length - 1))}
                                disabled={reassignStep >= reassignmentSteps.length - 1}
                                className="px-4 py-1.5 text-xs font-medium rounded-lg bg-dark text-card cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                            >
                                Next Step →
                            </button>
                        </div>
                    </div>
                </div>
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
