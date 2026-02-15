import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import SEOHead from '../../components/SEOHead';
import { recruiterAPI } from '../../services/api';
import { toast } from 'react-hot-toast';
import { formatDate } from '../../utils/dateUtils';

export default function ApplicationReview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchApplication();
    }, [id]);

    const fetchApplication = async () => {
        try {
            const response = await recruiterAPI.getApplicationById(id);
            setApplication(response.data);
        } catch (error) {
            console.error('Error fetching application:', error);
            toast.error('Failed to load application details');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (newStatus) => {
        setUpdating(true);
        try {
            await recruiterAPI.updateApplicationStatus(id, newStatus);
            toast.success(`Application ${newStatus.toLowerCase()} successfully`);
            setApplication({ ...application, status: newStatus });
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update application status');
        } finally {
            setUpdating(false);
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

    if (!application) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
                <Header />
                <div className="container" style={{ padding: '2rem 0' }}>
                    <div className="empty-state">
                        <div className="empty-state-icon">❌</div>
                        <h3 className="empty-state-title">Application Not Found</h3>
                        <p className="empty-state-description">
                            The application you're looking for doesn't exist or has been removed.
                        </p>
                        <Link to="/recruiter/applications" className="btn btn-primary">
                            Back to Applications
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const getStatusBadge = (status) => {
        const styles = {
            APPLIED: { bg: '#DBEAFE', color: '#1E40AF', label: 'Applied' },
            SHORTLISTED: { bg: '#DCFCE7', color: '#166534', label: 'Shortlisted' },
            REJECTED: { bg: '#FEE2E2', color: '#991B1B', label: 'Rejected' }
        };
        const style = styles[status] || styles.APPLIED;
        return (
            <span className="badge" style={{
                background: style.bg,
                color: style.color,
                padding: '6px 16px',
                fontSize: '0.875rem',
                fontWeight: 600
            }}>
                ● {style.label}
            </span>
        );
    };

    return (
        <>
            <SEOHead
                title={`Review Application - ${application.candidate?.fullName || 'Candidate'}`}
                description="Review and manage candidate application"
            />

            <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
                <Header />

                <main style={{ padding: '2rem 0' }}>
                    <div className="container">
                        {/* Back Button */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <Link
                                to="/recruiter/applications"
                                className="btn btn-ghost"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                ← Back to Applications
                            </Link>
                        </div>

                        {/* Application Header */}
                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                                <div>
                                    <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>
                                        {application.candidate?.fullName || 'Unknown Candidate'}
                                    </h1>
                                    <p className="page-description">
                                        Applied for {application.job?.title || 'N/A'} at {application.job?.company?.name || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    {getStatusBadge(application.status)}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                {application.status !== 'SHORTLISTED' && (
                                    <button
                                        onClick={() => handleStatusUpdate('SHORTLISTED')}
                                        disabled={updating}
                                        className="btn btn-success"
                                    >
                                        ✓ Shortlist Candidate
                                    </button>
                                )}
                                {application.status !== 'REJECTED' && (
                                    <button
                                        onClick={() => handleStatusUpdate('REJECTED')}
                                        disabled={updating}
                                        className="btn btn-danger"
                                    >
                                        ✗ Reject Application
                                    </button>
                                )}
                                {application.candidate?.resumeUrl && (
                                    <a
                                        href={`http://localhost:8080${application.candidate.resumeUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        📄 View Resume
                                    </a>
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {/* Candidate Information */}
                            <div className="card">
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--gray-900)' }}>
                                    Candidate Information
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>
                                            Full Name
                                        </div>
                                        <div style={{ fontWeight: 500, color: 'var(--gray-900)' }}>
                                            {application.candidate?.fullName || 'N/A'}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>
                                            Email
                                        </div>
                                        <div style={{ fontWeight: 500, color: 'var(--gray-900)' }}>
                                            {application.candidate?.email || 'N/A'}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>
                                            Phone
                                        </div>
                                        <div style={{ fontWeight: 500, color: 'var(--gray-900)' }}>
                                            {application.candidate?.phone || 'N/A'}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>
                                            Location
                                        </div>
                                        <div style={{ fontWeight: 500, color: 'var(--gray-900)' }}>
                                            {application.candidate?.location || 'N/A'}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>
                                            Experience
                                        </div>
                                        <div style={{ fontWeight: 500, color: 'var(--gray-900)' }}>
                                            {application.candidate?.experienceYears ? `${application.candidate.experienceYears} years` : 'N/A'}
                                        </div>
                                    </div>
                                    {application.candidate?.linkedinUrl && (
                                        <div>
                                            <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>
                                                LinkedIn
                                            </div>
                                            <a
                                                href={application.candidate.linkedinUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}
                                            >
                                                View Profile →
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Application Details */}
                            <div className="card">
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--gray-900)' }}>
                                    Application Details
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>
                                            Job Position
                                        </div>
                                        <div style={{ fontWeight: 500, color: 'var(--gray-900)' }}>
                                            {application.job?.title || 'N/A'}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>
                                            Company
                                        </div>
                                        <div style={{ fontWeight: 500, color: 'var(--gray-900)' }}>
                                            {application.job?.company?.name || 'N/A'}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>
                                            Applied Date
                                        </div>
                                        <div style={{ fontWeight: 500, color: 'var(--gray-900)' }}>
                                            {formatDate(application.appliedAt)}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginBottom: '0.25rem' }}>
                                            Status
                                        </div>
                                        <div>
                                            {getStatusBadge(application.status)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Skills */}
                            {application.candidate?.skills && (
                                <div className="card">
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--gray-900)' }}>
                                        Skills
                                    </h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {application.candidate.skills.split(',').map((skill, index) => (
                                            <span
                                                key={index}
                                                className="badge badge-primary"
                                                style={{ padding: '6px 12px' }}
                                            >
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
