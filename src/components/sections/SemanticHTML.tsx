"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const comparisons = [
    { generic: '<div> at the top', semantic: '<header>', why: 'Browser knows it\'s the header', icon: '🏠' },
    { generic: '<div> for links', semantic: '<nav>', why: 'Screen readers find navigation', icon: '🧭' },
    { generic: '<div> for content', semantic: '<main>', why: 'Search engines know the important stuff', icon: '📄' },
    { generic: '<div> at the bottom', semantic: '<footer>', why: 'Proper document structure', icon: '📎' },
    { generic: '<div> for a post', semantic: '<article>', why: 'Each piece of independent content', icon: '📰' },
    { generic: '<div> for a group', semantic: '<section>', why: 'Thematic grouping', icon: '📦' },
];

export default function SemanticHTML() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <SectionWrapper
            id="semantic-html"
            title="Semantic HTML — The Right Way"
            subtitle={`"You can build everything with <div>, but you SHOULDN'T."`}
        >
            {/* Analogy callout */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-10 max-w-2xl">
                <p className="text-text-secondary text-sm leading-relaxed italic">
                    &quot;Using semantic tags is like labeling boxes when you move house. Sure, everything fits in any box — but
                    <span className="font-semibold text-text-primary"> &apos;Kitchen Stuff&apos; </span>
                    is a lot more helpful than
                    <span className="font-semibold text-text-primary"> &apos;Box #47&apos;</span>.&quot;
                </p>
            </div>

            {/* Comparison grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {comparisons.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -4 }}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`
              bg-card rounded-2xl border p-6 transition-all duration-300 cursor-default
              ${hoveredIndex === i ? "border-dark shadow-md" : "border-border"}
            `}
                    >
                        <span className="text-2xl mb-3 block">{item.icon}</span>

                        {/* Before/After */}
                        <div className="flex items-center gap-2 mb-3">
                            <code className="text-xs font-mono bg-red-50 text-red-600 px-2 py-1 rounded line-through">
                                {item.generic}
                            </code>
                            <span className="text-text-secondary/40">→</span>
                            <code className="text-xs font-mono bg-green-50 text-green-700 px-2 py-1 rounded font-semibold">
                                {item.semantic}
                            </code>
                        </div>

                        {/* Why */}
                        <p className="text-xs text-text-secondary leading-relaxed">
                            {item.why}
                        </p>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
