import { getPortfolioData } from '@/lib/data';
import Link from 'next/link';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getPortfolioData();

  if (!data) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.subtitle}>{data.role}</p>
          <h1 className={styles.title}>{data.name}</h1>
          <p className={styles.intro}>{data.introduction}</p>
          <div className={styles.buttons}>
            <a href="#contact" className="btn btn-primary">연락하기</a>
            <a href="#projects" className="btn btn-outline">프로젝트 보기</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section container" style={{ padding: '6rem 2rem' }}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
          {data.about.map((item, index) => (
            <div key={index} className={styles.aboutItem}>
              <span style={{ color: 'var(--primary)', marginRight: '1rem', fontSize: '1.25rem' }}>✨</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section" style={{ background: 'white', padding: '6rem 2rem' }}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.timeline}>
            {data.experiences.map((exp) => (
              <div key={exp.id} className={styles.timelineItem}>
                <span className={styles.period}>{exp.period}</span>
                <h3 className={styles.role}>{exp.role}</h3>
                <h4 className={styles.company}>{exp.company}</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section container" style={{ padding: '6rem 2rem' }}>
        <h2 className={styles.sectionTitle}>Key Projects</h2>
        <div className={styles.grid}>
          {data.projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDesc}>{project.description}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  자세히 보기
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contact}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Get In Touch</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <a href={`mailto:${data.contact.email}`} className={styles.contactItem}>
              <span>📧</span> {data.contact.email}
            </a>
            <div className={styles.contactItem}>
              <span>📞</span> {data.contact.phone}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/admin" className={styles.footerLink}>
              Admin Access
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
