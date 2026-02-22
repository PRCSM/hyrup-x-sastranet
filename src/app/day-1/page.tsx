import HeroSection from "@/components/sections/HeroSection";
import IceBreaker from "@/components/sections/IceBreaker";
import WhyGoodDesign from "@/components/sections/WhyGoodDesign";
import WebFlowDiagram from "@/components/sections/WebFlowDiagram";
import SkeletonToModernDemo from "@/components/sections/SkeletonToModernDemo";
import HTMLVisualizer from "@/components/sections/HTMLVisualizer";
import HTMLTagsExplorer from "@/components/sections/HTMLTagsExplorer";
import SemanticHTML from "@/components/sections/SemanticHTML";
import ClassVsId from "@/components/sections/ClassVsId";
import DisplayTypes from "@/components/sections/DisplayTypes";
import CSSPreviewDemo from "@/components/sections/CSSPreviewDemo";
import BoxModelDemo from "@/components/sections/BoxModelDemo";
import FlexboxPlayground from "@/components/sections/FlexboxPlayground";
import PositionPlayground from "@/components/sections/PositionPlayground";
import ResponsiveSimulator from "@/components/sections/ResponsiveSimulator";
import TransformationDemo from "@/components/sections/TransformationDemo";
import ChallengeBuilder from "@/components/sections/ChallengeBuilder";
import RapidFireQuiz from "@/components/sections/RapidFireQuiz";
import RecapSection from "@/components/sections/RecapSection";
import NextDayTeaser from "@/components/sections/NextDayTeaser";
import PracticeExercise from "@/components/PracticeExercise";

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

/* ── Inline preview components ───────────────────────────── */

function ProfilePreview() {
    return (
        <div style={{ fontFamily: "serif", color: "#000" }}>
            <h1 style={{ fontSize: "1.5rem", margin: "0 0 4px" }}>Your Name</h1>
            <p style={{ margin: "0 0 8px", color: "#555" }}>I&apos;m learning HTML today!</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://picsum.photos/seed/profile/150/150" alt="My photo" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4, marginBottom: 8 }} />
            <br />
            <a href="#" style={{ color: "#1a6be0" }}>My GitHub →</a>
        </div>
    );
}

function HobbyListPreview() {
    return (
        <div style={{ fontFamily: "serif", color: "#000" }}>
            <h2 style={{ fontSize: "1.2rem", margin: "0 0 6px" }}>My Hobbies</h2>
            <ol style={{ margin: 0, paddingLeft: 20 }}>
                <li>Coding</li>
                <li>Gaming</li>
                <li>Reading</li>
            </ol>
            <p style={{ marginTop: 6 }}>My favorite is <strong>coding</strong>!</p>
        </div>
    );
}

function SemanticPagePreview() {
    return (
        <div style={{ fontFamily: "serif", color: "#000", fontSize: 13 }}>
            <div style={{ background: "#f0f0f0", padding: "6px 10px", borderRadius: "6px 6px 0 0", borderBottom: "1px solid #ddd" }}>
                <span style={{ fontSize: 10, color: "#888", fontFamily: "monospace" }}>&lt;header&gt;</span>
                <h1 style={{ fontSize: "1rem", margin: 0 }}>My Website</h1>
            </div>
            <div style={{ padding: "10px", minHeight: 40 }}>
                <span style={{ fontSize: 10, color: "#888", fontFamily: "monospace" }}>&lt;main&gt;</span>
                <p style={{ margin: "4px 0" }}>This is the main content.</p>
            </div>
            <div style={{ background: "#f0f0f0", padding: "6px 10px", borderRadius: "0 0 6px 6px", borderTop: "1px solid #ddd" }}>
                <span style={{ fontSize: 10, color: "#888", fontFamily: "monospace" }}>&lt;footer&gt;</span>
                <p style={{ margin: 0, fontSize: 11, color: "#888" }}>© 2025 Me</p>
            </div>
        </div>
    );
}

function NavPreview() {
    return (
        <div style={{ fontFamily: "serif", color: "#000" }}>
            <nav>
                <ul style={{ display: "flex", gap: 16, listStyle: "none", padding: 0, margin: 0 }}>
                    <li><a href="#" style={{ color: "#1a6be0" }}>Home</a></li>
                    <li><a href="#" style={{ color: "#1a6be0" }}>About</a></li>
                    <li><a href="#" style={{ color: "#1a6be0" }}>Contact</a></li>
                </ul>
            </nav>
        </div>
    );
}

