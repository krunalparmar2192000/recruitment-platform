import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { publicAPI } from '../../services/api';

export default function Recruiters() {
    const [recruiters, setRecruiters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecruiters();
    }, []);

    const fetchRecruiters = async () => {
        try {
            const response = await publicAPI.getRecruiters();
            setRecruiters(response.data);
        } catch (error) {
            console.error('Failed to fetch recruiters');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)' }}>
            <Header />

            <main style={{ flex: 1 }}>
                {/* Professional Business Hero */}
                <section style={{
                    backgroundColor: 'var(--gray-900)',
                    color: 'white',
                    padding: '5rem 0',
                    borderBottom: '1px solid var(--gray-800)'
                }}>
                    <div className="container text-center">
                        <span className="badge badge-info mb-3" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#60A5FA' }}>
                            GLOBAL PARTNER NETWORK
                        </span>
                        <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '1.5rem' }}>
                            Connect with Expert Recruiters
                        </h1>
                        <p style={{ color: 'var(--gray-400)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
                            Our verified recruitment partners specialize in identifying top-tier talent across technology,
                            finance, and creative industries. Accelerate your hiring process today.
                        </p>
                    </div>
                </section>

                <section style={{ padding: '4rem 0' }}>
                    <div className="container">
                        {loading ? (
                            <div className="flex-center" style={{ padding: '5rem 0' }}>
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            <div className="grid grid-3">
                                {recruiters.map(r => (
                                    <div key={r.id} className="card hover-lift" style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        padding: '2.5rem',
                                        border: '1px solid var(--gray-200)'
                                    }}>
                                        <div className="flex-between mb-4">
                                            <div style={{
                                                width: '64px',
                                                height: '64px',
                                                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                                                borderRadius: '12px',
                                                color: 'white',
                                                fontSize: '1.5rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold'
                                            }}>
                                                {r.companyName?.[0] || 'R'}
                                            </div>
                                            <span className="badge badge-success" style={{ backgroundColor: '#DCFCE7', color: '#166534' }}>
                                                VERIFIED
                                            </span>
                                        </div>

                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{r.companyName}</h3>
                                        <p className="text-muted" style={{ fontSize: '1rem', flex: 1, marginBottom: '1.5rem', lineHeight: '1.7' }}>
                                            {r.description || 'Specialized recruitment agency delivering high-impact hiring solutions for innovative companies.'}
                                        </p>

                                        <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: '1.5rem', marginTop: 'auto' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                                                <span>📍</span>
                                                <span>{r.address || 'Location Global'}</span>
                                            </div>

                                            <Link
                                                to={`/submit-requirement?recruiterId=${r.id}`}
                                                className="btn btn-primary"
                                                style={{ width: '100%', padding: '1rem', justifyContent: 'center' }}
                                            >
                                                Submit Hiring Requirement
                                            </Link>
                                        </div>
                                    </div>
                                ))}

                                {recruiters.length === 0 && (
                                    <div className="card text-center" style={{ gridColumn: '1 / -1', padding: '5rem' }}>
                                        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🏢</h2>
                                        <h3>No Partner Agencies Found</h3>
                                        <p className="text-muted">Our network is currently being updated. Please check back soon.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
