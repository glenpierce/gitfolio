import { AboutSection } from "./components/home/AboutSection";
import { ArticlesSection } from "./components/home/ArticlesSection";
import { FeaturedArticleSection } from "./components/home/FeaturedArticleSection";
import { HeroSection } from "./components/home/HeroSection";
import { HomeBackdrop } from "./components/home/HomeBackdrop";
import { HomeFooter } from "./components/home/HomeFooter";
import { SiteNav } from "./components/home/SiteNav";
import { articles } from "./content/articles";

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
      <HomeBackdrop />
      <SiteNav />

      <main className="home-main">
        <HeroSection articleCount={sortedArticles.length} topicCount={topics.length} />
        <ArticlesSection articles={sortedArticles} dateFormatter={dateFormatter} />
        <FeaturedArticleSection article={featuredArticle} dateFormatter={dateFormatter} />
        <FeaturedArticleSection article={sortedArticles[1]} dateFormatter={dateFormatter} />
        <AboutSection />
      </main>

      <HomeFooter />
    </div>
  );
}

