import { getPortfolioData } from '@/lib/data';
import Link from 'next/link';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getPortfolioData();

  if (!data) return <div className="container" style={{ padding: '5rem' }}>Loading... If this persists, run `npm run dev` again.</div>;

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>{data.name}</h1>
          <p className={styles.subtitle}>{data.role}</p>
          <p className={styles.intro}>{data.introduction}</p>
          <div className={styles.buttons}>
            <a href="#contact" className="btn btn-primary">연락하기</a>
            <a href="#projects" className="btn btn-outline">프로젝트 보기</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section container">
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div className={styles.grid} style={{ gridTemplateColumns: '1fr' }}>
          <ul className={styles.intro} style={{ margin: '0 auto', textAlign: 'left', listStyle: 'none' }}>
            {data.about.map((item, index) => (
              <li key={index} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'var(--primary)', marginRight: '1rem', fontWeight: 'bold' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section" style={{ background: 'var(--background)' }}>
        <div className="container">
          <h2 className={styles.sectionTitle}>경력 사항</h2>
          <div className={styles.timeline}>
            {data.experiences.map((exp) => (
              <div key={exp.id} className={styles.timelineItem}>
                <span className={styles.period}>{exp.period}</span>
                <h3 className={styles.role}>{exp.role}</h3>
                <h4 className={styles.company}>{exp.company}</h4>
                <p style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section container">
        <h2 className={styles.sectionTitle}>주요 프로젝트</h2>
        <div className={styles.grid}>
          {data.projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDesc}>{project.description}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: '600' }}>
                  자세히 보기 →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contact}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: 'white' }}>Contact Me</h2>
          <div className={styles.contactItem}>
            <span>📧</span>
            <a href={`mailto:${data.contact.email}`} style={{ color: 'white', textDecoration: 'underline' }}>{data.contact.email}</a>
          </div>
          <div className={styles.contactItem}>
            <span>📞</span>
            <span>{data.contact.phone}</span>
          </div>

          <Link href="/admin" className={styles.footerLink}>
            관리자 페이지 (Admin Login)
          </Link>
        </div>
      </section>
    </main>
  );
}
