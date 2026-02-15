import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import SEOHead from '../../components/SEOHead';
import { candidateAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

export default function CandidateDashboard() {
    const [stats, setStats] = useState({
        totalApplications: 0,
        shortlisted: 0,
        rejected: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await candidateAPI.getDashboard();
            setStats(response.data);
        } catch (error) {
            toast.error('Failed to load dashboard');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
                <Header />
                <div className="flex-center" style={{ padding: '4rem 0' }}>
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEOHead
                title="Career Center"
                description="Track your job applications and manage your profile"
            />

            <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
                <Header />

                <main style={{ padding: '2rem 0' }}>
                    <div className="container">
                        {/* Page Header */}
                        <div className="page-header">
                            <h1 className="page-title">Career Center</h1>
                            <p className="page-description">Track your applications and find your next opportunity</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
                            <div className="stat-card">
                                <div className="stat-value">{stats.totalApplications}</div>
                                <div className="stat-label">Total Applications</div>
                                <div className="stat-change">All time</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-value" style={{ color: 'var(--success)' }}>
                                    {stats.shortlisted}
                                </div>
                                <div className="stat-label">Shortlisted</div>
                                <div className="stat-change positive">↑ In progress</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-value" style={{ color: 'var(--gray-400)' }}>
                                    {stats.rejected}
                                </div>
                                <div className="stat-label">Archived</div>
                                <div className="stat-change">Not selected</div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-2">
                            <Link to="/jobs" style={{ textDecoration: 'none' }}>
                                <div className="card" style={{ height: '100%' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'var(--primary-bg)',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1rem',
                                        fontSize: '1.5rem'
                                    }}>
                                        🔍
                                    </div>
                                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                                        Browse Jobs
                                    </h3>
                                    <p style={{ color: 'var(--gray-600)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                                        Discover new opportunities from top companies and recruiters
                                    </p>
                                    <div className="btn btn-primary" style={{ width: '100%' }}>
                                        View All Jobs
                                    </div>
                                </div>
                            </Link>

                            <Link to="/candidate/profile" style={{ textDecoration: 'none' }}>
                                <div className="card" style={{ height: '100%' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'var(--primary-bg)',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1rem',
                                        fontSize: '1.5rem'
                                    }}>
                                        👤
                                    </div>
                                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                                        Professional Profile
                                    </h3>
                                    <p style={{ color: 'var(--gray-600)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                                        Update your resume, skills, and experience to stand out
                                    </p>
                                    <div className="btn btn-outline" style={{ width: '100%' }}>
                                        Manage Profile
                                    </div>
                                </div>
                            </Link>

                            <Link to="/candidate/applications" style={{ textDecoration: 'none' }}>
                                <div className="card" style={{ height: '100%' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'var(--primary-bg)',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1rem',
                                        fontSize: '1.5rem'
                                    }}>
                                        📋
                                    </div>
                                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                                        My Applications
                                    </h3>
                                    <p style={{ color: 'var(--gray-600)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                                        Track the status of your job applications and interviews
                                    </p>
                                    <div className="btn btn-outline" style={{ width: '100%' }}>
                                        View Applications
                                    </div>
                                </div>
                            </Link>

                            <Link to="/recruiters" style={{ textDecoration: 'none' }}>
                                <div className="card" style={{ height: '100%' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'var(--primary-bg)',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1rem',
                                        fontSize: '1.5rem'
                                    }}>
                                        🎯
                                    </div>
                                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                                        Agency Directory
                                    </h3>
                                    <p style={{ color: 'var(--gray-600)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                                        Connect with verified recruitment agencies in your field
                                    </p>
                                    <div className="btn btn-outline" style={{ width: '100%' }}>
                                        Browse Agencies
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