function ClassPreview() {
    return (
        <div>
            <h1 style={{ color: "#E8652E", fontSize: "1.5rem", margin: "0 0 4px", fontFamily: "sans-serif" }}>Hello World</h1>
            <p style={{ color: "gray", fontFamily: "sans-serif", margin: 0 }}>Learning CSS today</p>
        </div>
    );
}

function IdPreview() {
    return (
        <div style={{ fontFamily: "sans-serif", fontSize: 14 }}>
            <p style={{ color: "gray", margin: "0 0 4px" }}>Normal paragraph</p>
            <p style={{ color: "#E8652E", fontWeight: "bold", margin: "0 0 4px" }}>I&apos;m special!</p>
            <p style={{ color: "gray", margin: 0 }}>Normal paragraph</p>
        </div>
    );
}

function BoxModelPreview() {
    return (
        <div style={{ fontFamily: "sans-serif" }}>
            <div style={{
                padding: 24,
                margin: 8,
                border: "2px solid #ddd",
                borderRadius: 12,
                background: "#fafafa",
                fontSize: 13,
            }}>
                <p style={{ margin: 0, fontWeight: 600 }}>Card with padding & margin</p>
                <p style={{ margin: "4px 0 0", color: "#888", fontSize: 12 }}>24px inside, 16px outside</p>
            </div>
        </div>
    );
}

function BorderBoxPreview() {
    return (
        <div style={{ fontFamily: "sans-serif", fontSize: 12 }}>
            <div style={{ display: "flex", gap: 8 }}>
                <div style={{ width: 120, padding: 12, border: "2px solid #E8652E", borderRadius: 8, background: "#fff5f0", textAlign: "center" }}>
                    <div style={{ fontWeight: 700, color: "#E8652E" }}>300px</div>
                    <div style={{ color: "#888", fontSize: 10 }}>stays 300px ✓</div>
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "center", fontSize: 11, color: "#888" }}>
                    border-box keeps your math simple
                </div>
            </div>
        </div>
    );
}

function SpanPreview() {
    return (
        <div style={{ fontFamily: "sans-serif", fontSize: 14 }}>
            <p style={{ margin: 0 }}>
                My favorite color is{" "}
                <span style={{ color: "#E8652E", fontWeight: "bold" }}>orange</span>
                {" "}and I love it.
            </p>
        </div>
    );
}

function ButtonsPreview() {
    return (
        <div style={{ display: "flex", gap: 8 }}>
            <span style={{
                display: "inline-block",
                padding: "10px 24px",
                background: "#E8652E",
                color: "white",
                borderRadius: 8,
                fontSize: 14,
                fontFamily: "sans-serif",
                fontWeight: 500,
            }}>Button 1</span>
            <span style={{
                display: "inline-block",
                padding: "10px 24px",
                background: "#E8652E",
                color: "white",
                borderRadius: 8,
                fontSize: 14,
                fontFamily: "sans-serif",
                fontWeight: 500,
            }}>Button 2</span>
        </div>
    );
}

function DarkPagePreview() {
    return (
        <div style={{
            background: "#1a1a2e",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            padding: 16,
            borderRadius: 8,
            fontSize: 13,
        }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 15 }}>Modern Look</h3>
            <p style={{ margin: 0, color: "#a0a0a0", fontSize: 12 }}>Dark background + clean font = instant upgrade</p>
        </div>
    );
}

function HoverCardPreview() {
    return (
        <div style={{ fontFamily: "sans-serif", fontSize: 12, textAlign: "center" }}>
            <div style={{
                padding: 16,
                background: "#16213e",
                borderRadius: 12,
                color: "#fff",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                transform: "scale(1.03)",
                transition: "all 0.3s ease",
            }}>
                <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 14 }}>Hover me ✨</p>
                <p style={{ margin: 0, color: "#a0a0a0", fontSize: 11 }}>Scaled up + shadow</p>
            </div>
        </div>
    );
}

function BadgePreview() {
    return (
        <div style={{ fontFamily: "sans-serif", padding: 8 }}>
            <div style={{ position: "relative", display: "inline-block", fontSize: "2rem" }}>
                🔔
                <span style={{
                    position: "absolute",
                    top: -4,
                    right: -6,
                    background: "red",
                    color: "white",
                    fontSize: "0.6rem",
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                }}>3</span>
            </div>
        </div>
    );
}

