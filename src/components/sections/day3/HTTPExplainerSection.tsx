"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

const statusCodes = [
    { code: 200, label: "OK", color: "green", desc: "Request succeeded. Data returned.", example: "GET /users → list of users" },
    { code: 201, label: "Created", color: "green", desc: "Resource was created.", example: "POST /users → new user created" },
    { code: 400, label: "Bad Request", color: "yellow", desc: "Server couldn't understand request.", example: "Missing required fields in body" },
    { code: 401, label: "Unauthorized", color: "yellow", desc: "Not authenticated.", example: "No token or invalid token sent" },
    { code: 404, label: "Not Found", color: "red", desc: "Requested resource doesn't exist.", example: "GET /users/999 → user not found" },
    { code: 500, label: "Internal Server Error", color: "red", desc: "Server crashed or has a bug.", example: "Unhandled error in backend code" },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
    green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "bg-green-500" },
    yellow: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", badge: "bg-amber-500" },
    red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-red-500" },
};

export default function HTTPExplainerSection() {
    const [showRequest, setShowRequest] = useState(true);
    const [animating, setAnimating] = useState(false);
    const [arrowDir, setArrowDir] = useState<"request" | "response" | null>(null);

    const simulateHTTP = async () => {
        if (animating) return;
        setAnimating(true);
        setShowRequest(true);
        setArrowDir("request");
        await new Promise(r => setTimeout(r, 1500));
        setArrowDir("response");
        setShowRequest(false);
        await new Promise(r => setTimeout(r, 1500));
        setArrowDir(null);
        setAnimating(false);
    };

    return (
        <SectionWrapper
            id="http-explainer"
            title="HTTP — The Language of the Web"
            subtitle="Every time you open a website, submit a form, or click a button — your browser speaks HTTP."
        >
            {/* Browser ↔ Server visual */}
            <div className="max-w-3xl mx-auto mb-12">
                <div className="flex items-center justify-between gap-4">
                    {/* Browser */}
                    <motion.div
                        animate={{ scale: arrowDir === "request" ? 1.05 : 1 }}
                        className="flex-1 bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center"
                    >
                        <div className="text-3xl mb-2">🌐</div>
                        <p className="text-sm font-bold text-blue-900">Browser</p>
                        <p className="text-xs text-blue-600">Client / Frontend</p>
                    </motion.div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center gap-2 px-4 min-w-[120px]">
                        <AnimatePresence mode="wait">
                            {arrowDir === "request" && (
                                <motion.div
                                    key="req"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-xs font-mono text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
                                >
                                    Request →
                                </motion.div>
                            )}
                            {arrowDir === "response" && (
                                <motion.div
                                    key="res"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-xs font-mono text-green-600 bg-green-50 px-3 py-1 rounded-full"
                                >
                                    ← Response
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="w-full h-0.5 bg-border relative">
                            {arrowDir && (
                                <motion.div
                                    className="absolute top-0 h-full bg-dark rounded"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1 }}
                                />
                            )}
                        </div>
                        <button
                            onClick={simulateHTTP}
                            disabled={animating}
                            className={`text-xs font-medium px-4 py-1.5 rounded-full transition-all cursor-pointer ${animating ? "bg-green-100 text-green-700" : "bg-dark text-card hover:shadow-lg"
                                }`}
                        >
                            {animating ? "Communicating..." : "Simulate HTTP"}
                        </button>
                    </div>

                    {/* Server */}
                    <motion.div
                        animate={{ scale: arrowDir === "response" ? 1.05 : 1 }}
                        className="flex-1 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center"
                    >
                        <div className="text-3xl mb-2">🖥️</div>
                        <p className="text-sm font-bold text-amber-900">Server</p>
                        <p className="text-xs text-amber-600">Backend / API</p>
                    </motion.div>
                </div>
            </div>

            {/* Request / Response anatomy */}
            <div className="max-w-3xl mx-auto mb-12">
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setShowRequest(true)}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${showRequest ? "bg-dark text-card" : "bg-card text-text-secondary border border-border"
                            }`}
                    >
                        HTTP Request
                    </button>
                    <button
                        onClick={() => setShowRequest(false)}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${!showRequest ? "bg-dark text-card" : "bg-card text-text-secondary border border-border"
                            }`}
                    >
                        HTTP Response
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={showRequest ? "req" : "res"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-code-bg rounded-xl p-5 font-mono text-sm"
                    >
                        {showRequest ? (
                            <div className="space-y-1 text-code-text">
                                <p><span className="text-green-400">POST</span> <span className="text-blue-400">/api/login</span> <span className="text-code-text/40">HTTP/1.1</span></p>
                                <p className="text-code-text/50">Host: myapp.com</p>
                                <p className="text-code-text/50">Content-Type: application/json</p>
                                <p className="text-code-text/50">Authorization: Bearer eyJhbGc...</p>
                                <div className="border-t border-white/10 mt-2 pt-2">
                                    <p className="text-amber-400">{'{'}</p>
                                    <p className="pl-4">&quot;<span className="text-green-400">email</span>&quot;: &quot;<span className="text-amber-300">user@email.com</span>&quot;,</p>
                                    <p className="pl-4">&quot;<span className="text-green-400">password</span>&quot;: &quot;<span className="text-amber-300">mypass123</span>&quot;</p>
                                    <p className="text-amber-400">{'}'}</p>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <p className="text-xs text-code-text/30">↑ Method  ↑ URL/Route  ↑ Headers  ↑ Body</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-1 text-code-text">
                                <p><span className="text-code-text/40">HTTP/1.1</span> <span className="text-green-400">200 OK</span></p>
                                <p className="text-code-text/50">Content-Type: application/json</p>
                                <div className="border-t border-white/10 mt-2 pt-2">
                                    <p className="text-amber-400">{'{'}</p>
                                    <p className="pl-4">&quot;<span className="text-green-400">success</span>&quot;: <span className="text-blue-400">true</span>,</p>
                                    <p className="pl-4">&quot;<span className="text-green-400">token</span>&quot;: &quot;<span className="text-amber-300">eyJhbGciOiJ...</span>&quot;,</p>
                                    <p className="pl-4">&quot;<span className="text-green-400">user</span>&quot;: {'{'} &quot;<span className="text-green-400">name</span>&quot;: &quot;<span className="text-amber-300">Nishanth</span>&quot; {'}'}</p>
                                    <p className="text-amber-400">{'}'}</p>
                                </div>
                                <div className="mt-3">
                                    <p className="text-xs text-code-text/30">↑ Status Code  ↑ Headers  ↑ JSON Body</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Status codes */}
            <div className="max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold text-text-primary mb-6">HTTP Status Codes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {statusCodes.map((sc) => {
                        const c = colorMap[sc.color];
                        return (
                            <motion.div
                                key={sc.code}
                                whileHover={{ scale: 1.02 }}
                                className={`${c.bg} ${c.border} border rounded-xl p-4 cursor-default`}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`${c.badge} text-white text-xs font-bold px-2 py-0.5 rounded-md`}>{sc.code}</span>
                                    <span className={`text-sm font-semibold ${c.text}`}>{sc.label}</span>
                                </div>
                                <p className={`text-xs ${c.text} opacity-80`}>{sc.desc}</p>
                                <p className="text-[10px] text-text-secondary/50 mt-2 font-mono">{sc.example}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
}
