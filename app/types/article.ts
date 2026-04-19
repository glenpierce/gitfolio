export type ArticleMetric = {
  title: string;
  description: string;
};

export type Article = {
  slug: string;
  title: string;
  publishedAt: string;
  readTime: string;
  summary: string;
  tags: string[];
  keyLine: string;
  body: string[];
  metrics: ArticleMetric[];
  closing: string;
};

