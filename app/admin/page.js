'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
    const [session, setSession] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeSection, setActiveSection] = useState('basic'); // For sidebar navigation

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Check for existing session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchData();
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session && !data) fetchData();
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert('로그인 실패: ' + error.message);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setData(null);
    };

    const fetchData = async () => {
        // Fetch existing data to edit
        setLoading(true);
        try {
            const res = await fetch('/api/portfolio');
            if (res.ok) {
                const json = await res.json();
                setData(json);
            } else {
                // If database is empty, start with empty structure
                setData({ name: "", experiences: [], projects: [], about: [], contact: {} });
            }
        } catch (err) {
            console.error(err);
            alert('데이터를 불러오는데 실패했습니다.');
        }
        setLoading(false);
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
                setMessage('저장되었습니다! (메인 페이지 확인)');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('저장 실패.');
            }
        } catch (err) {
            console.error(err);
            setMessage('오류 발생.');
        }
        setLoading(false);
    };

    /* Data Handlers */
    const handleBasicChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            contact: { ...prev.contact, [name]: value }
        }));
    };

    const handleArrayChange = (arrayName, index, field, value) => {
        setData(prev => {
            const newArray = [...(prev[arrayName] || [])];
            newArray[index] = { ...newArray[index], [field]: value };
            return { ...prev, [arrayName]: newArray };
        });
    };

    const addArrayItem = (arrayName, template) => {
        setData(prev => ({
            ...prev,
            [arrayName]: [...(prev[arrayName] || []), { id: Date.now(), ...template }]
        }));
    };

    const removeArrayItem = (arrayName, index) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        setData(prev => {
            const newArray = [...(prev[arrayName] || [])];
            newArray.splice(index, 1);
            return { ...prev, [arrayName]: newArray };
        });
    };

    const handleAboutChange = (index, value) => {
        setData(prev => {
            const newAbout = [...(prev.about || [])];
            newAbout[index] = value;
            return { ...prev, about: newAbout };
        });
    };

    const addAboutItem = () => {
        setData(prev => ({ ...prev, about: [...(prev.about || []), ""] }));
    };

    const removeAboutItem = (index) => {
        setData(prev => {
            const newAbout = [...(prev.about || [])];
            newAbout.splice(index, 1);
            return { ...prev, about: newAbout };
        });
    };

    /* Render Logic */
    if (!session) {
        return (
            <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
                <div className="admin-card" style={{ width: '100%', maxWidth: '400px' }}>
                    <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Admin Access</h1>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button type="submit" className="btn" style={{ width: '100%', background: 'var(--foreground)', color: 'var(--background)' }} disabled={loading}>
                            {loading ? 'Logging in...' : 'Sign In'}
                        </button>
                    </form>
                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <Link href="/" style={{ fontSize: '0.9rem', color: '#666', textDecoration: 'underline' }}>Back to Portfolio</Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) return <div className="container" style={{ padding: '100px 0' }}>Loading application data...</div>;

    const navItems = [
        { id: 'basic', label: 'Basic Info' },
        { id: 'contact', label: 'Contact' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'about', label: 'Philosophy' },
    ];

    const scrollToSection = (id) => {
        setActiveSection(id);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
            {/* Header */}
            <header style={{
                position: 'sticky', top: 0, zIndex: 50,
                background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)',
                borderBottom: '1px solid #eaeaea', padding: '16px 0'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>Admin Dashboard</div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {message && <span style={{ color: 'green', fontSize: '0.9rem', marginRight: '10px' }}>{message}</span>}
                        <Link href="/" target="_blank" className="btn btn-outline btn-sm">View Site</Link>
                        <button onClick={saveChanges} className="btn btn-sm" style={{ background: 'var(--foreground)', color: 'var(--background)' }} disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ borderColor: '#ffdede', color: '#ff4d4d' }}>Logout</button>
                    </div>
                </div>
            </header>

            <div className="container" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '40px', padding: '40px 20px', alignItems: 'start' }}>

                {/* Sidebar Navigation */}
                <aside style={{ position: 'sticky', top: '100px' }}>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                style={{
                                    textAlign: 'left', padding: '10px 16px', borderRadius: '8px',
                                    background: activeSection === item.id ? '#eee' : 'transparent',
                                    fontWeight: activeSection === item.id ? '600' : '400',
                                    border: 'none', cursor: 'pointer', fontSize: '0.95rem', color: '#333'
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

                    {/* Basic Info */}
                    <section id="basic" className="admin-card">
                        <div className="admin-section-header">
                            <h3>Basic Information</h3>
                        </div>
                        <div className="grid grid-cols-2" style={{ gap: '20px' }}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input name="name" value={data.name || ''} onChange={handleBasicChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Role / Title</label>
                                <input name="role" value={data.role || ''} onChange={handleBasicChange} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Introduction</label>
                            <textarea name="introduction" value={data.introduction || ''} onChange={handleBasicChange} className="form-control" style={{ minHeight: '120px', lineHeight: '1.6' }} />
                        </div>
                    </section>

                    {/* Contact */}
                    <section id="contact" className="admin-card">
                        <div className="admin-section-header">
                            <h3>Contact Details</h3>
                        </div>
                        <div className="grid grid-cols-2" style={{ gap: '20px' }}>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input name="email" value={data.contact?.email || ''} onChange={handleContactChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input name="phone" value={data.contact?.phone || ''} onChange={handleContactChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Blog URL</label>
                                <input name="blog" value={data.contact?.blog || ''} onChange={handleContactChange} className="form-control" placeholder="https://..." />
                            </div>
                            <div className="form-group">
                                <label className="form-label">GitHub URL</label>
                                <input name="github" value={data.contact?.github || ''} onChange={handleContactChange} className="form-control" placeholder="https://..." />
                            </div>
                        </div>
                    </section>

                    {/* Experience */}
                    <section id="experience" className="admin-card">
                        <div className="admin-section-header">
                            <h3>Experience</h3>
                            <button onClick={() => addArrayItem('experiences', { role: '', company: '', period: '', description: '' })} className="btn btn-sm btn-outline">+ Add Position</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {(data.experiences || []).map((exp, idx) => (
                                <div key={exp.id || idx} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <h4 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase' }}>Position {idx + 1}</h4>
                                        <button onClick={() => removeArrayItem('experiences', idx)} className="btn-danger" style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', border: 'none', cursor: 'pointer' }}>Delete</button>
                                    </div>
                                    <div className="grid grid-cols-2" style={{ gap: '16px', marginBottom: '16px' }}>
                                        <input value={exp.company || ''} onChange={(e) => handleArrayChange('experiences', idx, 'company', e.target.value)} className="form-control" placeholder="Company Name" />
                                        <input value={exp.period || ''} onChange={(e) => handleArrayChange('experiences', idx, 'period', e.target.value)} className="form-control" placeholder="Period (e.g. 2021 - Present)" />
                                    </div>
                                    <div className="form-group">
                                        <input value={exp.role || ''} onChange={(e) => handleArrayChange('experiences', idx, 'role', e.target.value)} className="form-control" placeholder="Job Title" style={{ fontWeight: '600' }} />
                                    </div>
                                    <textarea value={exp.description || ''} onChange={(e) => handleArrayChange('experiences', idx, 'description', e.target.value)} className="form-control" placeholder="Description of responsibilities..." style={{ minHeight: '80px' }} />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects */}
                    <section id="projects" className="admin-card">
                        <div className="admin-section-header">
                            <h3>Projects</h3>
                            <button onClick={() => addArrayItem('projects', { title: '', description: '', link: '' })} className="btn btn-sm btn-outline">+ Add Project</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {(data.projects || []).map((proj, idx) => (
                                <div key={proj.id || idx} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <h4 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase' }}>Project {idx + 1}</h4>
                                        <button onClick={() => removeArrayItem('projects', idx)} className="btn-danger" style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', border: 'none', cursor: 'pointer' }}>Delete</button>
                                    </div>
                                    <input value={proj.title || ''} onChange={(e) => handleArrayChange('projects', idx, 'title', e.target.value)} className="form-control" style={{ marginBottom: '12px', fontWeight: '600' }} placeholder="Project Title" />
                                    <textarea value={proj.description || ''} onChange={(e) => handleArrayChange('projects', idx, 'description', e.target.value)} className="form-control" style={{ marginBottom: '12px', minHeight: '80px' }} placeholder="Project Description" />
                                    <input value={proj.link || ''} onChange={(e) => handleArrayChange('projects', idx, 'link', e.target.value)} className="form-control" placeholder="Project Link (URL)" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* About */}
                    <section id="about" className="admin-card">
                        <div className="admin-section-header">
                            <h3>Philosophy / About</h3>
                            <button onClick={addAboutItem} className="btn btn-sm btn-outline">+ Add Line</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {(data.about || []).map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '10px' }}>
                                    <input value={item || ''} onChange={(e) => handleAboutChange(idx, e.target.value)} className="form-control" placeholder="Statement..." />
                                    <button onClick={() => removeAboutItem(idx)} style={{ color: '#e11d48', background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', padding: '0 8px' }}>&times;</button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div style={{ height: '100px' }}></div> {/* Spacer */}

                </main>
            </div>
        </div>
    );
}
