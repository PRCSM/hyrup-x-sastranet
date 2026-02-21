"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const steps = [
    {
        id: 1,
        label: "Plain HTML",
        description: "Raw unstyled HTML — the browser's default rendering",
        styles: {
            container: { background: "#fff", color: "#000", fontFamily: "Times New Roman, serif", padding: "12px", borderRadius: "0", border: "1px solid #ccc", boxShadow: "none" },
            heading: { fontSize: "24px", fontWeight: "normal" as const },
            text: { fontSize: "16px" },
            button: { background: "none", border: "1px solid #000", color: "#000", borderRadius: "0", padding: "4px 8px" },
        },
    },
    {
        id: 2,
        label: "Basic Styling",
        description: "Colors, fonts, and text styling applied",
        styles: {
            container: { background: "#1a1a2e", color: "#fff", fontFamily: "'Inter', sans-serif", padding: "16px", borderRadius: "0", border: "none", boxShadow: "none" },
            heading: { fontSize: "20px", fontWeight: "600" as const },
            text: { fontSize: "14px" },
            button: { background: "#ff6b6b", border: "none", color: "#fff", borderRadius: "0", padding: "8px 16px" },
        },
    },
    {
        id: 3,
        label: "Layout",
        description: "Flexbox centering, spacing, and structure",
        styles: {
            container: { background: "#1a1a2e", color: "#fff", fontFamily: "'Inter', sans-serif", padding: "24px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "none", textAlign: "center" as const, maxWidth: "380px" },
            heading: { fontSize: "20px", fontWeight: "600" as const },
            text: { fontSize: "14px" },
            button: { background: "#ff6b6b", border: "none", color: "#fff", borderRadius: "6px", padding: "10px 20px" },
        },
    },
    {
        id: 4,
        label: "Card UI",
        description: "Rounded corners, shadows, and refined spacing",
        styles: {
            container: { background: "#1a1a2e", color: "#fff", fontFamily: "'Inter', sans-serif", padding: "32px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 4px 24px rgba(0,0,0,0.15)", textAlign: "center" as const, maxWidth: "380px" },
            heading: { fontSize: "22px", fontWeight: "600" as const },
            text: { fontSize: "14px" },
            button: { background: "#ff6b6b", border: "none", color: "#fff", borderRadius: "10px", padding: "12px 24px" },
        },
    },
    {
        id: 5,
        label: "Production",
        description: "Transitions, hover effects, and polished details",
        styles: {
            container: { background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", color: "#fff", fontFamily: "'Inter', sans-serif", padding: "40px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 12px 48px rgba(0,0,0,0.25)", textAlign: "center" as const, maxWidth: "380px" },
            heading: { fontSize: "24px", fontWeight: "700" as const },
            text: { fontSize: "15px" },
            button: { background: "#ff6b6b", border: "none", color: "#fff", borderRadius: "12px", padding: "14px 28px", fontWeight: "500" as const },
        },
    },
];

export default function TransformationDemo() {
    const [activeStep, setActiveStep] = useState(0);
    const step = steps[activeStep];

    return (
        <SectionWrapper
            id="transformation"
            title="The Full Transformation"
            subtitle="5 steps from plain HTML to a production-quality website."
        >
            {/* Progress steps */}
            <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
                {steps.map((s, i) => (
                    <div key={s.id} className="flex items-center">
                        <button
                            onClick={() => setActiveStep(i)}
                            className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 cursor-pointer
                ${i <= activeStep
                                    ? "bg-dark text-card"
                                    : "bg-card text-text-secondary border border-border"
                                }
              `}
                        >
                            {s.id}
                        </button>
                        {i < steps.length - 1 && (
                            <div className="w-8 sm:w-16 h-[2px] mx-1">
                                <div
                                    className="h-full transition-all duration-500"
                                    style={{
                                        background: i < activeStep ? "#0D0D0D" : "#E6E8E7",
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Step label */}
            <div className="text-center mb-8">
                <span className="px-4 py-1.5 bg-card rounded-full text-sm font-medium border border-border text-text-primary">
                    Step {step.id}: {step.label}
                </span>
                <p className="text-sm text-text-secondary mt-3">{step.description}</p>
            </div>

            {/* Preview */}
            <div className="flex justify-center">
                <div className="bg-card rounded-2xl border border-border p-8 w-full max-w-lg flex items-center justify-center min-h-[280px]">
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            ...step.styles.container,
                            display: "flex",
                            flexDirection: "column" as const,
                            gap: "12px",
                            alignItems: step.styles.container.textAlign === "center" ? "center" : "flex-start",
                            width: "100%",
                            transition: "all 0.5s ease",
                        }}
                    >
                        <h3 style={{ ...step.styles.heading, margin: 0 }}>My Website</h3>
                        <p style={{ ...step.styles.text, margin: 0, opacity: 0.8, lineHeight: "1.6" }}>
                            A modern website built step by step using HTML and CSS.
                        </p>
                        <button
                            style={{
                                ...step.styles.button,
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "14px",
                            }}
                        >
                            Get Started
                        </button>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}
