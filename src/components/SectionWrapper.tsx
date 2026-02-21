"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
    children: ReactNode;
    id?: string;
    title?: string;
    subtitle?: string;
    className?: string;
    fullHeight?: boolean;
}

export default function SectionWrapper({
    children,
    id,
    title,
    subtitle,
    className = "",
    fullHeight = false,
}: SectionWrapperProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className={`
        w-full max-w-6xl mx-auto px-6
        ${fullHeight ? "min-h-screen flex flex-col justify-center" : "py-24"}
        ${className}
      `}
        >
            {(title || subtitle) && (
                <div className="mb-16">
                    {title && (
                        <h2 className="text-4xl font-semibold text-text-primary tracking-tight">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-lg text-text-secondary mt-3 max-w-xl">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
            {children}
        </motion.section>
    );
}
