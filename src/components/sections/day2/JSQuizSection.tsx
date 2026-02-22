"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const questions = [
    {
        q: "Which keyword should you use to declare a variable that won't change?",
        options: ["var", "let", "const", "static"],
        answer: 2,
        fun: "const prevents reassignment — it's your default choice for variables that shouldn't change.",
    },
    {
        q: 'What does typeof "Hello" return?',
        options: ['"text"', '"string"', '"String"', '"char"'],
        answer: 1,
        fun: "JavaScript uses lowercase type names — \"string\", not \"String\".",
    },
    {
        q: "What's the difference between == and ===?",
        options: [
            "No difference",
            "=== checks type and value",
            "== is faster",
            "=== only works with numbers",
        ],
        answer: 1,
        fun: "=== (strict equality) checks both type AND value, preventing sneaky type coercion bugs.",
    },
    {
        q: "Which method selects ALL matching elements?",
        options: ["getElementById", "querySelector", "querySelectorAll", "getElement"],
        answer: 2,
        fun: "querySelectorAll returns a NodeList of ALL matching elements, while querySelector returns only the first.",
    },
    {
        q: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Manager",
            "Dynamic Output Module",
            "Document Oriented Mapping",
        ],
        answer: 0,
        fun: "The DOM is a tree representation of HTML that JavaScript can read and manipulate.",
    },
    {
        q: "Which is the correct arrow function syntax?",
        options: [
            "const fn => (x) { return x }",
            "const fn = (x) => x",
            "const fn -> (x) { x }",
            "function => fn(x) { x }",
        ],
        answer: 1,
        fun: "Arrow functions use => and can have an implicit return for single expressions.",
    },
    {
        q: "What does async/await help with?",
        options: [
            "Making code run faster",
            "Writing asynchronous code that looks synchronous",
            "Creating loops",
            "Declaring variables",
        ],
        answer: 1,
        fun: "async/await is syntactic sugar over Promises, making async code easier to read and write.",
    },
    {
        q: "What event fires when a user clicks a button?",
        options: ['"press"', '"tap"', '"click"', '"activate"'],
        answer: 2,
        fun: "The 'click' event fires when a user presses and releases a mouse button on an element.",
    },
];

export default function JSQuizSection() {
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const q = questions[currentQ];
    const isCorrect = selected === q.answer;

    const handleSelect = (idx: number) => {
        if (selected !== null) return;
        setSelected(idx);
        if (idx === q.answer) setScore((p) => p + 1);
    };

    const nextQuestion = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ((p) => p + 1);
            setSelected(null);
        } else {
            setFinished(true);
        }
    };

    const restart = () => {
        setCurrentQ(0);
        setSelected(null);
        setScore(0);
        setFinished(false);
    };

    return (
        <SectionWrapper
            id="js-quiz"
            title="Rapid-Fire Quiz"
            subtitle="Test your JavaScript knowledge!"
        >
            <div className="max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                    {!finished ? (
                        <motion.div
                            key={currentQ}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Progress */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-text-secondary">
                                    Question {currentQ + 1}/{questions.length}
                                </span>
                                <span className="text-sm font-semibold text-text-primary">
                                    Score: {score}
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-card rounded-full mb-6 overflow-hidden">
                                <motion.div
                                    className="h-full bg-dark rounded-full"
                                    animate={{ width: `${((currentQ + (selected !== null ? 1 : 0)) / questions.length) * 100}%` }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>

                            {/* Question */}
                            <h3 className="text-xl font-semibold text-text-primary mb-6">
                                {q.q}
                            </h3>

                            {/* Options */}
                            <div className="grid grid-cols-1 gap-2 mb-4">
                                {q.options.map((opt, i) => {
                                    let cls = "bg-card text-text-primary border-border hover:border-accent-dark";
                                    if (selected !== null) {
                                        if (i === q.answer) {
                                            cls = "bg-green-50 text-green-800 border-green-300";
                                        } else if (i === selected && !isCorrect) {
                                            cls = "bg-red-50 text-red-700 border-red-300";
                                        } else {
                                            cls = "bg-card text-text-secondary/50 border-border";
                                        }
                                    }
                                    return (
                                        <motion.button
                                            key={i}
                                            whileHover={!selected ? { scale: 1.01 } : {}}
                                            whileTap={!selected ? { scale: 0.99 } : {}}
                                            onClick={() => handleSelect(i)}
                                            disabled={selected !== null}
                                            className={`text-left px-5 py-3.5 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${cls} ${selected !== null ? "cursor-default" : ""}`}
                                        >
                                            <span className="font-mono text-xs mr-3 opacity-50">
                                                {String.fromCharCode(65 + i)}
                                            </span>
                                            {opt}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Feedback */}
                            <AnimatePresence>
                                {selected !== null && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className={`p-4 rounded-xl text-sm mb-4 ${isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"
                                            }`}>
                                            <span className="font-semibold">
                                                {isCorrect ? "Correct! " : "Not quite. "}
                                            </span>
                                            {q.fun}
                                        </div>
                                        <button
                                            onClick={nextQuestion}
                                            className="px-6 py-2.5 bg-dark text-card rounded-xl text-sm font-medium cursor-pointer hover:shadow-lg transition-all"
                                        >
                                            {currentQ < questions.length - 1 ? "Next Question →" : "See Results"}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-10"
                        >
                            <div className="text-6xl mb-4">
                                {score === questions.length ? "🏆" : score >= 6 ? "🎉" : score >= 4 ? "💪" : "📚"}
                            </div>
                            <h3 className="text-4xl font-bold text-text-primary mb-2">
                                {score}/{questions.length}
                            </h3>
                            <p className="text-text-secondary text-lg mb-8">
                                {score === questions.length
                                    ? "Flawless! You're a JavaScript wizard!"
                                    : score >= 6
                                        ? "Great job! You've got a solid JS foundation."
                                        : score >= 4
                                            ? "Good effort! Review the topics you missed."
                                            : "Keep learning! JavaScript takes practice."}
                            </p>
                            <button
                                onClick={restart}
                                className="px-6 py-2.5 bg-dark text-card rounded-xl text-sm font-medium cursor-pointer hover:shadow-lg transition-all"
                            >
                                Try Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SectionWrapper>
    );
}
