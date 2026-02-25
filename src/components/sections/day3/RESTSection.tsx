"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

const restPrinciples = [
    {
        label: "Client–Server",
        icon: "🔀",
        desc: "Frontend and backend are separate. They communicate only through HTTP.",
        color: "bg-blue-50 border-blue-200",
    },
    {
        label: "Stateless",
        icon: "📭",
        desc: "Server doesn't remember previous requests. Each request must contain all the info needed.",
        color: "bg-amber-50 border-amber-200",
    },
    {
        label: "Uniform Interface",
        icon: "📏",
        desc: "Predictable URL patterns and HTTP methods. GET /users, POST /users, DELETE /users/:id.",
        color: "bg-green-50 border-green-200",
    },
    {
        label: "Resource-Based",
        icon: "📦",
        desc: "Everything is a 'resource' identified by a URL: users, posts, products, etc.",
        color: "bg-purple-50 border-purple-200",
    },
];

const restVsSoap = [
    { feature: "Format", rest: "JSON (lightweight)", old: "XML (heavy)" },
    { feature: "Speed", rest: "Fast", old: "Slow" },
    { feature: "Learning Curve", rest: "Easy", old: "Complex" },
    { feature: "Flexibility", rest: "Very flexible", old: "Strict rules" },
    { feature: "Usage", rest: "90%+ of modern APIs", old: "Legacy/enterprise" },
];

const restfulExample = `// RESTful API Pattern
// Resource: users

GET    /api/users          → Get all users
GET    /api/users/42       → Get user with id 42
POST   /api/users          → Create a new user
PUT    /api/users/42       → Update user 42
DELETE /api/users/42       → Delete user 42

// Nested resources
GET    /api/users/42/posts → Get all posts by user 42`;

const notRestfulExample = `// NOT RESTful (common mistakes)

GET    /api/getUser?id=42        ❌ verb in URL
POST   /api/deleteUser           ❌ wrong method
GET    /api/user_list_all        ❌ not resource-based
POST   /api/createNewUserRecord  ❌ verb + redundant

// REST uses nouns (resources) + HTTP methods (verbs)
// The method tells you the action, the URL tells you the resource`;

export default function RESTSection() {
    const [tab, setTab] = useState<"restful" | "not-restful">("restful");

    return (
        <SectionWrapper
            id="rest-api"
            title="REST — The Architecture of Modern APIs"
            subtitle="REST is a set of rules for designing how your API URLs and methods should work."
        >
            {/* History timeline */}
            <div className="max-w-3xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-text-primary mb-4">A Brief History</h3>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

                    {[
                        { year: "1990s", title: "Early Web", desc: "Websites were just static HTML pages. No APIs, no dynamic data.", color: "bg-gray-400" },
                        { year: "1998", title: "SOAP was born", desc: "Complex XML-based protocol for web services. Heavy, strict, hard to use.", color: "bg-red-400" },
                        { year: "2000", title: "REST was introduced", desc: "Roy Fielding defined REST in his PhD thesis. Simple, uses existing HTTP methods.", color: "bg-green-500" },
                        { year: "2005+", title: "REST wins", desc: "APIs shifted to REST + JSON. Twitter, Facebook, Google — all adopted REST.", color: "bg-blue-500" },
                        { year: "Today", title: "REST is the standard", desc: "90%+ of web APIs use REST. Alternatives exist (GraphQL) but REST dominates.", color: "bg-purple-500" },
                    ].map((item, i) => (
                        <motion.div
                            key={item.year}
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4 mb-4 relative"
                        >
                            <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center z-10 shrink-0`}>
                                <span className="text-white text-[9px] font-bold">{item.year.slice(-2)}</span>
                            </div>
                            <div className="bg-card border border-border rounded-xl p-4 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold text-text-secondary/50 uppercase">{item.year}</span>
                                    <span className="text-sm font-semibold text-text-primary">{item.title}</span>
                                </div>
                                <p className="text-xs text-text-secondary">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* REST vs SOAP comparison */}
            <div className="max-w-2xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">REST vs SOAP (the old way)</h3>
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="grid grid-cols-3 gap-0 text-center text-xs font-bold border-b border-border">
                        <div className="p-3 bg-background text-text-secondary">Feature</div>
                        <div className="p-3 bg-green-50 text-green-700">REST</div>
                        <div className="p-3 bg-red-50 text-red-700">SOAP</div>
                    </div>
                    {restVsSoap.map((row) => (
                        <div key={row.feature} className="grid grid-cols-3 gap-0 border-b border-border last:border-0">
                            <div className="p-3 text-xs font-medium text-text-primary bg-background">{row.feature}</div>
                            <div className="p-3 text-xs text-green-700 bg-green-50/30">{row.rest}</div>
                            <div className="p-3 text-xs text-red-700 bg-red-50/30">{row.old}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4 REST principles */}
            <div className="max-w-4xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">REST Principles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {restPrinciples.map((p, i) => (
                        <motion.div
                            key={p.label}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`${p.color} border rounded-xl p-4`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">{p.icon}</span>
                                <h4 className="text-sm font-bold text-text-primary">{p.label}</h4>
                            </div>
                            <p className="text-xs text-text-secondary leading-relaxed">{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* RESTful vs Not RESTful code examples */}
            <div className="max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">RESTful vs Not RESTful</h3>
                <div className="flex gap-2 mb-4 justify-center">
                    <button
                        onClick={() => setTab("restful")}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${tab === "restful" ? "bg-green-600 text-white" : "bg-card text-text-secondary border border-border"}`}
                    >
                        ✅ RESTful
                    </button>
                    <button
                        onClick={() => setTab("not-restful")}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${tab === "not-restful" ? "bg-red-600 text-white" : "bg-card text-text-secondary border border-border"}`}
                    >
                        ❌ Not RESTful
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <CodeBlock
                            code={tab === "restful" ? restfulExample : notRestfulExample}
                            language="javascript"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </SectionWrapper>
    );
}
