"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

const eventTypes = [
    { name: "click", icon: "👆", description: "User clicks an element" },
    { name: "keydown", icon: "⌨️", description: "User presses a key" },
    { name: "submit", icon: "📤", description: "Form is submitted" },
    { name: "mouseover", icon: "🖱️", description: "Mouse enters an element" },
    { name: "load", icon: "🔄", description: "Page finishes loading" },
];

const eventCodes: Record<string, { code: string; highlights: number[] }> = {
    click: {
        code: `let btn = document.querySelector("button");

btn.addEventListener("click", function() {
  alert("Button Clicked!");
});

// Arrow function version:
btn.addEventListener("click", () => {
  alert("Button Clicked!");
});`,
        highlights: [3, 4, 5],
    },
    keydown: {
        code: `let input = document.querySelector("input");

input.addEventListener("keydown", (event) => {
  console.log("Key pressed:", event.key);
  console.log("Key code:", event.keyCode);
});`,
        highlights: [3, 4, 5],
    },
    submit: {
        code: `let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Stop page reload!
  let name = document.querySelector("#name").value;
  console.log("Submitted:", name);
});`,
        highlights: [3, 4, 5, 6],
    },
    mouseover: {
        code: `let box = document.querySelector(".box");

box.addEventListener("mouseover", () => {
  box.style.backgroundColor = "lightblue";
  console.log("Mouse entered!");
});

box.addEventListener("mouseout", () => {
  box.style.backgroundColor = "";
  console.log("Mouse left!");
});`,
        highlights: [3, 4, 5],
    },
    load: {
        code: `window.addEventListener("load", () => {
  console.log("Page fully loaded!");
  // Now safe to access all DOM elements
  let heading = document.querySelector("h1");
  heading.textContent = "Welcome!";
});`,
        highlights: [1, 2, 3],
    },
};

