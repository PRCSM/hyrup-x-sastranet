"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

/* ────────────────────────────────────────────────
   1. Objects Refresher
   ──────────────────────────────────────────────── */
function ObjectsRefresher() {
    const [fields, setFields] = useState([
        { key: "name", value: '"Nishanth"', type: "String" },
        { key: "age", value: "21", type: "Number" },
    ]);
    const [newKey, setNewKey] = useState("");
    const [newValue, setNewValue] = useState("");
    const [newType, setNewType] = useState("String");

    const addField = () => {
        if (!newKey.trim()) return;
        const val = newType === "String" ? `"${newValue}"` : newValue || (newType === "Boolean" ? "true" : "0");
        setFields(prev => [...prev, { key: newKey.trim(), value: val, type: newType }]);
        setNewKey("");
        setNewValue("");
    };

    const removeField = (i: number) => {
        setFields(prev => prev.filter((_, idx) => idx !== i));
    };

    const objectCode = `const person = {\n${fields.map(f => `  ${f.key}: ${f.value}`).join(",\n")}\n};`;
    const accessCode = fields.length > 0
        ? `// Dot notation\nconsole.log(person.${fields[0].key});\n// → ${fields[0].value}\n\n// Bracket notation\nconsole.log(person["${fields[0].key}"]);\n// → ${fields[0].value}`
        : "// Add fields to see access examples";

    return (
        <div className="mb-16">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Objects Refresher</h3>
            <p className="text-sm text-text-secondary mb-6">Objects store data as key-value pairs. Build one interactively:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Builder */}
                <div className="bg-card rounded-xl border border-border p-5">
                    <h4 className="text-sm font-semibold text-text-primary mb-3">Object Builder</h4>
                    <div className="space-y-2 mb-4">
                        {fields.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 bg-background rounded-lg px-3 py-2">
                                <span className="text-xs font-mono text-text-primary font-semibold">{f.key}:</span>
                                <span className="text-xs font-mono text-amber-600 flex-1">{f.value}</span>
                                <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">{f.type}</span>
                                <button onClick={() => removeField(i)} className="text-red-400 hover:text-red-600 text-xs cursor-pointer">×</button>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2 items-end flex-wrap">
                        <input
                            type="text"
                            value={newKey}
                            onChange={e => setNewKey(e.target.value)}
                            placeholder="key"
                            className="flex-1 min-w-[60px] px-2 py-1.5 text-xs rounded-lg border border-border bg-background text-text-primary outline-none"
                        />
                        <input
                            type="text"
                            value={newValue}
                            onChange={e => setNewValue(e.target.value)}
                            placeholder="value"
                            className="flex-1 min-w-[60px] px-2 py-1.5 text-xs rounded-lg border border-border bg-background text-text-primary outline-none"
                        />
                        <select
                            value={newType}
                            onChange={e => setNewType(e.target.value)}
                            className="px-2 py-1.5 text-xs rounded-lg border border-border bg-background text-text-primary outline-none cursor-pointer"
                        >
                            <option>String</option>
                            <option>Number</option>
                            <option>Boolean</option>
                            <option>Array</option>
                        </select>
                        <button onClick={addField} className="px-3 py-1.5 bg-dark text-card text-xs rounded-lg cursor-pointer hover:shadow-lg transition-all">
                            Add
                        </button>
                    </div>
                </div>

                {/* Code output */}
                <div className="space-y-3">
                    <CodeBlock code={objectCode} language="javascript" />
                    <CodeBlock code={accessCode} language="javascript" />
                </div>
            </div>
        </div>
    );
}

/* ────────────────────────────────────────────────
   2. Async Deep Dive
   ──────────────────────────────────────────────── */
const callbackCode = `// Callback Hell — "Pyramid of Doom"
getUser(userId, function(user) {
  getOrders(user.id, function(orders) {
    getDetails(orders[0].id, function(details) {
      console.log(details);
      // ...more nesting
    });
  });
});`;

const promiseCode = `// Promise chain — .then()
getUser(userId)
  .then(user => getOrders(user.id))
  .then(orders => getDetails(orders[0].id))
  .then(details => console.log(details))
  .catch(error => console.log("Error:", error));`;

