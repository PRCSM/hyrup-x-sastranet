"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

export default function LoopsSection() {
    const [forStep, setForStep] = useState(-1);
    const [forOutput, setForOutput] = useState<number[]>([]);
    const [whileStep, setWhileStep] = useState(-1);
    const [whileOutput, setWhileOutput] = useState<number[]>([]);

    const maxSteps = 5;

    const advanceFor = () => {
        if (forStep < maxSteps - 1) {
            const next = forStep + 1;
            setForStep(next);
            setForOutput((p) => [...p, next]);
        }
    };

    const advanceWhile = () => {
        if (whileStep < maxSteps - 1) {
            const next = whileStep + 1;
            setWhileStep(next);
            setWhileOutput((p) => [...p, next]);
        }
    };

    const resetFor = () => {
        setForStep(-1);
        setForOutput([]);
    };

    const resetWhile = () => {
        setWhileStep(-1);
        setWhileOutput([]);
    };

    return (
        <SectionWrapper
            id="loops"
            title="Loops"
            subtitle="Repeat actions without writing the same code over and over."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* For Loop */}
                <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold text-text-primary">For Loop</h3>
                        <button
                            onClick={resetFor}
                            className="text-xs text-text-secondary/50 hover:text-text-secondary cursor-pointer transition-colors"
                        >
                            Reset
                        </button>
                    </div>

                    <CodeBlock
                        code={`for (let i = 0; i < 5; i++) {
  console.log(i);
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
                                {forStep >= 0 ? forStep : "–"}
                            </motion.span>
                        </div>
                        <div className="text-xs text-text-secondary/60">
                            {forStep >= 0 ? `i < 5 → ${forStep < 5 ? "true, continue" : "false, stop"}` : "Not started"}
                        </div>
                    </div>

                    {/* Console output */}
                    <div className="bg-code-bg rounded-lg p-3 min-h-[80px] mb-4">
                        <div className="text-[10px] text-code-text/40 mb-1 font-mono">Console:</div>
                        <div className="flex flex-wrap gap-1">
                            <AnimatePresence>
                                {forOutput.map((val) => (
                                    <motion.span
                                        key={val}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="inline-block px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-sm font-mono"
                                    >
                                        {val}
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                            {forOutput.length === 0 && (
                                <span className="text-code-text/30 text-xs font-mono italic">
                                    Click &quot;Next Step&quot; to start...
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={advanceFor}
                        disabled={forStep >= maxSteps - 1}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${forStep >= maxSteps - 1
                                ? "bg-green-100 text-green-700 cursor-default"
                                : "bg-dark text-card hover:shadow-lg"
                            }`}
                    >
                        {forStep >= maxSteps - 1 ? "Loop Complete ✓" : "Next Step →"}
                    </button>
                </div>

                {/* While Loop */}
                <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold text-text-primary">While Loop</h3>
                        <button
                            onClick={resetWhile}
                            className="text-xs text-text-secondary/50 hover:text-text-secondary cursor-pointer transition-colors"
                        >
                            Reset
                        </button>
                    </div>

                    <CodeBlock
                        code={`let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}`}
                        language="javascript"
                        highlightLines={whileStep >= 0 ? [3, 4] : []}
                    />

                    {/* Variable state */}
                    <div className="flex items-center gap-4 mt-4 mb-4">
                        <div className="bg-background rounded-lg px-4 py-2 flex items-center gap-2">
                            <span className="text-xs font-medium text-text-secondary/60">i =</span>
                            <motion.span
                                key={whileStep}
                                initial={{ scale: 1.3 }}
                                animate={{ scale: 1 }}
                                className="text-xl font-bold font-mono text-text-primary"
                            >
                                {whileStep >= 0 ? whileStep : "–"}
                            </motion.span>
                        </div>
                        <div className="text-xs text-text-secondary/60">
                            {whileStep >= 0 ? `i < 5 → ${whileStep < 5 ? "true, continue" : "false, stop"}` : "Not started"}
                        </div>
                    </div>

                    {/* Console output */}
                    <div className="bg-code-bg rounded-lg p-3 min-h-[80px] mb-4">
                        <div className="text-[10px] text-code-text/40 mb-1 font-mono">Console:</div>
                        <div className="flex flex-wrap gap-1">
                            <AnimatePresence>
                                {whileOutput.map((val) => (
                                    <motion.span
                                        key={val}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="inline-block px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-sm font-mono"
                                    >
                                        {val}
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                            {whileOutput.length === 0 && (
                                <span className="text-code-text/30 text-xs font-mono italic">
                                    Click &quot;Next Step&quot; to start...
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={advanceWhile}
                        disabled={whileStep >= maxSteps - 1}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${whileStep >= maxSteps - 1
                                ? "bg-green-100 text-green-700 cursor-default"
                                : "bg-dark text-card hover:shadow-lg"
                            }`}
                    >
                        {whileStep >= maxSteps - 1 ? "Loop Complete ✓" : "Next Step →"}
                    </button>
                </div>
            </div>
        </SectionWrapper>
    );
}
