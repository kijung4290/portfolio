import { getPortfolioData } from '@/lib/data';

export default async function Home() {
  const data = await getPortfolioData();

  if (!data) {
    return <div className="container" style={{ padding: "100px 0" }}>Loading...</div>;
  }

  return (
    <main>
      <nav className="container nav">
        {/* Simple text logo, possibly sticking to the top */}
        <div className="nav-logo">{data.name || "Portfolio"}</div>
        <div className="nav-links">
          <a href="#work" className="nav-link">Work</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>

      <section className="container" style={{ padding: "120px 0 80px" }}>
        <h1 className="text-hero">
          {data.role || "Social Worker"}
        </h1>
        <p className="text-large" style={{ maxWidth: "800px", color: "var(--muted-text)" }}>
          {data.introduction}
        </p>
      </section>

      <section id="about" className="container" style={{ padding: "80px 0" }}>
        <div className="grid grid-cols-2">
          <div>
            <h2 className="text-large">Philosophy</h2>
          </div>
          <div>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {data.about && data.about.map((item, index) => (
                <li key={index} style={{ marginBottom: "1.5rem", fontSize: "1.25rem", borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="work" className="container" style={{ padding: "80px 0" }}>
        <h2 className="text-large" style={{ marginBottom: "60px" }}>Experience</h2>
        <div className="grid">
          {data.experiences && data.experiences.map((exp) => (
            <div key={exp.id} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", borderTop: "1px solid var(--border)", padding: "40px 0" }}>
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

      <section className="container" style={{ padding: "80px 0" }}>
        <h2 className="text-large" style={{ marginBottom: "60px" }}>Projects</h2>
        <div className="grid grid-cols-2">
          {data.projects && data.projects.map((project) => (
            <a href={project.link || "#"} key={project.id} style={{ display: "block", background: "var(--muted)", padding: "40px", borderRadius: "12px", transition: "transform 0.2s" }} className="project-card">
              <div style={{ marginBottom: "20px", fontSize: "3rem", fontWeight: "700", opacity: "0.1" }}>
                {String(project.id).padStart(2, '0')}
              </div>
              <h3 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{project.title}</h3>
              <p className="text-body" style={{ marginBottom: "2rem" }}>{project.description}</p>
              <span style={{ textDecoration: "underline", fontWeight: "600" }}>View Project &rarr;</span>
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
            <p>Email: <a href={`mailto:${data.contact.email}`} style={{ textDecoration: "underline" }}>{data.contact.email}</a></p>
            <p>Phone: {data.contact.phone}</p>
            {data.contact.blog && <p>Blog: <a href={data.contact.blog} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>Visit Blog</a></p>}
          </div>
        </div>
        <div style={{ marginTop: "80px", color: "var(--muted-text)", fontSize: "0.875rem" }}>
          &copy; {new Date().getFullYear()} {data.name}. All rights reserved.
        </div>
      </section>
    </main>
  );
}
