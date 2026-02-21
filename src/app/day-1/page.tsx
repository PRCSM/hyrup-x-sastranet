import HeroSection from "@/components/sections/HeroSection";
import IceBreaker from "@/components/sections/IceBreaker";
import WhyGoodDesign from "@/components/sections/WhyGoodDesign";
import WebFlowDiagram from "@/components/sections/WebFlowDiagram";
import SkeletonToModernDemo from "@/components/sections/SkeletonToModernDemo";
import HTMLVisualizer from "@/components/sections/HTMLVisualizer";
import SemanticHTML from "@/components/sections/SemanticHTML";
import CSSPreviewDemo from "@/components/sections/CSSPreviewDemo";
import BoxModelDemo from "@/components/sections/BoxModelDemo";
import FlexboxPlayground from "@/components/sections/FlexboxPlayground";
import ResponsiveSimulator from "@/components/sections/ResponsiveSimulator";
import TransformationDemo from "@/components/sections/TransformationDemo";
import ChallengeBuilder from "@/components/sections/ChallengeBuilder";
import RapidFireQuiz from "@/components/sections/RapidFireQuiz";
import RecapSection from "@/components/sections/RecapSection";
import NextDayTeaser from "@/components/sections/NextDayTeaser";

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

export default function Day1Page() {
    return (
        <div className="min-h-screen">
            {/* Section 1 — Hero */}
            <HeroSection />

            {/* Section 2 — Ice Breaker */}
            <IceBreaker />

            {/* Section 3 — Why good design matters */}
            <WhyGoodDesign />

            {/* Section 4 — How the web works */}
            <WebFlowDiagram />

            <QuoteBanner
                quote="Everything you see on any website — every button, card, image — is built with what we'll learn today."
            />

            {/* Section 4 — Skeleton to modern demo */}
            <SkeletonToModernDemo />

            {/* Section 5 — HTML DOM tree */}
            <HTMLVisualizer />

            <QuoteBanner
                quote="HTML is like building with LEGO blocks. Each tag is a different shaped block."
            />

            {/* Section 6 — Semantic HTML */}
            <SemanticHTML />

            {/* Section 7 — CSS magic */}
            <CSSPreviewDemo />

            <QuoteBanner
                quote="If HTML is the skeleton, CSS is the outfit. Let's make it look fire."
            />

            {/* Section 8 — Box model */}
            <BoxModelDemo />

            {/* Section 9 — Flexbox playground */}
            <FlexboxPlayground />

            <QuoteBanner
                quote="Before Flexbox, centering a div was a meme. Now it's 3 lines."
            />

            {/* Section 10 — Responsive simulator */}
            <ResponsiveSimulator />

            {/* Section 11 — Full transformation */}
            <TransformationDemo />

            {/* Section 12 — Hero section challenge */}
            <ChallengeBuilder />

            {/* Section 13 — Rapid-fire quiz */}
            <RapidFireQuiz />

            {/* Section 14 — Recap */}
            <RecapSection />

            {/* Section 15 — Day 2 teaser + homework */}
            <NextDayTeaser />
        </div>
    );
}
