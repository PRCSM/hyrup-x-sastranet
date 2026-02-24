"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const sampleDocs = [
    { name: "Nishanth", age: 21, skills: '["Node", "Express"]' },
    { name: "Anagha", age: 22, skills: '["Python", "Django"]' },
];

const flexibleDocs = [
    { doc: '{ "name": "A", "age": 21 }', note: "Has name + age" },
    { doc: '{ "username": "B", "phone": 12345 }', note: "Has username + phone — completely different shape!" },
    { doc: '{ "title": "Admin", "permissions": ["read", "write"] }', note: "Has title + permissions — also fine!" },
];

export default function MongoDBSection() {
    const [showFlexible, setShowFlexible] = useState(false);

    return (
        <SectionWrapper
            id="mongodb"
            title="MongoDB — The Warehouse"
            subtitle="MongoDB is a NoSQL database that stores data as JSON-like documents in collections. Flexible, scalable, and natural for JavaScript."
        >
            {/* Warehouse analogy */}
            <div className="max-w-4xl mx-auto mb-12">
                <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="text-base font-semibold text-text-primary mb-6 text-center">The Warehouse Analogy</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { emoji: "🏢", label: "Warehouse", desc: "MongoDB", detail: "The database itself" },
                            { emoji: "📚", label: "Shelves", desc: "Collections", detail: "Groups of similar data" },
                            { emoji: "📦", label: "Boxes", desc: "Documents", detail: "Individual records" },
                            { emoji: "🏷️", label: "Labels", desc: "Fields", detail: "Key-value pairs inside" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center bg-background rounded-xl p-4"
                            >
                                <div className="text-3xl mb-2">{item.emoji}</div>
                                <p className="text-sm font-bold text-text-primary">{item.label}</p>
                                <p className="text-xs text-blue-600 font-medium">{item.desc}</p>
                                <p className="text-[10px] text-text-secondary mt-1">{item.detail}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Document example */}
            <div className="max-w-3xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-text-primary mb-4">What a Document Looks Like</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sampleDocs.map((doc, i) => (
                        <div key={i} className="bg-code-bg rounded-xl border border-border p-4">
                            <p className="text-[10px] text-code-text/40 mb-2 font-mono">// Document {i + 1} in "users" collection</p>
                            <pre className="text-sm font-mono text-code-text leading-relaxed">
                                <span className="text-amber-400">{'{'}</span>{'\n'}
                                {'  '}<span className="text-green-400">&quot;name&quot;</span>: <span className="text-amber-300">&quot;{doc.name}&quot;</span>,{'\n'}
                                {'  '}<span className="text-green-400">&quot;age&quot;</span>: <span className="text-blue-400">{doc.age}</span>,{'\n'}
                                {'  '}<span className="text-green-400">&quot;skills&quot;</span>: <span className="text-purple-400">{doc.skills}</span>{'\n'}
                                <span className="text-amber-400">{'}'}</span>
                            </pre>
                        </div>
                    ))}
                </div>
            </div>

            {/* Flexibility demo */}
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text-primary">MongoDB is Flexible</h3>
                    <button
                        onClick={() => setShowFlexible(!showFlexible)}
                        className="px-4 py-2 text-xs font-medium rounded-xl bg-dark text-card cursor-pointer hover:shadow-lg transition-all"
                    >
                        {showFlexible ? "Hide" : "Show"} Different Shapes →
                    </button>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                    Unlike SQL databases, MongoDB does NOT require all documents to have the same structure.
                    Same collection, different shapes. No problem.
                </p>

                <AnimatePresence>
                    {showFlexible && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3 overflow-hidden"
                        >
                            {flexibleDocs.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    className="flex items-center gap-4 bg-card rounded-xl border border-border p-4"
                                >
                                    <code className="text-xs font-mono text-text-primary bg-code-bg rounded-lg px-3 py-2 flex-1">
                                        {item.doc}
                                    </code>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500 text-sm">✅</span>
                                        <span className="text-xs text-text-secondary">{item.note}</span>
                                    </div>
                                </motion.div>
                            ))}
                            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                                <p className="text-xs text-green-700 font-medium">
                                    The warehouse doesn&apos;t care what&apos;s inside the box. It just stores it.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SectionWrapper>
    );
}
