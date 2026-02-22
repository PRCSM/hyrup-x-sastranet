"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

export default function ConditionalsSection() {
    const [age, setAge] = useState(20);

    const isAdult = age > 18;
    const codeLine1Active = true;
    const codeLine2Active = isAdult;
    const codeLine4Active = !isAdult;

    return (
        <SectionWrapper
            id="conditionals"
            title="Conditionals"
            subtitle="Make decisions in your code. If something is true, do this. Otherwise, do that."
        >
            <div className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Interactive panel */}
                    <div className="bg-card rounded-2xl border border-border p-6">
                        <h3 className="text-base font-semibold text-text-primary mb-4">
                            Age Checker
                        </h3>

                        {/* Age slider */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-medium text-text-secondary/60">
                                    Set your age
                                </label>
                                <motion.span
                                    key={age}
                                    initial={{ scale: 1.3 }}
                                    animate={{ scale: 1 }}
                                    className="text-2xl font-bold font-mono text-text-primary"
                                >
                                    {age}
                                </motion.span>
                            </div>
                            <input
                                type="range"
                                min={1}
                                max={100}
                                value={age}
                                onChange={(e) => setAge(Number(e.target.value))}
                                className="w-full accent-[#0D0D0D] cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-text-secondary/40 mt-1">
                                <span>1</span>
                                <span>18</span>
                                <span>100</span>
                            </div>
                        </div>

                        {/* Result */}
                        <motion.div
                            key={isAdult ? "adult" : "minor"}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`rounded-xl p-6 text-center ${isAdult
                                    ? "bg-green-50 border border-green-200"
                                    : "bg-amber-50 border border-amber-200"
                                }`}
                        >
                            <div className="text-3xl mb-2">
                                {isAdult ? "🎉" : "👶"}
                            </div>
                            <p className={`text-lg font-semibold ${isAdult ? "text-green-700" : "text-amber-700"
                                }`}>
                                {isAdult ? "Adult" : "Minor"}
                            </p>
                            <p className={`text-xs mt-1 ${isAdult ? "text-green-600/70" : "text-amber-600/70"
                                }`}>
                                age ({age}) {isAdult ? ">" : "≤"} 18
                            </p>
                        </motion.div>
                    </div>

                    {/* Code with highlighted active lines */}
                    <div>
                        <div className="text-xs font-medium text-text-secondary/60 mb-2">
                            Watch which branch executes
                        </div>
                        <div className="bg-code-bg rounded-xl border border-border overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                                <span className="text-xs font-mono text-code-text/50 ml-1">
                                    javascript
                                </span>
                            </div>
                            <pre className="p-4 text-sm leading-loose font-mono">
                                <CodeLine active={codeLine1Active} lineNum={1}>
                                    {`if (age > 18) {`}
                                </CodeLine>
                                <CodeLine active={codeLine2Active} lineNum={2} indent>
                                    {`console.log("Adult");`}
                                </CodeLine>
                                <CodeLine active={false} lineNum={3}>
                                    {`} else {`}
                                </CodeLine>
                                <CodeLine active={codeLine4Active} lineNum={4} indent>
                                    {`console.log("Minor");`}
                                </CodeLine>
                                <CodeLine active={false} lineNum={5}>
                                    {`}`}
                                </CodeLine>
                            </pre>
                        </div>

                        {/* Flow arrow */}
                        <div className="mt-4 flex items-center justify-center gap-2">
                            <div className={`h-2 rounded-full transition-all duration-300 ${isAdult ? "w-16 bg-green-500" : "w-8 bg-border"
                                }`} />
                            <span className="text-xs font-mono text-text-secondary/60">
                                {isAdult ? "→ true branch" : ""}
                            </span>
                            <div className={`h-2 rounded-full transition-all duration-300 ${!isAdult ? "w-16 bg-amber-500" : "w-8 bg-border"
                                }`} />
                            <span className="text-xs font-mono text-text-secondary/60">
                                {!isAdult ? "→ else branch" : ""}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}

function CodeLine({
    children,
    active,
    lineNum,
    indent,
}: {
    children: string;
    active: boolean;
    lineNum: number;
    indent?: boolean;
}) {
    return (
        <div
            className={`px-2 -mx-2 rounded transition-all duration-300 ${active ? "bg-white/10 border-l-2 border-green-400" : "border-l-2 border-transparent"
                }`}
        >
            <span className="inline-block w-6 text-right mr-4 text-code-text/30 select-none text-xs">
                {lineNum}
            </span>
            <span className={`transition-all duration-300 ${active ? "text-green-400" : "text-code-text/60"
                }`}>
                {indent && "  "}{children}
            </span>
        </div>
    );
}
