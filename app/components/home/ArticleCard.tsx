import Link from "next/link";
import type { Article } from "../../types/article";
import { ArrowUpRightIcon } from "./ArrowUpRightIcon";
import { TopicPill } from "./TopicPill";

type ArticleCardProps = {
  article: Article;
  index: number;
  dateFormatter: Intl.DateTimeFormat;
};

export function ArticleCard({ article, index, dateFormatter }: ArticleCardProps) {
  return (
    <Link href={`#${article.slug}`} className="home-article-card">
      <div className="home-article-card-header">
        <div className="home-article-card-copy">
          <p className="home-article-card-meta">
            {String(index + 1).padStart(2, "0")}
            {" // "}
            {dateFormatter.format(new Date(article.publishedAt))}
          </p>
          <h3 className="home-article-card-title">{article.title}</h3>
        </div>
        <ArrowUpRightIcon className="home-article-card-icon" />
      </div>
      <p className="home-article-card-summary">{article.summary}</p>
      <div className="home-article-card-tags">
        {article.tags.map((tag) => (
          <TopicPill key={tag} tag={tag} />
        ))}
      </div>
    </Link>
  );
}

