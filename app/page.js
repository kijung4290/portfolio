import { getPortfolioData } from '@/lib/data';
import Link from 'next/link';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getPortfolioData();

  if (!data) return <div className="container" style={{ padding: '100px 0', textAlign: 'center', color: '#8b95a1' }}>Loading...</div>;

  return (
    <main style={{ background: 'var(--bg-body)' }}>
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
      <section id="about" className="container" style={{ marginBottom: '80px' }}>
        <h2 className={styles.sectionTitle}>어떤 사람인가요?</h2>
        <div className={styles.aboutGrid}>
          {data.about.map((item, index) => (
            <div key={index} className={styles.aboutItem}>
              <span style={{ fontSize: '24px' }}>✨</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="container" style={{ marginBottom: '80px' }}>
        <h2 className={styles.sectionTitle}>걸어온 길</h2>
        <div className={styles.timeline}>
          {data.experiences.map((exp) => (
            <div key={exp.id} className={styles.timelineItem}>
              <span className={styles.period}>{exp.period}</span>
              <h3 className={styles.role}>{exp.role}</h3>
              <p className={styles.company}>{exp.company}</p>
              <p style={{ color: '#4e5968', lineHeight: '1.6', fontSize: '16px' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container" style={{ marginBottom: '100px' }}>
        <h2 className={styles.sectionTitle}>주요 프로젝트</h2>
        <div className={styles.grid}>
          {data.projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDesc}>{project.description}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: '#3182f6', fontWeight: '700', fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  자세히 보기
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contact}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: 'white', marginBottom: '40px' }}>함께 일하고 싶습니다</h2>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <a href={`mailto:${data.contact.email}`} className={styles.contactItem}>
              <span>✉️</span> {data.contact.email}
            </a>
            <div className={styles.contactItem}>
              <span>📞</span> {data.contact.phone}
            </div>
          </div>

          <div style={{ marginTop: '60px' }}>
            <Link href="/admin" className={styles.footerLink}>
              관리자 로그인 (Admin)
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
