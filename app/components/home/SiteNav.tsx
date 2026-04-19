import Link from "next/link";

export function SiteNav() {
  return (
    <nav className="home-nav">
      <div className="home-nav-inner">
        <Link href="/" className="home-brand-link">
          GLEN PIERCE
        </Link>
        <div className="home-nav-links">
          <Link href="/webgpu" className="home-nav-link-cyan">
            DEMO
          </Link>
          <Link href="#articles" className="home-nav-link-cyan">
            ARTICLES
          </Link>
          <Link href="#about" className="home-nav-link-yellow">
            ABOUT
          </Link>
        </div>
      </div>
    </nav>
  );
}
