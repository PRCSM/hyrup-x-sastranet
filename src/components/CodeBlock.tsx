"use client";

interface CodeBlockProps {
    code: string;
    language?: string;
    highlightLines?: number[];
}

export default function CodeBlock({
    code,
    language = "html",
    highlightLines = [],
}: CodeBlockProps) {
    const lines = code.split("\n");

    return (
        <div className="relative rounded-xl overflow-hidden bg-code-bg border border-border">
            {/* Language badge */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
                <span className="text-xs font-mono text-code-text/50 uppercase tracking-wider">
                    {language}
                </span>
            </div>

            {/* Code content */}
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                <code>
                    {lines.map((line, i) => (
                        <div
                            key={i}
                            className={`px-2 -mx-2 ${highlightLines.includes(i + 1)
                                    ? "bg-white/10 border-l-2 border-accent"
                                    : ""
                                }`}
                        >
                            <span className="inline-block w-8 text-right mr-4 text-code-text/30 select-none text-xs">
                                {i + 1}
                            </span>
                            <span className="text-code-text font-mono">{line}</span>
                        </div>
                    ))}
                </code>
            </pre>
        </div>
    );
}
