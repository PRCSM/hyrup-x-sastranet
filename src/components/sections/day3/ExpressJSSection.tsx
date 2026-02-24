"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

const setupSteps = [
    { cmd: "npm init -y", desc: "Initialize a new Node.js project — creates package.json", icon: "📦" },
    { cmd: "npm install express mongoose", desc: "Install Express (web framework) and Mongoose (MongoDB library)", icon: "📥" },
    { cmd: "npm install --save-dev nodemon", desc: "Install nodemon (auto-restarts server on code changes)", icon: "🔄" },
];

const reqProperties = [
    { prop: "req.params", desc: "URL parameters", example: '/users/:id → req.params.id = "5"' },
    { prop: "req.query", desc: "Query string", example: '/users?name=Nishanth → req.query.name = "Nishanth"' },
    { prop: "req.body", desc: "Request body (POST data)", example: '{ email: "user@mail.com", password: "123" }' },
    { prop: "req.method", desc: "HTTP method", example: '"GET", "POST", "PUT", "DELETE"' },
    { prop: "req.headers", desc: "Request headers", example: '{ "content-type": "application/json" }' },
];

const resProperties = [
    { prop: "res.send()", desc: "Send any response", example: 'res.send("Hello World!")' },
    { prop: "res.json()", desc: "Send JSON response", example: 'res.json({ name: "Nishanth" })' },
    { prop: "res.status()", desc: "Set status code", example: "res.status(404).json({ error: 'Not found' })" },
    { prop: "res.redirect()", desc: "Redirect to URL", example: 'res.redirect("/login")' },
];

const basicServerCode = `const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Nishanth" },
    { id: 2, name: "Anagha" }
  ]);
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({
    message: "User created!",
    user: { name, email }
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});`;

export default function ExpressJSSection() {
    const [activeSetup, setActiveSetup] = useState<number | null>(null);
    const [viewReq, setViewReq] = useState(true);

    return (
        <SectionWrapper
            id="expressjs"
            title="Express.js — The Steering Wheel"
            subtitle="Express is a framework built on top of Node.js. If Node is the engine, Express is the steering wheel and dashboard."
        >
            {/* Engine analogy */}
            <div className="max-w-lg mx-auto mb-12">
                <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center gap-6 justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mb-2">⚙️</div>
                            <p className="text-sm font-bold text-text-primary">Node.js</p>
                            <p className="text-xs text-text-secondary">The engine</p>
                        </div>
                        <div className="text-2xl text-text-secondary/30">+</div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-2">🎛️</div>
                            <p className="text-sm font-bold text-text-primary">Express</p>
                            <p className="text-xs text-text-secondary">Steering wheel + dashboard</p>
                        </div>
                        <div className="text-2xl text-text-secondary/30">=</div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl mb-2">🚗</div>
                            <p className="text-sm font-bold text-text-primary">Backend</p>
                            <p className="text-xs text-text-secondary">Ready to drive</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Setup steps */}
            <div className="max-w-3xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Project Setup</h3>
                <div className="space-y-2">
                    {setupSteps.map((step, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            onClick={() => setActiveSetup(activeSetup === i ? null : i)}
                            className={`flex items-start gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${activeSetup === i ? "bg-card border-dark shadow-sm" : "border-border hover:border-accent-dark"
                                }`}
                        >
                            <span className="text-lg mt-0.5">{step.icon}</span>
                            <div className="flex-1">
                                <code className="text-sm font-mono font-semibold text-text-primary">{step.cmd}</code>
                                <AnimatePresence>
                                    {activeSetup === i && (
                                        <motion.p
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="text-xs text-text-secondary mt-1 overflow-hidden"
                                        >
                                            {step.desc}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                            <span className="text-xs text-text-secondary/40 mt-1">{i + 1}/3</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Basic server code */}
            <div className="max-w-4xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Your First Express Server</h3>
                <CodeBlock code={basicServerCode} language="javascript" highlightLines={[8, 9, 10]} />
                <p className="text-xs text-text-secondary mt-3 text-center">
                    Express mainly works with two objects: <code className="bg-background px-1.5 py-0.5 rounded text-text-primary font-mono">req</code> (request) and <code className="bg-background px-1.5 py-0.5 rounded text-text-primary font-mono">res</code> (response)
                </p>
            </div>

            {/* req vs res explorer */}
            <div className="max-w-3xl mx-auto">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                    <code className="bg-background px-2 py-1 rounded">req</code> vs <code className="bg-background px-2 py-1 rounded">res</code> Explorer
                </h3>

                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setViewReq(true)}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${viewReq ? "bg-blue-500 text-white" : "bg-card text-text-secondary border border-border"
                            }`}
                    >
                        req (Request)
                    </button>
                    <button
                        onClick={() => setViewReq(false)}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${!viewReq ? "bg-green-500 text-white" : "bg-card text-text-secondary border border-border"
                            }`}
                    >
                        res (Response)
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={viewReq ? "req" : "res"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-2"
                    >
                        {(viewReq ? reqProperties : resProperties).map((item, i) => (
                            <div key={i} className="bg-card rounded-xl border border-border p-4">
                                <div className="flex items-start gap-3">
                                    <code className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${viewReq ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                                        }`}>
                                        {item.prop}
                                    </code>
                                    <div>
                                        <p className="text-sm text-text-primary font-medium">{item.desc}</p>
                                        <p className="text-xs font-mono text-text-secondary/60 mt-1">{item.example}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </SectionWrapper>
    );
}
