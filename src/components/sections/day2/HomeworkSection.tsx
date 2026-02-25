"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

const thinkingSteps = [
    {
        step: 1,
        title: "Understand the Problem",
        desc: "Read it carefully. What is the input? What is the expected output?",
        icon: "🤔",
        color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
        step: 2,
        title: "Break It Down",
        desc: "Split the big problem into tiny steps. Each step should do ONE thing.",
        icon: "✂️",
        color: "bg-purple-50 border-purple-200 text-purple-700",
    },
    {
        step: 3,
        title: "Write Pseudocode",
        desc: 'Write the logic in plain English first. Example: "When button is clicked, change the color."',
        icon: "📝",
        color: "bg-amber-50 border-amber-200 text-amber-700",
    },
    {
        step: 4,
        title: "Code It Step by Step",
        desc: "Turn each pseudocode line into real JavaScript. Test after each step.",
        icon: "💻",
        color: "bg-green-50 border-green-200 text-green-700",
    },
    {
        step: 5,
        title: "Test & Debug",
        desc: "Try different inputs. Open the console. Read the error messages carefully.",
        icon: "🧪",
        color: "bg-red-50 border-red-200 text-red-700",
    },
];

const colorButtons = [
    { name: "Red", color: "#ef4444", bg: "bg-red-500", hover: "hover:bg-red-600" },
    { name: "Blue", color: "#3b82f6", bg: "bg-blue-500", hover: "hover:bg-blue-600" },
    { name: "Green", color: "#22c55e", bg: "bg-green-500", hover: "hover:bg-green-600" },
    { name: "Yellow", color: "#eab308", bg: "bg-yellow-500", hover: "hover:bg-yellow-600" },
    { name: "Purple", color: "#a855f7", bg: "bg-purple-500", hover: "hover:bg-purple-600" },
];

const requirements = [
    "Create an HTML page with 5 colored buttons (Red, Blue, Green, Yellow, Purple)",
    "Each button should change the page background to that color when clicked",
    "Display the currently selected color name on the page",
    'Add a "Reset" button that changes the background back to white',
    "BONUS: Add a hover effect on buttons (scale or glow)",
];

/* ─── Sub-component: Interactive toggle button demo ─── */
function ExampleToggleDemo() {
    const [isOn, setIsOn] = useState(false);

    return (
        <div className="rounded-xl border-2 border-border overflow-hidden">
            {/* Mini browser chrome */}
            <div className="bg-gray-100 border-b border-gray-200 px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded px-2 py-0.5 text-[10px] text-gray-400 font-mono text-center border border-gray-200">
                    index.html
                </div>
            </div>

            {/* Page content */}
            <div className="bg-white p-8 text-center min-h-[140px] flex flex-col items-center justify-center">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOn(!isOn)}
                    animate={{ backgroundColor: isOn ? "#22c55e" : "#ef4444" }}
                    className="px-8 py-4 text-white rounded-xl text-lg font-bold cursor-pointer shadow-md hover:shadow-lg transition-shadow border-none"
                    style={{ fontFamily: "Arial, sans-serif" }}
                >
                    {isOn ? "ON" : "OFF"}
                </motion.button>
                <p className="text-gray-400 text-xs mt-3" style={{ fontFamily: "Arial, sans-serif" }}>
                    Click to toggle!
                </p>
            </div>
        </div>
    );
}

