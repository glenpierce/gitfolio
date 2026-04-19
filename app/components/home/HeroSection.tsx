import Link from "next/link";
import { ArrowRightIcon } from "./ArrowRightIcon";

type HeroSectionProps = {
  articleCount: number;
  topicCount: number;
};

export function HeroSection({ articleCount, topicCount }: HeroSectionProps) {
  return (
    <section className="home-hero">
      <div className="home-hero-content">
        <div className="home-hero-header">
          <div className="home-live-pill">
            <span className="home-live-dot" />
            NEW ARTICLE LIVE
          </div>
          <h1 className="home-hero-title">
            THOUGHTS ON <br />
            <span className="home-hero-title-gradient">ARCHITECTURE,</span> <br />
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
              {articleCount.toString().padStart(2, "0")} {articleCount === 1 ? "ARTICLE" : "ARTICLES"}
            </span>
            <span className="home-stats-separator">|</span>
            <span>{topicCount.toString().padStart(2, "0")} TOPICS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

