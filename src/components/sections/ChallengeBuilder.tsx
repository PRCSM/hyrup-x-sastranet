"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

type HeroStyle = "raw" | "styled" | "editorial";

const heroStyles: Record<
    HeroStyle,
    { label: string; description: string }
> = {
    raw: {
        label: "Raw HTML",
        description: "No styling — browser defaults only.",
    },
    styled: {
        label: "Styled",
        description: "Typography, colors, and spacing applied.",
    },
    editorial: {
        label: "Editorial",
        description: "Premium layout, hierarchy, and visual polish.",
    },
};

const styleOrder: HeroStyle[] = ["raw", "styled", "editorial"];

export default function ChallengeBuilder() {
    const [activeStyle, setActiveStyle] = useState<HeroStyle>("editorial");

    return (
        <SectionWrapper
            id="challenge"
            title="Mini Challenge — Build a Hero Section"
            subtitle="This is what you can build after Day 1. Toggle the styles to see each layer."
        >
            {/* Toggle buttons */}
            <div className="flex flex-wrap gap-2 mb-10">
                {styleOrder.map((style) => (
                    <motion.button
                        key={style}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveStyle(style)}
                        className={`
              px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer
              ${activeStyle === style
                                ? "bg-dark text-card shadow-md"
                                : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                            }
            `}
                    >
                        {heroStyles[style].label}
                    </motion.button>
                ))}
                <span className="flex items-center text-sm text-text-secondary/60 ml-2">
                    {heroStyles[activeStyle].description}
                </span>
            </div>

            {/* Hero preview */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeStyle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                >
                    {activeStyle === "raw" && <RawHero />}
                    {activeStyle === "styled" && <StyledHero />}
                    {activeStyle === "editorial" && <EditorialHero />}
                </motion.div>
            </AnimatePresence>
        </SectionWrapper>
    );
}

