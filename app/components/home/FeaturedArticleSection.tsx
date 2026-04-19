import type { Article } from "../../types/article";

type FeaturedArticleSectionProps = {
  article: Article;
  dateFormatter: Intl.DateTimeFormat;
};

export function FeaturedArticleSection({ article, dateFormatter }: FeaturedArticleSectionProps) {
  return (
    <section id={article.slug} className="home-featured-section">
      <article className="home-featured-article">
        <header className="home-featured-header">
          <p className="home-featured-date">{dateFormatter.format(new Date(article.publishedAt))}</p>
          <h3 className="home-featured-title">{article.title}</h3>
          <p className="home-featured-summary">{article.summary}</p>
        </header>

        <div className="home-featured-content">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="home-featured-keyline">{article.keyLine}</div>

          <ol className="home-metrics-list">
            {article.metrics.map((metric, index) => (
              <li key={metric.title} className="home-metric-item">
                <span className="home-metric-index">{index + 1}.</span>
                <div className="home-metric-copy">
                  <h4 className="home-metric-title">{metric.title}</h4>
                  <p className="home-metric-description">{metric.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <p>{article.closing}</p>
        </div>
      </article>
    </section>
  );
}

