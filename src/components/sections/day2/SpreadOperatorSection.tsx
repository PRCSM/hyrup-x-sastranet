"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

export default function SpreadOperatorSection() {
    const [activeDemo, setActiveDemo] = useState<"array" | "object">("array");
    const [showResult, setShowResult] = useState(false);

    const runDemo = () => {
        setShowResult(false);
        setTimeout(() => setShowResult(true), 300);
    };

    return (
        <SectionWrapper
            id="spread"
            title="Spread Operator"
            subtitle="The ... syntax lets you 'unpack' arrays and objects — super useful for copying and combining data."
        >
            {/* Toggle */}
            <div className="flex gap-2 mb-8 max-w-3xl mx-auto">
                {(["array", "object"] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => {
                            setActiveDemo(t);
                            setShowResult(false);
                        }}
                        className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all cursor-pointer ${activeDemo === t
                            ? "bg-dark text-card shadow-md"
                            : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                            }`}
                    >
                        {t === "array" ? "Spread with Arrays" : "Spread with Objects"}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeDemo === "array" ? (
                    <motion.div
                        key="array"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="bg-card rounded-2xl border border-border p-6 mb-6">
                            <h3 className="text-base font-semibold text-text-primary mb-4">
                                Spread an Array
                            </h3>

                            {/* Visual */}
                            <div className="bg-background rounded-xl p-5 mb-5">
                                <div className="flex flex-col gap-4 items-center">
                                    {/* Original */}
                                    <div>
                                        <div className="text-xs text-text-secondary/60 text-center mb-2 font-mono">
                                            const arr = [1, 2, 3]
                                        </div>
                                        <div className="flex gap-2">
                                            {[1, 2, 3].map((n) => (
                                                <div
                                                    key={n}
                                                    className="w-10 h-10 bg-blue-100 border border-blue-200 rounded-lg flex items-center justify-center text-sm font-mono font-bold text-blue-700"
                                                >
                                                    {n}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Spread arrow */}
                                    <motion.div
                                        animate={{ y: [0, 4, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="text-text-secondary/40 text-lg"
                                    >
                                        ...spread ↓
                                    </motion.div>

                                    {/* Result */}
                                    <div>
                                        <div className="text-xs text-text-secondary/60 text-center mb-2 font-mono">
                                            const newArr = [...arr, 4, 5]
                                        </div>
                                        <div className="flex gap-2">
                                            {[1, 2, 3].map((n) => (
                                                <motion.div
                                                    key={`old-${n}`}
                                                    className="w-10 h-10 bg-blue-100 border border-blue-200 rounded-lg flex items-center justify-center text-sm font-mono font-bold text-blue-700"
                                                >
                                                    {n}
                                                </motion.div>
                                            ))}
                                            {[4, 5].map((n) => (
                                                <motion.div
                                                    key={`new-${n}`}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.3 + (n - 4) * 0.2 }}
                                                    className="w-10 h-10 bg-green-100 border border-green-300 rounded-lg flex items-center justify-center text-sm font-mono font-bold text-green-700"
                                                >
                                                    {n}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <CodeBlock
                                code={`const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];

console.log(newArr); // [1, 2, 3, 4, 5]

// Original is unchanged!
console.log(arr);    // [1, 2, 3]`}
                                language="javascript"
                                highlightLines={[2]}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="object"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="bg-card rounded-2xl border border-border p-6 mb-6">
                            <h3 className="text-base font-semibold text-text-primary mb-4">
                                Spread an Object
                            </h3>

                            {/* Visual */}
                            <div className="bg-background rounded-xl p-5 mb-5">
                                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                    {/* Original object */}
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 min-w-[140px]">
                                        <div className="text-xs font-mono text-blue-500 mb-2">obj</div>
                                        <div className="space-y-1">
                                            <div className="text-sm font-mono text-blue-700">
                                                name: <span className="text-green-600">&quot;Anagha&quot;</span>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="text-xl text-text-secondary/40"
                                    >
                                        + ...
                                    </motion.span>

                                    {/* New prop */}
                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 min-w-[140px]">
                                        <div className="text-xs font-mono text-green-500 mb-2">new prop</div>
                                        <div className="text-sm font-mono text-green-700">
                                            age: <span className="text-blue-600">20</span>
                                        </div>
                                    </div>

                                    <span className="text-xl text-text-secondary/40">=</span>

                                    {/* Result */}
                                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 min-w-[140px]">
                                        <div className="text-xs font-mono text-purple-500 mb-2">newObj</div>
                                        <div className="space-y-1">
                                            <div className="text-sm font-mono text-blue-700">
                                                name: <span className="text-green-600">&quot;Anagha&quot;</span>
                                            </div>
                                            <div className="text-sm font-mono text-green-700">
                                                age: <span className="text-blue-600">20</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={runDemo}
                                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-dark text-card hover:shadow-lg transition-all cursor-pointer mb-4"
                            >
                                Run Example
                            </button>

                            <AnimatePresence>
                                {showResult && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mb-4"
                                    >
                                        <div className="bg-code-bg rounded-xl p-3">
                                            <div className="text-[10px] text-code-text/40 font-mono mb-1">Console:</div>
                                            <pre className="text-green-400 text-sm font-mono">{`{ name: "Anagha", age: 20 }`}</pre>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <CodeBlock
                                code={`const obj = { name: "Anagha" };
const newObj = { ...obj, age: 20 };

console.log(newObj);
// { name: "Anagha", age: 20 }

// Original is unchanged!
console.log(obj); // { name: "Anagha" }`}
                                language="javascript"
                                highlightLines={[2]}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
