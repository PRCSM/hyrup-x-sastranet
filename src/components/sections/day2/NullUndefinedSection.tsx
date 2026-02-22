"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

export default function NullUndefinedSection() {
    const [dynamicValue, setDynamicValue] = useState<{ value: string; type: string }>({
        value: "10",
        type: "Number",
    });
    const [step, setStep] = useState(0);

    const steps = [
        { code: "let x = 10;", value: "10", type: "Number", color: "#3b82f6" },
        { code: 'x = "Hello";', value: '"Hello"', type: "String", color: "#22c55e" },
        { code: "x = true;", value: "true", type: "Boolean", color: "#f59e0b" },
        { code: "x = null;", value: "null", type: "Null", color: "#ef4444" },
    ];

    const advanceStep = () => {
        const nextStep = (step + 1) % steps.length;
        setStep(nextStep);
        setDynamicValue({ value: steps[nextStep].value, type: steps[nextStep].type });
    };

    return (
        <SectionWrapper
            id="null-undefined"
            title="Null vs Undefined"
            subtitle="They look similar but mean very different things."
        >
            {/* Comparison cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card rounded-2xl border border-border p-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                            <span className="text-lg font-bold text-purple-600">?</span>
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary">undefined</h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                        Variable declared but <strong>no value assigned</strong>. JavaScript sets it automatically.
                    </p>
                    <div className="bg-code-bg rounded-lg p-3">
                        <code className="text-sm font-mono text-green-400">
                            let x;<br />
                            console.log(x); <span className="text-code-text/40">// undefined</span>
                        </code>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card rounded-2xl border border-border p-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                            <span className="text-lg font-bold text-red-600">∅</span>
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary">null</h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                        <strong>Intentional</strong> empty value. You set it on purpose.
                    </p>
                    <div className="bg-code-bg rounded-lg p-3">
                        <code className="text-sm font-mono text-green-400">
                            let x = null;<br />
                            console.log(x); <span className="text-code-text/40">// null</span>
                        </code>
                    </div>
                </motion.div>
            </div>

            {/* Dynamic Typing Section */}
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-text-primary mb-2">Dynamic Typing</h3>
                    <p className="text-text-secondary">
                        JavaScript decides the type at runtime. A variable can change its type!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Interactive demo */}
                    <div className="bg-card rounded-2xl border border-border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-sm font-semibold text-text-primary">Live Demo</h4>
                            <span className="text-xs text-text-secondary/60">Step {step + 1}/{steps.length}</span>
                        </div>

                        {/* Variable box */}
                        <div className="bg-background rounded-xl p-6 text-center mb-6">
                            <div className="text-xs font-medium text-text-secondary/60 mb-2">Variable x</div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <code className="text-3xl font-mono font-bold text-text-primary">
                                        {dynamicValue.value}
                                    </code>
                                    <div className="mt-3">
                                        <span
                                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                                            style={{ background: steps[step].color }}
                                        >
                                            {dynamicValue.type}
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Current code line */}
                        <div className="bg-code-bg rounded-lg p-3 mb-4">
                            <code className="text-sm font-mono text-green-400">
                                {steps[step].code}
                            </code>
                        </div>

                        <button
                            onClick={advanceStep}
                            className="w-full px-4 py-2.5 bg-dark text-card rounded-xl text-sm font-medium cursor-pointer hover:shadow-lg transition-all"
                        >
                            {step < steps.length - 1 ? "Next Step →" : "Restart ↻"}
                        </button>
                    </div>

                    {/* Full code */}
                    <div>
                        <div className="text-xs font-medium text-text-secondary/60 mb-2">
                            Same variable, different types — that&apos;s dynamic typing
                        </div>
                        <CodeBlock
                            code={`let x = 10;        // Number
x = "Hello";      // String  
x = true;          // Boolean
x = null;          // Null

// JS doesn't care — it figures
// out the type at runtime!`}
                            language="javascript"
                            highlightLines={[step + 1]}
                        />
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
