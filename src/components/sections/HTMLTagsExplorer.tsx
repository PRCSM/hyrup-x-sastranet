"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

type Category = "text" | "media" | "list" | "form" | "semantic";

const categories: { id: Category; label: string; emoji: string }[] = [
    { id: "text", label: "Text & Headings", emoji: "✍️" },
    { id: "media", label: "Media & Links", emoji: "🖼️" },
    { id: "list", label: "Lists", emoji: "📋" },
    { id: "form", label: "Forms", emoji: "📝" },
    { id: "semantic", label: "Semantic", emoji: "🏗️" },
];

interface TagInfo {
    tag: string;
    name: string;
    funFact: string;
    code: string;
    selfClosing?: boolean;
}

const tagsByCategory: Record<Category, TagInfo[]> = {
    text: [
        {
            tag: "h1–h6",
            name: "Headings",
            funFact: "Only use ONE <h1> per page — Google literally penalizes you otherwise!",
            code: `<h1>I'm the biggest</h1>\n<h2>I'm pretty big</h2>\n<h3>Medium vibes</h3>\n<h4>Getting smaller</h4>\n<h5>Almost invisible</h5>\n<h6>Why do I even exist?</h6>`,
        },
        {
            tag: "p",
            name: "Paragraph",
            funFact: "Browsers add margin above and below <p> by default. That's why your spacing looks weird before you add CSS!",
            code: `<p>I'm a paragraph. I add space\n  above and below myself\n  automatically.</p>\n<p>I'm another paragraph.\n  See the gap between us?</p>`,
        },

        {
            tag: "br / hr",
            name: "Break & Rule",
            funFact: "<br> is a line break (Enter key). <hr> is a horizontal line. Both are self-closing — no </br> needed!",
            code: `<p>Line one<br>Line two</p>\n\n<hr>\n\n<p>Content after the line</p>`,
            selfClosing: true,
        },
        {
            tag: "span",
            name: "Inline Container",
            funFact: "<span> is the inline version of <div>. It does NOTHING visually until you add CSS. It's a styling hook.",
            code: `<p>My favorite color is\n  <span style="color: #E8652E">\n    orange\n  </span>\n  and I love it.</p>`,
        },
    ],
    media: [
        {
            tag: "a",
            name: "Anchor (Link)",
            funFact: "The anchor tag is how the entire internet is connected. Every link you've ever clicked is an <a> tag!",
            code: `<a href="https://google.com">\n  Go to Google\n</a>\n\n<a href="#section-2">\n  Jump to Section 2 ↓\n</a>\n\n<a href="mailto:hi@test.com">\n  Email me!\n</a>`,
        },
        {
            tag: "img",
            name: "Image",
            funFact: "The 'alt' text isn't optional — it describes the image for blind users AND shows if the image fails to load.",
            code: `<img\n  src="photo.jpg"\n  alt="A cute puppy"\n  width="300"\n  height="200"\n/>\n\n<!-- Self-closing tag!\n     No </img> needed -->`,
            selfClosing: true,
        },
    ],
    list: [
        {
            tag: "ul / li",
            name: "Unordered List",
            funFact: "Navbars are secretly just <ul> lists styled with CSS! Next time, right-click any navbar and inspect it.",
            code: `<ul>\n  <li>Apples</li>\n  <li>Bananas</li>\n  <li>Cherries</li>\n</ul>\n\n<!-- Shows bullet points • -->`,
        },
        {
            tag: "ol / li",
            name: "Ordered List",
            funFact: "You can start counting from any number with the 'start' attribute. start='42' makes it start from 42!",
            code: `<ol>\n  <li>First step</li>\n  <li>Second step</li>\n  <li>Third step</li>\n</ol>\n\n<!-- Shows numbers 1. 2. 3. -->`,
        },
    ],
    form: [
        {
            tag: "input",
            name: "Input Field",
            funFact: "There are 22+ input types! text, email, password, color, date, range, file... One tag, infinite personalities.",
            code: `<input type="text" placeholder="Name">\n\n<input type="email" placeholder="Email">\n\n<input type="password" placeholder="Secret!">\n\n<input type="color" value="#E8652E">`,
            selfClosing: true,
        },
        {
            tag: "button",
            name: "Button",
            funFact: "A <button> inside a <form> submits the form by default! Add type='button' to stop that behavior.",
            code: `<button type="submit">Submit</button>\n\n<button type="button">Click me</button>\n\n<button disabled>Can't touch this</button>`,
        },
    ],
    semantic: [
        {
            tag: "header / footer",
            name: "Page Edges",
            funFact: "You can have MULTIPLE <header> and <footer> tags — one for the page AND one inside each <article> or <section>!",
            code: `<header>\n  <nav>...</nav>\n  <h1>My Site</h1>\n</header>\n\n<!-- content -->\n\n<footer>\n  <p>&copy; 2025 Me</p>\n</footer>`,
        },
        {
            tag: "nav",
            name: "Navigation",
            funFact: "Screen readers can jump directly to <nav> elements. Using <div class='nav'> forces blind users to scroll through EVERYTHING.",
            code: `<nav>\n  <ul>\n    <li><a href="/">Home</a></li>\n    <li><a href="/about">\n      About</a></li>\n    <li><a href="/contact">\n      Contact</a></li>\n  </ul>\n</nav>`,
        },
        {
            tag: "main",
            name: "Main Content",
            funFact: "Only ONE <main> per page. It tells the browser: 'this is the actual content, skip the nav and sidebar.'",
            code: `<body>\n  <header>...</header>\n  <main>\n    <!-- The actual page\n         content goes here -->\n  </main>\n  <footer>...</footer>\n</body>`,
        },
        {
            tag: "article / section",
            name: "Content Groups",
            funFact: "<article> = standalone content (blog post, comment). <section> = grouped content. If it makes sense in an RSS feed, it's an <article>.",
            code: `<article>\n  <h2>Blog Post Title</h2>\n  <section>\n    <h3>Introduction</h3>\n    <p>...</p>\n  </section>\n  <section>\n    <h3>Conclusion</h3>\n    <p>...</p>\n  </section>\n</article>`,
        },
    ],
};

