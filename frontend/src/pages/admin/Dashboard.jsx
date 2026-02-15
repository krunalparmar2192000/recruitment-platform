import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { adminAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalRecruiters: 0,
        totalCandidates: 0,
        totalJobs: 0,
        totalApplications: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await adminAPI.getStats();
            setStats(response.data);
        } catch (error) {
            toast.error('Failed to fetch platform stats');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
            <Header />
            <main style={{ padding: '3rem 0' }}>
                <div className="container">
                    <div className="mb-4">
                        <h1 style={{ marginBottom: '0.5rem' }}>Platform Overview</h1>
                        <p className="text-muted">High-level telemetry for the RecruitHub ecosystem</p>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-4 mb-4">
                                <div className="metric-card" style={{ borderLeftColor: 'var(--primary)' }}>
                                    <h4 className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>System Users</h4>
                                    <h2 style={{ margin: 0 }}>{stats.totalUsers}</h2>
                                </div>
                                <div className="metric-card" style={{ borderLeftColor: '#10b981' }}>
                                    <h4 className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Agencies</h4>
                                    <h2 style={{ margin: 0 }}>{stats.totalRecruiters}</h2>
                                </div>
                                <div className="metric-card" style={{ borderLeftColor: '#3b82f6' }}>
                                    <h4 className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Candidates</h4>
                                    <h2 style={{ margin: 0 }}>{stats.totalCandidates}</h2>
                                </div>
                                <div className="metric-card" style={{ borderLeftColor: '#f59e0b' }}>
                                    <h4 className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Active Vacancies</h4>
                                    <h2 style={{ margin: 0 }}>{stats.totalJobs}</h2>
                                </div>
                            </div>

                            <div className="grid grid-2">
                                <Link to="/admin/recruiters" className="card hover-lift" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="flex gap-4" style={{ alignItems: 'center' }}>
                                        <div style={{ padding: '1rem', backgroundColor: 'var(--gray-100)', borderRadius: '12px', fontSize: '2rem' }}>👥</div>
                                        <div>
                                            <h4 style={{ margin: 0 }}>Agency Directory</h4>
                                            <p className="text-muted" style={{ margin: 0, fontSize: '0.9375rem' }}>Provision, monitor, and manage recruiter accounts.</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="card">
                                    <div className="flex gap-4" style={{ alignItems: 'center' }}>
                                        <div style={{ padding: '1rem', backgroundColor: 'var(--gray-100)', borderRadius: '12px', fontSize: '2rem' }}>📈</div>
                                        <div>
                                            <h4 style={{ margin: 0 }}>Platform Intelligence</h4>
                                            <p className="text-muted" style={{ margin: 0, fontSize: '0.9375rem' }}>Coming soon: Deep dive into hiring conversion rates.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
