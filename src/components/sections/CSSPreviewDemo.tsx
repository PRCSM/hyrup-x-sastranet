"use client";

import { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

type CSSToggle = "color" | "typography" | "spacing" | "border" | "layout";

const toggles: { id: CSSToggle; label: string; css: string }[] = [
    {
        id: "color",
        label: "Color",
        css: `color: #ffffff;
background: #1a1a2e;`,
    },
    {
        id: "typography",
        label: "Typography",
        css: `font-family: 'Inter', sans-serif;
font-size: 16px;
line-height: 1.6;`,
    },
    {
        id: "spacing",
        label: "Spacing",
        css: `padding: 2rem;
margin: 0 auto;
gap: 1rem;`,
    },
    {
        id: "border",
        label: "Border",
        css: `border-radius: 16px;
border: 1px solid rgba(255,255,255,0.1);`,
    },
    {
        id: "layout",
        label: "Layout",
        css: `display: flex;
flex-direction: column;
align-items: center;
justify-content: center;`,
    },
];

export default function CSSPreviewDemo() {
    const [active, setActive] = useState<Set<CSSToggle>>(new Set());

    const toggle = (id: CSSToggle) => {
        setActive((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const previewStyles: React.CSSProperties = {
        transition: "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
        background: active.has("color") ? "#1a1a2e" : "#ffffff",
        color: active.has("color") ? "#ffffff" : "#000000",
        fontFamily: active.has("typography") ? "'Inter', sans-serif" : "Times New Roman, serif",
        fontSize: active.has("typography") ? "16px" : "16px",
        lineHeight: active.has("typography") ? "1.6" : "1.4",
        padding: active.has("spacing") ? "2rem" : "8px",
        borderRadius: active.has("border") ? "16px" : "0px",
        border: active.has("border")
            ? active.has("color")
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid #e0e0e0"
            : "1px solid #ccc",
        display: active.has("layout") ? "flex" : "block",
        flexDirection: active.has("layout") ? "column" as const : undefined,
        alignItems: active.has("layout") ? "center" : undefined,
        justifyContent: active.has("layout") ? "center" : undefined,
        gap: active.has("spacing") ? "1rem" : undefined,
        maxWidth: active.has("layout") ? "380px" : "100%",
        margin: active.has("layout") ? "0 auto" : undefined,
        textAlign: active.has("layout") ? "center" as const : "left" as const,
    };

    const activeCode = toggles
        .filter((t) => active.has(t.id))
        .map((t) => `/* ${t.label} */\n${t.css}`)
        .join("\n\n");

    return (
        <SectionWrapper
            id="css-preview"
            title="CSS Magic — See the Difference"
            subtitle="Toggle each CSS category on and off. Watch the preview transform in real-time."
        >
            {/* Toggle buttons */}
            <div className="flex flex-wrap gap-2 mb-10">
                {toggles.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => toggle(t.id)}
                        className={`
              px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer
              ${active.has(t.id)
                                ? "bg-dark text-card shadow-md"
                                : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                            }
            `}
                    >
                        {active.has(t.id) ? "✓ " : ""}
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Code */}
                <div>
                    <p className="text-sm text-text-secondary mb-3 font-medium">CSS Code</p>
                    <CodeBlock
                        code={activeCode || "/* Toggle a property above to see the CSS */"}
                        language="css"
                    />
                </div>

                {/* Preview */}
                <div>
                    <p className="text-sm text-text-secondary mb-3 font-medium">Live Preview</p>
                    <div className="bg-card rounded-2xl border border-border p-6 min-h-[300px] flex items-center justify-center">
                        <div style={previewStyles}>
                            <h3
                                style={{
                                    fontSize: active.has("typography") ? "22px" : "24px",
                                    fontWeight: active.has("typography") ? "600" : "normal",
                                    fontFamily: active.has("typography")
                                        ? "'Inter', sans-serif"
                                        : "Times New Roman, serif",
                                    margin: 0,
                                    transition: "all 0.4s ease",
                                }}
                            >
                                Profile Card
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    opacity: 0.8,
                                    fontSize: active.has("typography") ? "14px" : "16px",
                                    transition: "all 0.4s ease",
                                }}
                            >
                                Frontend developer who loves building beautiful interfaces.
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "6px",
                                    flexWrap: "wrap",
                                    justifyContent: active.has("layout") ? "center" : "flex-start",
                                    transition: "all 0.4s ease",
                                }}
                            >
                                {["HTML", "CSS", "React"].map((tag) => (
                                    <span
                                        key={tag}
                                        style={{
                                            padding: active.has("spacing") ? "4px 12px" : "2px 6px",
                                            background: active.has("color")
                                                ? "rgba(255,255,255,0.1)"
                                                : "#f0f0f0",
                                            borderRadius: active.has("border") ? "12px" : "0px",
                                            fontSize: "12px",
                                            transition: "all 0.4s ease",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
