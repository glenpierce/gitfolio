import type { Article } from "../../types/article";
import { ArticleCard } from "./ArticleCard";

type ArticlesSectionProps = {
  articles: Article[];
  dateFormatter: Intl.DateTimeFormat;
};

export function ArticlesSection({ articles, dateFormatter }: ArticlesSectionProps) {
  return (
    <section id="articles" className="home-articles-section">
      <div className="home-section-header">
        <h2 className="home-section-title-fuchsia">{"// ARTICLE_INDEX"}</h2>
        <span className="home-section-meta">Chronologically ordered and ready for future essays</span>
      </div>

      <div className="home-articles-grid">
        {articles.map((article, index) => (
          <ArticleCard
            key={article.slug}
            article={article}
            index={index}
            dateFormatter={dateFormatter}
          />
        ))}
      </div>
    </section>
  );
}

