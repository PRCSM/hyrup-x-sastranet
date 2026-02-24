"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

const methods = [
    {
        method: "GET",
        color: "bg-green-500",
        colorLight: "bg-green-50 border-green-200 text-green-700",
        purpose: "Read / Retrieve data",
        example: "/api/users",
        description: "Fetches data from the server. Does NOT change anything.",
        request: `GET /api/users HTTP/1.1
Host: myapp.com`,
        response: `[
  { "id": 1, "name": "Nishanth" },
  { "id": 2, "name": "Anagha" }
]`,
    },
    {
        method: "POST",
        color: "bg-blue-500",
        colorLight: "bg-blue-50 border-blue-200 text-blue-700",
        purpose: "Create new data",
        example: "/api/users",
        description: "Sends data to the server to create a new resource.",
        request: `POST /api/users HTTP/1.1
Content-Type: application/json

{
  "name": "Rahul",
  "email": "rahul@mail.com"
}`,
        response: `{
  "id": 3,
  "name": "Rahul",
  "message": "User created!"
}`,
    },
    {
        method: "PUT",
        color: "bg-amber-500",
        colorLight: "bg-amber-50 border-amber-200 text-amber-700",
        purpose: "Update existing data",
        example: "/api/users/3",
        description: "Replaces or updates an existing resource on the server.",
        request: `PUT /api/users/3 HTTP/1.1
Content-Type: application/json

{
  "name": "Rahul Kumar",
  "email": "rahul.k@mail.com"
}`,
        response: `{
  "id": 3,
  "name": "Rahul Kumar",
  "message": "User updated!"
}`,
    },
    {
        method: "DELETE",
        color: "bg-red-500",
        colorLight: "bg-red-50 border-red-200 text-red-700",
        purpose: "Remove data",
        example: "/api/users/3",
        description: "Deletes a resource from the server.",
        request: `DELETE /api/users/3 HTTP/1.1
Host: myapp.com`,
        response: `{
  "message": "User deleted!",
  "id": 3
}`,
    },
];

const endpoints = [
    { method: "POST", path: "/api/login", desc: "Authenticate a user", color: "bg-blue-500" },
    { method: "GET", path: "/api/users", desc: "Fetch all users", color: "bg-green-500" },
    { method: "POST", path: "/api/products", desc: "Add a product", color: "bg-blue-500" },
    { method: "PUT", path: "/api/products/:id", desc: "Update a product", color: "bg-amber-500" },
    { method: "DELETE", path: "/api/orders/:id", desc: "Remove an order", color: "bg-red-500" },
    { method: "GET", path: "/api/orders", desc: "List all orders", color: "bg-green-500" },
];

export default function APIEndpointsSection() {
    const [selectedMethod, setSelectedMethod] = useState(0);
    const current = methods[selectedMethod];

    return (
        <SectionWrapper
            id="api-endpoints"
            title="APIs & HTTP Methods"
            subtitle="An API is a defined doorway in the backend that performs one specific action. Each API uses an HTTP method."
        >
            {/* Endpoint examples grid */}
            <div className="max-w-4xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Example API Endpoints</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {endpoints.map((ep, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="bg-card rounded-xl border border-border p-4 cursor-default"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`${ep.color} text-white text-[10px] font-bold px-2 py-0.5 rounded`}>
                                    {ep.method}
                                </span>
                                <code className="text-xs font-mono text-text-primary">{ep.path}</code>
                            </div>
                            <p className="text-xs text-text-secondary">{ep.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* HTTP Methods playground */}
            <div className="max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold text-text-primary mb-4">HTTP Methods Playground</h3>

                {/* Method tabs */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    {methods.map((m, i) => (
                        <button
                            key={m.method}
                            onClick={() => setSelectedMethod(i)}
                            className={`px-4 py-2 text-sm font-bold rounded-xl transition-all cursor-pointer ${selectedMethod === i
                                    ? `${m.color} text-white shadow-lg`
                                    : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                                }`}
                        >
                            {m.method}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.method}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {/* Method info */}
                        <div className={`border rounded-xl p-4 mb-4 ${current.colorLight}`}>
                            <div className="flex items-center gap-3">
                                <span className={`${current.color} text-white text-xs font-bold px-3 py-1 rounded-lg`}>
                                    {current.method}
                                </span>
                                <div>
                                    <p className="text-sm font-semibold">{current.purpose}</p>
                                    <p className="text-xs opacity-70">{current.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Request / Response */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wider">Request</p>
                                <CodeBlock code={current.request} language="http" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wider">Response</p>
                                <CodeBlock code={current.response} language="json" />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </SectionWrapper>
    );
}
