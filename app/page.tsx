import Image from "next/image";
import Link from "next/link";

const basePath = process.env.NODE_ENV === "production" ? "/gitfolio" : "";

type Article = {
  slug: string;
  title: string;
  publishedAt: string;
  readTime: string;
  summary: string;
  tags: string[];
  keyLine: string;
  body: string[];
  metrics: Array<{
    title: string;
    description: string;
  }>;
  closing: string;
};

const articles: Article[] = [
  {
    slug: "architectural-principles-as-ai-guardrails",
    title: "ARCHITECTURAL PRINCIPLES AS AI GUARDRAILS",
    publishedAt: "2026-04-18",
    readTime: "5 MIN READ",
    summary:
      "Architectural discipline is becoming the main safeguard against AI-assisted systems drifting into brittle, unmaintainable complexity.",
    tags: ["ARCHITECTURE", "AI_SYSTEMS", "TESTING", "LEGIBILITY"],
    keyLine: "Code elegance matters less than predictability under regeneration.",
    body: [
      "Architectural principles matter more now because they are the guardrails for these non-deterministic systems that can otherwise code themselves into unmaintainable disasters.",
      "Loose coupling, high cohesion, and legibility go beyond human preferences and relate to deeper properties: changeability, testability, and correctness under evolution. Those constraints don’t disappear just because the author is an AI. If anything, they become more important, because now you’ve introduced a non-deterministic contributor that can regenerate large parts of the system at any time.",
      "What does change is where the burden shifts.",
      "If AI is doing most of the writing, then code readability matters less at the line-by-line level, but system legibility still matters a lot. Someone (human or AI) still needs to reason about boundaries, responsibilities, and failure modes. If your system is tightly coupled, the blast radius of any regeneration becomes enormous.",
      "I think the new quality metrics start to look something like:",
    ],
    metrics: [
      {
        title: "SPEC FIDELITY",
        description:
          "How precisely the implementation matches an unambiguous specification. This becomes the primary source of truth.",
      },
      {
        title: "TEST SURFACE AREA AND DEPTH",
        description:
          "Not just coverage, but whether tests meaningfully constrain behavior. Weak tests will get exploited instantly by generative systems.",
      },
      {
        title: "REGENERATION STABILITY",
        description:
          "If the code is regenerated multiple times from the same spec, equivalent behavior should still emerge. Loose coupling improves that stability.",
      },
      {
        title: "OBSERVABILITY AND DIAGNOSABILITY",
        description:
          "When something breaks, the system should make it fast to determine why. This matters when the author cannot clearly explain intent.",
      },
      {
        title: "CONTRACT CLARITY",
        description:
          "Interfaces should be explicit enough that a human or AI can extend the system without unintended side effects.",
      },
    ],
    closing:
      "The metric I suspect we will begin to apply will be how the system behaves under iteration. This may actually make software engineering more rigorous, not less. The hand-wavy parts, “this feels clean”, get replaced with things you can actually test and enforce. Do not stop encoding design, because the model “usually gets it right.”",
  },
];

