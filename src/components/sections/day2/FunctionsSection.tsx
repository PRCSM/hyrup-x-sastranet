"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

export default function FunctionsSection() {
    const [inputName, setInputName] = useState("Anagha");
    const [result, setResult] = useState<string | null>(null);
    const [syntaxStep, setSyntaxStep] = useState(0);

    const syntaxSteps = [
        {
            label: "Function Declaration",
            code: `function greet(name) {
  return "Hello " + name;
}`,
        },
        {
            label: "Arrow Function",
            code: `const greet = (name) => {
  return "Hello " + name;
};`,
        },
        {
            label: "Arrow (Short)",
            code: `const greet = name => "Hello " + name;`,
        },
    ];

    const callFunction = () => {
        setResult(`"Hello ${inputName}"`);
    };

    return (
        <SectionWrapper
            id="functions"
            title="Functions"
            subtitle="Reusable blocks of code. Write once, use everywhere."
        >
            {/* Syntax Evolution */}
            <div className="max-w-3xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Function Syntax Evolution
                </h3>

                <div className="flex gap-2 mb-4">
                    {syntaxSteps.map((s, i) => (
                        <button
                            key={s.label}
                            onClick={() => setSyntaxStep(i)}
                            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${syntaxStep === i
                                    ? "bg-dark text-card"
                                    : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={syntaxStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                    >
                        <CodeBlock
                            code={syntaxSteps[syntaxStep].code}
                            language="javascript"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Arrow progression indicator */}
                <div className="flex items-center justify-center gap-2 mt-4">
                    {syntaxSteps.map((_, i) => (
                        <div key={i} className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i <= syntaxStep
                                        ? "bg-dark text-card"
                                        : "bg-card text-text-secondary border border-border"
                                    }`}
                            >
                                {i + 1}
                            </div>
                            {i < syntaxSteps.length - 1 && (
                                <div className={`w-12 h-0.5 transition-all ${i < syntaxStep ? "bg-dark" : "bg-border"
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs text-text-secondary/60 mt-2">
                    Each step is shorter — same function, cleaner syntax
                </p>
            </div>

            {/* Live Call Demo */}
            <div className="max-w-xl mx-auto">
                <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="text-base font-semibold text-text-primary mb-4">
                        Call the Function
                    </h3>

                    <div className="flex gap-3 mb-4">
                        <div className="flex-1">
                            <label className="text-xs font-medium text-text-secondary/60 block mb-2">
                                Enter a name
                            </label>
                            <input
                                type="text"
                                value={inputName}
                                onChange={(e) => {
                                    setInputName(e.target.value);
                                    setResult(null);
                                }}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono text-text-primary focus:outline-none focus:border-accent-dark transition-colors"
                                placeholder="Your name"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={callFunction}
                                className="px-5 py-2 bg-dark text-card rounded-lg text-sm font-medium cursor-pointer hover:shadow-lg transition-all whitespace-nowrap"
                            >
                                Run greet()
                            </button>
                        </div>
                    </div>

                    {/* Function call visualization */}
                    <div className="bg-code-bg rounded-xl p-4">
                        <code className="text-sm font-mono text-code-text">
                            <span className="text-code-text/50">&gt; </span>
                            <span className="text-yellow-400">greet</span>
                            <span className="text-white">(</span>
                            <span className="text-green-400">&quot;{inputName}&quot;</span>
                            <span className="text-white">)</span>
                        </code>

                        <AnimatePresence>
                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 pt-2 border-t border-white/10"
                                >
                                    <code className="text-sm font-mono text-green-400">
                                        <span className="text-code-text/40">← </span>
                                        {result}
                                    </code>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