const asyncAwaitCode = `// Async/Await — reads like sync code
async function loadData() {
  try {
    const user = await getUser(userId);
    const orders = await getOrders(user.id);
    const details = await getDetails(orders[0].id);
    console.log(details);
  } catch (error) {
    console.log("Error:", error);
  }
}`;

function AsyncDeepDive() {
    const [tab, setTab] = useState<"callbacks" | "promises" | "async">("callbacks");
    const [fetchState, setFetchState] = useState<"idle" | "loading" | "done">("idle");
    const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

    const simulateFetch = async () => {
        setFetchState("loading");
        setUserData(null);
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
            const data = await res.json();
            setUserData({ name: data.name, email: data.email });
            setFetchState("done");
        } catch {
            setFetchState("idle");
        }
    };

    return (
        <div className="mb-16">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Async JavaScript — Evolution</h3>
            <p className="text-sm text-text-secondary mb-6">From callback hell to clean async/await. Three ways to handle asynchronous operations:</p>

            {/* Tabs */}
            <div className="flex gap-2 mb-4 max-w-4xl mx-auto">
                {[
                    { key: "callbacks" as const, label: "1. Callbacks", emoji: "😵" },
                    { key: "promises" as const, label: "2. Promises", emoji: "🔗" },
                    { key: "async" as const, label: "3. Async/Await", emoji: "✨" },
                ].map(t => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${tab === t.key ? "bg-dark text-card" : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                            }`}
                    >
                        {t.emoji} {t.label}
                    </button>
                ))}
            </div>

            <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    {tab === "callbacks" && (
                        <motion.div key="cb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CodeBlock code={callbackCode} language="javascript" />
                                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                                    <h4 className="text-sm font-bold text-red-800 mb-3">The Problem</h4>
                                    {/* Pyramid visualization */}
                                    <div className="space-y-1 mb-3">
                                        {[1, 2, 3, 4, 5].map(level => (
                                            <div key={level} className="flex">
                                                <div style={{ width: level * 20 }} />
                                                <div className="h-5 bg-red-200 rounded flex-1 flex items-center px-2">
                                                    <span className="text-[9px] text-red-600">{"→".repeat(level)} nested callback</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-red-600">Hard to read, hard to debug, error-prone. Known as &quot;Callback Hell.&quot;</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {tab === "promises" && (
                        <motion.div key="pr" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CodeBlock code={promiseCode} language="javascript" />
                                <div className="space-y-3">
                                    <div className="bg-card border border-border rounded-xl p-4">
                                        <h4 className="text-sm font-bold text-text-primary mb-3">Promise States</h4>
                                        <div className="space-y-2">
                                            {[
                                                { label: "Pending", color: "bg-amber-100 text-amber-700", desc: "Working on it..." },
                                                { label: "Fulfilled", color: "bg-green-100 text-green-700", desc: "Got the data!" },
                                                { label: "Rejected", color: "bg-red-100 text-red-700", desc: "Something failed" },
                                            ].map(s => (
                                                <div key={s.label} className={`${s.color} rounded-lg px-3 py-2 flex items-center justify-between`}>
                                                    <span className="text-sm font-semibold">{s.label}</span>
                                                    <span className="text-xs opacity-70">{s.desc}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                        <p className="text-xs text-green-700">✅ Flat chain, better error handling with .catch(), no nesting</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {tab === "async" && (
                        <motion.div key="as" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CodeBlock code={asyncAwaitCode} language="javascript" />
                                <div className="space-y-3">
                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                        <h4 className="text-sm font-bold text-green-800 mb-2">Why async/await wins</h4>
                                        <ul className="space-y-1 text-xs text-green-700">
                                            <li>✅ Reads like synchronous code</li>
                                            <li>✅ Easy to debug</li>
                                            <li>✅ try/catch for errors</li>
                                            <li>✅ No nesting, no chaining</li>
                                        </ul>
                                    </div>
                                    {/* Live fetch */}
                                    <div className="bg-card border border-border rounded-xl p-4">
                                        <p className="text-xs text-text-secondary mb-3">Try it — real API call:</p>
                                        <button
                                            onClick={simulateFetch}
                                            disabled={fetchState === "loading"}
                                            className={`w-full px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all ${fetchState === "loading" ? "bg-amber-100 text-amber-700" : "bg-dark text-card hover:shadow-lg"
                                                }`}
                                        >
                                            {fetchState === "loading" ? "⏳ await fetch(...)..." : "await fetch('/api/users/1')"}
                                        </button>
                                        <AnimatePresence>
                                            {fetchState === "done" && userData && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-code-bg rounded-lg p-3 mt-2"
                                                >
                                                    <pre className="text-xs font-mono text-green-400">{`{ "name": "${userData.name}", "email": "${userData.email}" }`}</pre>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ────────────────────────────────────────────────
   3. Event Loop Visualizer
   ──────────────────────────────────────────────── */
interface EventBlock {
    id: number;
    label: string;
    location: "code" | "stack" | "webapi" | "queue" | "done";
    color: string;
}

const eventLoopCode = [
    'console.log("Hi!");',
    'setTimeout(cb, 2000);',
    'console.log("Welcome!");',
];

const initialBlocks: EventBlock[] = [
    { id: 1, label: 'console.log("Hi!")', location: "code", color: "#3b82f6" },
    { id: 2, label: "setTimeout(cb, 2000)", location: "code", color: "#f59e0b" },
    { id: 3, label: 'console.log("Welcome!")', location: "code", color: "#10b981" },
    { id: 4, label: 'cb: console.log("Timer!")', location: "code", color: "#ef4444" },
];

function EventLoopVisualizer() {
    const [blocks, setBlocks] = useState<EventBlock[]>(initialBlocks);
    const [stepIdx, setStepIdx] = useState(-1);
    const [playing, setPlaying] = useState(false);
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

    const steps = useCallback(() => [
        // Step 0: console.log("Hi!") → stack
        () => {
            setBlocks(prev => prev.map(b => b.id === 1 ? { ...b, location: "stack" as const } : b));
        },
        // Step 1: console.log("Hi!") executes → done. Output: Hi!
        () => {
            setBlocks(prev => prev.map(b => b.id === 1 ? { ...b, location: "done" as const } : b));
            setConsoleOutput(prev => [...prev, "Hi!"]);
        },
        // Step 2: setTimeout → stack
        () => {
            setBlocks(prev => prev.map(b => b.id === 2 ? { ...b, location: "stack" as const } : b));
        },
        // Step 3: setTimeout → webapi (timer starts), callback stays for later
        () => {
            setBlocks(prev => prev.map(b =>
                b.id === 2 ? { ...b, location: "done" as const } :
                    b.id === 4 ? { ...b, location: "webapi" as const } : b
            ));
        },
        // Step 4: console.log("Welcome!") → stack
        () => {
            setBlocks(prev => prev.map(b => b.id === 3 ? { ...b, location: "stack" as const } : b));
        },
        // Step 5: console.log("Welcome!") executes → done. Output: Welcome!
        () => {
            setBlocks(prev => prev.map(b => b.id === 3 ? { ...b, location: "done" as const } : b));
            setConsoleOutput(prev => [...prev, "Welcome!"]);
        },
        // Step 6: Timer done → callback moves to queue
        () => {
            setBlocks(prev => prev.map(b => b.id === 4 ? { ...b, location: "queue" as const } : b));
        },
        // Step 7: Stack empty → callback moves to stack
        () => {
            setBlocks(prev => prev.map(b => b.id === 4 ? { ...b, location: "stack" as const } : b));
        },
        // Step 8: Callback executes → done. Output: Timer!
        () => {
            setBlocks(prev => prev.map(b => b.id === 4 ? { ...b, location: "done" as const } : b));
            setConsoleOutput(prev => [...prev, "Timer!"]);
        },
    ], []);

    const s = steps();

    const playAll = async () => {
        if (playing) return;
        reset();
        setPlaying(true);
        for (let i = 0; i < s.length; i++) {
            setStepIdx(i);
            s[i]();
            await new Promise(r => setTimeout(r, 1000));
        }
        setPlaying(false);
    };

    const stepForward = () => {
        if (playing) return;
        const next = stepIdx + 1;
        if (next < s.length) {
            setStepIdx(next);
            s[next]();
        }
    };

    const reset = () => {
        setBlocks(initialBlocks);
        setStepIdx(-1);
        setConsoleOutput([]);
        setPlaying(false);
    };

    const renderPanel = (title: string, location: EventBlock["location"], bgColor: string) => {
        const items = blocks.filter(b => b.location === location);
        return (
            <div className={`${bgColor} rounded-xl border border-border p-3 min-h-[100px]`}>
                <p className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-wider mb-2">{title}</p>
                <AnimatePresence>
                    {items.map(item => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="rounded-lg px-2 py-1.5 mb-1 text-[11px] font-mono text-white font-medium"
                            style={{ backgroundColor: item.color }}
                        >
                            {item.label}
                        </motion.div>
                    ))}
                </AnimatePresence>
                {items.length === 0 && (
                    <p className="text-[10px] text-text-secondary/30 italic">empty</p>
                )}
            </div>
        );
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Event Loop Visualizer</h3>
            <p className="text-sm text-text-secondary mb-6">
                See how JavaScript handles async code under the hood. Inspired by{" "}
                <a href="https://latentflip.com/loupe/" target="_blank" rel="noopener" className="text-blue-600 underline">Loupe</a>.
            </p>

            <div className="max-w-4xl mx-auto">
                {/* Controls */}
                <div className="flex gap-2 mb-4 justify-center">
                    <button
                        onClick={playAll}
                        disabled={playing}
                        className={`px-4 py-2 text-xs font-medium rounded-xl cursor-pointer transition-all ${playing ? "bg-green-100 text-green-700" : "bg-dark text-card hover:shadow-lg"
                            }`}
                    >
                        {playing ? "Playing..." : "▶ Play All"}
                    </button>
                    <button
                        onClick={stepForward}
                        disabled={playing || stepIdx >= s.length - 1}
                        className="px-4 py-2 text-xs font-medium rounded-xl bg-card text-text-secondary border border-border cursor-pointer hover:border-accent-dark transition-all disabled:opacity-40"
                    >
                        Step →
                    </button>
                    <button
                        onClick={reset}
                        className="px-4 py-2 text-xs font-medium rounded-xl bg-card text-text-secondary border border-border cursor-pointer hover:border-accent-dark transition-all"
                    >
                        Reset
                    </button>
                </div>

                {/* Grid of panels */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {/* Code */}
                    <div className="bg-code-bg rounded-xl border border-border p-3 min-h-[100px]">
                        <p className="text-[10px] font-bold text-code-text/50 uppercase tracking-wider mb-2">Code</p>
                        <pre className="text-[11px] font-mono text-code-text/70 leading-relaxed">
                            {eventLoopCode.map((line, i) => (
                                <div key={i} className={stepIdx >= i * 2 && stepIdx < (i * 2) + 2 ? "text-white font-bold" : ""}>
                                    {line}
                                </div>
                            ))}
                        </pre>
                    </div>
                    {renderPanel("Call Stack", "stack", "bg-card")}
                    {renderPanel("Web APIs", "webapi", "bg-amber-50/50")}
                    {renderPanel("Callback Queue", "queue", "bg-green-50/50")}
                </div>

                {/* Console output */}
                <div className="bg-code-bg rounded-xl border border-border p-3">
                    <p className="text-[10px] font-bold text-code-text/50 uppercase tracking-wider mb-2">Console Output</p>
                    <div className="min-h-[40px]">
                        {consoleOutput.map((line, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-xs font-mono text-green-400"
                            >
                                {`> ${line}`}
                            </motion.p>
                        ))}
                        {consoleOutput.length === 0 && (
                            <p className="text-xs font-mono text-code-text/30">Waiting...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ────────────────────────────────────────────────
   Main Section
   ──────────────────────────────────────────────── */
export default function JSRecapSection() {
    return (
        <SectionWrapper
            id="js-recap"
            title="Before We Code: JS Recall"
            subtitle="A quick refresher on Objects and Async JavaScript from Day 2 — essential for backend development."
        >
            <ObjectsRefresher />
            <AsyncDeepDive />
            <EventLoopVisualizer />
        </SectionWrapper>
    );
}
