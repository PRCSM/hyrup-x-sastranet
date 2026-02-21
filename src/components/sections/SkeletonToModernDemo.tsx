"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

type Stage = "html" | "css" | "layout" | "modern";

const stageInfo: Record<Stage, { label: string; description: string; code: string }> = {
    html: {
        label: "HTML Only",
        description: "Raw HTML — no styling at all. The browser's default rendering.",
        code: `<body>
  <h1>My Website</h1>
  <p>Welcome to my page.</p>
  <ul>
    <li>About</li>
    <li>Projects</li>
    <li>Contact</li>
  </ul>
  <button>Click me</button>
</body>`,
    },
    css: {
        label: "Add CSS",
        description: "Colors, fonts, and basic text styling applied.",
        code: `body {
  background: #1a1a2e;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
}

h1 { font-size: 1.5rem; }

button {
  background: #ff6b6b;
  color: white;
  padding: 8px 16px;
}`,
    },
    layout: {
        label: "Add Layout",
        description: "Flexbox centering, spacing, and structure.",
        code: `body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.card {
  max-width: 400px;
  padding: 2rem;
  gap: 1rem;
}`,
    },
    modern: {
        label: "Make Modern",
        description: "Rounded corners, shadows, transitions — production quality.",
        code: `.card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.1);
}

button {
  border-radius: 8px;
  transition: transform 0.2s ease;
}
button:hover {
  transform: scale(1.05);
}`,
    },
};

const stageOrder: Stage[] = ["html", "css", "layout", "modern"];

export default function SkeletonToModernDemo() {
    const [activeStage, setActiveStage] = useState<Stage>("html");

    const getPreviewStyles = (): React.CSSProperties => {
        const base: React.CSSProperties = {
            transition: "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
        };

        switch (activeStage) {
            case "html":
                return {
                    ...base,
                    background: "#ffffff",
                    color: "#000000",
                    fontFamily: "Times New Roman, serif",
                    padding: "8px",
                    borderRadius: "0px",
                    boxShadow: "none",
                    border: "1px solid #ccc",
                    textAlign: "left",
                };
            case "css":
                return {
                    ...base,
                    background: "#1a1a2e",
                    color: "#ffffff",
                    fontFamily: "'Inter', sans-serif",
                    padding: "16px",
                    borderRadius: "0px",
                    boxShadow: "none",
                    border: "1px solid rgba(255,255,255,0.1)",
                    textAlign: "left",
                };
            case "layout":
                return {
                    ...base,
                    background: "#1a1a2e",
                    color: "#ffffff",
                    fontFamily: "'Inter', sans-serif",
                    padding: "32px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    textAlign: "center",
                    maxWidth: "400px",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    alignItems: "center",
                };
            case "modern":
                return {
                    ...base,
                    background: "#1a1a2e",
                    color: "#ffffff",
                    fontFamily: "'Inter', sans-serif",
                    padding: "40px",
                    borderRadius: "20px",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    textAlign: "center",
                    maxWidth: "400px",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    alignItems: "center",
                };
        }
    };

    const getButtonStyles = (): React.CSSProperties => {
        const base: React.CSSProperties = {
            transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
            cursor: "pointer",
        };

        switch (activeStage) {
            case "html":
                return {
                    ...base,
                    background: "none",
                    color: "#000",
                    border: "1px solid #000",
                    borderRadius: "0px",
                    padding: "4px 8px",
                    fontFamily: "Times New Roman, serif",
                    fontSize: "14px",
                };
            case "css":
                return {
                    ...base,
                    background: "#ff6b6b",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "0px",
                    padding: "8px 20px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                };
            case "layout":
                return {
                    ...base,
                    background: "#ff6b6b",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "10px 24px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                };
            case "modern":
                return {
                    ...base,
                    background: "#ff6b6b",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 28px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                };
        }
    };

    const getListStyles = (): React.CSSProperties => {
        switch (activeStage) {
            case "html":
                return { fontFamily: "Times New Roman, serif", paddingLeft: "20px", textAlign: "left" as const };
            case "css":
                return { fontFamily: "'Inter', sans-serif", paddingLeft: "20px", textAlign: "left" as const, fontSize: "14px", opacity: 0.8 };
            case "layout":
            case "modern":
                return {
                    fontFamily: "'Inter', sans-serif",
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    fontSize: "13px",
                };
        }
    };

    const getListItemStyles = (): React.CSSProperties => {
        if (activeStage === "layout" || activeStage === "modern") {
            return {
                background: "rgba(255,255,255,0.1)",
                padding: "6px 14px",
                borderRadius: activeStage === "modern" ? "20px" : "4px",
                fontSize: "13px",
                transition: "all 0.3s ease",
            };
        }
        return {};
    };

    return (
        <SectionWrapper
            id="skeleton-to-modern"
            title="Watch a Website Come to Life"
            subtitle="Toggle each stage to see how CSS transforms raw HTML into a modern page."
        >
            {/* Toggle buttons */}
            <div className="flex flex-wrap gap-2 mb-10">
                {stageOrder.map((stage) => (
                    <motion.button
                        key={stage}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveStage(stage)}
                        className={`
              px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer
              ${activeStage === stage
                                ? "bg-dark text-card shadow-md"
                                : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                            }
            `}
                    >
                        {stageInfo[stage].label}
                    </motion.button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Live preview */}
                <div className="bg-card rounded-2xl border border-border p-6 min-h-[360px] flex items-center justify-center">
                    <div style={getPreviewStyles()}>
                        <h3
                            style={{
                                fontSize: activeStage === "html" ? "24px" : activeStage === "modern" ? "22px" : "20px",
                                fontWeight: activeStage === "html" ? "normal" : "600",
                                fontFamily: activeStage === "html" ? "Times New Roman, serif" : "'Inter', sans-serif",
                                margin: 0,
                                transition: "all 0.4s ease",
                            }}
                        >
                            My Website
                        </h3>
                        <p
                            style={{
                                fontSize: activeStage === "html" ? "16px" : "14px",
                                fontFamily: activeStage === "html" ? "Times New Roman, serif" : "'Inter', sans-serif",
                                opacity: 0.8,
                                margin: 0,
                                lineHeight: "1.6",
                                transition: "all 0.4s ease",
                            }}
                        >
                            Welcome to my page. This is a simple website built with HTML and
                            CSS.
                        </p>
                        <ul style={getListStyles()}>
                            {["About", "Projects", "Contact"].map((item) => (
                                <li key={item} style={getListItemStyles()}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button style={getButtonStyles()}>Click me</button>
                    </div>
                </div>

                {/* Code panel */}
                <div>
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-text-secondary">
                            {stageInfo[activeStage].description}
                        </span>
                    </div>
                    <CodeBlock
                        code={stageInfo[activeStage].code}
                        language={activeStage === "html" ? "html" : "css"}
                    />
                </div>
            </div>
        </SectionWrapper>
    );
}
