"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

const tabs = ["Objects", "Arrays"] as const;

const objectExamples = [
    {
        title: "Creating an Object",
        code: `const student = {
  name: "Anagha",
  age: 20,
  city: "Mumbai"
};

console.log(student);
// { name: "Anagha", age: 20, city: "Mumbai" }`,
    },
    {
        title: "Accessing Properties",
        code: `const student = { name: "Anagha", age: 20 };

// Dot notation
console.log(student.name);   // "Anagha"

// Bracket notation
console.log(student["age"]); // 20

// Dynamic key
let key = "name";
console.log(student[key]);   // "Anagha"`,
    },
    {
        title: "Nested Objects",
        code: `const student = {
  name: "Anagha",
  address: {
    city: "Mumbai",
    pin: 400001
  }
};

console.log(student.address.city); // "Mumbai"`,
    },
];

const arrayExamples = [
    {
        title: "Creating an Array",
        code: `const fruits = ["Apple", "Banana", "Mango"];

console.log(fruits);        // ["Apple", "Banana", "Mango"]
console.log(fruits.length); // 3`,
    },
    {
        title: "Accessing Elements",
        code: `const fruits = ["Apple", "Banana", "Mango"];

console.log(fruits[0]); // "Apple"
console.log(fruits[1]); // "Banana"
console.log(fruits[2]); // "Mango"

// Last element
console.log(fruits[fruits.length - 1]); // "Mango"`,
    },
];

