import { getPortfolioData } from '@/lib/data';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const rawData = await getPortfolioData();
  const data = rawData || {}; // Fallback to empty object

  // Safe defaults
  const contact = data.contact || {};
  const experiences = data.experiences || [];
  const projects = data.projects || [];
  const about = data.about || [];

  if (!rawData && !data.name) {
    return (
      <div className="container" style={{ padding: "100px 0", textAlign: "center" }}>
        <h1>Portfolio Not Setup</h1>
        <p>Database is empty. Please visit <a href="/api/setup/migrate" style={{ textDecoration: 'underline' }}>Migrate Data</a> to initialize.</p>
      </div>
    );
  }

  return (
    <main>
      {/* Navigation */}
      <nav className="container" style={{ padding: '2rem 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
          {data.name || "Portfolio"}
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem', fontWeight: '500' }}>
          <a href="#about">Philosophy</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="badge">
          Open to Opportunities
        </div>
        <h1 className={styles.title}>
          {data.role || "Social Worker"}
        </h1>
        <p className={styles.intro}>
          {data.introduction || "Dedication to human connection, empowered by modern technology. envisioning a better future for community care."}
        </p>
        <div style={{ display: 'flex', gap: '16px', opacity: 0, animation: `${styles.fadeUp} 1s 0.3s forwards` }}>
          <a href="#contact" className="btn btn-primary">Get in Touch</a>
          <a href="#projects" className="btn btn-outline">View Work</a>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="about" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>My Philosophy</h2>
          <div className={styles.aboutGrid}>
            {about.length > 0 ? about.map((item, index) => (
              <div key={index} className={styles.aboutItem}>
                {item}
              </div>
            )) : (
              <div className={styles.aboutItem}>Philosophy not added yet.</div>
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={styles.section} style={{ background: 'var(--muted-light)' }}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.timeline}>
            {experiences.map((exp, index) => (
              <div key={exp.id || index} className={styles.timelineItem}>
                <div className={styles.company}>{exp.company}</div>
                <div className={styles.role}>{exp.role}</div>
                <div className={styles.period}>{exp.period}</div>
                <p className={styles.desc}>{exp.description}</p>
              </div>
            ))}
            {experiences.length === 0 && <p style={{ textAlign: 'center', color: 'var(--muted)' }}>No experience listed yet.</p>}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.projectGrid}>
            {projects.map((project, index) => (
              <a href={project.link || "#"} key={project.id || index} target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  {/* We can use the index as a stylistic number */}
                  <span className={styles.projectNumber}>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.projectFooter}>
                  View Project <span className={styles.arrow}>→</span>
                </div>
              </a>
            ))}
            {projects.length === 0 && <p style={{ textAlign: 'center', color: 'var(--muted)' }}>No projects listed yet.</p>}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contact}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Let's Connect</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#4B5563' }}>
            Ready to start a conversation? Feel free to reach out.
          </p>

          <div className={styles.contactGrid}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email</span>
              <a href={`mailto:${contact.email}`} style={{ textDecoration: 'underline' }}>{contact.email || "N/A"}</a>
            </div>

            {contact.phone && (
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Phone</span>
                <span>{contact.phone}</span>
              </div>
            )}

            {contact.blog && (
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Blog</span>
                <a href={contact.blog} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Visit Blog</a>
              </div>
            )}

            {contact.github && (
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>GitHub</span>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">GitHub Profile</a>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          &copy; {new Date().getFullYear()} {data.name || "Portfolio"}. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
