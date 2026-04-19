type TopicPillProps = {
  tag: string;
};

export function TopicPill({ tag }: TopicPillProps) {
  return <span className="home-topic-pill">{tag}</span>;
}