export default function ObjectsArraysSection() {
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Objects");
    const [mapInput] = useState(["Anagha", "Rahul", "Priya"]);
    const [mapRunning, setMapRunning] = useState(false);
    const [mapOutput, setMapOutput] = useState<string[]>([]);
    const [mapStep, setMapStep] = useState(-1);

    const runMapDemo = () => {
        setMapRunning(true);
        setMapOutput([]);
        setMapStep(-1);

        mapInput.forEach((_, i) => {
            setTimeout(() => {
                setMapStep(i);
                setMapOutput((prev) => [...prev, `"Hello ${mapInput[i]}"`]);
                if (i === mapInput.length - 1) {
                    setTimeout(() => {
                        setMapRunning(false);
                        setMapStep(-1);
                    }, 800);
                }
            }, (i + 1) * 700);
        });
    };

    return (
        <SectionWrapper
            id="objects-arrays"
            title="Objects & Arrays"
            subtitle="The two core data structures in JavaScript — objects store named values, arrays store ordered lists."
        >
            {/* Tab switcher */}
            <div className="flex gap-2 mb-10 max-w-5xl mx-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all cursor-pointer ${activeTab === tab
                            ? "bg-dark text-card shadow-md"
                            : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === "Objects" ? (
                    <motion.div
                        key="objects"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Object visual */}
                        <div className="max-w-3xl mx-auto mb-10">
                            <div className="bg-card rounded-2xl border border-border p-6">
                                <h3 className="text-base font-semibold text-text-primary mb-4">
                                    What is an Object?
                                </h3>
                                <p className="text-sm text-text-secondary mb-5 leading-relaxed">
                                    An object is like a real-world thing — it has properties (key-value pairs).
                                    Think of it like a student&apos;s ID card.
                                </p>
                                <div className="bg-background rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="px-3 py-1 bg-dark text-card rounded-lg text-xs font-mono font-bold">
                                            student
                                        </div>
                                        <span className="text-text-secondary/40 text-sm">=</span>
                                    </div>
                                    <div className="space-y-2 pl-4 border-l-2 border-accent-dark/30">
                                        {[
                                            { key: "name", value: '"Anagha"', color: "text-green-600" },
                                            { key: "age", value: "20", color: "text-blue-600" },
                                            { key: "city", value: '"Mumbai"', color: "text-green-600" },
                                        ].map((prop) => (
                                            <motion.div
                                                key={prop.key}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex items-center gap-3 py-1.5"
                                            >
                                                <span className="text-sm font-mono font-semibold text-text-primary w-16">
                                                    {prop.key}
                                                </span>
                                                <span className="text-text-secondary/40">:</span>
                                                <span className={`text-sm font-mono font-medium ${prop.color}`}>
                                                    {prop.value}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Object code examples */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                            {objectExamples.map((ex, i) => (
                                <motion.div
                                    key={ex.title}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <h4 className="text-sm font-semibold text-text-primary mb-2">
                                        {ex.title}
                                    </h4>
                                    <CodeBlock code={ex.code} language="javascript" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="arrays"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Array visual */}
                        <div className="max-w-3xl mx-auto mb-10">
                            <div className="bg-card rounded-2xl border border-border p-6">
                                <h3 className="text-base font-semibold text-text-primary mb-4">
                                    What is an Array?
                                </h3>
                                <p className="text-sm text-text-secondary mb-5 leading-relaxed">
                                    An array is an ordered list of values. Each value has an index number starting from 0.
                                </p>
                                <div className="bg-background rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="px-3 py-1 bg-dark text-card rounded-lg text-xs font-mono font-bold">
                                            fruits
                                        </div>
                                        <span className="text-text-secondary/40 text-sm">=</span>
                                    </div>
                                    <div className="flex gap-3 flex-wrap">
                                        {["Apple", "Banana", "Mango"].map((fruit, i) => (
                                            <motion.div
                                                key={fruit}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex flex-col items-center"
                                            >
                                                <div className="px-5 py-3 bg-accent-dark/10 border border-accent-dark/20 rounded-xl">
                                                    <span className="text-sm font-mono font-medium text-green-700">
                                                        &quot;{fruit}&quot;
                                                    </span>
                                                </div>
                                                <span className="text-[10px] text-text-secondary/50 mt-1 font-mono">
                                                    index {i}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Array code examples */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
                            {arrayExamples.map((ex, i) => (
                                <motion.div
                                    key={ex.title}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <h4 className="text-sm font-semibold text-text-primary mb-2">
                                        {ex.title}
                                    </h4>
                                    <CodeBlock code={ex.code} language="javascript" />
                                </motion.div>
                            ))}
                        </div>

                        {/* .map() interactive demo */}
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-card rounded-2xl border border-border p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-base font-semibold text-text-primary">
                                        .map() — Transform Every Item
                                    </h3>
                                    <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                        MOST USED
                                    </span>
                                </div>
                                <p className="text-sm text-text-secondary mb-5 leading-relaxed">
                                    <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">.map()</code> creates a
                                    new array by running a function on every item. It does <strong>not</strong> change the original.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                    {/* Input array */}
                                    <div>
                                        <div className="text-xs font-medium text-text-secondary/60 mb-2">
                                            Input Array: <code className="font-mono">names</code>
                                        </div>
                                        <div className="flex gap-2 flex-wrap">
                                            {mapInput.map((name, i) => (
                                                <motion.div
                                                    key={name}
                                                    animate={{
                                                        scale: mapStep === i ? 1.1 : 1,
                                                        borderColor: mapStep === i ? "#f59e0b" : "transparent",
                                                    }}
                                                    className="px-4 py-2 bg-background rounded-lg border-2 transition-colors"
                                                >
                                                    <span className="text-sm font-mono text-text-primary">
                                                        &quot;{name}&quot;
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Output array */}
                                    <div>
                                        <div className="text-xs font-medium text-text-secondary/60 mb-2">
                                            Output Array: <code className="font-mono">greetings</code>
                                        </div>
                                        <div className="flex gap-2 flex-wrap min-h-[44px]">
                                            <AnimatePresence>
                                                {mapOutput.map((item, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg"
                                                    >
                                                        <span className="text-sm font-mono text-green-700">{item}</span>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={runMapDemo}
                                    disabled={mapRunning}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer mb-4 ${mapRunning
                                        ? "bg-amber-100 text-amber-700"
                                        : "bg-dark text-card hover:shadow-lg"
                                        }`}
                                >
                                    {mapRunning ? "Mapping..." : "Run .map()"}
                                </button>

                                <CodeBlock
                                    code={`const names = ["Anagha", "Rahul", "Priya"];

const greetings = names.map(name => "Hello " + name);

console.log(greetings);
// ["Hello Anagha", "Hello Rahul", "Hello Priya"]`}
                                    language="javascript"
                                    highlightLines={[3]}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
