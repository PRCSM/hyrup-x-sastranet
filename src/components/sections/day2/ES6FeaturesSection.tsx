"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const features = [
    {
        name: "let & const",
        icon: "📦",
        summary: "Block-scoped variable declarations replace var",
        code: `// Old way
var x = 10;

// New way
let y = 10;
const z = 20;`,
    },
    {
        name: "Arrow Functions",
        icon: "➡️",
        summary: "Shorter syntax for writing functions",
        code: `// Old way
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;`,
    },
    {
        name: "Template Literals",
        icon: "📝",
        summary: "String interpolation with backticks",
        code: `const name = "Anagha";
const age = 20;

// Old way
"Hello " + name + ", age: " + age

// Template literal
\`Hello \${name}, age: \${age}\``,
    },
    {
        name: "Destructuring",
        icon: "📤",
        summary: "Extract values from objects and arrays",
        code: `const user = { name: "Anagha", age: 20 };

// Old way
const name = user.name;
const age = user.age;

// Destructuring
const { name, age } = user;`,
    },
    {
        name: "Spread Operator",
        icon: "🔗",
        summary: "Expand arrays/objects with ...",
        code: `const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];
// [1, 2, 3, 4, 5]

const obj = { name: "Anagha" };
const newObj = { ...obj, age: 20 };
// { name: "Anagha", age: 20 }`,
    },
    {
        name: "Modules",
        icon: "📁",
        summary: "Import/export code between files",
        code: `// utils.js
export const greet = name => \`Hi \${name}\`;

// app.js
import { greet } from "./utils.js";
console.log(greet("Anagha"));`,
    },
    {
        name: "Default Params",
        icon: "⚙️",
        summary: "Set default values for function parameters",
        code: `function greet(name = "World") {
  return \`Hello \${name}!\`;
}

greet();        // "Hello World!"
greet("Anagha"); // "Hello Anagha!"`,
    },
    {
        name: "Optional Chaining",
        icon: "❓",
        summary: "Safely access nested properties",
        code: `const user = { address: { city: "Mumbai" } };

// Without (crashes if null)
user.address.city

// With optional chaining
user?.address?.city  // safe!`,
    },
];

export default function ES6FeaturesSection() {
    const [expanded, setExpanded] = useState<number | null>(null);

    return (
        <SectionWrapper
            id="es6"
            title="ES6+ Features"
            subtitle="Modern JavaScript features that make your code cleaner and more powerful."
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
                {features.map((f, i) => {
                    const isExpanded = expanded === i;
                    return (
                        <motion.div
                            key={f.name}
                            layout
                            onClick={() => setExpanded(isExpanded ? null : i)}
                            className={`bg-card rounded-2xl border border-border p-4 cursor-pointer transition-all hover:shadow-md ${isExpanded ? "col-span-1 sm:col-span-2" : ""
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl">{f.icon}</span>
                                <h4 className="text-sm font-semibold text-text-primary">{f.name}</h4>
                            </div>
                            <p className="text-xs text-text-secondary leading-relaxed">{f.summary}</p>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <pre className="mt-3 bg-code-bg rounded-lg p-3 text-xs font-mono text-green-400 leading-relaxed overflow-x-auto">
                                            {f.code}
                                        </pre>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mt-2 text-right">
                                <span className="text-xs text-text-secondary/40">
                                    {isExpanded ? "Click to collapse" : "Click to expand"}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}
