"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const steps = [
    {
        id: "order",
        label: "You Order",
        icon: "🧑",
        scene: "customer",
        description: "You tell the waiter: 'I want a pizza'",
        codeEquiv: 'fetch("/api/pizza", { method: "POST" })',
        detail: "You are the frontend. You don't go to the kitchen. You talk to the waiter.",
    },
    {
        id: "waiter-takes",
        label: "Waiter Takes Order",
        icon: "🤵",
        scene: "waiter",
        description: "Waiter writes your order and walks to the kitchen",
        codeEquiv: 'app.post("/api/pizza", handler)',
        detail: "The waiter is the API. It receives your request and routes it to the right place.",
    },
    {
        id: "kitchen",
        label: "Kitchen Cooks",
        icon: "👨‍🍳",
        scene: "kitchen",
        description: "Chef reads the order and starts cooking",
        codeEquiv: "const pizza = await makePizza(order);",
        detail: "The kitchen is your backend logic. It processes the request — validates, computes, executes.",
    },
    {
        id: "storage",
        label: "Storage Room",
        icon: "📦",
        scene: "storage",
        description: "Chef gets ingredients from storage",
        codeEquiv: "const ingredients = await db.find({ type: 'pizza' });",
        detail: "The storage room is the database. It stores raw data that the kitchen needs.",
    },
    {
        id: "waiter-returns",
        label: "Waiter Delivers",
        icon: "🍕",
        scene: "waiter",
        description: "Waiter brings the pizza back to your table",
        codeEquiv: 'res.json({ pizza: "Margherita", status: "ready" })',
        detail: "The API sends the response back. The waiter carries the finished product from kitchen to you.",
    },
    {
        id: "client-receives",
        label: "You Enjoy!",
        icon: "😋",
        scene: "customer",
        description: "You receive the pizza and enjoy your meal",
        codeEquiv: 'const data = await response.json();\nrenderPizza(data);',
        detail: "The frontend receives the response and displays the result. You never had to enter the kitchen!",
    },
];

