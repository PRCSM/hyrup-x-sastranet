"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

/*
 * Website Destructure — shows a polished website mockup,
 * then overlays the HTML structure with CSS hints on hover.
 */

interface ChildSection {
    id: string;
    tag: string;
    label: string;
    color: string;
    top: string;
    left: string;
    width: string;
    height: string;
    css: string;
}

interface Section {
    id: string;
    tag: string;
    label: string;
    color: string;
    top: string;
    left: string;
    width: string;
    height: string;
    css: string;
    children?: ChildSection[];
}

const sections: Section[] = [
    {
        id: "nav",
        tag: "<nav>",
        label: "Navigation",
        color: "#3B82F6",
        top: "0%",
        left: "0%",
        width: "100%",
        height: "10%",
        css: "display: flex;\njustify-content: space-between;\nalign-items: center;\npadding: 0 4%;",
        children: [
            { id: "logo", tag: "<div>", label: "Logo", color: "#60A5FA", top: "15%", left: "2%", width: "15%", height: "70%", css: "font-weight: bold;\nfont-size: 1.2rem;" },
            { id: "nav-links", tag: "<ul>", label: "Nav Links", color: "#93C5FD", top: "15%", left: "30%", width: "40%", height: "70%", css: "display: flex;\ngap: 24px;\nlist-style: none;" },
            { id: "menu-btn", tag: "<button>", label: "Menu", color: "#60A5FA", top: "15%", left: "90%", width: "8%", height: "70%", css: "background: none;\nborder: none;\ncursor: pointer;" },
        ],
    },
    {
        id: "hero",
        tag: "<section>",
        label: "Hero",
        color: "#10B981",
        top: "10%",
        left: "0%",
        width: "100%",
        height: "70%",
        css: "display: flex;\nalign-items: center;\npadding: 0 8%;\ngap: 4%;",
        children: [
            { id: "hero-left", tag: "<div>", label: "Text Content", color: "#34D399", top: "5%", left: "3%", width: "42%", height: "90%", css: "display: flex;\nflex-direction: column;\njustify-content: center;\ngap: 16px;" },
            { id: "hero-right", tag: "<div>", label: "Image", color: "#6EE7B7", top: "3%", left: "48%", width: "50%", height: "94%", css: "display: flex;\nalign-items: flex-end;\njustify-content: center;" },
        ],
    },
    {
        id: "stats",
        tag: "<section>",
        label: "Stats Bar",
        color: "#8B5CF6",
        top: "80%",
        left: "0%",
        width: "100%",
        height: "20%",
        css: "display: flex;\nborder-top: 1px solid #eee;",
        children: [
            { id: "stat-1", tag: "<div>", label: "Stat Card", color: "#A78BFA", top: "8%", left: "1%", width: "32%", height: "84%", css: "flex: 1;\ndisplay: flex;\nflex-direction: column;\njustify-content: center;\npadding: 0 24px;" },
            { id: "stat-2", tag: "<div>", label: "Stat Card", color: "#A78BFA", top: "8%", left: "34%", width: "32%", height: "84%", css: "flex: 1;\nborder-left: 1px solid #eee;" },
            { id: "stat-3", tag: "<div>", label: "Stat Card", color: "#A78BFA", top: "8%", left: "67%", width: "32%", height: "84%", css: "flex: 1;\nborder-left: 1px solid #eee;" },
        ],
    },
];