/* ─── Sub-component: Code reveal toggle ─── */
function ExampleCodeReveal() {
    const [showCode, setShowCode] = useState(false);

    return (
        <div>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCode(!showCode)}
                className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer border ${showCode
                    ? "bg-amber-50 border-amber-200 text-amber-700"
                    : "bg-background border-border text-text-secondary hover:border-accent-dark"
                    }`}
            >
                {showCode ? "Hide Code ▲" : "Reveal Code ▼"}
            </motion.button>
            <AnimatePresence>
                {showCode && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-3">
                            <CodeBlock
                                code={`// Step 1: Select the button
let btn = document.querySelector("#toggle-btn");

// Step 2: Add click listener
btn.addEventListener("click", () => {

  // Step 3: Toggle text and color
  if (btn.textContent === "OFF") {
    btn.textContent = "ON";
    btn.style.backgroundColor = "green";
  } else {
    btn.textContent = "OFF";
    btn.style.backgroundColor = "red";
  }
});`}
                                language="javascript"
                                highlightLines={[2, 5, 8, 12]}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function HomeworkSection() {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedName, setSelectedName] = useState("None");

    const handleColorClick = (name: string, color: string) => {
        setSelectedColor(color);
        setSelectedName(name);
    };

    const handleReset = () => {
        setSelectedColor(null);
        setSelectedName("None");
    };

    return (
        <SectionWrapper
            id="homework"
            title="Homework Time"
            subtitle="Before we code, let's learn how to THINK about a problem — then apply it."
        >
            {/* ── How to Think ── */}
            <div className="max-w-4xl mx-auto mb-16">
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                    How to Approach Any Coding Problem
                </h3>
                <p className="text-sm text-text-secondary mb-8 leading-relaxed">
                    Good developers don&apos;t just start typing code. They think first.
                    Here&apos;s the 5-step framework:
                </p>

                <div className="space-y-3">
                    {thinkingSteps.map((s, i) => (
                        <motion.div
                            key={s.step}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`flex items-start gap-4 p-4 rounded-xl border ${s.color}`}
                        >
                            <div className="text-2xl mt-0.5">{s.icon}</div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold opacity-50">STEP {s.step}</span>
                                    <h4 className="text-sm font-semibold">{s.title}</h4>
                                </div>
                                <p className="text-xs leading-relaxed opacity-80">{s.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Example — Visual Destructuring */}
                <div className="mt-10 bg-card rounded-2xl border border-border p-6">
                    <h4 className="text-base font-semibold text-text-primary mb-1">
                        Example: Let&apos;s apply this to a problem
                    </h4>
                    <div className="bg-background rounded-xl p-4 mb-6">
                        <p className="text-sm text-text-secondary italic">
                            &quot;Create a button that toggles between ON and OFF when clicked.&quot;
                        </p>
                    </div>

                    {/* Step 1: Understand — visual I/O */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">1</span>
                            <span className="text-sm font-semibold text-text-primary">Understand — What goes in? What comes out?</span>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 text-center">
                                <div className="text-lg mb-1">👆</div>
                                <div className="text-xs font-semibold text-blue-700">INPUT</div>
                                <div className="text-xs text-blue-600 mt-0.5">Button Click</div>
                            </div>
                            <div className="text-2xl text-text-secondary/30">→</div>
                            <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 text-center">
                                <div className="text-lg mb-1">🔄</div>
                                <div className="text-xs font-semibold text-green-700">OUTPUT</div>
                                <div className="text-xs text-green-600 mt-0.5">Toggle ON / OFF</div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Break it down — connected cards */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">2</span>
                            <span className="text-sm font-semibold text-text-primary">Break it down — 3 tiny steps</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {[
                                { label: "Create a button", icon: "🔲", tag: "HTML" },
                                { label: "Add click listener", icon: "👂", tag: "JS" },
                                { label: "Toggle text & color", icon: "🔄", tag: "JS" },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-background border border-border rounded-xl px-4 py-3 text-center min-w-[120px]"
                                    >
                                        <div className="text-lg mb-1">{s.icon}</div>
                                        <div className="text-xs font-medium text-text-primary">{s.label}</div>
                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1 inline-block ${s.tag === "HTML"
                                            ? "bg-orange-100 text-orange-600"
                                            : "bg-yellow-100 text-yellow-700"
                                            }`}>{s.tag}</span>
                                    </motion.div>
                                    {i < 2 && <span className="text-lg text-text-secondary/30 hidden sm:block">→</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 3: Live Demo — actual working button */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center">3</span>
                            <span className="text-sm font-semibold text-text-primary">Try it — This is how it should work</span>
                        </div>
                        <ExampleToggleDemo />
                    </div>

                    {/* Step 4: See the code */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">4</span>
                            <span className="text-sm font-semibold text-text-primary">See the code — How it works</span>
                        </div>
                        <ExampleCodeReveal />
                    </div>
                </div>
            </div>

            {/* ── Homework Project ── */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-card rounded-2xl border-2 border-accent-dark/30 p-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">🎨</span>
                        <h3 className="text-xl font-semibold text-text-primary">
                            Project: Interactive Color Picker
                        </h3>
                    </div>
                    <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                        Build a page with colored buttons that change the page background.
                        This uses everything you learned today: DOM, Events, Functions.
                    </p>

                    {/* Requirements */}
                    <div className="bg-background rounded-xl p-5 mb-8">
                        <h4 className="text-sm font-semibold text-text-primary mb-3">
                            Requirements Checklist:
                        </h4>
                        <div className="space-y-2">
                            {requirements.map((req, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-5 h-5 rounded border-2 border-border shrink-0 mt-0.5" />
                                    <span
                                        className={`text-sm ${i === requirements.length - 1
                                            ? "text-amber-600 font-medium"
                                            : "text-text-secondary"
                                            }`}
                                    >
                                        {req}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ── Visual Preview: This is what it should look like ── */}
                    <h4 className="text-sm font-semibold text-text-primary mb-3">
                        This is what your finished project should look like:
                    </h4>
                    <p className="text-xs text-text-secondary mb-4">
                        Try clicking the buttons below — your homework should work exactly like this!
                    </p>

                    <div
                        className="rounded-2xl border-2 border-border overflow-hidden transition-colors duration-300"
                        style={{ backgroundColor: selectedColor || "#ffffff" }}
                    >
                        {/* Fake browser chrome */}
                        <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="flex-1 bg-white rounded-lg px-3 py-1 text-xs text-gray-400 font-mono text-center border border-gray-200">
                                index.html
                            </div>
                        </div>

                        {/* Page content */}
                        <div className="p-8 text-center min-h-[300px] flex flex-col items-center justify-center transition-colors duration-300">
                            <h2
                                className="text-3xl font-bold mb-2 transition-colors duration-300"
                                style={{ color: selectedColor ? "#ffffff" : "#1a1a1a" }}
                            >
                                Pick a Color
                            </h2>
                            <p
                                className="text-base mb-8 transition-colors duration-300"
                                style={{ color: selectedColor ? "rgba(255,255,255,0.8)" : "#666666" }}
                            >
                                Current:{" "}
                                <span className="font-semibold">
                                    {selectedName}
                                </span>
                            </p>

                            {/* Color buttons */}
                            <div className="flex flex-wrap gap-3 justify-center mb-6">
                                {colorButtons.map((btn) => (
                                    <motion.button
                                        key={btn.name}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleColorClick(btn.name, btn.color)}
                                        className={`px-6 py-3 ${btn.bg} ${btn.hover} text-white font-semibold rounded-xl text-base cursor-pointer shadow-md hover:shadow-lg transition-all border-none`}
                                    >
                                        {btn.name}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Reset button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleReset}
                                className="px-6 py-2.5 bg-white/90 text-gray-700 font-medium rounded-xl text-sm cursor-pointer border-2 border-gray-300 hover:border-gray-400 hover:bg-white transition-all shadow-sm"
                            >
                                Reset
                            </motion.button>
                        </div>
                    </div>

                    {/* Arrow pointing down to hints */}
                    <div className="text-center my-6">
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-text-secondary/40 text-sm"
                        >
                            Now build this yourself using HTML, CSS & JS ↓
                        </motion.div>
                    </div>

                    {/* Hints */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-amber-800 mb-2">
                            Hints (try without looking first!):
                        </h4>
                        <div className="space-y-1 text-xs text-amber-700 font-mono leading-relaxed">
                            <p>
                                1. Structure:{" "}
                                <code className="bg-amber-100 px-1 rounded">
                                    &lt;h1&gt;
                                </code>{" "}
                                for title,{" "}
                                <code className="bg-amber-100 px-1 rounded">
                                    &lt;p&gt;
                                </code>{" "}
                                for current color,{" "}
                                <code className="bg-amber-100 px-1 rounded">
                                    &lt;button class=&quot;btn&quot;&gt;
                                </code>{" "}
                                for each color
                            </p>
                            <p>
                                2. Style with{" "}
                                <code className="bg-amber-100 px-1 rounded">
                                    padding, border-radius, font-size, cursor: pointer
                                </code>{" "}
                                — things you learned on Day 1!
                            </p>
                            <p>
                                3.{" "}
                                <code className="bg-amber-100 px-1 rounded">
                                    document.querySelectorAll(&quot;.btn&quot;)
                                </code>{" "}
                                → gets all color buttons
                            </p>
                            <p>
                                4.{" "}
                                <code className="bg-amber-100 px-1 rounded">
                                    .forEach(btn =&gt; btn.addEventListener(&quot;click&quot;, ...))
                                </code>{" "}
                                → add listener to each
                            </p>
                            <p>
                                5.{" "}
                                <code className="bg-amber-100 px-1 rounded">
                                    document.body.style.backgroundColor = color
                                </code>{" "}
                                → changes the background
                            </p>
                            <p>
                                6.{" "}
                                <code className="bg-amber-100 px-1 rounded">
                                    .btn:hover {"{"} transform: scale(1.1); {"}"}
                                </code>{" "}
                                → CSS hover effect for the bonus
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