export default function RestaurantAnalogySection() {
    const [activeStep, setActiveStep] = useState(-1);

    const hasStarted = activeStep >= 0;
    const isFinished = activeStep >= steps.length - 1;

    const sceneColors: Record<string, { bg: string; border: string }> = {
        customer: { bg: "bg-blue-50", border: "border-blue-200" },
        waiter: { bg: "bg-purple-50", border: "border-purple-200" },
        kitchen: { bg: "bg-amber-50", border: "border-amber-200" },
        storage: { bg: "bg-green-50", border: "border-green-200" },
    };

    const nextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((p) => p + 1);
        }
    };

    const reset = () => {
        setActiveStep(-1);
    };

    return (
        <SectionWrapper
            id="restaurant-analogy"
            title="The Restaurant Analogy"
            subtitle="APIs are like waiters — they connect you to the system without giving you direct access."
        >
            {/* Restaurant scene */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-card rounded-2xl border border-border p-6">
                    {/* Restaurant header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${hasStarted && steps[activeStep].scene === "customer" ? "bg-blue-100 ring-2 ring-blue-400" : "bg-background"}`}>🧑</div>
                                <p className="text-[10px] font-medium text-text-secondary mt-1">You</p>
                                <p className="text-[9px] text-text-secondary/50">Frontend</p>
                            </div>
                            <div className="text-text-secondary/30 text-lg">→</div>
                            <div className="text-center">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${hasStarted && steps[activeStep].scene === "waiter" ? "bg-purple-100 ring-2 ring-purple-400" : "bg-background"}`}>🤵</div>
                                <p className="text-[10px] font-medium text-text-secondary mt-1">Waiter</p>
                                <p className="text-[9px] text-text-secondary/50">API</p>
                            </div>
                            <div className="text-text-secondary/30 text-lg">→</div>
                            <div className="text-center">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${hasStarted && steps[activeStep].scene === "kitchen" ? "bg-amber-100 ring-2 ring-amber-400" : "bg-background"}`}>👨‍🍳</div>
                                <p className="text-[10px] font-medium text-text-secondary mt-1">Kitchen</p>
                                <p className="text-[9px] text-text-secondary/50">Backend Logic</p>
                            </div>
                            <div className="text-text-secondary/30 text-lg">→</div>
                            <div className="text-center">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${hasStarted && steps[activeStep].scene === "storage" ? "bg-green-100 ring-2 ring-green-400" : "bg-background"}`}>📦</div>
                                <p className="text-[10px] font-medium text-text-secondary mt-1">Storage</p>
                                <p className="text-[9px] text-text-secondary/50">Database</p>
                            </div>
                        </div>

                        {/* Step controls */}
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex gap-2">
                                {hasStarted && (
                                    <button
                                        onClick={reset}
                                        className="px-3 py-1.5 text-xs font-medium rounded-full border border-border text-text-secondary hover:bg-background transition-all cursor-pointer"
                                    >
                                        Reset
                                    </button>
                                )}
                                <button
                                    onClick={isFinished ? reset : nextStep}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${isFinished
                                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                                            : "bg-dark text-card hover:shadow-lg"
                                        }`}
                                >
                                    {!hasStarted ? "Place an Order →" : isFinished ? "Done ✓" : "Next Step →"}
                                </button>
                            </div>
                            {hasStarted && (
                                <p className="text-[10px] text-text-secondary">
                                    Step {activeStep + 1} of {steps.length}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Step timeline */}
                    <div className="space-y-2">
                        {steps.map((step, i) => {
                            const sc = sceneColors[step.scene];
                            const isActive = activeStep === i;
                            const isPast = activeStep > i;
                            return (
                                <motion.div
                                    key={step.id}
                                    animate={{
                                        opacity: !hasStarted || isActive || isPast ? 1 : 0.4,
                                    }}
                                    className={`flex items-start gap-3 px-4 py-3 rounded-xl border transition-all ${isActive ? `${sc.bg} ${sc.border}` : isPast ? "bg-green-50/50 border-green-200/50" : "border-transparent"
                                        }`}
                                >
                                    <span className="text-xl mt-0.5">{step.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold text-text-primary">{step.label}</p>
                                            {isPast && <span className="text-xs text-green-500">✓</span>}
                                            {isActive && (
                                                <motion.div
                                                    animate={{ scale: [1, 1.3, 1] }}
                                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                                    className="w-2 h-2 bg-purple-500 rounded-full"
                                                />
                                            )}
                                        </div>
                                        <p className="text-xs text-text-secondary">{step.description}</p>
                                    </div>
                                    <code className="text-[10px] font-mono text-text-secondary/60 bg-background rounded-lg px-2 py-1 hidden md:block max-w-[250px] truncate">
                                        {step.codeEquiv}
                                    </code>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Detail panel */}
            <AnimatePresence>
                {hasStarted && (
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="max-w-xl mx-auto"
                    >
                        <div className="bg-card rounded-2xl border border-border p-5 text-center">
                            <span className="text-3xl">{steps[activeStep].icon}</span>
                            <p className="text-sm font-semibold text-text-primary mt-2">{steps[activeStep].label}</p>
                            <p className="text-xs text-text-secondary mt-2 leading-relaxed">{steps[activeStep].detail}</p>
                            <div className="bg-code-bg rounded-lg px-3 py-2 mt-3">
                                <code className="text-xs font-mono text-green-400 whitespace-pre-wrap">{steps[activeStep].codeEquiv}</code>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Key takeaway */}
            <div className="max-w-lg mx-auto mt-8 bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                <p className="text-sm font-semibold text-purple-800">Takeaway</p>
                <p className="text-xs text-purple-600 mt-1">
                    The waiter (API) doesn&apos;t cook. The waiter connects you to the system.
                    <br />You never access the kitchen (backend) or storage (database) directly.
                </p>
            </div>
        </SectionWrapper>
    );
}