export default function WebsiteDestructure() {
    const [mode, setMode] = useState<"website" | "level1" | "level2">("website");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Find CSS info for the selected element
    const getSelectedCss = (): { tag: string; label: string; css: string; color: string } | null => {
        if (!selectedId) return null;
        for (const sec of sections) {
            if (sec.id === selectedId) return { tag: sec.tag, label: sec.label, css: sec.css, color: sec.color };
            if (sec.children) {
                for (const child of sec.children) {
                    if (child.id === selectedId) return { tag: child.tag, label: child.label, css: child.css, color: child.color };
                }
            }
        }
        return null;
    };

    const selectedInfo = getSelectedCss();

    return (
        <SectionWrapper
            id="website-destructure"
            title="Destructure a Website"
            subtitle="Every website is just nested boxes. Let's break one apart to see the HTML beneath."
        >
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
                {(["website", "level1", "level2"] as const).map((m) => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer border ${mode === m
                            ? "bg-dark text-card border-dark"
                            : "bg-card text-text-secondary border-border hover:border-dark/20"
                            }`}
                    >
                        {m === "website" ? "Website" : m === "level1" ? "Destructure — Level 1" : "Destructure — Level 2"}
                    </button>
                ))}

                {mode !== "website" && (
                    <span className="text-xs text-text-secondary/50 ml-2">
                        {mode === "level1" ? "Hover any section to see its CSS" : "Hover nested children to see how they're styled"}
                    </span>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Website mockup */}
                <div className={`bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 ${selectedInfo ? "lg:w-[65%]" : "w-full"}`}>
                    {/* Faux browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-background/60 border-b border-border">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                        </div>
                        <div className="flex-1 mx-4">
                            <div className="bg-card rounded-lg border border-border px-3 py-1 text-[11px] text-text-secondary/50 font-mono max-w-sm">
                                https://developer.design
                            </div>
                        </div>
                    </div>

                    {/* Website viewport */}
                    <div className="relative bg-white" style={{ paddingBottom: "45%" }}>
                        {/* ── The actual website mockup ── */}
                        <div className="absolute inset-0">
                            {/* Navigation */}
                            <div className="flex items-center justify-between px-[4%] h-[10%] border-b border-gray-100">
                                <span className="text-[clamp(10px,1.4vw,18px)] font-bold text-gray-900 tracking-tight">developer.</span>
                                <div className="hidden sm:flex items-center gap-[clamp(8px,1.5vw,20px)]">
                                    {["HOME", "WORK", "ABOUT", "CONTACT"].map((t) => (
                                        <span key={t} className="text-[clamp(6px,0.8vw,12px)] font-medium text-gray-500 tracking-wider">{t}</span>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-[2px]">
                                    <div className="w-[clamp(10px,1.5vw,18px)] h-[1.5px] bg-gray-800" />
                                    <div className="w-[clamp(10px,1.5vw,18px)] h-[1.5px] bg-gray-800" />
                                    <div className="w-[clamp(8px,1vw,14px)] h-[1.5px] bg-gray-800" />
                                </div>
                            </div>

                            {/* Hero — Name/designation left, image right */}
                            <div className="flex h-[70%]">
                                {/* Left — name + designation */}
                                <div className="w-[45%] flex flex-col justify-center px-[8%]">
                                    <p className="text-[clamp(7px,0.8vw,12px)] text-amber-500 font-semibold tracking-[0.2em] uppercase mb-[clamp(4px,0.6vw,10px)]">
                                        Hello, I&apos;m
                                    </p>
                                    <p className="text-[clamp(20px,4vw,60px)] font-bold text-gray-900 leading-[1.05] mb-[clamp(2px,0.3vw,6px)]">
                                        Sarah
                                    </p>
                                    <p className="text-[clamp(20px,4vw,60px)] font-bold text-gray-900 leading-[1.05] mb-[clamp(6px,1.2vw,18px)]">
                                        <span className="text-amber-500">Chen.</span>
                                    </p>
                                    <p className="text-[clamp(7px,0.8vw,13px)] text-gray-400 font-medium mb-[clamp(10px,1.4vw,22px)]">
                                        Full-Stack Developer &amp; UI Designer
                                    </p>
                                    <div className="flex items-center gap-[clamp(6px,0.8vw,14px)]">
                                        <div className="bg-gray-900 text-white rounded-full px-[clamp(12px,2vw,28px)] py-[clamp(5px,0.7vw,12px)] text-[clamp(6px,0.75vw,12px)] font-semibold">
                                            View Work
                                        </div>
                                        <div className="border border-gray-300 text-gray-700 rounded-full px-[clamp(12px,2vw,28px)] py-[clamp(5px,0.7vw,12px)] text-[clamp(6px,0.75vw,12px)] font-semibold">
                                            Contact
                                        </div>
                                    </div>
                                </div>
                                {/* Right — profile image */}
                                <div className="w-[55%] flex items-end justify-center overflow-hidden">
                                    <Image
                                        src="/images/b08abfaa27992a5cffbedf9669f3bb26-removebg-preview.png"
                                        alt="Profile"
                                        width={400}
                                        height={500}
                                        className="object-contain max-h-full w-auto"
                                        style={{ maxHeight: '100%' }}
                                    />
                                </div>
                            </div>

                            {/* Stats bar */}
                            <div className="h-[20%] border-t border-gray-100 flex">
                                {[
                                    { value: "15k+", label: "Person are helped from us everyday", accent: true },
                                    { value: "1,456", label: "New members Donate every day", accent: false },
                                    { value: "1M+", label: "Members from around the world", accent: true },
                                ].map((stat, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 flex flex-col justify-center px-[4%] ${i > 0 ? "border-l border-gray-100" : ""}`}
                                    >
                                        <p className={`text-[clamp(12px,2vw,28px)] font-bold ${stat.accent ? "text-amber-500" : "text-gray-900"}`}>
                                            {stat.value}
                                        </p>
                                        <p className="text-[clamp(5px,0.6vw,10px)] text-gray-400 mt-1 leading-relaxed">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Overlay: Level 1 ── */}
                        <AnimatePresence>
                            {(mode === "level1" || mode === "level2") && (
                                <div className="absolute inset-0">
                                    {sections.map((sec, i) => (
                                        <motion.div
                                            key={sec.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: i * 0.12, duration: 0.4 }}
                                            className={`group/sec absolute rounded-lg cursor-pointer ${selectedId === sec.id ? "ring-2 ring-offset-1" : ""}`}
                                            style={{
                                                top: sec.top,
                                                left: sec.left,
                                                width: sec.width,
                                                height: sec.height,
                                                border: `2px solid ${sec.color}`,
                                                background: `${sec.color}10`,
                                                zIndex: selectedId === sec.id ? 10 : 1,
                                                // @ts-expect-error CSS custom property
                                                '--ring-color': sec.color,
                                                ringColor: selectedId === sec.id ? sec.color : undefined,
                                            }}
                                            onClick={() => setSelectedId(selectedId === sec.id ? null : sec.id)}
                                        >
                                            {/* Hover highlight — pure CSS, no flicker */}
                                            <div
                                                className="absolute inset-0 rounded-lg opacity-0 group-hover/sec:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                style={{ background: `${sec.color}20` }}
                                            />
                                            {/* Tag label */}
                                            <span
                                                className="absolute -top-0.5 left-2 -translate-y-full px-2 py-0.5 rounded-t-md text-white text-[clamp(6px,0.7vw,11px)] font-mono font-bold"
                                                style={{ background: sec.color }}
                                            >
                                                {sec.tag}
                                            </span>
                                            {/* Section name */}
                                            <span
                                                className="absolute top-1 right-2 text-[clamp(6px,0.65vw,10px)] font-semibold px-1.5 py-0.5 rounded"
                                                style={{ color: sec.color, background: `${sec.color}20` }}
                                            >
                                                {sec.label}
                                            </span>

                                            {/* ── Overlay: Level 2 — children ── */}
                                            <AnimatePresence>
                                                {mode === "level2" && sec.children?.map((child, ci) => (
                                                    <motion.div
                                                        key={child.id}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        transition={{ delay: 0.3 + ci * 0.08, duration: 0.3 }}
                                                        className={`group/child absolute rounded cursor-pointer ${selectedId === child.id ? "ring-1 ring-offset-1" : ""}`}
                                                        style={{
                                                            top: child.top,
                                                            left: child.left,
                                                            width: child.width,
                                                            height: child.height,
                                                            border: `1.5px dashed ${child.color}`,
                                                            background: `${child.color}08`,
                                                            zIndex: selectedId === child.id ? 20 : 5,
                                                        }}
                                                        onClick={(e) => { e.stopPropagation(); setSelectedId(selectedId === child.id ? null : child.id); }}
                                                    >
                                                        {/* Hover highlight — pure CSS */}
                                                        <div
                                                            className="absolute inset-0 rounded opacity-0 group-hover/child:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                            style={{ background: `${child.color}18` }}
                                                        />
                                                        <span
                                                            className="absolute bottom-0.5 left-1 text-[clamp(5px,0.5vw,9px)] font-mono font-semibold"
                                                            style={{ color: child.color }}
                                                        >
                                                            {child.tag}
                                                        </span>
                                                        <span
                                                            className="absolute top-0.5 right-1 text-[clamp(4px,0.45vw,8px)] font-medium"
                                                            style={{ color: child.color }}
                                                        >
                                                            {child.label}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* CSS Panel — appears on click */}
                <AnimatePresence>
                    {selectedInfo && mode !== "website" && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, width: 0 }}
                            animate={{ opacity: 1, x: 0, width: "auto" }}
                            exit={{ opacity: 0, x: 20, width: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="lg:w-[35%] shrink-0"
                        >
                            <div className="bg-card rounded-2xl border border-border overflow-hidden h-full">
                                {/* Header */}
                                <div className="px-5 py-3 border-b border-border flex items-center gap-2.5"
                                    style={{ background: `${selectedInfo.color}10` }}
                                >
                                    <span
                                        className="w-2.5 h-2.5 rounded-sm shrink-0"
                                        style={{ background: selectedInfo.color }}
                                    />
                                    <span className="text-sm font-semibold text-text-primary font-mono">
                                        {selectedInfo.tag}
                                    </span>
                                    <span className="text-xs text-text-secondary">
                                        {selectedInfo.label}
                                    </span>
                                </div>

                                {/* CSS code */}
                                <div className="p-5">
                                    <p className="text-[10px] text-text-secondary/50 font-semibold uppercase tracking-wider mb-3">
                                        How it&apos;s styled
                                    </p>
                                    <pre className="text-sm font-mono leading-relaxed">
                                        {selectedInfo.css.split("\n").map((line, i) => {
                                            const [prop, val] = line.split(": ");
                                            return (
                                                <div key={i} className="flex">
                                                    <span className="text-blue-400">{prop}</span>
                                                    <span className="text-text-secondary/40">: </span>
                                                    <span className="text-amber-500">{val}</span>
                                                </div>
                                            );
                                        })}
                                    </pre>

                                    {/* Flexbox callout */}
                                    {selectedInfo.css.includes("display: flex") && (
                                        <div className="mt-4 bg-emerald-500/5 border border-emerald-500/15 rounded-lg px-4 py-2.5">
                                            <p className="text-[11px] font-semibold text-emerald-500 mb-1">Flexbox Layout</p>
                                            <p className="text-[11px] text-text-secondary/60 leading-relaxed">
                                                {selectedInfo.css.includes("flex-direction: column")
                                                    ? "Items stack vertically (column direction)"
                                                    : selectedInfo.css.includes("justify-content: space-between")
                                                        ? "Items spread across with space between them"
                                                        : selectedInfo.css.includes("justify-content: center")
                                                            ? "Items centered on the main axis"
                                                            : "Items arranged in a row by default"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Legend */}
            <AnimatePresence>
                {mode !== "website" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                        {sections.map((sec) => (
                            <div
                                key={sec.id}
                                className={`bg-card rounded-xl border p-4 flex items-start gap-3 transition-all duration-200 cursor-pointer hover:shadow-md ${selectedId === sec.id ? "border-dark/20 shadow-md" : "border-border"
                                    }`}
                                onClick={() => setSelectedId(selectedId === sec.id ? null : sec.id)}
                            >
                                <span
                                    className="w-3 h-3 rounded-sm mt-0.5 shrink-0"
                                    style={{ background: sec.color }}
                                />
                                <div>
                                    <p className="text-sm font-semibold text-text-primary">
                                        {sec.tag}{" "}
                                        <span className="text-text-secondary font-normal">— {sec.label}</span>
                                    </p>
                                    <p className="text-[11px] text-text-secondary/50 font-mono mt-1">
                                        display: flex
                                    </p>
                                    {mode === "level2" && sec.children && (
                                        <p className="text-xs text-text-secondary/60 mt-1">
                                            Contains: {sec.children.map((c) => c.tag).join(", ")}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Teaching callout */}
            <div className="mt-8 bg-background/50 rounded-xl border border-border px-6 py-4 text-center">
                <p className="text-sm text-text-secondary/70">
                    {mode === "website" && "Click \"Destructure\" to see the HTML structure hiding beneath this website."}
                    {mode === "level1" && "Hover any section to see the CSS that makes it work. Every layout here uses Flexbox."}
                    {mode === "level2" && "Boxes inside boxes — each one styled with Flexbox. Hover any child to see exactly how."}
                </p>
            </div>
        </SectionWrapper>
    );
}
