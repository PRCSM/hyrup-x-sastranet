"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const questions = [
    {
        q: "What tag makes a heading?",
        options: ["<p>", "<h1>", "<div>", "<span>"],
        answer: 1,
        fun: "Nailed it! h1 = heading 1 = the big boss.",
    },
    {
        q: "Class or ID — which do you use more?",
        options: ["ID", "Class", "Both equally", "Neither"],
        answer: 1,
        fun: "Class gang! IDs are like Social Security numbers — unique but rarely needed.",
    },
    {
        q: "How do you center a div with Flexbox?",
        options: [
            "text-align: center",
            "margin: auto",
            "justify-content: center + align-items: center",
            "Pray",
        ],
        answer: 2,
        fun: "Before Flexbox, 'Pray' was honestly a valid answer.",
    },
    {
        q: "What does position: absolute need to work properly?",
        options: [
            "A parent with display: flex",
            "A parent with position: relative",
            "The element must be a block element",
            "It only works on <div> tags",
        ],
        answer: 1,
        fun: "An absolute element positions itself relative to the nearest positioned ancestor. No positioned parent? It'll fly to the <body>!",
    },
    {
        q: "The <img> tag is inline — so why can we set its width & height?",
        options: [
            "Because browsers apply display: block to all images",
            "Because <img> is a replaced element",
            "Because width/height work on any element",
            "Because <img> is actually a block element",
        ],
        answer: 1,
        fun: "Replaced elements (img, video, input) are inline but have intrinsic dimensions — so width & height just work. CSS is weird like that!",
    },
    {
        q: "What unit should you use for font sizes?",
        options: ["px", "em", "rem", "cm"],
        answer: 2,
        fun: "rem = root em. It makes your whole site scale beautifully. Never use cm unless you're printing a magazine.",
    },
    {
        q: "What's the box model order (outside → inside)?",
        options: [
            "Border → Padding → Margin → Content",
            "Margin → Border → Padding → Content",
            "Content → Padding → Border → Margin",
            "Margin → Padding → Border → Content",
        ],
        answer: 1,
        fun: "Think Amazon package: Margin (space on shelf) → Border (cardboard) → Padding (bubble wrap) → Content (your item).",
    },
];

export default function RapidFireQuiz() {
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const handleAnswer = (optionIndex: number) => {
        if (selected !== null) return;
        setSelected(optionIndex);
        if (optionIndex === questions[currentQ].answer) {
            setScore((prev) => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ((prev) => prev + 1);
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

    const q = questions[currentQ];
    const isCorrect = selected === q.answer;

    return (
        <SectionWrapper
            id="rapid-fire"
            title="Rapid-Fire Quiz"
            subtitle="Test what you just learned. No pressure... okay maybe a little."
        >
            <AnimatePresence mode="wait">
                {!finished ? (
                    <motion.div
                        key={currentQ}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-2xl mx-auto"
                    >
                        {/* Progress */}
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-sm text-text-secondary font-medium">
                                Question {currentQ + 1} of {questions.length}
                            </span>
                            <span className="text-sm font-semibold text-text-primary">
                                Score: {score}/{questions.length}
                            </span>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-1.5 bg-card rounded-full mb-8 overflow-hidden">
                            <motion.div
                                className="h-full bg-dark rounded-full"
                                initial={{ width: 0 }}
                                animate={{
                                    width: `${((currentQ + (selected !== null ? 1 : 0)) / questions.length) * 100}%`,
                                }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>

                        {/* Question */}
                        <h3 className="text-2xl font-semibold text-text-primary mb-8">
                            {q.q}
                        </h3>

                        {/* Options */}
                        <div className="grid grid-cols-1 gap-3 mb-6">
                            {q.options.map((opt, i) => {
                                let optionClass = "bg-card text-text-primary border-border hover:border-accent-dark";
                                if (selected !== null) {
                                    if (i === q.answer) {
                                        optionClass = "bg-green-50 text-green-800 border-green-300";
                                    } else if (i === selected && !isCorrect) {
                                        optionClass = "bg-red-50 text-red-700 border-red-300";
                                    } else {
                                        optionClass = "bg-card text-text-secondary/50 border-border";
                                    }
                                }

                                return (
                                    <motion.button
                                        key={i}
                                        whileHover={selected === null ? { scale: 1.01 } : {}}
                                        whileTap={selected === null ? { scale: 0.99 } : {}}
                                        onClick={() => handleAnswer(i)}
                                        disabled={selected !== null}
                                        className={`
                      w-full text-left px-5 py-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 cursor-pointer
                      ${optionClass}
                      ${selected !== null ? "cursor-default" : ""}
                    `}
                                    >
                                        <span className="text-text-secondary/40 mr-3 font-mono text-xs">
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
                                    className="mb-6"
                                >
                                    <div
                                        className={`p-4 rounded-xl text-sm ${isCorrect
                                            ? "bg-green-50 text-green-800"
                                            : "bg-red-50 text-red-700"
                                            }`}
                                    >
                                        <span className="font-semibold">
                                            {isCorrect ? "Correct! " : "Not quite. "}
                                        </span>
                                        {q.fun}
                                    </div>

                                    <button
                                        onClick={nextQuestion}
                                        className="mt-4 px-6 py-2.5 bg-dark text-card rounded-xl text-sm font-medium cursor-pointer hover:shadow-lg transition-all"
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
                        className="max-w-md mx-auto text-center"
                    >
                        <div className="text-6xl mb-6">
                            {score === questions.length ? "🏆" : score >= 4 ? "🎉" : score >= 2 ? "💪" : "📚"}
                        </div>
                        <h3 className="text-3xl font-bold text-text-primary mb-2">
                            {score}/{questions.length}
                        </h3>
                        <p className="text-text-secondary mb-2">
                            {score === questions.length
                                ? "Perfect score! You're ready to build the next Stripe.dev."
                                : score >= 4
                                    ? "Great job! You've got the fundamentals down."
                                    : score >= 2
                                        ? "Not bad! Review the sections above and try again."
                                        : "Time to scroll back up and absorb some more!"}
                        </p>
                        <button
                            onClick={restart}
                            className="mt-6 px-6 py-2.5 bg-dark text-card rounded-xl text-sm font-medium cursor-pointer hover:shadow-lg transition-all"
                        >
                            Try Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
