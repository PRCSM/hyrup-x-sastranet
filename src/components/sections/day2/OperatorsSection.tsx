"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const arithmeticOps = [
    { symbol: "+", name: "Add", example: "5 + 3", result: "8" },
    { symbol: "-", name: "Subtract", example: "10 - 4", result: "6" },
    { symbol: "*", name: "Multiply", example: "3 * 7", result: "21" },
    { symbol: "/", name: "Divide", example: "20 / 4", result: "5" },
    { symbol: "%", name: "Modulus", example: "10 % 3", result: "1" },
];

const comparisonTests = [
    { left: '5', right: '"5"', looseResult: "true", strictResult: "false" },
    { left: '0', right: '""', looseResult: "true", strictResult: "false" },
    { left: 'null', right: 'undefined', looseResult: "true", strictResult: "false" },
    { left: '1', right: 'true', looseResult: "true", strictResult: "false" },
    { left: '5', right: '5', looseResult: "true", strictResult: "true" },
    { left: '"hello"', right: '"hello"', looseResult: "true", strictResult: "true" },
];

export default function OperatorsSection() {
    const [leftVal, setLeftVal] = useState("5");
    const [rightVal, setRightVal] = useState('"5"');
    const [testIdx, setTestIdx] = useState(0);

    const currentTest = comparisonTests[testIdx];

    const selectTest = (idx: number) => {
        setTestIdx(idx);
        setLeftVal(comparisonTests[idx].left);
        setRightVal(comparisonTests[idx].right);
    };

    return (
        <SectionWrapper
            id="operators"
            title="Operators"
            subtitle="Arithmetic operators do math. Comparison operators check conditions."
        >
            {/* Arithmetic operators */}
            <div className="flex flex-wrap gap-3 mb-12">
                {arithmeticOps.map((op) => (
                    <motion.div
                        key={op.symbol}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="bg-card rounded-xl border border-border p-4 text-center min-w-[100px] hover:shadow-md transition-shadow"
                    >
                        <div className="text-2xl font-bold font-mono text-text-primary mb-1">
                            {op.symbol}
                        </div>
                        <div className="text-xs text-text-secondary mb-2">{op.name}</div>
                        <div className="bg-code-bg rounded-lg px-2 py-1">
                            <code className="text-xs font-mono text-green-400">
                                {op.example} = {op.result}
                            </code>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* == vs === Playground */}
            <div className="max-w-3xl mx-auto">
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                    == vs === Playground
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                    Click a test case or type your own values to see the difference.
                </p>

                {/* Test case buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {comparisonTests.map((t, i) => (
                        <button
                            key={i}
                            onClick={() => selectTest(i)}
                            className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${testIdx === i
                                    ? "bg-dark text-card"
                                    : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                                }`}
                        >
                            {t.left} vs {t.right}
                        </button>
                    ))}
                </div>

                {/* Comparison display */}
                <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
                        {/* Left value */}
                        <div>
                            <label className="text-xs font-medium text-text-secondary/60 block mb-2">Left Value</label>
                            <input
                                type="text"
                                value={leftVal}
                                onChange={(e) => setLeftVal(e.target.value)}
                                className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-base font-mono text-text-primary text-center focus:outline-none focus:border-accent-dark transition-colors"
                            />
                        </div>

                        {/* VS */}
                        <div className="text-center text-text-secondary/40 font-bold text-lg">vs</div>

                        {/* Right value */}
                        <div>
                            <label className="text-xs font-medium text-text-secondary/60 block mb-2">Right Value</label>
                            <input
                                type="text"
                                value={rightVal}
                                onChange={(e) => setRightVal(e.target.value)}
                                className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-base font-mono text-text-primary text-center focus:outline-none focus:border-accent-dark transition-colors"
                            />
                        </div>
                    </div>

                    {/* Results */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background rounded-xl p-5 text-center">
                            <div className="text-xs font-medium text-text-secondary/60 mb-2">== (Loose)</div>
                            <code className="text-sm font-mono text-text-secondary block mb-2">
                                {leftVal} == {rightVal}
                            </code>
                            <motion.div
                                key={`loose-${testIdx}`}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${currentTest.looseResult === "true"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {currentTest.looseResult}
                            </motion.div>
                            <p className="text-xs text-text-secondary/60 mt-2">Converts types first</p>
                        </div>

                        <div className="bg-background rounded-xl p-5 text-center relative">
                            <div className="absolute -top-2 right-3">
                                <span className="bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                                    USE THIS
                                </span>
                            </div>
                            <div className="text-xs font-medium text-text-secondary/60 mb-2">=== (Strict)</div>
                            <code className="text-sm font-mono text-text-secondary block mb-2">
                                {leftVal} === {rightVal}
                            </code>
                            <motion.div
                                key={`strict-${testIdx}`}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${currentTest.strictResult === "true"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {currentTest.strictResult}
                            </motion.div>
                            <p className="text-xs text-text-secondary/60 mt-2">Checks type AND value</p>
                        </div>
                    </div>
                </div>

                {/* Tip */}
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <span className="text-lg shrink-0">💡</span>
                    <p className="text-sm text-amber-900">
                        <strong>Always use ===</strong> — It checks both type and value, preventing sneaky bugs.
                        <code className="mx-1 bg-amber-100 px-1 rounded">==</code> converts types before comparing,
                        which can give unexpected results.
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}
