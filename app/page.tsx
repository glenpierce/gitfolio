import Link from "next/link";

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
    <div className="home-page">
      <div className="home-backdrop">
        <div className="home-grid-overlay" />
        <div className="home-fade-overlay" />
      </div>

      <nav className="home-nav">
        <div className="home-nav-inner">
          <Link href="/" className="home-brand-link">
            GLEN PIERCE
          </Link>
          <div className="home-nav-links">
            <Link href="#articles" className="home-nav-link-cyan">
              ARTICLES
            </Link>
            <Link href="#about" className="home-nav-link-yellow">
              ABOUT
            </Link>
          </div>
        </div>
      </nav>

      <main className="home-main">
        <section className="home-hero">
          <div className="home-hero-content">
            <div className="home-hero-header">
              <div className="home-live-pill">
                <span className="home-live-dot" />
                NEW ARTICLE LIVE
              </div>
              <h1 className="home-hero-title">
                THOUGHTS ON <br />
                <span className="home-hero-title-gradient">
                  ARCHITECTURE,
                </span>{" "}
                <br />
                AI, AND SYSTEMS
              </h1>
            </div>
            <p className="home-hero-description">
              Glen Pierce on the engineering discipline required to keep AI-assisted software legible,
              testable, and resilient under continuous regeneration.
            </p>
            <div className="home-hero-actions">
              <Link href="#articles" className="home-hero-cta">
                <span className="home-hero-cta-content">
                  READ THE LATEST <ArrowRightIcon className="home-arrow-right" />
                </span>
                <div className="home-hero-cta-shimmer" />
              </Link>
              <div className="home-stats-chip">
                <span>
                  {sortedArticles.length.toString().padStart(2, "0")}{" "}
                  {sortedArticles.length === 1 ? "ARTICLE" : "ARTICLES"}
                </span>
                <span className="home-stats-separator">|</span>
                <span>{topics.length.toString().padStart(2, "0")} TOPICS</span>
              </div>
            </div>
          </div>
        </section>

        <section id="articles" className="home-articles-section">
          <div className="home-section-header">
            <h2 className="home-section-title-fuchsia">
              {"// ARTICLE_INDEX"}
            </h2>
            <span className="home-section-meta">Chronologically ordered and ready for future essays</span>
          </div>

          <div className="home-articles-grid">
            {sortedArticles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        </section>

        <section id={featuredArticle.slug} className="home-featured-section">
          <article className="home-featured-article">
            <header className="home-featured-header">
              <p className="home-featured-date">
                {dateFormatter.format(new Date(featuredArticle.publishedAt))}
              </p>
              <h3 className="home-featured-title">
                {featuredArticle.title}
              </h3>
              <p className="home-featured-summary">
                {featuredArticle.summary}
              </p>
            </header>

            <div className="home-featured-content">
              {featuredArticle.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <div className="home-featured-keyline">
                {featuredArticle.keyLine}
              </div>

              <ol className="home-metrics-list">
                {featuredArticle.metrics.map((metric, index) => (
                  <li key={metric.title} className="home-metric-item">
                    <span className="home-metric-index">{index + 1}.</span>
                    <div className="home-metric-copy">
                      <h4 className="home-metric-title">
                        {metric.title}
                      </h4>
                      <p className="home-metric-description">{metric.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p>{featuredArticle.closing}</p>
            </div>
          </article>
        </section>
        <section id="about" className="home-about-section">
          <div className="home-about-content">
            <h2 className="home-section-title-cyan">
              {"// ABOUT_GLEN"}
            </h2>
            <div className="home-about-copy-wrap">
              <p className="home-about-copy">
                This blog is a running notebook on software architecture, AI-assisted engineering, and the
                practical discipline required to keep systems understandable as they evolve. The emphasis is
                on design choices that improve changeability, testability, and operational clarity.
              </p>
              <div className="home-about-actions">
                <a
                  href="https://github.com/glenpierce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-github-cta"
                >
                  FOLLOW ON GITHUB
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>
          Glen Pierce Blog // Architecture, AI, and resilient systems
        </p>
      </footer>
    </div>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <Link href={`#${article.slug}`} className="home-article-card">
      <div className="home-article-card-header">
        <div className="home-article-card-copy">
          <p className="home-article-card-meta">
            {String(index + 1).padStart(2, "0")}
            {" // "}
            {dateFormatter.format(new Date(article.publishedAt))}
          </p>
          <h3 className="home-article-card-title">
            {article.title}
          </h3>
        </div>
        <ArrowUpRightIcon className="home-article-card-icon" />
      </div>
      <p className="home-article-card-summary">
        {article.summary}
      </p>
      <div className="home-article-card-tags">
        {article.tags.map((tag) => (
          <TopicPill key={tag} tag={tag} />
        ))}
      </div>
    </Link>
  );
}

function TopicPill({ tag }: { tag: string }) {
  return (
    <span className="home-topic-pill">
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