function StickyNavPreview() {
    return (
        <div style={{ fontFamily: "sans-serif", fontSize: 12, border: "1px solid #eee", borderRadius: 8, overflow: "hidden", height: 100, overflowY: "auto" }}>
            <div style={{ position: "sticky", top: 0, background: "#1a1a2e", color: "#fff", padding: "8px 12px", fontSize: 12, fontWeight: 600, zIndex: 1 }}>
                Sticky Nav ↓ scroll me
            </div>
            <div style={{ padding: 12 }}>
                <p style={{ margin: "0 0 12px", color: "#888" }}>Content block 1</p>
                <p style={{ margin: "0 0 12px", color: "#888" }}>Content block 2</p>
                <p style={{ margin: "0 0 12px", color: "#888" }}>Content block 3</p>
                <p style={{ margin: "0 0 12px", color: "#888" }}>Content block 4</p>
                <p style={{ margin: "0 0 12px", color: "#888" }}>Content block 5</p>
            </div>
        </div>
    );
}

function CenterPreview() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 100,
            background: "#f5f5f5",
            borderRadius: 8,
            fontFamily: "sans-serif",
        }}>
            <div style={{ padding: "12px 24px", background: "#1a1a2e", color: "#fff", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                Centered ✓
            </div>
        </div>
    );
}

function ThreeCardPreview() {
    return (
        <div style={{ display: "flex", gap: 8, fontFamily: "sans-serif" }}>
            {[1, 2, 3].map(n => (
                <div key={n} style={{ flex: 1, padding: 12, background: "#16213e", borderRadius: 8, color: "#fff", fontSize: 12, textAlign: "center" }}>
                    Card {n}
                </div>
            ))}
        </div>
    );
}

function ResponsiveStackPreview() {
    return (
        <div style={{ fontFamily: "sans-serif", fontSize: 11 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                <div style={{ flex: 1, padding: 8, background: "#e8f4f8", borderRadius: 6, textAlign: "center", fontSize: 10 }}>Row on desktop →</div>
                <div style={{ flex: 1, padding: 8, background: "#e8f4f8", borderRadius: 6, textAlign: "center", fontSize: 10 }}>Side by side</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ padding: 8, background: "#f0e8f8", borderRadius: 6, textAlign: "center", fontSize: 10 }}>↓ Stacked on mobile</div>
                <div style={{ padding: 8, background: "#f0e8f8", borderRadius: 6, textAlign: "center", fontSize: 10 }}>↓ One per line</div>
            </div>
        </div>
    );
}

function ContainerPreview() {
    return (
        <div style={{ fontFamily: "sans-serif", fontSize: 11, background: "#f5f5f5", padding: 12, borderRadius: 8 }}>
            <div style={{ width: "90%", maxWidth: 200, margin: "0 auto", background: "#fff", padding: 12, borderRadius: 8, border: "2px dashed #E8652E", textAlign: "center" }}>
                <div style={{ fontWeight: 700, color: "#E8652E", fontSize: 12 }}>Container</div>
                <div style={{ color: "#888", fontSize: 10 }}>90% width, max 960px, centered</div>
            </div>
        </div>
    );
}

