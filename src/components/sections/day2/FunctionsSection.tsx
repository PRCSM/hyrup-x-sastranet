"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

const syntaxVariants = [
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

export default function FunctionsSection() {
    const [inputName, setInputName] = useState("Anagha");
    const [result, setResult] = useState<string | null>(null);
    const [defaultResult, setDefaultResult] = useState<string | null>(null);
    const [defaultInput, setDefaultInput] = useState("");

    const callFunction = () => {
        setResult(`"Hello ${inputName}"`);
    };

    const callDefaultFunction = () => {
        if (defaultInput.trim() === "") {
            setDefaultResult(`"Hello World!" (used default)`);
        } else {
            setDefaultResult(`"Hello ${defaultInput}!"`);
        }
    };

    return (
        <SectionWrapper
            id="functions"
            title="Functions"
            subtitle="Reusable blocks of code. Write once, use everywhere."
        >
            {/* Side-by-side Syntax Comparison */}
            <div className="max-w-5xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Function Syntax Evolution
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                    Same function, three ways to write it — each step is shorter and cleaner.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {syntaxVariants.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-dark text-card flex items-center justify-center text-xs font-bold">
                                    {i + 1}
                                </div>
                                <span className="text-sm font-semibold text-text-primary">
                                    {s.label}
                                </span>
                                {i === 2 && (
                                    <span className="text-[9px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                        SHORTEST
                                    </span>
                                )}
                            </div>
                            <CodeBlock code={s.code} language="javascript" />
                            {i < syntaxVariants.length - 1 && (
                                <div className="hidden md:flex justify-end -mr-6 mt-2">
                                    <span className="text-text-secondary/30 text-lg">→</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Arrow function recall */}
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-amber-800">Recall: Arrow Functions</span>
                        <span className="text-[9px] font-bold bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">ES6</span>
                    </div>
                    <p className="text-xs text-amber-700 leading-relaxed">
                        Arrow functions (<code className="font-mono bg-amber-100 px-1 rounded">{`() => {}`}</code>) are the modern way to write functions.
                        When the body is a single expression, you can skip the curly braces and <code className="font-mono bg-amber-100 px-1 rounded">return</code> keyword.
                        We&apos;ll use them everywhere from here on!
                    </p>
                </div>

                <p className="text-center text-xs text-text-secondary/60 mt-4">
                    All three do the exact same thing — arrow functions are modern JS shorthand
                </p>
            </div>

            {/* Live Call Demo */}
            <div className="max-w-xl mx-auto mb-12">
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

            {/* Default Parameters */}
            <div className="max-w-3xl mx-auto">
                <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-semibold text-text-primary">
                            Default Parameters
                        </h3>
                        <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            ES6
                        </span>
                    </div>
                    <p className="text-sm text-text-secondary mb-5 leading-relaxed">
                        You can set a fallback value for parameters. If the caller doesn&apos;t pass an argument, the default is used.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        <CodeBlock
                            code={`function greet(name = "World") {
  return \`Hello \${name}!\`;
}

greet();         // "Hello World!"
greet("Anagha"); // "Hello Anagha!"`}
                            language="javascript"
                            highlightLines={[1]}
                        />

                        {/* Interactive demo */}
                        <div className="bg-background rounded-xl p-4">
                            <div className="text-xs font-medium text-text-secondary/60 mb-3">
                                Try it — leave empty to see the default!
                            </div>
                            <input
                                type="text"
                                value={defaultInput}
                                onChange={(e) => {
                                    setDefaultInput(e.target.value);
                                    setDefaultResult(null);
                                }}
                                className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm font-mono text-text-primary focus:outline-none focus:border-accent-dark transition-colors mb-3"
                                placeholder="Leave empty for default..."
                            />
                            <button
                                onClick={callDefaultFunction}
                                className="w-full px-4 py-2 bg-dark text-card rounded-lg text-sm font-medium cursor-pointer hover:shadow-lg transition-all"
                            >
                                Run greet({defaultInput ? `"${defaultInput}"` : ""})
                            </button>

                            <AnimatePresence>
                                {defaultResult && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-3 bg-code-bg rounded-lg p-3"
                                    >
                                        <code className="text-sm font-mono text-green-400">
                                            <span className="text-code-text/40">← </span>
                                            {defaultResult}
                                        </code>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
