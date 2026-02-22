"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

type ActiveTab = "difference" | "playground" | "specificity";

const elements = [
    { id: "card-1", label: "Card 1", classes: ["card", "featured"] },
    { id: "card-2", label: "Card 2", classes: ["card"] },
    { id: "card-3", label: "Card 3", classes: ["card", "dark"] },
    { id: "hero-banner", label: "Hero Banner", classes: ["banner", "wide"] },
];

// Specificity battle pairs
const battles = [
    {
        left: { selector: ".card", type: "Class", specificity: "0-1-0", emoji: "🎒" },
        right: { selector: "#hero-banner", type: "ID", specificity: "1-0-0", emoji: "🎯" },
        winner: "right" as const,
        lesson: "ID always beats class. It's 10x more specific!",
    },
    {
        left: { selector: "div", type: "Element", specificity: "0-0-1", emoji: "🧱" },
        right: { selector: ".card", type: "Class", specificity: "0-1-0", emoji: "🎒" },
        winner: "right" as const,
        lesson: "Class beats element selector. That's why we use classes most.",
    },
    {
        left: { selector: ".card.featured", type: "2 Classes", specificity: "0-2-0", emoji: "🎒🎒" },
        right: { selector: "#card-1", type: "ID", specificity: "1-0-0", emoji: "🎯" },
        winner: "right" as const,
        lesson: "Even 2 classes can't beat 1 ID. IDs are nuclear options.",
    },
    {
        left: { selector: "style=\"...\"", type: "Inline Style", specificity: "1-0-0-0", emoji: "💣" },
        right: { selector: "#card-1", type: "ID", specificity: "1-0-0", emoji: "🎯" },
        winner: "left" as const,
        lesson: "Inline styles beat everything (except !important). That's why we avoid them.",
    },
];