export default function HTMLTagsExplorer() {
    const [activeCategory, setActiveCategory] = useState<Category>("text");
    const [activeTagIdx, setActiveTagIdx] = useState(0);
    const [revealedFacts, setRevealedFacts] = useState<Set<string>>(new Set());

    const tags = tagsByCategory[activeCategory];
    const currentTag = tags[activeTagIdx];

    const toggleFact = (tag: string) => {
        setRevealedFacts((prev) => {
            const next = new Set(prev);
            if (next.has(tag)) next.delete(tag);
            else next.add(tag);
            return next;
        });
    };

    return (
        <SectionWrapper
            id="html-tags-explorer"
            title="HTML Tags You Need to Know"
            subtitle={`There are 100+ HTML tags. You'll use about 20 regularly. Let's meet them.`}
        >
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((cat) => (
                    <motion.button
                        key={cat.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                            setActiveCategory(cat.id);
                            setActiveTagIdx(0);
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${activeCategory === cat.id
                            ? "bg-dark text-card shadow-md"
                            : "bg-card text-text-secondary border border-border hover:border-accent-dark"
                            }`}
                    >
                        {cat.emoji} {cat.label}
                    </motion.button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left sidebar — tag list */}
                <div className="lg:col-span-1">
                    <div className="bg-card rounded-2xl border border-border overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-border bg-background/50">
                            <span className="text-xs font-semibold text-text-secondary/60 uppercase tracking-wider">
                                {categories.find((c) => c.id === activeCategory)?.emoji}{" "}
                                {categories.find((c) => c.id === activeCategory)?.label}
                            </span>
                        </div>
                        <div className="p-1.5">
                            {tags.map((t, i) => (
                                <button
                                    key={t.tag}
                                    onClick={() => setActiveTagIdx(i)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer mb-0.5 ${activeTagIdx === i
                                        ? "bg-dark text-card"
                                        : "text-text-secondary hover:bg-background/60"
                                        }`}
                                >
                                    <code className="text-xs">&lt;{t.tag}&gt;</code>
                                    {t.selfClosing && (
                                        <span className="text-[9px] ml-1 opacity-50">/</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right — tag detail + code + fun fact */}
                <div className="lg:col-span-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activeCategory}-${activeTagIdx}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Tag name + description */}
                            <div className="bg-card rounded-2xl border border-border p-6 mb-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h4 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                                            <code className="text-base" style={{ color: "#E8652E" }}>
                                                &lt;{currentTag.tag}&gt;
                                            </code>
                                            <span className="text-text-secondary font-normal text-sm">
                                                — {currentTag.name}
                                            </span>
                                        </h4>
                                    </div>
                                    {currentTag.selfClosing && (
                                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-700 rounded-full uppercase tracking-wider">
                                            Self-Closing
                                        </span>
                                    )}
                                </div>

                                {/* Fun fact reveal */}
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => toggleFact(currentTag.tag)}
                                    className="w-full text-left px-4 py-3 rounded-xl border-2 border-dashed border-border hover:border-dark transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-base">
                                            {revealedFacts.has(currentTag.tag) ? "💡" : "🤔"}
                                        </span>
                                        <span className="font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                                            {revealedFacts.has(currentTag.tag)
                                                ? "Fun Fact:"
                                                : "Click to reveal a fun fact about this tag!"}
                                        </span>
                                    </div>
                                    <AnimatePresence>
                                        {revealedFacts.has(currentTag.tag) && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-sm text-text-secondary leading-relaxed mt-2 ml-7"
                                            >
                                                {currentTag.funFact}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </div>

                            {/* Code block */}
                            <div className="bg-code-bg rounded-2xl p-5 font-mono text-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                                    <span className="text-white/30 text-xs ml-2">index.html</span>
                                </div>
                                <pre className="text-green-400 whitespace-pre-wrap leading-relaxed text-xs overflow-x-auto">
                                    {currentTag.code}
                                </pre>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom summary strip */}
            <div className="mt-8 bg-dark rounded-2xl p-6 text-center">
                <p className="text-card text-sm font-medium mb-2">
                    Quick math: You just learned{" "}
                    <span style={{ color: "#E8652E" }} className="font-bold">
                        {Object.values(tagsByCategory).flat().length} tags
                    </span>{" "}
                    across {categories.length} categories.
                </p>
                <p className="text-card/60 text-xs">
                    That&apos;s 90% of what professional developers use daily. The other 100+ tags? You&apos;ll Google them when you need them. That&apos;s literally how it works.
                </p>
            </div>
        </SectionWrapper>
    );
}
