<<<<<<< HEAD
export default function Home() {
  return (
    <div className="resume-wrapper">
      <div className="resume-container">
        <header className="resume-header">
          <div className="resume-title">Resume</div>
        </header>

        <div className="resume-body">
          {/* 하단 공통 레이아웃 잡기 위한 본문 */}

          {/* 1. 프로필 섹션 */}
          <section className="profile-section">
            <div className="profile-info">
              <h2 className="role">그래픽 디자이너</h2>
              <h1 className="name">이수진</h1>
              <p className="description">
                저는 간결함과 기능성을 추구하면서도 동시에 예술적 표현을 중요시하는 디자이너입니다. 클라이언트의 목표를 이해하고, 그 목표를 달성하기 위해 창의적이고 효과적인 디자인을 해결합니다.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">웹사이트</span>
                  <span>www.reallygreatsite.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">이메일</span>
                  <span>hello@reallygreatsite.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">전화번호</span>
                  <span>123 - 456 - 7890</span>
                </div>
=======
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
      <nav className={`${styles.nav} container`}>
        <div className={styles.navLogo}>
          {data.name || "Portfolio"}
        </div>
        <div className={styles.navLinks}>
          <a href="#about">Philosophy</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className={styles.hero}
        style={data.backgroundImage ? {
          backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.8)), url(${data.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
        {data.profileImage && (
          <div className={styles.profileWrapper}>
            <img
              src={data.profileImage}
              alt={data.name || "Profile"}
              className={styles.profileImage}
            />
          </div>
        )}
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
>>>>>>> 9f7f726a3f6a056b2a01917e56c5169b0811990d
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
<<<<<<< HEAD
            <div className="profile-image">
              <div className="image-wrapper">
                {/* 
                  배경의 회색 덩어리들을 표현하기 위해
                  여러 div를 겹치거나 svg로 처리합니다.
                */}
                <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="bg-blob">
                  <path d="M40 80C40 57.9086 57.9086 40 80 40H200C222.091 40 240 57.9086 240 80V120H80C57.9086 120 40 102.091 40 80Z" fill="#D1D5DB" />
                  <path d="M0 160C0 137.909 17.9086 120 40 120H160C182.091 120 200 137.909 200 160V200H40C17.9086 200 0 182.091 0 160Z" fill="#D1D5DB" />
                </svg>

                {/* 모델 사진 대체용 스타일드 박스 */}
                <div className="photo">
                  <div className="photo-inner">
                    <span style={{ color: '#999' }}>사진</span>
                  </div>
                </div>

                <div className="yellow-smile">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#FDE047" />
                    <path d="M13 16C13 14.8954 13.8954 14 15 14C16.1046 14 17 14.8954 17 16C17 17.1046 16.1046 18 15 18C13.8954 18 13 17.1046 13 16Z" fill="#1F2937" />
                    <path d="M23 16C23 14.8954 23.8954 14 25 14C26.1046 14 27 14.8954 27 16C27 17.1046 26.1046 18 25 18C23.8954 18 23 17.1046 23 16Z" fill="#1F2937" />
                    <path d="M12 24C14.5 28 25.5 28 28 24" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="purple-star">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0L19.5 12.5L32 16L19.5 19.5L16 32L12.5 19.5L0 16L12.5 12.5L16 0Z" fill="#8B5CF6" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* 2. 경력 & 프로젝트 섹션 */}
          <section className="experience-section">
            <h3 className="section-title">경력 & 프로젝트</h3>
            <div className="experience-list">

              <div className="experience-item">
                <div className="company-logo">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#F3E8FF" />
                    <path d="M16 6L22 12L16 18L10 12L16 6Z" fill="#A855F7" opacity="0.8" />
                    <path d="M16 14L22 20L16 26L10 20L16 14Z" fill="#8B5CF6" />
                  </svg>
                </div>
                <div className="experience-content">
                  <div className="experience-header">
                    <h4 className="job-title">Liceria & Co. 회사 · 디자인팀 · 파트장</h4>
                    <span className="job-period">2025년 12월 - 2028년 2월 / 2년 2개월</span>
                  </div>
                  <ul className="project-list">
                    <li>웹사이트 구축 프로젝트</li>
                    <li>로고 및 기업 브랜딩 구축 프로젝트</li>
                    <li>웹사이트 구축 프로젝트</li>
                    <li>로고 및 기업 브랜딩 구축 프로젝트</li>
                  </ul>
                </div>
              </div>

              <div className="experience-item">
                <div className="company-logo">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#FFEDD5" />
                    <circle cx="16" cy="16" r="8" fill="#F97316" opacity="0.6" />
                    <circle cx="16" cy="16" r="4" fill="#EA580C" />
                  </svg>
                </div>
                <div className="experience-content">
                  <div className="experience-header">
                    <h4 className="job-title">Salford & Co. 회사 · 디자인팀 · 선임</h4>
                    <span className="job-period">2023년 12월 - 2025년 2월 / 1년 2개월</span>
                  </div>
                  <ul className="project-list">
                    <li>웹사이트 구축 프로젝트</li>
                    <li>로고 및 기업 브랜딩 3개 구축 프로젝트</li>
                    <li>웹사이트 구축 프로젝트</li>
                  </ul>
                </div>
              </div>

              <div className="experience-item">
                <div className="company-logo">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#FEF9C3" />
                    <path d="M8 8H24V24H8V8Z" fill="#EAB308" opacity="0.4" />
                    <circle cx="16" cy="16" r="4" fill="#CA8A04" />
                  </svg>
                </div>
                <div className="experience-content">
                  <div className="experience-header">
                    <h4 className="job-title">Borcelle 회사 · 디자인팀 · 주임</h4>
                    <span className="job-period">2020년 12월 - 2023년 2월 / 2년 2개월</span>
                  </div>
                  <ul className="project-list">
                    <li>웹사이트 구축 프로젝트</li>
                    <li>로고 및 기업 브랜딩 구축 프로젝트</li>
                    <li>웹사이트 구축 프로젝트</li>
                    <li>로고 및 기업 브랜딩 구축 프로젝트</li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

          {/* 3. 하단 섹션 (교육 / 스킬) */}
          <section className="bottom-section">
            <div className="education-section">
              <h3 className="section-title">교육</h3>
              <div className="education-list">
                <div className="education-item">
                  <h4>Liceria 대학원</h4>
                  <p>브랜드 마케팅 전공 · 2026년 졸업</p>
                </div>
                <div className="education-item">
                  <h4>Liceria 대학교</h4>
                  <p>브랜드 마케팅 전공 · 2023년 졸업</p>
                </div>
              </div>
            </div>

            <div className="skills-section">
              <h3 className="section-title">디자인 스킬</h3>
              <div className="skills-chips">
                <span className="chip">사진편집</span>
                <span className="chip">백터그래픽</span>
                <span className="chip">UI디자인</span>
              </div>

              <h3 className="section-title" style={{ marginTop: '2rem' }}>그 외 능력</h3>
              <div className="other-skills">
                <div className="skill-row">
                  <span className="skill-label">영어 능력</span>
                  <span>원어민 (Native)</span>
                </div>
                <div className="skill-row">
                  <span className="skill-label">중국어 능력</span>
                  <span>능통 (Fluent)</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
=======

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
>>>>>>> 9f7f726a3f6a056b2a01917e56c5169b0811990d
  );
}