export default function ClassVsId() {
    const [activeTab, setActiveTab] = useState<ActiveTab>("difference");
    const [selectedSelector, setSelectedSelector] = useState<string | null>(null);
    const [battleIdx, setBattleIdx] = useState(0);
    const [showWinner, setShowWinner] = useState(false);


    const currentBattle = battles[battleIdx];
    const matchingIds = getMatchingIds(selectedSelector ?? "");

    const tabs: { id: ActiveTab; label: string; emoji: string }[] = [
        { id: "difference", label: "Class vs ID", emoji: "🆚" },
        { id: "playground", label: "Selector Playground", emoji: "🎮" },
        { id: "specificity", label: "Specificity Battle", emoji: "⚔️" },
    ];

    return (
        <SectionWrapper
            id="class-vs-id"
            title="Class & ID — Naming Your Elements"
            subtitle={`"Class is a name tag at a conference. ID is a social security number — unique to one person."`}
        >
            {/* Tab selector */}
            <div className="flex flex-wrap gap-2 mb-8">
                {tabs.map((t) => (
                    <motion.button
                        key={t.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                            setActiveTab(t.id);
                            setSelectedSelector(null);
                            setShowWinner(false);
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${activeTab === t.id
                            ? "bg-dark text-card shadow-md"
                            : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                            }`}
                    >
                        {t.emoji} {t.label}
                    </motion.button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* ===== TAB 1: Class vs ID Comparison ===== */}
                {activeTab === "difference" && (
                    <motion.div
                        key="difference"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Class card */}
                            <div className="bg-card rounded-2xl border border-border overflow-hidden">
                                <div className="px-5 py-3 border-b border-border flex items-center gap-3" style={{ background: "rgba(99, 102, 241, 0.08)" }}>
                                    <span className="text-2xl">🎒</span>
                                    <div>
                                        <h4 className="text-sm font-semibold text-text-primary">Class <code className="text-indigo-500 ml-1">.className</code></h4>
                                        <p className="text-xs text-text-secondary">Reusable — many elements can share it</p>
                                    </div>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                            <span className="text-text-secondary">Can be used on <strong>multiple</strong> elements</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                            <span className="text-text-secondary">An element can have <strong>multiple</strong> classes</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                            <span className="text-text-secondary">Selected with a <strong>dot</strong>: <code className="text-indigo-500">.card</code></span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                            <span className="text-text-secondary">Use for <strong>styling</strong> — this is your daily driver</span>
                                        </div>
                                    </div>

                                    <div className="bg-code-bg rounded-xl p-4 font-mono text-xs">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-red-400/60" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                                            <div className="w-2 h-2 rounded-full bg-green-400/60" />
                                            <span className="text-white/20 text-[10px] ml-1">HTML</span>
                                        </div>
                                        <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">
                                            {`<div class="card">Card 1</div>
<div class="card">Card 2</div>
<div class="card">Card 3</div>

<!-- ALL three get styled! -->`}
                                        </pre>
                                    </div>

                                    <div className="bg-code-bg rounded-xl p-4 font-mono text-xs">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-red-400/60" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                                            <div className="w-2 h-2 rounded-full bg-green-400/60" />
                                            <span className="text-white/20 text-[10px] ml-1">CSS</span>
                                        </div>
                                        <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">
                                            {`.card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
}`}
                                        </pre>
                                    </div>

                                    <p className="text-xs text-text-secondary/60 italic text-center">
                                        Like a school uniform — everyone in the class wears the same thing
                                    </p>
                                </div>
                            </div>

                            {/* ID card */}
                            <div className="bg-card rounded-2xl border border-border overflow-hidden">
                                <div className="px-5 py-3 border-b border-border flex items-center gap-3" style={{ background: "rgba(232, 101, 46, 0.08)" }}>
                                    <span className="text-2xl">🎯</span>
                                    <div>
                                        <h4 className="text-sm font-semibold text-text-primary">ID <code className="ml-1" style={{ color: "#E8652E" }}>#uniqueName</code></h4>
                                        <p className="text-xs text-text-secondary">Unique — only ONE element can have it</p>
                                    </div>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                            <span className="text-text-secondary">Must be <strong>unique</strong> on the page</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                            <span className="text-text-secondary">An element can only have <strong>one</strong> ID</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                            <span className="text-text-secondary">Selected with a <strong>hash</strong>: <code style={{ color: "#E8652E" }}>#hero</code></span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                            <span className="text-text-secondary">Use for <strong>JavaScript targeting</strong> & anchors</span>
                                        </div>
                                    </div>

                                    <div className="bg-code-bg rounded-xl p-4 font-mono text-xs">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-red-400/60" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                                            <div className="w-2 h-2 rounded-full bg-green-400/60" />
                                            <span className="text-white/20 text-[10px] ml-1">HTML</span>
                                        </div>
                                        <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">
                                            {`<div id="hero-banner">
  Welcome!
</div>

<!-- Only ONE element with
     this ID on the page! -->`}
                                        </pre>
                                    </div>

                                    <div className="bg-code-bg rounded-xl p-4 font-mono text-xs">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-red-400/60" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                                            <div className="w-2 h-2 rounded-full bg-green-400/60" />
                                            <span className="text-white/20 text-[10px] ml-1">CSS</span>
                                        </div>
                                        <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">
                                            {`#hero-banner {
  background: orange;
  font-size: 2rem;
  text-align: center;
}`}
                                        </pre>
                                    </div>

                                    <p className="text-xs text-text-secondary/60 italic text-center">
                                        Like a passport number — unique to one person only
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pro tip */}
                        <div className="mt-6 bg-dark rounded-2xl p-5 text-center">
                            <p className="text-card text-sm font-medium">
                                💡 <strong>The golden rule:</strong> Use{" "}
                                <code className="text-indigo-400">.class</code> for styling (99% of the time).
                                Use <code style={{ color: "#E8652E" }}>#id</code> for JavaScript & anchor links.
                            </p>
                            <p className="text-card/50 text-xs mt-1">
                                If you find yourself using IDs for styling, you&apos;re probably doing it wrong.
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* ===== TAB 2: Selector Playground ===== */}
                {activeTab === "playground" && (
                    <motion.div
                        key="playground"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Selectors to click */}
                            <div>
                                <p className="text-sm text-text-secondary mb-4">
                                    Click a CSS selector and watch which elements light up:
                                </p>

                                <div className="space-y-2 mb-6">
                                    {/* Class selectors */}
                                    <p className="text-xs text-text-secondary/50 uppercase tracking-wider font-semibold mt-2 mb-1">Class selectors</p>
                                    {[".card", ".featured", ".dark", ".banner", ".wide"].map((sel) => (
                                        <motion.button
                                            key={sel}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => setSelectedSelector(selectedSelector === sel ? null : sel)}
                                            className={`px-4 py-2 text-sm font-mono rounded-xl transition-all cursor-pointer block w-full text-left ${selectedSelector === sel
                                                ? "bg-indigo-500 text-white shadow-md"
                                                : "bg-card text-text-secondary border border-border hover:border-indigo-300"
                                                }`}
                                        >
                                            {sel}{" "}
                                            <span className="text-xs opacity-60">
                                                → {getMatchingIds(sel).length} match{getMatchingIds(sel).length !== 1 ? "es" : ""}
                                            </span>
                                        </motion.button>
                                    ))}

                                    {/* ID selectors */}
                                    <p className="text-xs text-text-secondary/50 uppercase tracking-wider font-semibold mt-4 mb-1">ID selectors</p>
                                    {["#card-1", "#card-2", "#card-3", "#hero-banner"].map((sel) => (
                                        <motion.button
                                            key={sel}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => setSelectedSelector(selectedSelector === sel ? null : sel)}
                                            className={`px-4 py-2 text-sm font-mono rounded-xl transition-all cursor-pointer block w-full text-left ${selectedSelector === sel
                                                ? "text-white shadow-md"
                                                : "bg-card text-text-secondary border border-border hover:border-orange-300"
                                                }`}
                                            style={selectedSelector === sel ? { background: "#E8652E" } : {}}
                                        >
                                            {sel}{" "}
                                            <span className="text-xs opacity-60">
                                                → {getMatchingIds(sel).length} match
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Code showing what you'd write */}
                                {selectedSelector && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-code-bg rounded-xl p-4 font-mono text-xs"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-red-400/60" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                                            <div className="w-2 h-2 rounded-full bg-green-400/60" />
                                            <span className="text-white/20 text-[10px] ml-1">style.css</span>
                                        </div>
                                        <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">
                                            {`${selectedSelector} {\n  /* styles go here */\n  background: ${selectedSelector.startsWith("#") ? "orange" : "cornflowerblue"};\n}`}
                                        </pre>
                                    </motion.div>
                                )}
                            </div>

                            {/* Visual elements */}
                            <div className="bg-card rounded-2xl border border-border p-6">
                                <p className="text-xs text-text-secondary/50 mb-4 font-medium">HTML Elements on the page:</p>
                                <div className="space-y-3">
                                    {elements.map((el) => {
                                        const isMatch = matchingIds.includes(el.id);
                                        return (
                                            <motion.div
                                                key={el.id}
                                                layout
                                                animate={{
                                                    scale: isMatch ? 1.03 : 1,
                                                    borderColor: isMatch
                                                        ? selectedSelector?.startsWith("#") ? "#E8652E" : "#6366f1"
                                                        : "var(--color-border)",
                                                }}
                                                className="rounded-xl border-2 p-4 transition-all"
                                                style={{
                                                    background: isMatch
                                                        ? selectedSelector?.startsWith("#")
                                                            ? "rgba(232, 101, 46, 0.08)"
                                                            : "rgba(99, 102, 241, 0.08)"
                                                        : undefined,
                                                    borderColor: isMatch
                                                        ? selectedSelector?.startsWith("#") ? "#E8652E" : "#6366f1"
                                                        : undefined,
                                                }}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-semibold text-text-primary">{el.label}</span>
                                                    {isMatch && (
                                                        <motion.span
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                                                            style={{ background: selectedSelector?.startsWith("#") ? "#E8652E" : "#6366f1" }}
                                                        >
                                                            MATCH ✓
                                                        </motion.span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-background text-text-secondary" style={{ color: "#E8652E" }}>
                                                        id=&quot;{el.id}&quot;
                                                    </code>
                                                    {el.classes.map((cls) => (
                                                        <code
                                                            key={cls}
                                                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-background text-indigo-500"
                                                        >
                                                            .{cls}
                                                        </code>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ===== TAB 3: Specificity Battle ===== */}
                {activeTab === "specificity" && (
                    <motion.div
                        key="specificity"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                    >
                        <p className="text-sm text-text-secondary mb-6 text-center">
                            When two CSS rules target the same element, who wins? <strong>The more specific one.</strong>
                        </p>

                        {/* Battle arena */}
                        <div className="bg-card rounded-2xl border border-border p-6 mb-4">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-xs text-text-secondary/50 uppercase tracking-wider font-semibold">
                                    Battle {battleIdx + 1} of {battles.length}
                                </span>
                                <div className="flex gap-1.5">
                                    {battles.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => { setBattleIdx(i); setShowWinner(false); }}
                                            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${battleIdx === i ? "bg-dark scale-125" : "bg-border"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                                {/* Left fighter */}
                                <motion.div
                                    animate={{
                                        scale: showWinner && currentBattle.winner === "left" ? 1.05 : 1,
                                        borderColor: showWinner
                                            ? currentBattle.winner === "left" ? "#10b981" : "#ef4444"
                                            : "var(--color-border)",
                                    }}
                                    className="rounded-xl border-2 p-5 text-center transition-all"
                                    style={{
                                        background: showWinner
                                            ? currentBattle.winner === "left"
                                                ? "rgba(16, 185, 129, 0.08)"
                                                : "rgba(239, 68, 68, 0.06)"
                                            : undefined,
                                        borderColor: showWinner
                                            ? currentBattle.winner === "left" ? "#10b981" : "#ef4444"
                                            : undefined,
                                    }}
                                >
                                    <span className="text-3xl block mb-2">{currentBattle.left.emoji}</span>
                                    <code className="text-sm font-mono font-bold text-text-primary block mb-1">
                                        {currentBattle.left.selector}
                                    </code>
                                    <span className="text-xs text-text-secondary block mb-2">{currentBattle.left.type}</span>
                                    <span className="text-[10px] font-mono text-text-secondary/50 block">
                                        Specificity: {currentBattle.left.specificity}
                                    </span>
                                    {showWinner && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`text-xs font-bold mt-2 block ${currentBattle.winner === "left" ? "text-green-500" : "text-red-400"
                                                }`}
                                        >
                                            {currentBattle.winner === "left" ? "WINNER 🏆" : "LOSES"}
                                        </motion.span>
                                    )}
                                </motion.div>

                                {/* VS */}
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-2xl font-black text-text-secondary/30">VS</span>
                                    {!showWinner && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setShowWinner(true)}
                                            className="px-4 py-2 text-xs font-bold rounded-xl bg-dark text-card shadow-md cursor-pointer"
                                        >
                                            FIGHT!
                                        </motion.button>
                                    )}
                                </div>

                                {/* Right fighter */}
                                <motion.div
                                    animate={{
                                        scale: showWinner && currentBattle.winner === "right" ? 1.05 : 1,
                                        borderColor: showWinner
                                            ? currentBattle.winner === "right" ? "#10b981" : "#ef4444"
                                            : "var(--color-border)",
                                    }}
                                    className="rounded-xl border-2 p-5 text-center transition-all"
                                    style={{
                                        background: showWinner
                                            ? currentBattle.winner === "right"
                                                ? "rgba(16, 185, 129, 0.08)"
                                                : "rgba(239, 68, 68, 0.06)"
                                            : undefined,
                                        borderColor: showWinner
                                            ? currentBattle.winner === "right" ? "#10b981" : "#ef4444"
                                            : undefined,
                                    }}
                                >
                                    <span className="text-3xl block mb-2">{currentBattle.right.emoji}</span>
                                    <code className="text-sm font-mono font-bold text-text-primary block mb-1">
                                        {currentBattle.right.selector}
                                    </code>
                                    <span className="text-xs text-text-secondary block mb-2">{currentBattle.right.type}</span>
                                    <span className="text-[10px] font-mono text-text-secondary/50 block">
                                        Specificity: {currentBattle.right.specificity}
                                    </span>
                                    {showWinner && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`text-xs font-bold mt-2 block ${currentBattle.winner === "right" ? "text-green-500" : "text-red-400"
                                                }`}
                                        >
                                            {currentBattle.winner === "right" ? "WINNER 🏆" : "LOSES"}
                                        </motion.span>
                                    )}
                                </motion.div>
                            </div>

                            {/* Lesson */}
                            <AnimatePresence>
                                {showWinner && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-5 px-4 py-3 rounded-xl bg-background border border-border text-center"
                                    >
                                        <p className="text-sm text-text-secondary font-medium">
                                            💡 {currentBattle.lesson}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Specificity hierarchy */}
                        <div className="bg-dark rounded-2xl p-5">
                            <p className="text-card text-xs font-semibold uppercase tracking-wider mb-3 text-center">
                                Specificity Hierarchy (lowest → highest)
                            </p>
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                                {[
                                    { label: "Element", example: "div", color: "rgba(255,255,255,0.1)" },
                                    { label: "→", example: "", color: "transparent" },
                                    { label: "Class", example: ".card", color: "rgba(99,102,241,0.2)" },
                                    { label: "→", example: "", color: "transparent" },
                                    { label: "ID", example: "#hero", color: "rgba(232,101,46,0.2)" },
                                    { label: "→", example: "", color: "transparent" },
                                    { label: "Inline", example: "style=\"\"", color: "rgba(239,68,68,0.2)" },
                                    { label: "→", example: "", color: "transparent" },
                                    { label: "!important", example: "☠️", color: "rgba(255,255,255,0.15)" },
                                ].map((item, i) => (
                                    item.label === "→" ? (
                                        <span key={i} className="text-card/30 text-sm">→</span>
                                    ) : (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 rounded-lg text-xs font-mono text-card font-medium"
                                            style={{ background: item.color }}
                                        >
                                            {item.example ? `${item.label} (${item.example})` : item.label}
                                        </span>
                                    )
                                ))}
                            </div>
                            <p className="text-card/40 text-[10px] text-center mt-3">
                                Never use !important unless you&apos;re debugging. It&apos;s the nuclear option.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );

    function getMatchingIds(selector: string): string[] {
        if (selector.startsWith("#")) {
            const id = selector.slice(1);
            return elements.filter((e) => e.id === id).map((e) => e.id);
        }
        if (selector.startsWith(".")) {
            const cls = selector.slice(1);
            return elements.filter((e) => e.classes.includes(cls)).map((e) => e.id);
        }
        return [];
    }
}