/* ─── Individual demo components ─── */
function ClickDemo() {
    const [clicks, setClicks] = useState(0);
    const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
    const [consoleLog, setConsoleLog] = useState<string[]>([]);

    const handleDemoClick = (e: React.MouseEvent) => {
        setClicks((p) => p + 1);
        setConsoleLog((p) => [...p.slice(-4), `"Button Clicked!" (${clicks + 1})`]);
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const newParticles = Array.from({ length: 6 }, (_, i) => ({
            id: Date.now() + i,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }));
        setParticles((p) => [...p, ...newParticles]);
        setTimeout(() => {
            setParticles((p) => p.filter((pp) => !newParticles.find((np) => np.id === pp.id)));
        }, 800);
    };

    return (
        <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-base font-semibold text-text-primary mb-2">
                Try It — Click the Button
            </h3>
            <p className="text-xs text-text-secondary/60 mb-6">
                Each click triggers the event listener
            </p>
            <div className="flex justify-center mb-6">
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDemoClick}
                        className="px-8 py-4 bg-dark text-card rounded-xl text-base font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-shadow relative overflow-visible"
                    >
                        Click Me!
                        {clicks > 0 && (
                            <motion.span
                                key={clicks}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                            >
                                {clicks}
                            </motion.span>
                        )}
                    </motion.button>
                    <AnimatePresence>
                        {particles.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
                                animate={{
                                    opacity: 0,
                                    scale: 0,
                                    x: p.x + (Math.random() - 0.5) * 100,
                                    y: p.y - Math.random() * 60 - 20,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                className="absolute w-2 h-2 rounded-full pointer-events-none"
                                style={{
                                    background: ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff6b9d"][
                                        Math.floor(Math.random() * 5)
                                    ],
                                }}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            <div className="bg-code-bg rounded-xl p-3 min-h-[80px]">
                <div className="text-[10px] text-code-text/40 mb-1 font-mono">Console:</div>
                {consoleLog.length === 0 ? (
                    <span className="text-code-text/30 text-xs font-mono italic">Waiting for clicks...</span>
                ) : (
                    consoleLog.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-green-400 text-xs font-mono"
                        >
                            &gt; {log}
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}

function KeydownDemo() {
    const [pressedKey, setPressedKey] = useState<string | null>(null);
    const [keyCode, setKeyCode] = useState<number | null>(null);
    const [consoleLog, setConsoleLog] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        setPressedKey(e.key);
        setKeyCode(e.keyCode);
        setConsoleLog((p) => [...p.slice(-4), `Key: "${e.key}" | Code: ${e.keyCode}`]);
        setTimeout(() => setPressedKey(null), 400);
    };

    return (
        <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-base font-semibold text-text-primary mb-2">
                Try It — Press Any Key
            </h3>
            <p className="text-xs text-text-secondary/60 mb-5">
                Click the input below and press any key to see the event fire
            </p>

            <div className="mb-5">
                <input
                    ref={inputRef}
                    type="text"
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-3 bg-background border-2 border-border rounded-xl text-sm font-mono text-text-primary focus:outline-none focus:border-accent-dark transition-colors text-center"
                    placeholder="Click here and press any key..."
                />
            </div>

            {/* Key visual */}
            <div className="flex justify-center mb-5">
                <AnimatePresence mode="wait">
                    {pressedKey ? (
                        <motion.div
                            key={pressedKey + Date.now()}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="px-6 py-4 bg-dark text-card rounded-xl shadow-lg"
                        >
                            <div className="text-2xl font-mono font-bold text-center">{pressedKey}</div>
                            <div className="text-xs text-card/60 text-center mt-1">keyCode: {keyCode}</div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="px-6 py-4 bg-background rounded-xl border-2 border-dashed border-border"
                        >
                            <div className="text-lg text-text-secondary/40 text-center font-mono">?</div>
                            <div className="text-xs text-text-secondary/30 text-center mt-1">press a key</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="bg-code-bg rounded-xl p-3 min-h-[80px]">
                <div className="text-[10px] text-code-text/40 mb-1 font-mono">Console:</div>
                {consoleLog.length === 0 ? (
                    <span className="text-code-text/30 text-xs font-mono italic">Waiting for keypress...</span>
                ) : (
                    consoleLog.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-green-400 text-xs font-mono"
                        >
                            &gt; {log}
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}

function SubmitDemo() {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState<string | null>(null);
    const [consoleLog, setConsoleLog] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const val = name.trim() || "(empty)";
        setSubmitted(val);
        setConsoleLog((p) => [...p.slice(-4), `Submitted: "${val}"`]);
        setName("");
    };

    return (
        <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-base font-semibold text-text-primary mb-2">
                Try It — Submit the Form
            </h3>
            <p className="text-xs text-text-secondary/60 mb-5">
                Enter a name and submit — notice the page does NOT reload
            </p>

            <form onSubmit={handleSubmit} className="mb-5">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-sm font-mono text-text-primary focus:outline-none focus:border-accent-dark transition-colors"
                        placeholder="Enter your name..."
                    />
                    <button
                        type="submit"
                        className="px-5 py-3 bg-dark text-card rounded-xl text-sm font-semibold cursor-pointer hover:shadow-lg transition-all whitespace-nowrap"
                    >
                        Submit
                    </button>
                </div>
            </form>

            <AnimatePresence>
                {submitted && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 text-center"
                    >
                        <span className="text-sm text-green-700 font-medium">
                            Form submitted with: <strong>&quot;{submitted}&quot;</strong>
                        </span>
                        <div className="text-xs text-green-600/60 mt-1">
                            event.preventDefault() stopped the page from reloading!
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-code-bg rounded-xl p-3 min-h-[80px]">
                <div className="text-[10px] text-code-text/40 mb-1 font-mono">Console:</div>
                {consoleLog.length === 0 ? (
                    <span className="text-code-text/30 text-xs font-mono italic">Waiting for submission...</span>
                ) : (
                    consoleLog.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-green-400 text-xs font-mono"
                        >
                            &gt; {log}
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}

function MouseoverDemo() {
    const [isHovered, setIsHovered] = useState(false);
    const [hoverCount, setHoverCount] = useState(0);
    const [consoleLog, setConsoleLog] = useState<string[]>([]);

    const handleMouseOver = () => {
        setIsHovered(true);
        setHoverCount((p) => p + 1);
        setConsoleLog((p) => [...p.slice(-4), `"Mouse entered!" (${hoverCount + 1})`]);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
        setConsoleLog((p) => [...p.slice(-4), `"Mouse left!"`]);
    };

    return (
        <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-base font-semibold text-text-primary mb-2">
                Try It — Hover the Box
            </h3>
            <p className="text-xs text-text-secondary/60 mb-5">
                Move your mouse over the box to trigger mouseover / mouseout
            </p>

            <div className="flex justify-center mb-5">
                <motion.div
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    animate={{
                        backgroundColor: isHovered ? "#dbeafe" : "#f9fafb",
                        borderColor: isHovered ? "#3b82f6" : "#e5e7eb",
                        scale: isHovered ? 1.05 : 1,
                        boxShadow: isHovered
                            ? "0 0 30px rgba(59, 130, 246, 0.3)"
                            : "0 0 0px rgba(0,0,0,0)",
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-40 h-40 rounded-2xl border-2 flex flex-col items-center justify-center cursor-default"
                >
                    <span className="text-3xl mb-2">{isHovered ? "🎉" : "🖱️"}</span>
                    <span className={`text-sm font-semibold ${isHovered ? "text-blue-700" : "text-text-secondary/50"}`}>
                        {isHovered ? "Hovered!" : "Hover me"}
                    </span>
                    {hoverCount > 0 && (
                        <span className="text-[10px] text-text-secondary/40 mt-1">
                            Hovers: {hoverCount}
                        </span>
                    )}
                </motion.div>
            </div>

            <div className="bg-code-bg rounded-xl p-3 min-h-[80px]">
                <div className="text-[10px] text-code-text/40 mb-1 font-mono">Console:</div>
                {consoleLog.length === 0 ? (
                    <span className="text-code-text/30 text-xs font-mono italic">Waiting for hover...</span>
                ) : (
                    consoleLog.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-green-400 text-xs font-mono"
                        >
                            &gt; {log}
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}

function LoadDemo() {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [consoleLog, setConsoleLog] = useState<string[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const simulateLoad = () => {
        setLoading(true);
        setLoaded(false);
        setProgress(0);
        setConsoleLog([]);

        let prog = 0;
        intervalRef.current = setInterval(() => {
            prog += Math.random() * 15 + 5;
            if (prog >= 100) {
                prog = 100;
                if (intervalRef.current) clearInterval(intervalRef.current);
                setProgress(100);
                setLoading(false);
                setLoaded(true);
                setConsoleLog((p) => [...p, `"Page fully loaded!"`]);
            } else {
                setProgress(Math.round(prog));
                setConsoleLog((p) => [...p.slice(-3), `Loading... ${Math.round(prog)}%`]);
            }
        }, 300);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-base font-semibold text-text-primary mb-2">
                Try It — Simulate Page Load
            </h3>
            <p className="text-xs text-text-secondary/60 mb-5">
                The load event fires when the entire page (images, scripts, etc.) is ready
            </p>

            <button
                onClick={simulateLoad}
                disabled={loading}
                className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer mb-5 ${loading
                    ? "bg-amber-100 text-amber-700"
                    : "bg-dark text-card hover:shadow-lg"
                    }`}
            >
                {loading ? "Loading page..." : loaded ? "Simulate Again" : "Simulate window.load"}
            </button>

            {/* Progress bar */}
            {(loading || loaded) && (
                <div className="mb-5">
                    <div className="w-full bg-background rounded-full h-3 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className={`h-full rounded-full transition-colors ${loaded ? "bg-green-500" : "bg-amber-400"
                                }`}
                        />
                    </div>
                    <div className="text-xs text-text-secondary/60 text-right mt-1">{progress}%</div>
                </div>
            )}

            <AnimatePresence>
                {loaded && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 text-center"
                    >
                        <span className="text-sm text-green-700 font-semibold">
                            window &quot;load&quot; event fired!
                        </span>
                        <div className="text-xs text-green-600/60 mt-1">
                            All resources loaded — DOM is fully ready
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-code-bg rounded-xl p-3 min-h-[80px]">
                <div className="text-[10px] text-code-text/40 mb-1 font-mono">Console:</div>
                {consoleLog.length === 0 ? (
                    <span className="text-code-text/30 text-xs font-mono italic">Click to simulate...</span>
                ) : (
                    consoleLog.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`text-xs font-mono ${log.includes("fully") ? "text-green-400" : "text-amber-400"}`}
                        >
                            &gt; {log}
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}

/* ─── Main Section ─── */
export default function EventListenersSection() {
    const [activeEvent, setActiveEvent] = useState(0);

    const demos = [
        <ClickDemo key="click" />,
        <KeydownDemo key="keydown" />,
        <SubmitDemo key="submit" />,
        <MouseoverDemo key="mouseover" />,
        <LoadDemo key="load" />,
    ];

    return (
        <SectionWrapper
            id="events"
            title="Event Listeners"
            subtitle="JavaScript responds to user actions — clicks, typing, scrolling, and more."
        >
            {/* Event types */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
                {eventTypes.map((evt, i) => (
                    <motion.button
                        key={evt.name}
                        whileHover={{ scale: 1.05, y: -2 }}
                        onClick={() => setActiveEvent(i)}
                        className={`px-4 py-3 rounded-xl text-sm transition-all cursor-pointer ${activeEvent === i
                            ? "bg-dark text-card shadow-md"
                            : "bg-card text-text-primary border border-border hover:border-accent-dark"
                            }`}
                    >
                        <span className="text-lg mr-2">{evt.icon}</span>
                        <span className="font-mono font-medium">{evt.name}</span>
                    </motion.button>
                ))}
            </div>
            <div className="text-center text-sm text-text-secondary mb-12">
                {eventTypes[activeEvent].description}
            </div>

            {/* Interactive demo + Code */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Demo */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeEvent}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {demos[activeEvent]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Code */}
                <div className="lg:col-span-3">
                    <div className="text-xs font-medium text-text-secondary/60 mb-2">
                        The code behind it
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeEvent}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CodeBlock
                                code={eventCodes[eventTypes[activeEvent].name].code}
                                language="javascript"
                                highlightLines={eventCodes[eventTypes[activeEvent].name].highlights}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </SectionWrapper>
    );
}
