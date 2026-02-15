import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import { candidateAPI } from '../../services/api';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function CandidateApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await candidateAPI.getApplications();
            setApplications(response.data);
        } catch (error) {
            toast.error('Failed to synchronize submission history');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
            <Header />
            <main style={{ padding: '3.5rem 0' }}>
                <div className="container">
                    <div className="mb-4">
                        <h1 style={{ marginBottom: '0.25rem' }}>Application History</h1>
                        <p className="text-muted">Lifecycle tracking for your professional submissions</p>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner" style={{ margin: '0 auto' }}></div>
                            <p className="mt-3 text-muted">Retrieving submission logs...</p>
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="card text-center py-5" style={{ padding: '5rem 0' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📋</div>
                            <h3>No active submissions</h3>
                            <p className="text-muted mb-4">You have not submitted any profile intelligence to our partner board yet.</p>
                            <Link to="/jobs" className="btn btn-primary" style={{ padding: '0.875rem 2rem' }}>Browse Market Map</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '2rem' }}>
                            {applications.map(app => (
                                <div key={app.id} className="card shadow-md fade-in" style={{ borderLeft: `6px solid ${app.status === 'APPLIED' ? 'var(--info)' : app.status === 'SHORTLISTED' ? 'var(--secondary)' : 'var(--danger)'}` }}>
                                    <div className="flex-between mb-4 pb-4 border-bottom">
                                        <div>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{app.job.title}</h3>
                                            <div className="flex gap-3" style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🏢 {app.job.company.name}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📍 {app.job.location}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span className={`badge`} style={{
                                                backgroundColor: app.status === 'APPLIED' ? '#DBEAFE' : app.status === 'SHORTLISTED' ? '#DCFCE7' : '#FEE2E2',
                                                color: app.status === 'APPLIED' ? '#1E40AF' : app.status === 'SHORTLISTED' ? '#166534' : '#991B1B',
                                                padding: '6px 16px'
                                            }}>
                                                ● {app.status}
                                            </span>
                                            <p className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '0.75rem' }}>SUBMITTED: {new Date(app.appliedAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</p>
                                        </div>
                                    </div>

                                    {app.recruiterNotes && (
                                        <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--primary)' }}>
                                            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', marginBottom: '0.5rem' }}>Evaluator Feedback</h4>
                                            <p style={{ fontSize: '0.9375rem', color: 'var(--gray-700)', lineHeight: '1.6', margin: 0, fontStyle: 'italic' }}>
                                                "{app.recruiterNotes}"
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        <Link to={`/jobs/${app.job.id}`} className="btn btn-outline" style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem' }}>View Market Listing</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
