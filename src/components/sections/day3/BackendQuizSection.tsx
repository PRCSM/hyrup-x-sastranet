"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

interface Question {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

const questions: Question[] = [
    {
        question: 'What does the "S" in REST stand for?',
        options: ["State", "Server", "Simple", "Secure"],
        correct: 0,
        explanation: "REST = Representational State Transfer. It's an architectural style for APIs.",
    },
    {
        question: "Which HTTP method creates a new resource?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correct: 1,
        explanation: "POST sends data to create a new resource on the server.",
    },
    {
        question: "What status code means 'Not Found'?",
        options: ["200", "401", "404", "500"],
        correct: 2,
        explanation: "404 means the requested resource doesn't exist on the server.",
    },
    {
        question: "What is Node.js?",
        options: ["A new language", "A browser", "JS runtime outside browser", "A database"],
        correct: 2,
        explanation: "Node.js lets you run JavaScript outside the browser, on servers.",
    },
    {
        question: "Express.js is a _____ for Node.js",
        options: ["Database", "Framework", "Language", "Browser"],
        correct: 1,
        explanation: "Express is a web framework built on top of Node.js to make server development easier.",
    },
    {
        question: "MongoDB stores data as:",
        options: ["Tables & Rows", "JSON Documents", "Key-Value Pairs", "Graphs"],
        correct: 1,
        explanation: "MongoDB uses JSON-like documents stored in collections, not tables.",
    },
    {
        question: "What does Mongoose add to MongoDB?",
        options: ["Speed", "Schemas & Validation", "Encryption", "Caching"],
        correct: 1,
        explanation: "Mongoose adds structure (schemas), validation, and convenient methods on top of MongoDB.",
    },
    {
        question: "What does `req.body` contain?",
        options: ["URL parameters", "Query strings", "POST data", "Headers"],
        correct: 2,
        explanation: "req.body contains the data sent in the request body (usually from POST/PUT requests).",
    },
    {
        question: "Which runs async code in JS?",
        options: ["for loop", "Event Loop", "DOM", "CSS"],
        correct: 1,
        explanation: "The Event Loop manages async operations — it checks the callback queue when the call stack is empty.",
    },
    {
        question: "What does `res.json()` do?",
        options: ["Read JSON file", "Send JSON response", "Parse JSON", "Validate JSON"],
        correct: 1,
        explanation: "res.json() sends a JSON-formatted response back to the client.",
    },
];

export default function BackendQuizSection() {
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [finished, setFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [started, setStarted] = useState(false);

    const handleTimeout = useCallback(() => {
        if (!answered) {
            setAnswered(true);
        }
    }, [answered]);

    useEffect(() => {
        if (!started || answered || finished) return;
        if (timeLeft <= 0) {
            handleTimeout();
            return;
        }
        const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, answered, finished, started, handleTimeout]);

    const handleSelect = (i: number) => {
        if (answered) return;
        setSelected(i);
        setAnswered(true);
        if (i === questions[currentQ].correct) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQ + 1 >= questions.length) {
            setFinished(true);
        } else {
            setCurrentQ(prev => prev + 1);
            setSelected(null);
            setAnswered(false);
            setTimeLeft(15);
        }
    };

    const restart = () => {
        setCurrentQ(0);
        setSelected(null);
        setScore(0);
        setAnswered(false);
        setFinished(false);
        setTimeLeft(15);
        setStarted(true);
    };

    const q = questions[currentQ];
    const percentage = Math.round((score / questions.length) * 100);

    return (
        <SectionWrapper
            id="backend-quiz"
            title="Backend Quiz"
            subtitle="Test your understanding! 10 rapid-fire questions. 15 seconds each."
        >
            <div className="max-w-xl mx-auto">
                {!started ? (
                    /* Start screen */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card rounded-2xl border border-border p-8 text-center"
                    >
                        <div className="text-5xl mb-4">🧠</div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">Ready?</h3>
                        <p className="text-sm text-text-secondary mb-6">
                            {questions.length} questions · 15 seconds each
                        </p>
                        <button
                            onClick={() => setStarted(true)}
                            className="px-8 py-3 bg-dark text-card rounded-xl text-sm font-medium cursor-pointer hover:shadow-lg transition-all"
                        >
                            Start Quiz →
                        </button>
                    </motion.div>
                ) : finished ? (
                    /* Results screen */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card rounded-2xl border border-border p-8 text-center"
                    >
                        <div className="text-5xl mb-4">
                            {percentage >= 80 ? "🏆" : percentage >= 60 ? "👏" : percentage >= 40 ? "💪" : "📚"}
                        </div>
                        <h3 className="text-xl font-bold text-text-primary mb-1">Quiz Complete!</h3>
                        <p className="text-3xl font-bold text-text-primary my-4">
                            {score}/{questions.length}
                        </p>
                        <div className="w-full bg-background rounded-full h-3 mb-4">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-3 rounded-full ${percentage >= 80 ? "bg-green-500" : percentage >= 60 ? "bg-amber-500" : "bg-red-500"
                                    }`}
                            />
                        </div>
                        <p className="text-sm text-text-secondary mb-6">
                            {percentage >= 80 ? "Excellent! You really understand backend concepts!" :
                                percentage >= 60 ? "Good job! Review a few topics and you'll nail it!" :
                                    "Keep practicing! Review the sections above and try again."}
                        </p>
                        <button
                            onClick={restart}
                            className="px-6 py-2.5 bg-dark text-card rounded-xl text-sm font-medium cursor-pointer hover:shadow-lg transition-all"
                        >
                            Try Again
                        </button>
                    </motion.div>
                ) : (
                    /* Question screen */
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQ}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-card rounded-2xl border border-border p-6"
                        >
                            {/* Progress */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-semibold text-text-secondary">
                                    {currentQ + 1}/{questions.length}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-text-secondary">Score: {score}</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${timeLeft > 5 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        }`}>
                                        {timeLeft}s
                                    </span>
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-background rounded-full h-1 mb-6">
                                <div
                                    className="h-1 bg-dark rounded-full transition-all"
                                    style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                                />
                            </div>

                            {/* Question */}
                            <h4 className="text-base font-semibold text-text-primary mb-5">{q.question}</h4>

                            {/* Options */}
                            <div className="space-y-2 mb-4">
                                {q.options.map((opt, i) => {
                                    const isCorrect = i === q.correct;
                                    const isSelected = i === selected;
                                    let bg = "bg-background hover:bg-background/80 border-border";
                                    if (answered) {
                                        if (isCorrect) bg = "bg-green-50 border-green-300";
                                        else if (isSelected && !isCorrect) bg = "bg-red-50 border-red-300";
                                        else bg = "bg-background border-border opacity-50";
                                    }

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handleSelect(i)}
                                            disabled={answered}
                                            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all cursor-pointer ${bg}`}
                                        >
                                            <span className="font-medium text-text-primary">{opt}</span>
                                            {answered && isCorrect && <span className="float-right text-green-600">✓</span>}
                                            {answered && isSelected && !isCorrect && <span className="float-right text-red-600">✗</span>}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Explanation */}
                            <AnimatePresence>
                                {answered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className={`rounded-lg p-3 text-xs mb-4 ${selected === q.correct ? "bg-green-50 border border-green-200 text-green-700" : "bg-amber-50 border border-amber-200 text-amber-700"
                                            }`}>
                                            {q.explanation}
                                        </div>
                                        <button
                                            onClick={nextQuestion}
                                            className="w-full px-4 py-2.5 bg-dark text-card rounded-xl text-sm font-medium cursor-pointer hover:shadow-lg transition-all"
                                        >
                                            {currentQ + 1 < questions.length ? "Next →" : "See Results"}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </SectionWrapper>
    );
}
