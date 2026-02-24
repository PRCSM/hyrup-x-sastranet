"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import CodeBlock from "@/components/CodeBlock";

interface SchemaField {
    name: string;
    type: string;
    required: boolean;
}

const typeOptions = ["String", "Number", "Boolean", "Date", "Array"];

export default function SchemaModelSection() {
    const [fields, setFields] = useState<SchemaField[]>([
        { name: "name", type: "String", required: false },
        { name: "email", type: "String", required: true },
        { name: "age", type: "Number", required: false },
    ]);
    const [newFieldName, setNewFieldName] = useState("");
    const [newFieldType, setNewFieldType] = useState("String");
    const [newFieldReq, setNewFieldReq] = useState(false);

    // Validation demo
    const [testDoc, setTestDoc] = useState('{ "name": "Nishanth" }');
    const [validationResult, setValidationResult] = useState<null | { valid: boolean; message: string }>(null);

    const addField = () => {
        if (!newFieldName.trim()) return;
        setFields(prev => [...prev, { name: newFieldName.trim(), type: newFieldType, required: newFieldReq }]);
        setNewFieldName("");
        setNewFieldReq(false);
    };

    const removeField = (i: number) => {
        setFields(prev => prev.filter((_, idx) => idx !== i));
    };

    // Generate Mongoose code
    const schemaCode = `const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
${fields.map(f => {
        if (f.required) {
            return `  ${f.name}: { type: ${f.type}, required: true }`;
        }
        return `  ${f.name}: ${f.type}`;
    }).join(",\n")}
});

const User = mongoose.model("User", userSchema);`;

    const validateDoc = () => {
        try {
            const doc = JSON.parse(testDoc);
            const requiredFields = fields.filter(f => f.required);
            const missingFields = requiredFields.filter(f => !(f.name in doc));

            if (missingFields.length > 0) {
                setValidationResult({
                    valid: false,
                    message: `❌ Mongoose says NO! Missing required fields: ${missingFields.map(f => f.name).join(", ")}`,
                });
            } else {
                setValidationResult({
                    valid: true,
                    message: "✅ Document is valid! All required fields present.",
                });
            }
        } catch {
            setValidationResult({
                valid: false,
                message: "❌ Invalid JSON format",
            });
        }
    };

    return (
        <SectionWrapper
            id="schema-model"
            title="Schema & Model"
            subtitle="A Schema is a blueprint for documents. A Model is a class that represents a collection."
        >
            {/* Blueprint visual */}
            <div className="max-w-lg mx-auto mb-12">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
                    <div className="text-3xl mb-2">📋</div>
                    <h3 className="text-base font-bold text-blue-900 mb-2">Schema = Blueprint</h3>
                    <p className="text-xs text-blue-600 mb-4">
                        Defines what every document in a collection MUST look like.
                        <br />Fields, types, and which ones are required.
                    </p>
                    <div className="flex justify-center gap-4 text-sm">
                        <div className="bg-white rounded-lg px-3 py-2 border border-blue-200">
                            <p className="font-bold text-blue-900">Schema</p>
                            <p className="text-[10px] text-blue-600">The form</p>
                        </div>
                        <div className="flex items-center text-blue-300">→</div>
                        <div className="bg-white rounded-lg px-3 py-2 border border-blue-200">
                            <p className="font-bold text-blue-900">Model</p>
                            <p className="text-[10px] text-blue-600">The class</p>
                        </div>
                        <div className="flex items-center text-blue-300">→</div>
                        <div className="bg-white rounded-lg px-3 py-2 border border-blue-200">
                            <p className="font-bold text-blue-900">Document</p>
                            <p className="text-[10px] text-blue-600">The instance</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Schema Builder */}
            <div className="max-w-4xl mx-auto mb-12">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Interactive Schema Builder</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Builder panel */}
                    <div className="bg-card rounded-xl border border-border p-5">
                        <h4 className="text-sm font-semibold text-text-primary mb-3">Define Fields</h4>
                        <div className="space-y-2 mb-4">
                            {fields.map((f, i) => (
                                <div key={i} className="flex items-center gap-2 bg-background rounded-lg px-3 py-2">
                                    <span className="text-xs font-mono text-text-primary font-semibold flex-1">{f.name}</span>
                                    <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">{f.type}</span>
                                    {f.required && (
                                        <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded">required</span>
                                    )}
                                    <button onClick={() => removeField(i)} className="text-red-400 hover:text-red-600 text-xs cursor-pointer">×</button>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newFieldName}
                                    onChange={e => setNewFieldName(e.target.value)}
                                    placeholder="field name"
                                    className="flex-1 px-2 py-1.5 text-xs rounded-lg border border-border bg-background text-text-primary outline-none"
                                />
                                <select
                                    value={newFieldType}
                                    onChange={e => setNewFieldType(e.target.value)}
                                    className="px-2 py-1.5 text-xs rounded-lg border border-border bg-background text-text-primary outline-none cursor-pointer"
                                >
                                    {typeOptions.map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={newFieldReq}
                                        onChange={e => setNewFieldReq(e.target.checked)}
                                        className="rounded cursor-pointer"
                                    />
                                    Required field
                                </label>
                                <button
                                    onClick={addField}
                                    className="px-3 py-1.5 bg-dark text-card text-xs rounded-lg cursor-pointer hover:shadow-lg transition-all"
                                >
                                    Add Field +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Generated code */}
                    <div>
                        <CodeBlock code={schemaCode} language="javascript" />
                    </div>
                </div>
            </div>

            {/* Validation demo */}
            <div className="max-w-xl mx-auto">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Validation Demo</h3>
                <p className="text-sm text-text-secondary mb-4">
                    Try saving a document. Mongoose will check against your schema:
                </p>
                <div className="bg-card rounded-xl border border-border p-5">
                    <div className="mb-3">
                        <label className="text-xs font-semibold text-text-secondary block mb-1">Document (JSON)</label>
                        <textarea
                            value={testDoc}
                            onChange={e => { setTestDoc(e.target.value); setValidationResult(null); }}
                            rows={3}
                            className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-border bg-background text-text-primary outline-none resize-none"
                        />
                    </div>

                    {fields.some(f => f.required) && (
                        <p className="text-[10px] text-text-secondary/60 mb-3">
                            Required fields: {fields.filter(f => f.required).map(f => f.name).join(", ")}
                        </p>
                    )}

                    <button
                        onClick={validateDoc}
                        className="w-full px-4 py-2.5 bg-dark text-card rounded-xl text-sm font-medium cursor-pointer hover:shadow-lg transition-all mb-3"
                    >
                        user.save() →
                    </button>

                    <AnimatePresence>
                        {validationResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`rounded-lg p-3 text-center ${validationResult.valid
                                        ? "bg-green-50 border border-green-200"
                                        : "bg-red-50 border border-red-200"
                                    }`}
                            >
                                <p className={`text-xs font-medium ${validationResult.valid ? "text-green-700" : "text-red-700"}`}>
                                    {validationResult.message}
                                </p>
                                {!validationResult.valid && !validationResult.message.includes("JSON") && (
                                    <p className="text-[10px] text-text-secondary mt-1">
                                        MongoDB alone wouldn&apos;t care. Mongoose enforces the schema.
                                    </p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </SectionWrapper>
    );
}