/* ─── RAW HTML HERO ─── */
function RawHero() {
    return (
        <div
            className="bg-card rounded-2xl border border-border overflow-hidden"
            style={{ fontFamily: "Times New Roman, serif" }}
        >
            <div style={{ padding: "8px" }}>
                <div>
                    <b>mnmlst.</b> &nbsp; HOME &nbsp; PRODUCT &nbsp; STORE &nbsp; ABOUT US
                </div>
                <hr />
                <h1>less is more.</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
                    ultrices finibus purus.
                </p>
                <p>
                    <a href="#" style={{ color: "blue", textDecoration: "underline" }}>
                        Read More
                    </a>
                </p>
                <br />
                <button style={{ border: "1px solid black", padding: "4px 12px" }}>
                    Donate now
                </button>
                <br />
                <br />
                <hr />
                <table style={{ width: "100%" }}>
                    <tbody>
                        <tr>
                            <td>
                                <b>15k+</b>
                                <br />
                                Person are helped from us everyday
                            </td>
                            <td>
                                <b>1,456</b>
                                <br />
                                New members Donate every day
                            </td>
                            <td>
                                <b>1M+</b>
                                <br />
                                Members from around the world
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ─── STYLED HERO ─── */
function StyledHero() {
    return (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div
                style={{
                    fontFamily: "'Inter', sans-serif",
                    background: "#FAFAF8",
                    color: "#1a1a1a",
                    padding: "32px",
                }}
            >
                {/* Nav */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "40px",
                        fontSize: "14px",
                    }}
                >
                    <span style={{ fontWeight: 700, fontSize: "18px" }}>mnmlst.</span>
                    <div style={{ display: "flex", gap: "24px", color: "#6B6F72" }}>
                        <span>HOME</span>
                        <span>PRODUCT</span>
                        <span>STORE</span>
                        <span>ABOUT US</span>
                    </div>
                </div>

                {/* Main */}
                <div style={{ maxWidth: "500px", marginBottom: "32px" }}>
                    <h2
                        style={{
                            fontSize: "48px",
                            fontWeight: 700,
                            lineHeight: 1.1,
                            marginBottom: "16px",
                            color: "#0D0D0D",
                        }}
                    >
                        less is more.
                    </h2>
                    <p
                        style={{
                            fontSize: "14px",
                            lineHeight: 1.7,
                            color: "#6B6F72",
                            marginBottom: "20px",
                            maxWidth: "280px",
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
                        ultrices finibus purus.
                    </p>
                    <button
                        style={{
                            background: "#0D0D0D",
                            color: "#fff",
                            border: "none",
                            padding: "10px 24px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: 500,
                            cursor: "pointer",
                        }}
                    >
                        Donate now
                    </button>
                </div>

                {/* Stats */}
                <div
                    style={{
                        display: "flex",
                        gap: "48px",
                        paddingTop: "24px",
                        borderTop: "1px solid #E6E8E7",
                    }}
                >
                    {[
                        { val: "15k+", label: "Person are helped from us everyday" },
                        { val: "1,456", label: "New members Donate every day" },
                        { val: "1M+", label: "Members from around the world" },
                    ].map((s) => (
                        <div key={s.val}>
                            <div
                                style={{ fontSize: "28px", fontWeight: 700, color: "#0D0D0D" }}
                            >
                                {s.val}
                            </div>
                            <div style={{ fontSize: "12px", color: "#6B6F72", maxWidth: "140px" }}>
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─── EDITORIAL HERO ─── */
function EditorialHero() {
    return (
        <div className="rounded-2xl border border-border overflow-hidden relative">
            <div
                style={{
                    fontFamily: "'Inter', sans-serif",
                    background: "#FAFAF8",
                    color: "#1a1a1a",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Gold accent shape */}
                <div
                    style={{
                        position: "absolute",
                        top: "10%",
                        right: "8%",
                        width: "380px",
                        height: "420px",
                        background: "#E8C547",
                        borderRadius: "40% 60% 50% 50% / 50% 40% 60% 50%",
                        opacity: 0.2,
                        filter: "blur(1px)",
                        zIndex: 1,
                    }}
                />

                {/* Nav */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "24px 40px",
                        position: "relative",
                        zIndex: 10,
                    }}
                >
                    <span style={{ fontWeight: 800, fontSize: "20px", letterSpacing: "-0.02em" }}>
                        mnmlst.
                    </span>
                    <div
                        style={{
                            display: "flex",
                            gap: "32px",
                            fontSize: "13px",
                            fontWeight: 500,
                            letterSpacing: "0.04em",
                            color: "#6B6F72",
                        }}
                    >
                        <span>HOME</span>
                        <span>PRODUCT</span>
                        <span>STORE</span>
                        <span>ABOUT US</span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                            cursor: "pointer",
                        }}
                    >
                        <div style={{ width: "22px", height: "2px", background: "#0D0D0D" }} />
                        <div style={{ width: "22px", height: "2px", background: "#0D0D0D" }} />
                        <div style={{ width: "14px", height: "2px", background: "#0D0D0D" }} />
                    </div>
                </div>

                {/* Main content */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0",
                        padding: "20px 40px 0 40px",
                        minHeight: "380px",
                        position: "relative",
                        zIndex: 5,
                    }}
                >
                    {/* Left */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            paddingBottom: "40px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "13px",
                                lineHeight: 1.7,
                                color: "#6B6F72",
                                maxWidth: "240px",
                                marginBottom: "24px",
                                position: "relative",
                            }}
                        >
                            <span
                                style={{
                                    position: "absolute",
                                    left: "-20px",
                                    top: "-4px",
                                    fontSize: "20px",
                                }}
                            >
                                ←
                            </span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
                            ultrices fi……
                            <br />
                            <span style={{ fontWeight: 700, color: "#0D0D0D", cursor: "pointer" }}>
                                Read More
                            </span>
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                background: "#0D0D0D",
                                color: "#fff",
                                border: "none",
                                padding: "12px 28px",
                                borderRadius: "28px",
                                fontSize: "13px",
                                fontWeight: 600,
                                cursor: "pointer",
                                width: "fit-content",
                                letterSpacing: "0.02em",
                            }}
                        >
                            Donate now
                        </motion.button>
                    </div>

                    {/* Right — big text */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            textAlign: "right",
                            paddingBottom: "40px",
                        }}
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            style={{
                                fontSize: "72px",
                                fontWeight: 800,
                                lineHeight: 1.0,
                                letterSpacing: "-0.03em",
                                color: "#0D0D0D",
                                margin: 0,
                            }}
                        >
                            less is
                            <br />
                            more.
                        </motion.h2>
                        <p
                            style={{
                                fontSize: "12px",
                                color: "#6B6F72",
                                marginTop: "16px",
                                fontWeight: 500,
                            }}
                        >
                            Arlington Heights, IL
                        </p>
                    </div>
                </div>

                {/* Stats bar */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        borderTop: "1px solid #E6E8E7",
                        position: "relative",
                        zIndex: 10,
                        background: "#FAFAF8",
                    }}
                >
                    {[
                        { val: "15k+", label: "Person are helped from us everyday", color: "#E8C547" },
                        { val: "1,456", label: "New members Donate every day", color: "#0D0D0D" },
                        { val: "1M+", label: "Members from around the world", color: "#E8C547" },
                    ].map((s, i) => (
                        <motion.div
                            key={s.val}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            style={{
                                padding: "28px 40px",
                                borderRight: i < 2 ? "1px solid #E6E8E7" : "none",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "32px",
                                    fontWeight: 800,
                                    color: s.color,
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                {s.val}
                            </div>
                            <div
                                style={{
                                    fontSize: "12px",
                                    color: "#6B6F72",
                                    lineHeight: 1.5,
                                    marginTop: "4px",
                                }}
                            >
                                {s.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