const sortedArticles = [...articles].sort(
  (left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
);

const featuredArticle = sortedArticles[0];
const topics = Array.from(new Set(sortedArticles.flatMap((article) => article.tags)));

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050510] font-mono text-cyan-50 selection:bg-fuchsia-500/30 selection:text-fuchsia-200">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-fuchsia-900/20 to-transparent opacity-30" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-900/30 bg-[#050510]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-lg font-bold tracking-widest text-transparent transition-all duration-300 hover:to-cyan-400"
          >
            GLEN PIERCE
          </Link>
          <div className="flex gap-8 text-xs font-bold tracking-widest uppercase text-cyan-700/80">
            <Link
              href="#articles"
              className="transition-all hover:text-cyan-400 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"
            >
              ARTICLES
            </Link>
            <Link
              href="#topics"
              className="transition-all hover:text-fuchsia-400 hover:drop-shadow-[0_0_5px_rgba(232,121,249,0.8)]"
            >
              TOPICS
            </Link>
            <Link
              href="#about"
              className="transition-all hover:text-yellow-400 hover:drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"
            >
              ABOUT
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-20">
        <section className="relative grid gap-12 py-20 md:grid-cols-[1.3fr_0.7fr] md:py-28">
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-bold tracking-widest text-cyan-400 uppercase animate-pulse">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                NEW ARTICLE LIVE
              </div>
              <h1 className="text-5xl leading-[1.1] font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] md:text-7xl">
                THOUGHTS ON <br />
                <span className="animate-gradient-x bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  ARCHITECTURE,
                </span>{" "}
                <br />
                AI, AND SYSTEMS
              </h1>
            </div>
            <p className="max-w-2xl border-l-2 border-fuchsia-500/50 pl-6 text-lg leading-relaxed font-light text-cyan-100/70 md:text-xl">
              Glen Pierce on the engineering discipline required to keep AI-assisted software legible,
              testable, and resilient under continuous regeneration.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="#articles"
                className="group relative overflow-hidden border border-cyan-500/50 bg-cyan-950/30 px-8 py-3 text-sm font-bold tracking-widest text-cyan-300 uppercase transition-all hover:bg-cyan-900/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  READ THE LATEST <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent group-hover:animate-shimmer" />
              </Link>
              <div className="flex items-center gap-3 border border-fuchsia-500/20 bg-fuchsia-950/10 px-4 py-3 text-xs tracking-widest text-fuchsia-200/80 uppercase">
                <span>
                  {sortedArticles.length.toString().padStart(2, "0")}{" "}
                  {sortedArticles.length === 1 ? "ARTICLE" : "ARTICLES"}
                </span>
                <span className="text-fuchsia-500">|</span>
                <span>{topics.length.toString().padStart(2, "0")} TOPICS</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden border border-cyan-500/30 bg-[#0a0a1a] p-6 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,121,249,0.15),transparent_45%)]" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between border-b border-cyan-900/30 pb-4">
                <span className="text-xs font-bold tracking-[0.3em] text-cyan-700 uppercase">SIGNAL</span>
                <span className="text-xs text-cyan-700">{featuredArticle.readTime}</span>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold tracking-[0.3em] text-fuchsia-400 uppercase">
                  {dateFormatter.format(new Date(featuredArticle.publishedAt))}
                </p>
                <h2 className="text-2xl font-bold tracking-wide text-white">
                  {featuredArticle.title}
                </h2>
                <p className="text-sm leading-relaxed text-cyan-100/65">
                  {featuredArticle.summary}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {featuredArticle.tags.map((tag) => (
                  <TopicPill key={tag} tag={tag} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="articles" className="space-y-12 py-20">
          <div className="flex items-end justify-between border-b border-cyan-900/30 pb-4">
            <h2 className="text-2xl font-bold tracking-widest text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.6)]">
              {"// ARTICLE_INDEX"}
            </h2>
            <span className="text-xs text-cyan-700">Chronologically ordered and ready for future essays</span>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {sortedArticles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        </section>

        <section
          id={featuredArticle.slug}
          className="grid gap-12 border-t border-cyan-900/30 py-20 md:grid-cols-[0.75fr_1.25fr]"
        >
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-widest text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
                {"// FEATURED_ESSAY"}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cyan-100/65">
                A long-form note on why architectural rigor becomes more important when AI can rewrite large
                sections of a system at any time.
              </p>
            </div>

            <div className="space-y-4 border border-cyan-500/20 bg-cyan-950/20 p-6">
              <div className="border-b border-cyan-900/30 pb-4">
                <p className="text-xs font-bold tracking-[0.3em] text-cyan-700 uppercase">ARTICLE METADATA</p>
              </div>
              <div className="space-y-3 text-sm text-cyan-100/75">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-cyan-400">PUBLISHED</span>
                  <span>{dateFormatter.format(new Date(featuredArticle.publishedAt))}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-cyan-400">READ TIME</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <div className="space-y-2 pt-2">
                  <span className="text-cyan-400">TOPICS</span>
                  <div className="flex flex-wrap gap-2">
                    {featuredArticle.tags.map((tag) => (
                      <TopicPill key={tag} tag={tag} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <article className="space-y-8 border border-cyan-900/30 bg-[#0a0a1a] p-8 shadow-[0_0_30px_rgba(34,211,238,0.06)]">
            <header className="space-y-4 border-b border-cyan-900/30 pb-8">
              <p className="text-xs font-bold tracking-[0.3em] text-fuchsia-400 uppercase">
                {dateFormatter.format(new Date(featuredArticle.publishedAt))}
              </p>
              <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {featuredArticle.title}
              </h3>
              <p className="max-w-3xl text-lg leading-relaxed text-cyan-100/70">
                {featuredArticle.summary}
              </p>
            </header>

            <div className="space-y-6 text-base leading-8 font-light text-cyan-100/85">
              {featuredArticle.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <div className="border-l-2 border-fuchsia-500/60 bg-fuchsia-950/10 px-6 py-4 text-lg font-medium text-fuchsia-100">
                {featuredArticle.keyLine}
              </div>

              <ol className="space-y-5">
                {featuredArticle.metrics.map((metric, index) => (
                  <li key={metric.title} className="grid gap-2 md:grid-cols-[2rem_1fr]">
                    <span className="text-fuchsia-400">{index + 1}.</span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold tracking-[0.2em] text-cyan-300 uppercase">
                        {metric.title}
                      </h4>
                      <p className="text-cyan-100/75">{metric.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p>{featuredArticle.closing}</p>
            </div>
          </article>
        </section>

        <section id="topics" className="space-y-12 border-t border-cyan-900/30 py-20">
          <div className="flex items-end justify-between border-b border-cyan-900/30 pb-4">
            <h2 className="text-2xl font-bold tracking-widest text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.6)]">
              {"// TOPIC_GRID"}
            </h2>
            <span className="text-xs text-cyan-700">A tagging system that can scale with the archive</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((tag) => (
              <div
                key={tag}
                className="border border-cyan-900/30 bg-cyan-950/20 p-5 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
              >
                <p className="text-xs font-bold tracking-[0.3em] text-cyan-700 uppercase">TOPIC</p>
                <h3 className="mt-3 text-lg font-bold tracking-wide text-white">{tag}</h3>
                <p className="mt-2 text-sm text-cyan-100/60">
                  {sortedArticles.filter((article) => article.tags.includes(tag)).length} article
                  {sortedArticles.filter((article) => article.tags.includes(tag)).length === 1 ? "" : "s"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="grid gap-12 border-t border-cyan-900/30 py-20 md:grid-cols-12">
          <div className="space-y-8 md:col-span-4">
            <h2 className="text-2xl font-bold tracking-widest text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
              {"// ABOUT_GLEN"}
            </h2>
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-cyan-500/30 bg-cyan-950/30">
              <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,transparent_0%,rgba(5,5,16,0.8)_100%)]" />
              <div className="absolute inset-0 z-20 bg-[linear-gradient(to_bottom,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
              <Image
                src={`${basePath}/me.png`}
                alt="Glen Pierce"
                fill
                className="z-0 object-cover opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          </div>
          <div className="space-y-8 text-cyan-100/80 md:col-span-8">
            <p className="leading-relaxed font-light">
              This blog is a running notebook on software architecture, AI-assisted engineering, and the
              practical discipline required to keep systems understandable as they evolve. The emphasis is
              on design choices that improve changeability, testability, and operational clarity.
            </p>
            <div className="relative overflow-hidden rounded-sm border border-cyan-500/20 bg-cyan-950/20 p-6">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-cyan-500" />
              <div className="grid gap-8 font-mono text-sm md:grid-cols-2">
                <div>
                  <h3 className="mb-4 border-b border-cyan-800 pb-2 text-xs tracking-widest text-cyan-400 uppercase">
                    SIGNALS
                  </h3>
                  <ul className="space-y-2 text-cyan-200/70">
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> Architecture under AI regeneration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> Contracts, constraints, and system boundaries
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> Observability, diagnostics, and resilient change
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 border-b border-cyan-800 pb-2 text-xs tracking-widest text-cyan-400 uppercase">
                    OPERATING PRINCIPLES
                  </h3>
                  <ul className="space-y-2 text-cyan-200/70">
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> Encode design explicitly
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> Prefer legibility over cleverness
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> Measure behavior under iteration
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href="https://github.com/glenpierce"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-fuchsia-600 px-10 py-4 text-sm font-bold tracking-widest text-white uppercase transition-all duration-300 hover:scale-105 hover:bg-fuchsia-500 hover:shadow-[0_0_30px_rgba(232,121,249,0.6)]"
              >
                FOLLOW ON GITHUB
              </a>
              <p className="max-w-xl text-sm leading-relaxed text-cyan-200/60">
                More essays can be added by extending the article data set in this page while keeping the
                same chronological and tag-driven structure.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-cyan-900/20 py-8 text-center text-xs text-cyan-900/50">
        <p>
          Glen Pierce Blog // Architecture, AI, and resilient systems
        </p>
      </footer>
    </div>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <Link
      href={`#${article.slug}`}
      className="group block space-y-4 border border-cyan-900/30 bg-[#0a0a1a] p-6 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-bold tracking-[0.3em] text-cyan-700 uppercase">
            {String(index + 1).padStart(2, "0")}
            {" // "}
            {dateFormatter.format(new Date(article.publishedAt))}
          </p>
          <h3 className="text-xl font-bold tracking-wider text-white transition-colors group-hover:text-cyan-400">
            {article.title}
          </h3>
        </div>
        <ArrowUpRightIcon className="h-5 w-5 text-cyan-700 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-400" />
      </div>
      <p className="border-l border-cyan-900/50 pl-4 text-sm leading-relaxed font-light text-cyan-100/60">
        {article.summary}
      </p>
      <div className="flex flex-wrap gap-2 pt-2">
        {article.tags.map((tag) => (
          <TopicPill key={tag} tag={tag} />
        ))}
      </div>
    </Link>
  );
}

function TopicPill({ tag }: { tag: string }) {
  return (
    <span className="border border-cyan-900/30 bg-cyan-950/30 px-2 py-1 text-[10px] font-bold tracking-widest text-cyan-300 uppercase">
      {tag}
    </span>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
