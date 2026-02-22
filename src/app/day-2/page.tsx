"use client";

import JSHeroSection from "@/components/sections/day2/JSHeroSection";
import VariablesSection from "@/components/sections/day2/VariablesSection";
import DataTypesSection from "@/components/sections/day2/DataTypesSection";
import NullUndefinedSection from "@/components/sections/day2/NullUndefinedSection";
import OperatorsSection from "@/components/sections/day2/OperatorsSection";
import ConditionalsSection from "@/components/sections/day2/ConditionalsSection";
import LoopsSection from "@/components/sections/day2/LoopsSection";
import FunctionsSection from "@/components/sections/day2/FunctionsSection";
import DOMTreeSection from "@/components/sections/day2/DOMTreeSection";
import QuerySelectorSection from "@/components/sections/day2/QuerySelectorSection";
import EventListenersSection from "@/components/sections/day2/EventListenersSection";
import AsyncSection from "@/components/sections/day2/AsyncSection";
import ES6FeaturesSection from "@/components/sections/day2/ES6FeaturesSection";
import FrontendBackendSection from "@/components/sections/day2/FrontendBackendSection";
import JSQuizSection from "@/components/sections/day2/JSQuizSection";
import JSRecapSection from "@/components/sections/day2/JSRecapSection";

function QuoteBanner({ quote, author }: { quote: string; author?: string }) {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <p className="text-xl lg:text-2xl font-medium text-text-secondary/80 italic leading-relaxed">
                &ldquo;{quote}&rdquo;
            </p>
            {author && (
                <p className="text-sm text-text-secondary/50 mt-3 font-medium">
                    — {author}
                </p>
            )}
        </div>
    );
}

export default function Day2Page() {
    return (
        <>
            {/* ── Hero ───────────────────────────────────────── */}
            <JSHeroSection />

            {/* ── Fundamentals ───────────────────────────────── */}
            <VariablesSection />
            <DataTypesSection />
            <NullUndefinedSection />

            <QuoteBanner
                quote="First, solve the problem. Then, write the code."
                author="John Johnson"
            />

            {/* ── Operators & Control Flow ────────────────────── */}
            <OperatorsSection />
            <ConditionalsSection />
            <LoopsSection />

            <QuoteBanner
                quote="Talk is cheap. Show me the code."
                author="Linus Torvalds"
            />

            {/* ── Functions ──────────────────────────────────── */}
            <FunctionsSection />

            {/* ── DOM & Events ────────────────────────────────── */}
            <DOMTreeSection />
            <QuerySelectorSection />
            <EventListenersSection />

            <QuoteBanner
                quote="The best error message is the one that never shows up."
                author="Thomas Fuchs"
            />

            {/* ── Advanced ────────────────────────────────────── */}
            <AsyncSection />
            <ES6FeaturesSection />
            <FrontendBackendSection />

            <QuoteBanner
                quote="Any application that can be written in JavaScript, will eventually be written in JavaScript."
                author="Atwood's Law"
            />

            {/* ── Quiz & Recap ────────────────────────────────── */}
            <JSQuizSection />
            <JSRecapSection />
        </>
    );
}
