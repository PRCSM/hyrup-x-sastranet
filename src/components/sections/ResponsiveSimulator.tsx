"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

type Device = "desktop" | "tablet" | "mobile";

const devices: { id: Device; label: string; width: number; icon: string }[] = [
    { id: "desktop", label: "Desktop", width: 680, icon: "🖥️" },
    { id: "tablet", label: "Tablet", width: 480, icon: "📱" },
    { id: "mobile", label: "Mobile", width: 320, icon: "📲" },
];

export default function ResponsiveSimulator() {
    const [device, setDevice] = useState<Device>("desktop");

    const activeDevice = devices.find((d) => d.id === device)!;

    return (
        <SectionWrapper
            id="responsive-simulator"
            title="Responsive Design — Every Device"
            subtitle="Switch devices and watch the layout adapt."
        >
            {/* Device buttons */}
            <div className="flex gap-3 mb-10 justify-center">
                {devices.map((d) => (
                    <button
                        key={d.id}
                        onClick={() => setDevice(d.id)}
                        className={`
              flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer
              ${device === d.id
                                ? "bg-dark text-card shadow-md"
                                : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                            }
            `}
                    >
                        <span>{d.icon}</span>
                        <span>{d.label}</span>
                    </button>
                ))}
            </div>

            {/* Preview container */}
            <div className="flex justify-center">
                <motion.div
                    layout
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
                    style={{ width: activeDevice.width, maxWidth: "100%" }}
                >
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/50">
                        <div className="w-3 h-3 rounded-full bg-red-400/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                        <div className="w-3 h-3 rounded-full bg-green-400/60" />
                        <div className="flex-1 mx-4 bg-background rounded-md px-3 py-1 text-xs text-text-secondary font-mono">
                            mywebsite.com
                        </div>
                    </div>

                    {/* Page content */}
                    <div className="p-6">
                        {/* Nav */}
                        <motion.div
                            layout
                            className={`flex items-center mb-6 ${device === "mobile" ? "flex-col gap-2" : "justify-between"
                                }`}
                            transition={{ duration: 0.4 }}
                        >
                            <span
                                className="font-semibold text-text-primary"
                                style={{ fontSize: device === "mobile" ? "16px" : "18px" }}
                            >
                                Logo
                            </span>
                            <div
                                className="flex gap-3"
                                style={{ fontSize: device === "mobile" ? "12px" : "13px" }}
                            >
                                <span className="text-text-secondary">Home</span>
                                <span className="text-text-secondary">About</span>
                                <span className="text-text-secondary">Contact</span>
                            </div>
                        </motion.div>

                        {/* Hero */}
                        <motion.div layout className="mb-6" transition={{ duration: 0.4 }}>
                            <h3
                                className="font-semibold text-text-primary mb-2"
                                style={{ fontSize: device === "mobile" ? "18px" : device === "tablet" ? "22px" : "26px" }}
                            >
                                Welcome to my site
                            </h3>
                            <p
                                className="text-text-secondary"
                                style={{ fontSize: device === "mobile" ? "12px" : "14px", lineHeight: "1.6" }}
                            >
                                A modern responsive website that adapts to any screen size.
                            </p>
                        </motion.div>

                        {/* Cards */}
                        <motion.div
                            layout
                            className={`grid gap-3 ${device === "desktop"
                                    ? "grid-cols-3"
                                    : device === "tablet"
                                        ? "grid-cols-2"
                                        : "grid-cols-1"
                                }`}
                            transition={{ duration: 0.4 }}
                        >
                            {["Design", "Develop", "Deploy"].map((card) => (
                                <motion.div
                                    layout
                                    key={card}
                                    className="bg-background rounded-xl p-4 border border-border"
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-accent/30 mb-2" />
                                    <p
                                        className="font-medium text-text-primary"
                                        style={{ fontSize: device === "mobile" ? "13px" : "14px" }}
                                    >
                                        {card}
                                    </p>
                                    <p
                                        className="text-text-secondary mt-1"
                                        style={{ fontSize: device === "mobile" ? "11px" : "12px" }}
                                    >
                                        Lorem ipsum dolor sit amet.
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Device label */}
            <div className="text-center mt-6">
                <span className="text-sm text-text-secondary">
                    {activeDevice.icon} {activeDevice.label} — {activeDevice.width}px
                </span>
            </div>
        </SectionWrapper>
    );
}
