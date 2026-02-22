"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

interface TreeNode {
    tag: string;
    children?: TreeNode[];
}

const domTree: TreeNode = {
    tag: "document",
    children: [
        {
            tag: "html",
            children: [
                {
                    tag: "head",
                    children: [
                        { tag: "title" },
                        { tag: "link" },
                    ],
                },
                {
                    tag: "body",
                    children: [
                        {
                            tag: "header",
                            children: [
                                { tag: "h1" },
                                { tag: "nav" },
                            ],
                        },
                        {
                            tag: "main",
                            children: [
                                { tag: "p" },
                                { tag: "div" },
                            ],
                        },
                        {
                            tag: "footer",
                            children: [
                                { tag: "p" },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

const nodeDescriptions: Record<string, string> = {
    document: "The root — everything starts here",
    html: "The entire HTML page",
    head: "Metadata, links, title — not visible",
    title: "The browser tab title",
    link: "External resources (CSS, fonts)",
    body: "Everything visible on the page",
    header: "Top section — logo, navigation",
    h1: "Main heading of the page",
    nav: "Navigation links",
    main: "Primary content area",
    p: "A paragraph of text",
    div: "A generic container",
    footer: "Bottom section — copyright, links",
};

export default function DOMTreeSection() {
    const [activeNode, setActiveNode] = useState<string | null>(null);

    return (
        <SectionWrapper
            id="dom"
            title="DOM Manipulation"
            subtitle="DOM = Document Object Model. The browser converts HTML into a tree structure you can manipulate with JavaScript."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* DOM Tree */}
                <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="text-base font-semibold text-text-primary mb-1">
                        DOM Tree
                    </h3>
                    <p className="text-xs text-text-secondary/60 mb-6">
                        Click any node to learn about it
                    </p>

                    <div className="pl-2">
                        <TreeNodeComponent
                            node={domTree}
                            depth={0}
                            activeNode={activeNode}
                            onSelect={setActiveNode}
                        />
                    </div>
                </div>

                {/* Info panel + browser preview */}
                <div className="space-y-4">
                    {/* Node info */}
                    <div className={`bg-card rounded-2xl border border-border p-6 transition-all ${activeNode ? "" : "opacity-50"
                        }`}>
                        <h4 className="text-sm font-semibold text-text-secondary/60 mb-3">
                            {activeNode ? `<${activeNode}>` : "Select a node"}
                        </h4>
                        <p className="text-text-primary text-base">
                            {activeNode ? nodeDescriptions[activeNode] || "An HTML element" : "Click on any node in the tree to see details."}
                        </p>
                    </div>

                    {/* Mini browser preview */}
                    <div className="bg-card rounded-2xl border border-border overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2 bg-background/60 border-b border-border">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                            <span className="text-[10px] text-text-secondary/40 ml-1">Browser Preview</span>
                        </div>
                        <div className="p-4 text-sm">
                            <div className={`transition-all duration-300 ${activeNode === "header" || activeNode === "h1" || activeNode === "nav" ? "ring-2 ring-blue-400 rounded-lg" : ""}`}>
                                <div className="bg-gray-100 rounded-t-lg p-3 border-b border-gray-200">
                                    <span className={`font-bold text-base ${activeNode === "h1" ? "text-blue-600" : "text-gray-800"}`}>
                                        My Website
                                    </span>
                                    <div className={`flex gap-3 mt-1 text-xs ${activeNode === "nav" ? "text-blue-600 font-bold" : "text-blue-500"}`}>
                                        <span>Home</span>
                                        <span>About</span>
                                        <span>Contact</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`p-3 transition-all duration-300 ${activeNode === "main" || activeNode === "p" || activeNode === "div" ? "ring-2 ring-blue-400 rounded-lg" : ""}`}>
                                <p className={`text-gray-600 text-xs ${activeNode === "p" ? "text-blue-600 font-bold" : ""}`}>
                                    Welcome to my website! This is the main content area.
                                </p>
                                <div className={`mt-2 bg-gray-50 rounded p-2 text-xs text-gray-400 ${activeNode === "div" ? "ring-2 ring-blue-400 text-blue-600 font-bold" : ""}`}>
                                    A div container
                                </div>
                            </div>
                            <div className={`bg-gray-100 rounded-b-lg p-2 text-center transition-all duration-300 ${activeNode === "footer" ? "ring-2 ring-blue-400 rounded-lg" : ""}`}>
                                <span className="text-[10px] text-gray-400">&copy; 2025 My Website</span>
                            </div>
                        </div>
                    </div>

                    {/* Key concepts */}
                    <div className="bg-background rounded-xl p-4">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-2 text-text-secondary">
                                <span className="w-1.5 h-1.5 rounded-full bg-text-primary" />
                                document is the root
                            </div>
                            <div className="flex items-center gap-2 text-text-secondary">
                                <span className="w-1.5 h-1.5 rounded-full bg-text-primary" />
                                html is inside document
                            </div>
                            <div className="flex items-center gap-2 text-text-secondary">
                                <span className="w-1.5 h-1.5 rounded-full bg-text-primary" />
                                body is inside html
                            </div>
                            <div className="flex items-center gap-2 text-text-secondary">
                                <span className="w-1.5 h-1.5 rounded-full bg-text-primary" />
                                Elements are called nodes
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}

function TreeNodeComponent({
    node,
    depth,
    activeNode,
    onSelect,
}: {
    node: TreeNode;
    depth: number;
    activeNode: string | null;
    onSelect: (tag: string) => void;
}) {
    const isActive = activeNode === node.tag;

    return (
        <div style={{ paddingLeft: depth * 20 }}>
            <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(node.tag)}
                className={`flex items-center gap-2 py-1.5 px-2 rounded-lg text-sm font-mono transition-all cursor-pointer w-full text-left mb-0.5 ${isActive
                        ? "bg-dark text-card"
                        : "text-text-primary hover:bg-background"
                    }`}
            >
                <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? "bg-green-400" : "bg-border"
                    }`} />
                &lt;{node.tag}&gt;
            </motion.button>
            {node.children?.map((child) => (
                <TreeNodeComponent
                    key={child.tag + depth}
                    node={child}
                    depth={depth + 1}
                    activeNode={activeNode}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}
