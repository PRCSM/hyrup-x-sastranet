"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

const timelineSteps = [
    { label: "fetch() called", icon: "📡", color: "bg-blue-100 text-blue-700 border-blue-200" },
    { label: "Waiting for server...", icon: "⏳", color: "bg-amber-100 text-amber-700 border-amber-200" },
    { label: "Response received", icon: "📨", color: "bg-purple-100 text-purple-700 border-purple-200" },
    { label: "Data parsed (.json())", icon: "🔄", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
    { label: "Data ready!", icon: "✅", color: "bg-green-100 text-green-700 border-green-200" },
];

export default function AsyncSection() {
    const [fetchState, setFetchState] = useState<"idle" | "loading" | "done" | "error">("idle");
    const [userData, setUserData] = useState<{ name: string; email: string; phone: string } | null>(null);
    const [syntaxView, setSyntaxView] = useState<"then" | "async">("async");

    /* Animated timeline */
    const [timelineActive, setTimelineActive] = useState(false);
    const [activeStep, setActiveStep] = useState(-1);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    /* Sync vs Async animation */
    const [syncRunning, setSyncRunning] = useState(false);
    const [syncProgress, setSyncProgress] = useState([0, 0, 0]);
    const [asyncRunning, setAsyncRunning] = useState(false);
    const [asyncProgress, setAsyncProgress] = useState([0, 0, 0]);

    const runSyncDemo = () => {
        setSyncRunning(true);
        setSyncProgress([0, 0, 0]);
        // Simulate sequential: task1 -> task2 (slow) -> task3
        setTimeout(() => setSyncProgress([100, 0, 0]), 500);
        setTimeout(() => setSyncProgress([100, 50, 0]), 1200);
        setTimeout(() => setSyncProgress([100, 100, 0]), 2000);
        setTimeout(() => {
            setSyncProgress([100, 100, 100]);
            setSyncRunning(false);
        }, 2500);
    };

    const runAsyncDemo = () => {
        setAsyncRunning(true);
        setAsyncProgress([0, 0, 0]);
        // Simulate parallel: task1 done quick, task2 starts at same time, task3 doesn't wait
        setTimeout(() => setAsyncProgress([100, 30, 0]), 400);
        setTimeout(() => setAsyncProgress([100, 60, 100]), 800);
        setTimeout(() => {
            setAsyncProgress([100, 100, 100]);
            setAsyncRunning(false);
        }, 1400);
    };

    const runTimeline = (onComplete: () => void) => {
        setTimelineActive(true);
        setActiveStep(-1);
        let step = 0;
        intervalRef.current = setInterval(() => {
            setActiveStep(step);
            step++;
            if (step >= timelineSteps.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                // Small pause after last step before showing data
                setTimeout(onComplete, 600);
            }
        }, 1200);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const simulateFetch = async () => {
        setFetchState("loading");
        setUserData(null);

        // Start the fetch in the background
        const fetchPromise = fetch("https://jsonplaceholder.typicode.com/users/1")
            .then((res) => res.json())
            .catch(() => null);

        // Run the visual timeline — data reveals only after timeline finishes
        runTimeline(async () => {
            try {
                const data = await fetchPromise;
                if (data) {
                    setUserData({ name: data.name, email: data.email, phone: data.phone });
                    setFetchState("done");
                } else {
                    setFetchState("error");
                }
            } catch {
                setFetchState("error");
            }
        });
    };

    return (
        <SectionWrapper
            id="async"
            title="Async JavaScript"
            subtitle="JavaScript is single-threaded but can handle tasks without blocking, using Promises and async/await."
        >
            {/* Animated Sync vs Async comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-red-700 mb-3">Synchronous (Blocking)</h4>
                    <div className="space-y-3 mb-4">
                        {["Task 1", "Task 2 (3s wait)", "Task 3"].map((task, i) => (
                            <div key={task} className="flex items-center gap-2">
                                <div className="flex-1 h-6 rounded bg-red-100 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-red-400 rounded"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${syncProgress[i]}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                                <span className="text-xs text-red-600 w-28 text-right">{task}</span>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={runSyncDemo}
                        disabled={syncRunning}
                        className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${syncRunning
                            ? "bg-red-200 text-red-600"
                            : "bg-red-600 text-white hover:bg-red-700"
                            }`}
                    >
                        {syncRunning ? "Running..." : "Run Sync"}
                    </button>
                    <p className="text-xs text-red-600/70 mt-3">
                        Task 3 waits for Task 2 to finish. Everything freezes!
                    </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-green-700 mb-3">Asynchronous (Non-Blocking)</h4>
                    <div className="space-y-3 mb-4">
                        {["Task 1", "Task 2 (async)", "Task 3"].map((task, i) => (
                            <div key={task} className="flex items-center gap-2">
                                <div className="flex-1 h-6 rounded bg-green-100 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-green-400 rounded"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${asyncProgress[i]}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                                <span className="text-xs text-green-600 w-28 text-right">{task}</span>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={runAsyncDemo}
                        disabled={asyncRunning}
                        className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${asyncRunning
                            ? "bg-green-200 text-green-600"
                            : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                    >
                        {asyncRunning ? "Running..." : "Run Async"}
                    </button>
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

            {/* Live fetch demo with timeline */}
            <div className="max-w-xl mx-auto">
                <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="text-base font-semibold text-text-primary mb-2">
                        Live Fetch Demo
                    </h3>
                    <p className="text-xs text-text-secondary/60 mb-4">
                        This fetches real data from JSONPlaceholder API — watch each step light up!
                    </p>

                    <button
                        onClick={simulateFetch}
                        disabled={fetchState === "loading"}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer mb-5 ${fetchState === "loading"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-dark text-card hover:shadow-lg"
                            }`}
                    >
                        {fetchState === "loading" ? "Fetching..." : "fetch('api/users/1')"}
                    </button>

                    {/* Animated timeline */}
                    {timelineActive && (
                        <div className="mb-5 space-y-2">
                            {timelineSteps.map((step, i) => (
                                <motion.div
                                    key={step.label}
                                    initial={{ opacity: 0.3, x: -10 }}
                                    animate={{
                                        opacity: activeStep >= i ? 1 : 0.3,
                                        x: activeStep >= i ? 0 : -10,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${activeStep >= i ? step.color : "bg-gray-50 text-gray-400 border-gray-100"
                                        }`}
                                >
                                    <span className="text-base">{step.icon}</span>
                                    <span className="text-xs font-medium">{step.label}</span>
                                    {activeStep === i && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="ml-auto w-2 h-2 bg-current rounded-full"
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}

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
