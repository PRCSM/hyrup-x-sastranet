"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

/* ── For Loop: based on count ── */
const forSteps = [
    { i: 1, output: '"Step 1"' },
    { i: 2, output: '"Step 2"' },
    { i: 3, output: '"Step 3"' },
    { i: 4, output: '"Step 4"' },
    { i: 5, output: '"Step 5"' },
];

/* ── While Loop: based on condition ── */
const whileSteps = [
    { battery: 100, output: '"Battery: 100"' },
    { battery: 80, output: '"Battery: 80"' },
    { battery: 60, output: '"Battery: 60"' },
    { battery: 40, output: '"Battery: 40"' },
    { battery: 20, output: '"Battery: 20"' },
];

export default function LoopsSection() {
    const [forStep, setForStep] = useState(-1);
    const [whileStep, setWhileStep] = useState(-1);

    const advanceFor = () => {
        if (forStep < forSteps.length - 1) setForStep((p) => p + 1);
    };
    const advanceWhile = () => {
        if (whileStep < whileSteps.length - 1) setWhileStep((p) => p + 1);
    };
    const resetFor = () => setForStep(-1);
    const resetWhile = () => setWhileStep(-1);

    const forDone = forStep >= forSteps.length - 1;
    const whileDone = whileStep >= whileSteps.length - 1;

    return (
        <SectionWrapper
            id="loops"
            title="Loops"
            subtitle="Repeat actions without writing the same code over and over."
        >
            {/* When to use which */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-3xl mx-auto">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <div className="text-lg font-bold text-green-700 mb-1">for</div>
                    <p className="text-sm text-green-800">Based on <strong>count</strong></p>
                    <p className="text-xs text-green-600 mt-1">When you know exactly how many times</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                    <div className="text-lg font-bold text-blue-700 mb-1">while</div>
                    <p className="text-sm text-blue-800">Based on <strong>condition</strong></p>
                    <p className="text-xs text-blue-600 mt-1">Keep going until something changes</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ── For Loop ── */}
                <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-semibold text-text-primary">For Loop</h3>
                        <button
                            onClick={resetFor}
                            className="text-xs text-text-secondary/50 hover:text-text-secondary cursor-pointer transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                    <p className="text-xs text-text-secondary/60 mb-4">
                        Count from 1 to 5 — we know exactly how many steps.
                    </p>

                    <CodeBlock
                        code={`for (let i = 1; i <= 5; i++) {
  console.log("Step", i);
}`}
                        language="javascript"
                        highlightLines={forStep >= 0 ? [2] : []}
                    />

                    {/* Variable state */}
                    <div className="flex items-center gap-4 mt-4 mb-4">
                        <div className="bg-background rounded-lg px-4 py-2 flex items-center gap-2">
                            <span className="text-xs font-medium text-text-secondary/60">i =</span>
                            <motion.span
                                key={forStep}
                                initial={{ scale: 1.3 }}
                                animate={{ scale: 1 }}
                                className="text-xl font-bold font-mono text-text-primary"
                            >
                                {forStep >= 0 ? forSteps[forStep].i : "–"}
                            </motion.span>
                        </div>
                        <div className="text-xs text-text-secondary/60">
                            {forStep >= 0
                                ? `i <= 5 → ${!forDone ? "true, continue" : "done!"}`
                                : "Not started"}
                        </div>
                    </div>

                    {/* Console output */}
                    <div className="bg-code-bg rounded-lg p-3 min-h-[100px] mb-4">
                        <div className="text-[10px] text-code-text/40 mb-1 font-mono">Console:</div>
                        <div className="space-y-0.5">
                            <AnimatePresence>
                                {forStep >= 0 && forSteps.slice(0, forStep + 1).map((s, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-green-400 text-xs font-mono"
                                    >
                                        &gt; Step {s.i}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {forStep < 0 && (
                                <span className="text-code-text/30 text-xs font-mono italic">
                                    Click &quot;Next Step&quot; to start...
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={advanceFor}
                        disabled={forDone}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${forDone
                            ? "bg-green-100 text-green-700 cursor-default"
                            : "bg-dark text-card hover:shadow-lg"
                            }`}
                    >
                        {forDone ? "Loop Complete ✓" : "Next Step →"}
                    </button>
                </div>

                {/* ── While Loop ── */}
                <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-semibold text-text-primary">While Loop</h3>
                        <button
                            onClick={resetWhile}
                            className="text-xs text-text-secondary/50 hover:text-text-secondary cursor-pointer transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                    <p className="text-xs text-text-secondary/60 mb-4">
                        Drain battery by 20 each time — runs while battery {'>'} 0.
                    </p>

                    <CodeBlock
                        code={`let battery = 100;

while (battery > 0) {
  console.log("Battery:", battery);
  battery -= 20;
}`}
                        language="javascript"
                        highlightLines={whileStep >= 0 ? [4, 5] : []}
                    />

                    {/* Variable state */}
                    <div className="flex items-center gap-4 mt-4 mb-4">
                        <div className="bg-background rounded-lg px-4 py-2 flex items-center gap-2">
                            <span className="text-xs font-medium text-text-secondary/60">battery =</span>
                            <motion.span
                                key={whileStep}
                                initial={{ scale: 1.3 }}
                                animate={{ scale: 1 }}
                                className="text-xl font-bold font-mono text-text-primary"
                            >
                                {whileStep >= 0 ? whileSteps[whileStep].battery : "–"}
                            </motion.span>
                        </div>
                        <div className="text-xs text-text-secondary/60">
                            {whileStep >= 0
                                ? `battery > 0 → ${!whileDone ? "true, continue" : "next: 0 → false, stop!"}`
                                : "Not started"}
                        </div>
                    </div>

                    {/* Console output */}
                    <div className="bg-code-bg rounded-lg p-3 min-h-[100px] mb-4">
                        <div className="text-[10px] text-code-text/40 mb-1 font-mono">Console:</div>
                        <div className="space-y-0.5">
                            <AnimatePresence>
                                {whileStep >= 0 && whileSteps.slice(0, whileStep + 1).map((s, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-green-400 text-xs font-mono"
                                    >
                                        &gt; Battery: {s.battery}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {whileStep < 0 && (
                                <span className="text-code-text/30 text-xs font-mono italic">
                                    Click &quot;Next Step&quot; to start...
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={advanceWhile}
                        disabled={whileDone}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${whileDone
                            ? "bg-green-100 text-green-700 cursor-default"
                            : "bg-dark text-card hover:shadow-lg"
                            }`}
                    >
                        {whileDone ? "Battery drained! ✓" : "Next Step →"}
                    </button>
                </div>
            </div>
        </SectionWrapper>
    );
}
