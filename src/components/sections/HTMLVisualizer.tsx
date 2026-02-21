"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

interface TreeNode {
    tag: string;
    children?: TreeNode[];
    codeLine: number;
}

const tree: TreeNode = {
    tag: "html",
    codeLine: 1,
    children: [
        {
            tag: "head",
            codeLine: 2,
            children: [
                { tag: "title", codeLine: 3 },
                { tag: "link", codeLine: 4 },
            ],
        },
        {
            tag: "body",
            codeLine: 6,
            children: [
                {
                    tag: "header",
                    codeLine: 7,
                    children: [
                        { tag: "h1", codeLine: 8 },
                        { tag: "nav", codeLine: 9 },
                    ],
                },
                {
                    tag: "main",
                    codeLine: 11,
                    children: [
                        { tag: "p", codeLine: 12 },
                        { tag: "img", codeLine: 13 },
                    ],
                },
                {
                    tag: "footer",
                    codeLine: 15,
                    children: [{ tag: "p", codeLine: 16 }],
                },
            ],
        },
    ],
};

const codeLines = [
    { line: 1, content: '<html>', indent: 0 },
    { line: 2, content: '  <head>', indent: 1 },
    { line: 3, content: '    <title>My Page</title>', indent: 2 },
    { line: 4, content: '    <link rel="stylesheet" href="style.css">', indent: 2 },
    { line: 5, content: '  </head>', indent: 1 },
    { line: 6, content: '  <body>', indent: 1 },
    { line: 7, content: '    <header>', indent: 2 },
    { line: 8, content: '      <h1>Welcome</h1>', indent: 3 },
    { line: 9, content: '      <nav>Home | About</nav>', indent: 3 },
    { line: 10, content: '    </header>', indent: 2 },
    { line: 11, content: '    <main>', indent: 2 },
    { line: 12, content: '      <p>Hello world!</p>', indent: 3 },
    { line: 13, content: '      <img src="photo.jpg" alt="Photo">', indent: 3 },
    { line: 14, content: '    </main>', indent: 2 },
    { line: 15, content: '    <footer>', indent: 2 },
    { line: 16, content: '      <p>&copy; 2025</p>', indent: 3 },
    { line: 17, content: '    </footer>', indent: 2 },
    { line: 18, content: '  </body>', indent: 1 },
    { line: 19, content: '</html>', indent: 0 },
];

function TreeNodeComponent({
    node,
    activeLine,
    setActiveLine,
    depth = 0,
}: {
    node: TreeNode;
    activeLine: number | null;
    setActiveLine: (line: number | null) => void;
    depth?: number;
}) {
    const isActive = activeLine === node.codeLine;

    return (
        <div className="flex flex-col items-center">
            <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setActiveLine(node.codeLine)}
                onMouseLeave={() => setActiveLine(null)}
                className={`
          px-3 py-1.5 text-xs font-mono font-semibold rounded-lg border-2 transition-all duration-200 cursor-pointer
          ${isActive
                        ? "bg-dark text-card border-dark shadow-lg"
                        : "bg-card text-text-primary border-border hover:border-accent-dark"
                    }
        `}
            >
                &lt;{node.tag}&gt;
            </motion.button>

            {node.children && node.children.length > 0 && (
                <>
                    <div className="w-px h-4 bg-border" />
                    <div className="flex gap-3 items-start relative">
                        {node.children.length > 1 && (
                            <div
                                className="absolute top-0 h-px bg-border"
                                style={{
                                    left: `calc(50% / ${node.children.length})`,
                                    right: `calc(50% / ${node.children.length})`,
                                }}
                            />
                        )}
                        {node.children.map((child, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-px h-4 bg-border" />
                                <TreeNodeComponent
                                    node={child}
                                    activeLine={activeLine}
                                    setActiveLine={setActiveLine}
                                    depth={depth + 1}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default function HTMLVisualizer() {
    const [activeLine, setActiveLine] = useState<number | null>(null);

    return (
        <SectionWrapper
            id="html-visualizer"
            title="HTML — The DOM Tree"
            subtitle="Hover any element in the tree to highlight the corresponding HTML code."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Tree */}
                <div className="bg-card rounded-2xl border border-border p-8 flex justify-center overflow-x-auto">
                    <TreeNodeComponent
                        node={tree}
                        activeLine={activeLine}
                        setActiveLine={setActiveLine}
                    />
                </div>

                {/* Code */}
                <div className="bg-code-bg rounded-2xl border border-border p-6 overflow-x-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                        <div className="w-3 h-3 rounded-full bg-green-400/60" />
                        <span className="ml-auto text-xs font-mono text-code-text/50">HTML</span>
                    </div>
                    <pre className="text-sm leading-relaxed">
                        {codeLines.map((line) => (
                            <div
                                key={line.line}
                                onMouseEnter={() => setActiveLine(line.line)}
                                onMouseLeave={() => setActiveLine(null)}
                                className={`px-2 -mx-2 rounded cursor-pointer transition-all duration-200 ${activeLine === line.line
                                        ? "bg-white/10 border-l-2 border-accent"
                                        : "border-l-2 border-transparent"
                                    }`}
                            >
                                <span className="inline-block w-6 text-right mr-3 text-code-text/30 select-none text-xs">
                                    {line.line}
                                </span>
                                <span className="text-code-text font-mono">{line.content}</span>
                            </div>
                        ))}
                    </pre>
                </div>
            </div>
        </SectionWrapper>
    );
}
