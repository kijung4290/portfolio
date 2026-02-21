import { getPortfolioData } from '@/lib/data';

export default async function Home() {
  const rawData = await getPortfolioData();
  const data = rawData || {};

  // 기본값 설정 (Admin 데이터가 없을 때를 대비한 템플릿 기본값)
  const name = data.name || "이수진";
  const role = data.role || "그래픽 디자이너";
  const introduction = data.introduction || "저는 간결함과 기능성을 추구하면서도 동시에 예술적 표현을 중요시하는 디자이너입니다. 클라이언트의 목표를 이해하고, 그 목표를 달성하기 위해 창의적이고 효과적인 디자인을 해결합니다.";

  const contact = data.contact || {};
  const email = contact.email || "hello@reallygreatsite.com";
  const phone = contact.phone || "123 - 456 - 7890";
  const website = contact.blog || "www.reallygreatsite.com";

  // 경험 (Experiences) 데이터
  // 데이터베이스에 내용이 없으면 기본 템플릿 사용
  const defaultExperiences = [
    {
      id: 1,
      company: "Liceria & Co. 회사",
      role: "디자인팀 · 파트장",
      period: "2025년 12월 - 2028년 2월 / 2년 2개월",
      description: "웹사이트 구축 프로젝트\n로고 및 기업 브랜딩 구축 프로젝트\n웹사이트 구축 프로젝트",
      color: "purple"
    },
    {
      id: 2,
      company: "Salford & Co. 회사",
      role: "디자인팀 · 선임",
      period: "2023년 12월 - 2025년 2월 / 1년 2개월",
      description: "웹사이트 구축 프로젝트\n로고 및 기업 브랜딩 3개 구축 프로젝트",
      color: "orange"
    },
    {
      id: 3,
      company: "Borcelle 회사",
      role: "디자인팀 · 주임",
      period: "2020년 12월 - 2023년 2월 / 2년 2개월",
      description: "웹사이트 구축 프로젝트\n로고 및 기업 브랜딩 구축 프로젝트",
      color: "yellow"
    }
  ];

  const experiences = (data.experiences && data.experiences.length > 0)
    ? data.experiences
    : defaultExperiences;

  const getCompanyLogo = (index) => {
    // 0 = purple, 1 = orange, 2 = yellow
    const colors = ["purple", "orange", "yellow"];
    const col = colors[index % colors.length];

    if (col === "purple") {
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#F3E8FF" />
          <path d="M16 6L22 12L16 18L10 12L16 6Z" fill="#A855F7" opacity="0.8" />
          <path d="M16 14L22 20L16 26L10 20L16 14Z" fill="#8B5CF6" />
        </svg>
      );
    } else if (col === "orange") {
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#FFEDD5" />
          <circle cx="16" cy="16" r="8" fill="#F97316" opacity="0.6" />
          <circle cx="16" cy="16" r="4" fill="#EA580C" />
        </svg>
      );
    } else {
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#FEF9C3" />
          <path d="M8 8H24V24H8V8Z" fill="#EAB308" opacity="0.4" />
          <circle cx="16" cy="16" r="4" fill="#CA8A04" />
        </svg>
      );
    }
  };

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
              <h2 className="role">{role}</h2>
              <h1 className="name">{name}</h1>
              <p className="description" style={{ whiteSpace: 'pre-line' }}>
                {introduction}
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">웹사이트</span>
                  <span>{website}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">이메일</span>
                  <span>{email}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">전화번호</span>
                  <span>{phone}</span>
                </div>
              </div>
            </div>
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

                {/* 프로필 이미지 혹은 대체 텍스트 */}
                <div className="photo" style={{
                  backgroundImage: data.profileImage ? `url(${data.profileImage})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  {!data.profileImage && (
                    <div className="photo-inner">
                      <span style={{ color: '#999' }}>사진</span>
                    </div>
                  )}
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

              {experiences.map((exp, index) => (
                <div className="experience-item" key={exp.id || index}>
                  <div className="company-logo">
                    {getCompanyLogo(index)}
                  </div>
                  <div className="experience-content">
                    <div className="experience-header">
                      <h4 className="job-title">{exp.company} · {exp.role}</h4>
                      <span className="job-period">{exp.period}</span>
                    </div>
                    {/* description 줄바꿈 기준으로 리스트 렌더링 */}
                    {exp.description && (
                      <ul className="project-list">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}

            </div>
          </section>

          {/* 3. 하단 섹션 (교육 / 스킬 - 이부분은 관리자모드 외의 기본 템플릿 영역) */}
          <section className="bottom-section" style={{ marginTop: data.projects && data.projects.length > 0 ? "0px" : "60px" }}>

            {/* 데이터가 있을 경우 Projects 영역으로도 렌더링을 지원 */}
            {data.projects && data.projects.length > 0 ? (
              <div className="education-section" style={{ gridColumn: "1 / -1", marginBottom: "40px" }}>
                <h3 className="section-title">기타 프로젝트</h3>
                <div className="education-list">
                  {data.projects.map((proj, idx) => (
                    <div className="education-item" key={idx}>
                      <h4>{proj.title}</h4>
                      <p>{proj.description}</p>
                      {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" style={{ fontSize: "0.85rem", color: "var(--primary-color)", textDecoration: "underline" }}>자세히 보기</a>}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

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
  );
}
