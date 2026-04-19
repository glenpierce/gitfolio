export function AboutSection() {
  return (
    <section id="about" className="home-about-section">
      <div className="home-about-content">
        <h2 className="home-section-title-cyan">{"// ABOUT_GLEN"}</h2>
        <div className="home-about-copy-wrap">
          <p className="home-about-copy">
            This blog is a running notebook on software architecture, AI-assisted engineering, and the
            practical discipline required to keep systems understandable as they evolve. The emphasis is on
            design choices that improve changeability, testability, and operational clarity.
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
  );
}

