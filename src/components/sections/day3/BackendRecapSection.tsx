"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const takeaways = [
    {
        icon: "🌐",
        title: "HTTP",
        summary: "The language browsers and servers speak. Requests, responses, and status codes.",
        color: "bg-blue-50 border-blue-200",
    },
    {
        icon: "🤵",
        title: "APIs",
        summary: "Defined doorways in the backend that perform specific actions. Like waiters in a restaurant.",
        color: "bg-purple-50 border-purple-200",
    },
    {
        icon: "⚙️",
        title: "Node.js",
        summary: "JavaScript runtime that runs outside the browser. Same language, server powers.",
        color: "bg-green-50 border-green-200",
    },
    {
        icon: "🎛️",
        title: "Express.js",
        summary: "Web framework for Node.js. Handles routing, middleware, and req/res processing.",
        color: "bg-amber-50 border-amber-200",
    },
    {
        icon: "🗄️",
        title: "MongoDB",
        summary: "NoSQL database that stores JSON-like documents. Flexible, scalable, JS-friendly.",
        color: "bg-orange-50 border-orange-200",
    },
    {
        icon: "🧑‍💼",
        title: "Mongoose",
        summary: "Library that adds schemas, validation, and methods on top of MongoDB.",
        color: "bg-teal-50 border-teal-200",
    },
];

const nextSteps = [
    "Build your first Express server with CRUD routes",
    "Connect to MongoDB using Mongoose",
    "Create schemas and models for your data",
    "Build a full REST API",
    "Connect it to an HTML/CSS/JS frontend",
];

export default function BackendRecapSection() {
    return (
        <SectionWrapper
            id="backend-recap"
            title="Day 3 Recap"
            subtitle="Everything we learned today — from HTTP to databases. One step closer to full-stack."
        >
            {/* Takeaway cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
                {takeaways.map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -4 }}
                        className={`${item.color} border rounded-2xl p-5 cursor-default`}
                    >
                        <div className="text-3xl mb-3">{item.icon}</div>
                        <h4 className="text-sm font-bold text-text-primary mb-1">{item.title}</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">{item.summary}</p>
                    </motion.div>
                ))}
            </div>

            {/* The stack — everything together */}
            <div className="max-w-md mx-auto mb-12">
                <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">The Tech Stack</h3>
                <div className="space-y-1">
                    {[
                        { label: "HTML, CSS & JS (Frontend)", color: "bg-blue-500", width: "100%" },
                        { label: "Express.js (Routes + API)", color: "bg-amber-500", width: "85%" },
                        { label: "Node.js (Runtime)", color: "bg-green-500", width: "70%" },
                        { label: "Mongoose (ODM)", color: "bg-teal-500", width: "55%" },
                        { label: "MongoDB (Database)", color: "bg-orange-500", width: "40%" },
                    ].map((layer, i) => (
                        <motion.div
                            key={layer.label}
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            style={{ width: layer.width }}
                            className={`${layer.color} text-white text-xs font-medium px-4 py-3 rounded-lg mx-auto text-center`}
                        >
                            {layer.label}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Next steps */}
            <div className="max-w-lg mx-auto">
                <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">What&apos;s Next?</h3>
                <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="space-y-3">
                        {nextSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-6 h-6 rounded-full bg-dark text-card text-xs font-bold flex items-center justify-center shrink-0">
                                    {i + 1}
                                </div>
                                <p className="text-sm text-text-primary">{step}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Motivational close */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-8 text-center"
                >
                    <p className="text-lg font-bold text-text-primary mb-2">
                        You now understand the backend.
                    </p>
                    <p className="text-sm text-text-secondary">
                        Frontend + Backend = Full-Stack. You&apos;re getting there.
                    </p>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
