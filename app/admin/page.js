'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
    const [authorized, setAuthorized] = useState(false);
    const [password, setPassword] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Password check
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin1234') {
            setAuthorized(true);
            fetchData();
        } else {
            alert('비밀번호가 틀렸습니다.');
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/portfolio');
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error(err);
            alert('데이터를 불러오는데 실패했습니다.');
        }
        setLoading(false);
    };

    const handleChange = (section, field, value) => {
        setData((prev) => ({
            ...prev,
            [section]: typeof prev[section] === 'object' && !Array.isArray(prev[section])
                ? { ...prev[section], [field]: value }
                : value
        }));
    };

    // Specific handler for nested simple fields (name, role, intro)
    const handleBasicChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    // Specific handler for contact
    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            contact: { ...prev.contact, [name]: value }
        }));
    };

    // Handler for Array fields (Experience, Projects) - simplified for demo
    // We will just show JSON text areas for arrays for now to save complexity, 
    // or build a simple index-based editor. Let's do index-based.

    const handleArrayChange = (arrayName, index, field, value) => {
        setData(prev => {
            const newArray = [...prev[arrayName]];
            newArray[index] = { ...newArray[index], [field]: value };
            return { ...prev, [arrayName]: newArray };
        });
    };

    const addArrayItem = (arrayName, template) => {
        setData(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], { id: Date.now(), ...template }]
        }));
    };

    const removeArrayItem = (arrayName, index) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        setData(prev => {
            const newArray = [...prev[arrayName]];
            newArray.splice(index, 1);
            return { ...prev, [arrayName]: newArray };
        });
    };

    // Handler for About (Array of strings)
    const handleAboutChange = (index, value) => {
        setData(prev => {
            const newAbout = [...prev.about];
            newAbout[index] = value;
            return { ...prev, about: newAbout };
        });
    };

    const saveChanges = async () => {
        setLoading(true);
        setMessage('');
        try {
            const res = await fetch('/api/portfolio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setMessage('저장되었습니다! 메인 페이지에서 확인하세요. (새로고침이 필요할 수 있습니다)');
            } else {
                setMessage('저장 실패.');
            }
        } catch (err) {
            console.error(err);
            setMessage('오류 발생.');
        }
        setLoading(false);
    };

    if (!authorized) {
        return (
            <div className="container" style={{ maxWidth: '400px', marginTop: '100px', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '2rem' }}>관리자 로그인</h1>
                <form onSubmit={handleLogin} className="card">
                    <div className="form-group">
                        <label className="form-label">비밀번호</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="admin1234"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>로그인</button>
                </form>
                <div style={{ marginTop: '1rem' }}>
                    <Link href="/" style={{ textDecoration: 'underline' }}>← 홈으로 돌아가기</Link>
                </div>
            </div>
        );
    }

    if (!data) return <div className="container section">Loading data...</div>;

    return (
        <div className="container section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>관리자 페이지</h1>
                <div>
                    <Link href="/" className="btn btn-outline" style={{ marginRight: '1rem' }}>내 사이트 보기</Link>
                    <button onClick={saveChanges} className="btn btn-primary" disabled={loading}>
                        {loading ? '저장 중...' : '변경사항 저장'}
                    </button>
                </div>
            </div>

            {message && <div style={{ padding: '1rem', background: '#d1fae5', color: '#065f46', borderRadius: '0.5rem', marginBottom: '2rem' }}>{message}</div>}

            <div className="card" style={{ marginBottom: '2rem' }}>
                <h2>기본 정보</h2>
                <div className="form-group">
                    <label className="form-label">이름</label>
                    <input name="name" value={data.name} onChange={handleBasicChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label className="form-label">직업/타이틀 (Role)</label>
                    <input name="role" value={data.role} onChange={handleBasicChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label className="form-label">자기소개 (Introduction)</label>
                    <textarea name="introduction" value={data.introduction} onChange={handleBasicChange} className="form-control" />
                </div>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <h2>연락처</h2>
                <div className="form-group">
                    <label className="form-label">이메일</label>
                    <input name="email" value={data.contact.email} onChange={handleContactChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label className="form-label">전화번호</label>
                    <input name="phone" value={data.contact.phone} onChange={handleContactChange} className="form-control" />
                </div>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h2>경력 사항 (Experience)</h2>
                    <button onClick={() => addArrayItem('experiences', { role: '새 직함', company: '새 회사', period: '기간', description: '설명' })} className="btn btn-outline">+ 추가</button>
                </div>
                {data.experiences.map((exp, idx) => (
                    <div key={exp.id || idx} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.5rem' }}>
                            <input value={exp.period} onChange={(e) => handleArrayChange('experiences', idx, 'period', e.target.value)} className="form-control" placeholder="기간" />
                            <input value={exp.company} onChange={(e) => handleArrayChange('experiences', idx, 'company', e.target.value)} className="form-control" placeholder="회사/기관명" />
                        </div>
                        <input value={exp.role} onChange={(e) => handleArrayChange('experiences', idx, 'role', e.target.value)} className="form-control" style={{ marginBottom: '0.5rem' }} placeholder="직함" />
                        <textarea value={exp.description} onChange={(e) => handleArrayChange('experiences', idx, 'description', e.target.value)} className="form-control" placeholder="업무 내용" style={{ minHeight: '80px' }} />
                        <button onClick={() => removeArrayItem('experiences', idx)} style={{ color: 'red', marginTop: '0.5rem', background: 'none', border: 'none', textDecoration: 'underline' }}>삭제</button>
                    </div>
                ))}
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h2>프로젝트 (Projects)</h2>
                    <button onClick={() => addArrayItem('projects', { title: '새 프로젝트', description: '설명', link: '' })} className="btn btn-outline">+ 추가</button>
                </div>
                {data.projects.map((proj, idx) => (
                    <div key={proj.id || idx} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <input value={proj.title} onChange={(e) => handleArrayChange('projects', idx, 'title', e.target.value)} className="form-control" style={{ marginBottom: '0.5rem' }} placeholder="프로젝트명" />
                        <textarea value={proj.description} onChange={(e) => handleArrayChange('projects', idx, 'description', e.target.value)} className="form-control" style={{ marginBottom: '0.5rem', minHeight: '80px' }} placeholder="설명" />
                        <input value={proj.link} onChange={(e) => handleArrayChange('projects', idx, 'link', e.target.value)} className="form-control" placeholder="관련 링크 (http://...)" />
                        <button onClick={() => removeArrayItem('projects', idx)} style={{ color: 'red', marginTop: '0.5rem', background: 'none', border: 'none', textDecoration: 'underline' }}>삭제</button>
                    </div>
                ))}
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <h2>About 목록</h2>
                {data.about.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                        <input value={item} onChange={(e) => handleAboutChange(idx, e.target.value)} className="form-control" />
                    </div>
                ))}
            </div>

        </div>
    );
}