/* ── Main Page ───────────────────────────────────────────── */

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

            {/* Section 5 — Skeleton to modern demo */}
            <SkeletonToModernDemo />

            {/* Section 6 — HTML DOM tree */}
            <HTMLVisualizer />

            {/* Section 7 — HTML Tags Explorer */}
            <HTMLTagsExplorer />

            <PracticeExercise
                sectionLabel="HTML Tags"
                exercises={[
                    {
                        title: "Create a mini profile",
                        description: "Use headings, paragraph, image and a link",
                        code: `<h1>Your Name</h1>\n<p>I'm learning HTML today!</p>\n<img src="https://picsum.photos/150" alt="My photo">\n<a href="https://github.com">My GitHub →</a>`,
                        hint: "Save and open with Live Server to see it instantly",
                        preview: <ProfilePreview />,
                    },
                    {
                        title: "Build a hobby list",
                        description: "Create an ordered list of your top 3 hobbies",
                        code: `<h2>My Hobbies</h2>\n<ol>\n  <li>Coding</li>\n  <li>Gaming</li>\n  <li>Reading</li>\n</ol>\n<p>My favorite is <strong>coding</strong>!</p>`,
                        hint: "Try changing <ol> to <ul> and see what changes",
                        preview: <HobbyListPreview />,
                    },
                ]}
            />

            <QuoteBanner
                quote="HTML is like building with LEGO blocks. Each tag is a different shaped block."
            />

            {/* Section 8 — Semantic HTML */}
            <SemanticHTML />

            <PracticeExercise
                sectionLabel="Semantic HTML"
                exercises={[
                    {
                        title: "Wrap your page in semantic tags",
                        description: "Replace generic divs with header, main, and footer",
                        code: `<header>\n  <h1>My Website</h1>\n</header>\n\n<main>\n  <p>This is the main content.</p>\n</main>\n\n<footer>\n  <p>&copy; 2025 Me</p>\n</footer>`,
                        hint: "Visually identical — but screen readers and Google now understand your page structure",
                        preview: <SemanticPagePreview />,
                    },
                    {
                        title: "Add a navigation bar",
                        description: "Create a nav with 3 links using a list",
                        code: `<nav>\n  <ul>\n    <li><a href="#">Home</a></li>\n    <li><a href="#">About</a></li>\n    <li><a href="#">Contact</a></li>\n  </ul>\n</nav>`,
                        hint: "This is exactly how real navbars are built — we'll style it with CSS soon",
                        preview: <NavPreview />,
                    },
                ]}
            />

            {/* Section 9 — Class vs ID */}
            <ClassVsId />

            <PracticeExercise
                sectionLabel="Class & ID"
                exercises={[
                    {
                        title: "Add classes to your elements",
                        description: "Give your heading and paragraph a class, then style them",
                        code: `<!-- HTML -->\n<h1 class="title">Hello World</h1>\n<p class="subtitle">Learning CSS today</p>\n\n<!-- CSS -->\n.title {\n  color: #E8652E;\n  font-size: 2rem;\n}\n.subtitle {\n  color: gray;\n}`,
                        hint: "Remember: class uses a dot (.) in CSS, you can reuse it on multiple elements",
                        preview: <ClassPreview />,
                    },
                    {
                        title: "Add an ID and style it differently",
                        description: "Give one special element an ID",
                        code: `<!-- HTML -->\n<p class="text">Normal paragraph</p>\n<p class="text" id="featured">I'm special!</p>\n<p class="text">Normal paragraph</p>\n\n<!-- CSS -->\n.text { color: gray; }\n#featured {\n  color: #E8652E;\n  font-weight: bold;\n}`,
                        hint: "The #featured style wins because ID beats class in specificity",
                        preview: <IdPreview />,
                    },
                ]}
            />

            {/* Section 10 — Box Model */}
            <BoxModelDemo />

            <PracticeExercise
                sectionLabel="Box Model"
                exercises={[
                    {
                        title: "Add padding and margin to your card",
                        description: "See the difference between inner and outer spacing",
                        code: `.card {\n  padding: 24px;      /* space inside */\n  margin: 16px;       /* space outside */\n  border: 2px solid #ddd;\n  border-radius: 12px;\n}`,
                        hint: "Right-click → Inspect your card to see the box model diagram live",
                        preview: <BoxModelPreview />,
                    },
                    {
                        title: "Always add border-box",
                        description: "Add this reset to the top of your CSS",
                        code: `* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n/* Now a 300px element stays 300px\n   even with padding! */`,
                        hint: "Without this, a 300px box + 20px padding = 340px. With it, it stays 300px",
                        preview: <BorderBoxPreview />,
                    },
                ]}
            />

            {/* Section 11 — Inline vs Block vs Inline-Block */}
            <DisplayTypes />

            <PracticeExercise
                sectionLabel="Display Types"
                exercises={[
                    {
                        title: "Style a span inside a paragraph",
                        description: "See how inline elements flow with text",
                        code: `<p>\n  My favorite color is\n  <span class="highlight">orange</span>\n  and I love it.\n</p>\n\n<!-- CSS -->\n.highlight {\n  color: #E8652E;\n  font-weight: bold;\n}`,
                        hint: "Inline elements ignore width/height. That's their whole personality",
                        preview: <SpanPreview />,
                    },
                    {
                        title: "Put two buttons side by side",
                        description: "Use inline-block to place elements next to each other",
                        code: `.btn {\n  display: inline-block;\n  padding: 10px 24px;\n  background: #E8652E;\n  color: white;\n  border-radius: 8px;\n  text-decoration: none;\n}\n\n<!-- HTML -->\n<a href="#" class="btn">Button 1</a>\n<a href="#" class="btn">Button 2</a>`,
                        hint: "inline-block = sits inline but respects width/height. Best of both worlds",
                        preview: <ButtonsPreview />,
                    },
                ]}
            />

            {/* Section 12 — CSS magic */}
            <CSSPreviewDemo />

            <PracticeExercise
                sectionLabel="CSS Properties"
                exercises={[
                    {
                        title: "Change the font and colors",
                        description: "Transform your page from default to modern",
                        code: `body {\n  font-family: 'Inter', sans-serif;\n  background: #1a1a2e;\n  color: #ffffff;\n}`,
                        hint: "Add this Google Font link in your <head>: <link href=\"https://fonts.googleapis.com/css2?family=Inter&display=swap\" rel=\"stylesheet\">",
                        preview: <DarkPagePreview />,
                    },
                    {
                        title: "Add a hover effect to your card",
                        description: "Make it scale up and add a shadow on hover",
                        code: `.card {\n  transition: transform 0.3s ease,\n             box-shadow 0.3s ease;\n}\n\n.card:hover {\n  transform: scale(1.03);\n  box-shadow: 0 8px 32px rgba(0,0,0,0.2);\n}`,
                        hint: "The transition property makes it smooth — without it, changes are instant and jarring",
                        preview: <HoverCardPreview />,
                    },
                ]}
            />

            <QuoteBanner
                quote="If HTML is the skeleton, CSS is the outfit. Let's make it look fire."
            />

            {/* Section 13 — CSS Position */}
            <PositionPlayground />

            <PracticeExercise
                sectionLabel="CSS Position"
                exercises={[
                    {
                        title: "Add a notification badge",
                        description: "Use position absolute to place a badge on an icon",
                        code: `<!-- HTML -->\n<div class="icon-wrapper">\n  🔔\n  <span class="badge">3</span>\n</div>\n\n<!-- CSS -->\n.icon-wrapper {\n  position: relative;\n  display: inline-block;\n  font-size: 2rem;\n}\n.badge {\n  position: absolute;\n  top: -5px;\n  right: -5px;\n  background: red;\n  color: white;\n  font-size: 0.7rem;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}`,
                        hint: "The parent MUST have position: relative — otherwise the badge flies to the page corner",
                        preview: <BadgePreview />,
                    },
                    {
                        title: "Make a sticky header",
                        description: "Create a navbar that sticks to the top when you scroll",
                        code: `nav {\n  position: sticky;\n  top: 0;\n  background: #1a1a2e;\n  padding: 12px 24px;\n  z-index: 100;\n}`,
                        hint: "sticky = normal flow until it reaches top: 0, then it sticks. Perfect for navbars",
                        preview: <StickyNavPreview />,
                    },
                ]}
            />

            {/* Section 14 — Flexbox playground */}
            <FlexboxPlayground />

            <PracticeExercise
                sectionLabel="Flexbox"
                exercises={[
                    {
                        title: "Center everything on the page",
                        description: "The classic 'center a div' — solved in 3 lines",
                        code: `body {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}`,
                        hint: "This is the answer to the most famous CSS question. Memorize it",
                        preview: <CenterPreview />,
                    },
                    {
                        title: "Create a 3-card row",
                        description: "Place 3 cards side by side with equal spacing",
                        code: `<!-- HTML -->\n<div class="card-row">\n  <div class="card">Card 1</div>\n  <div class="card">Card 2</div>\n  <div class="card">Card 3</div>\n</div>\n\n<!-- CSS -->\n.card-row {\n  display: flex;\n  gap: 16px;\n}\n.card {\n  flex: 1;\n  padding: 24px;\n  background: #16213e;\n  border-radius: 12px;\n}`,
                        hint: "flex: 1 makes each card take equal width. gap adds spacing without margins",
                        preview: <ThreeCardPreview />,
                    },
                ]}
            />

            <QuoteBanner
                quote="Before Flexbox, centering a div was a meme. Now it's 3 lines."
            />

            {/* Section 15 — Responsive simulator */}
            <ResponsiveSimulator />

            <PracticeExercise
                sectionLabel="Responsive Design"
                exercises={[
                    {
                        title: "Make your card row stack on mobile",
                        description: "Use a media query to switch from row to column",
                        code: `.card-row {\n  display: flex;\n  gap: 16px;\n}\n\n@media (max-width: 600px) {\n  .card-row {\n    flex-direction: column;\n  }\n}`,
                        hint: "Resize your browser window to see it switch. Press Ctrl+Shift+M in DevTools to simulate mobile",
                        preview: <ResponsiveStackPreview />,
                    },
                    {
                        title: "Use the responsive container pattern",
                        description: "This 3-line combo works on every screen size",
                        code: `.container {\n  width: 90%;\n  max-width: 960px;\n  margin: 0 auto;\n}\n\n/* 90% on small screens,\n   960px max on large screens,\n   auto margin centers it. */`,
                        hint: "This is the same pattern used by every major website. Memorize it",
                        preview: <ContainerPreview />,
                    },
                ]}
            />

            {/* Section 16 — Full transformation */}
            <TransformationDemo />

            {/* Section 17 — Hero section challenge */}
            <ChallengeBuilder />

            {/* Section 18 — Rapid-fire quiz */}
            <RapidFireQuiz />

            {/* Section 19 — Recap */}
            <RecapSection />

            {/* Section 20 — Day 2 teaser + homework */}
            <NextDayTeaser />
        </div>
    );
}
