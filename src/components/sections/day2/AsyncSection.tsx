"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

export default function AsyncSection() {
    const [fetchState, setFetchState] = useState<"idle" | "loading" | "done" | "error">("idle");
    const [userData, setUserData] = useState<{ name: string; email: string; phone: string } | null>(null);
    const [syntaxView, setSyntaxView] = useState<"then" | "async">("async");

    const simulateFetch = async () => {
        setFetchState("loading");
        setUserData(null);
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
            const data = await res.json();
            setUserData({ name: data.name, email: data.email, phone: data.phone });
            setFetchState("done");
        } catch {
            setFetchState("error");
        }
    };

    return (
        <SectionWrapper
            id="async"
            title="Async JavaScript"
            subtitle="JavaScript is single-threaded but can handle tasks without blocking, using Promises and async/await."
        >
            {/* Why async */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-red-700 mb-3">Synchronous (Blocking)</h4>
                    <div className="space-y-2">
                        {["Task 1", "Task 2 (3s wait)", "Task 3"].map((task, i) => (
                            <div key={task} className="flex items-center gap-2">
                                <div
                                    className="h-6 rounded bg-red-200"
                                    style={{ width: i === 1 ? "60%" : "30%", minWidth: "60px" }}
                                />
                                <span className="text-xs text-red-600">{task}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-red-600/70 mt-3">
                        Task 3 waits for Task 2 to finish. Everything freezes!
                    </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-green-700 mb-3">Asynchronous (Non-Blocking)</h4>
                    <div className="space-y-2">
                        {["Task 1", "Task 2 (async)", "Task 3"].map((task) => (
                            <div key={task} className="flex items-center gap-2">
                                <div
                                    className="h-6 rounded bg-green-200"
                                    style={{ width: "30%", minWidth: "60px" }}
                                />
                                <span className="text-xs text-green-600">{task}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-green-600/70 mt-3">
                        Task 2 runs in the background. Task 3 doesn&apos;t wait!
                    </p>
                </div>
            </div>

            {/* Promise states */}
            <div className="max-w-3xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Promise States
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                    {[
                        { label: "Pending", bg: "bg-amber-100", text: "text-amber-700", desc: "Working on it..." },
                        { label: "Fulfilled", bg: "bg-green-100", text: "text-green-700", desc: "Got the data!" },
                        { label: "Rejected", bg: "bg-red-100", text: "text-red-700", desc: "Something failed" },
                    ].map((state) => (
                        <div key={state.label} className={`${state.bg} rounded-xl px-5 py-3 text-center`}>
                            <p className={`text-sm font-semibold ${state.text}`}>{state.label}</p>
                            <p className={`text-xs ${state.text} opacity-70 mt-0.5`}>{state.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Syntax toggle */}
            <div className="max-w-3xl mx-auto mb-12">
                <div className="flex gap-2 mb-4">
                    {(["then", "async"] as const).map((s) => (
                        <button
                            key={s}
                            onClick={() => setSyntaxView(s)}
                            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${syntaxView === s
                                    ? "bg-dark text-card"
                                    : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                                }`}
                        >
                            {s === "then" ? ".then() Chain" : "async / await"}
                        </button>
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={syntaxView}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {syntaxView === "then" ? (
                            <CodeBlock
                                code={`fetch("https://api.example.com/users/1")
  .then(response => response.json())
  .then(data => {
    console.log(data.name);
  })
  .catch(error => {
    console.log("Error:", error);
  });`}
                                language="javascript"
                            />
                        ) : (
                            <CodeBlock
                                code={`async function getUser() {
  try {
    let response = await fetch("https://api.example.com/users/1");
    let data = await response.json();
    console.log(data.name);
  } catch (error) {
    console.log("Error:", error);
  }
}`}
                                language="javascript"
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Live fetch demo */}
            <div className="max-w-xl mx-auto">
                <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="text-base font-semibold text-text-primary mb-2">
                        Live Fetch Demo
                    </h3>
                    <p className="text-xs text-text-secondary/60 mb-4">
                        This fetches real data from JSONPlaceholder API
                    </p>

                    <button
                        onClick={simulateFetch}
                        disabled={fetchState === "loading"}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer mb-4 ${fetchState === "loading"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-dark text-card hover:shadow-lg"
                            }`}
                    >
                        {fetchState === "loading" ? "Fetching..." : "fetch('api/users/1')"}
                    </button>

                    {/* Result */}
                    <div className="bg-code-bg rounded-xl p-4 min-h-[100px]">
                        <AnimatePresence mode="wait">
                            {fetchState === "idle" && (
                                <motion.p
                                    key="idle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-code-text/40 text-sm font-mono"
                                >
                                    Click the button to fetch data...
                                </motion.p>
                            )}
                            {fetchState === "loading" && (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                                    <span className="text-amber-400 text-sm font-mono">
                                        Promise {'{'} &lt;pending&gt; {'}'}
                                    </span>
                                </motion.div>
                            )}
                            {fetchState === "done" && userData && (
                                <motion.pre
                                    key="done"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-green-400 text-sm font-mono"
                                >
                                    {`{
  "name": "${userData.name}",
  "email": "${userData.email}",
  "phone": "${userData.phone}"
}`}
                                </motion.pre>
                            )}
                            {fetchState === "error" && (
                                <motion.p
                                    key="error"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-400 text-sm font-mono"
                                >
                                    Error: Failed to fetch
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
