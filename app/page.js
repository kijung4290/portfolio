import { getPortfolioData } from '@/lib/data';

export default async function Home() {
  const rawData = await getPortfolioData();
  const data = rawData || {}; // Fallback to empty object

  // Safe defaults
  const contact = data.contact || {};
  const experiences = data.experiences || [];
  const projects = data.projects || [];
  const about = data.about || [];

  if (!rawData && !data.name) {
    // If absolutely no data, show a setup hint
    return (
      <div className="container" style={{ padding: "100px 0", textAlign: "center" }}>
        <h1>Portfolio Not Setup</h1>
        <p>Database is empty. Please visit <a href="/api/setup/migrate" style={{ textDecoration: 'underline' }}>Migrate Data</a> to initialize.</p>
      </div>
    );
  }

  return (
    <main>
      <nav className="container nav">
        <div className="nav-logo">{data.name || "Portfolio"}</div>
        <div className="nav-links">
          <a href="#about" className="nav-link">Philosophy</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>

      <section className="container" style={{ padding: "120px 0 80px" }}>
        <h1 className="text-hero">
          {data.role || "Social Worker"}
        </h1>
        <p className="text-large" style={{ maxWidth: "800px", color: "var(--muted-text)" }}>
          {data.introduction || "Welcome to my portfolio."}
        </p>
      </section>

      <section id="about" className="container" style={{ padding: "80px 0" }}>
        <div className="grid grid-cols-2">
          <div>
            <h2 className="text-large">Philosophy</h2>
          </div>
          <div>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {about.map((item, index) => (
                <li key={index} style={{ marginBottom: "1.5rem", fontSize: "1.25rem", borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="experience" className="container" style={{ padding: "80px 0" }}>
        <h2 className="text-large" style={{ marginBottom: "60px" }}>Experience</h2>
        <div className="grid">
          {experiences.map((exp, index) => (
            <div key={exp.id || index} className="experience-item">
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "600" }}>{exp.company}</h3>
                <p style={{ color: "var(--muted-text)", marginTop: "0.5rem" }}>{exp.period}</p>
              </div>
              <div>
                <h4 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{exp.role}</h4>
                <p className="text-body">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="container" style={{ padding: "80px 0" }}>
        <h2 className="text-large" style={{ marginBottom: "60px" }}>Projects</h2>
        <div className="grid grid-cols-2">
          {projects.map((project, index) => (
            <a href={project.link || "#"} key={project.id || index} className="project-card">
              <div className="project-card-number">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3>{project.title}</h3>
              <p className="text-body">{project.description}</p>
              <span>View Project &rarr;</span>
            </a>
          ))}
        </div>
      </section>

      <section id="contact" className="container footer">
        <div className="grid grid-cols-2">
          <div>
            <h2 className="text-large">Contact</h2>
          </div>
          <div style={{ fontSize: "1.25rem", lineHeight: "2" }}>
            <p>Email: <a href={`mailto:${contact.email}`} style={{ textDecoration: "underline" }}>{contact.email || "N/A"}</a></p>
            <p>Phone: {contact.phone || "N/A"}</p>
            {contact.blog && <p>Blog: <a href={contact.blog} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>Visit Blog</a></p>}
            {contact.github && <p>GitHub: <a href={contact.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>GitHub</a></p>}
          </div>
        </div>
        <div style={{ marginTop: "80px", color: "var(--muted-text)", fontSize: "0.875rem" }}>
          &copy; {new Date().getFullYear()} {data.name || "Me"}. All rights reserved.
        </div>
      </section>
    </main>
  );
}
