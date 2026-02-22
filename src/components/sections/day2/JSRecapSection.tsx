"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const items = [
    { icon: "📦", label: "Variables", desc: "let, const, and dynamic typing" },
    { icon: "🔢", label: "Data Types", desc: "7 primitive types and their uses" },
    { icon: "⚡", label: "Operators", desc: "Arithmetic, comparison, and === vs ==" },
    { icon: "🔀", label: "Control Flow", desc: "if/else conditionals and loops" },
    { icon: "🧩", label: "Functions", desc: "Declarations, arrow functions, callbacks" },
    { icon: "🌳", label: "DOM", desc: "Selecting and manipulating HTML elements" },
    { icon: "👆", label: "Events", desc: "addEventListener and user interactions" },
    { icon: "🔄", label: "Async JS", desc: "Promises, async/await, and fetch" },
    { icon: "✨", label: "ES6+", desc: "Modern syntax — template literals, spread, destructuring" },
    { icon: "🔗", label: "Frontend ↔ Backend", desc: "How data flows between client and server" },
];

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function JSRecapSection() {
    return (
        <SectionWrapper
            id="js-recap"
            title="What You Learned Today"
            subtitle="A quick recap of everything we covered in Day 2."
        >
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto"
            >
                {items.map((i) => (
                    <motion.div
                        key={i.label}
                        variants={item}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="bg-card rounded-2xl border border-border p-5 flex flex-col items-center text-center gap-3 hover:shadow-md hover:border-accent-dark transition-all duration-300 cursor-default"
                    >
                        <span className="text-2xl">{i.icon}</span>
                        <h4 className="text-sm font-semibold text-text-primary">{i.label}</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">{i.desc}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Closing */}
            <div className="text-center mt-16">
                <p className="text-lg text-text-secondary max-w-lg mx-auto leading-relaxed">
                    JavaScript is the engine that makes the web interactive.
                    Practice these fundamentals and you&apos;ll be building real applications in no time.
                </p>
                <p className="text-sm text-text-secondary/50 mt-4">
                    See you on Day 3!
                </p>
            </div>
        </SectionWrapper>
    );
}
