import HeroSection from "@/components/sections/HeroSection";
import WebFlowDiagram from "@/components/sections/WebFlowDiagram";
import SkeletonToModernDemo from "@/components/sections/SkeletonToModernDemo";
import HTMLVisualizer from "@/components/sections/HTMLVisualizer";
import CSSPreviewDemo from "@/components/sections/CSSPreviewDemo";
import BoxModelDemo from "@/components/sections/BoxModelDemo";
import FlexboxPlayground from "@/components/sections/FlexboxPlayground";
import ResponsiveSimulator from "@/components/sections/ResponsiveSimulator";
import TransformationDemo from "@/components/sections/TransformationDemo";
import ChallengeBuilder from "@/components/sections/ChallengeBuilder";
import RecapSection from "@/components/sections/RecapSection";
import NextDayTeaser from "@/components/sections/NextDayTeaser";

export default function Day1Page() {
    return (
        <div className="min-h-screen">
            {/* Section 1 — Hero */}
            <HeroSection />

            {/* Section 2 — How the web works */}
            <WebFlowDiagram />

            {/* Section 3 — Skeleton to modern demo */}
            <SkeletonToModernDemo />

            {/* Section 4 — HTML DOM tree */}
            <HTMLVisualizer />

            {/* Section 5 — CSS magic */}
            <CSSPreviewDemo />

            {/* Section 6 — Box model */}
            <BoxModelDemo />

            {/* Section 7 — Flexbox playground */}
            <FlexboxPlayground />

            {/* Section 8 — Responsive simulator */}
            <ResponsiveSimulator />

            {/* Section 9 — Full transformation */}
            <TransformationDemo />

            {/* Section 10 — Challenge builder */}
            <ChallengeBuilder />

            {/* Section 11 — Recap */}
            <RecapSection />

            {/* Section 12 — Day 2 teaser */}
            <NextDayTeaser />
        </div>
    );
}
