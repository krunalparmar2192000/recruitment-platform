import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jobsAPI, candidateAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SEOHead from '../../components/SEOHead';
import { toast } from 'react-hot-toast';
import {
    MapPin,
    Briefcase,
    Clock,
    Building2,
    Zap,
    CheckCircle,
    ChevronLeft,
    Share2,
    Shield
} from 'lucide-react';

export default function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        fetchJob();
    }, [id]);

    const fetchJob = async () => {
        try {
            const response = await jobsAPI.getById(id);
            setJob(response.data);
        } catch (error) {
            toast.error('Error fetching job details');
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async () => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        setApplying(true);
        try {
            await candidateAPI.applyForJob(id);
            toast.success('Your application has been prioritized!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Application failed to sync');
        } finally {
            setApplying(false);
        }
    };

    if (loading) return <div className="loading-screen"><div className="spinner"></div></div>;
    if (!job) return <div className="loading-screen">Position not found</div>;

    return (
        <div className="job-details-wrapper">
            <SEOHead title={`${job.title} | ${job.companyName}`} description={`Apply for ${job.title} at ${job.companyName}`} />
            <Header />

            <main className="job-details-main">
                <div className="container">
                    <Link to="/jobs" className="back-link">
                        <ChevronLeft size={18} />
                        <span>Return to Market</span>
                    </Link>

                    <div className="details-layout">
                        <div className="content-area">
                            <div className="luxury-card-v2 animate-fade-in">
                                <header className="job-main-header">
                                    <div className="company-branding">
                                        <div className="brand-logo-large">{job.companyName[0]}</div>
                                        <div className="brand-info">
                                            <h1>{job.title}</h1>
                                            <h3>{job.companyName} <span className="dot-sep">•</span> <span className="dept-txt">{job.departmentName || 'Core Portfolio'}</span></h3>
                                        </div>
                                        <div className="badge-premium">Verified Vacancy</div>
                                    </div>
                                </header>

                                <section className="job-description-section">
                                    <h4>Role Overview</h4>
                                    <p>{job.description}</p>
                                </section>

                                {job.skills && (
                                    <section className="skills-section">
                                        <h4>Technology Stack & Skills</h4>
                                        <div className="skills-grid">
                                            {job.skills.split(',').map(s => (
                                                <div key={s} className="skill-pill">
                                                    <Zap size={12} />
                                                    <span>{s.trim()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>

                        <aside className="sidebar-area">
                            <div className="sidebar-card glass-card">
                                <h4>Position Intelligence</h4>
                                <div className="summary-list">
                                    <SummaryItem icon={<MapPin size={18} />} label="Location" value={job.location || 'Remote'} />
                                    <SummaryItem icon={<Briefcase size={18} />} label="Employment" value={job.jobType || 'Full-time'} />
                                    <SummaryItem icon={<Shield size={18} />} label="Hierarchy" value={job.departmentName} />
                                    <SummaryItem icon={<Clock size={18} />} label="Tenure Required" value={job.experienceMin ? `${job.experienceMin}+ years` : 'Flexible'} />
                                </div>

                                <div className="sidebar-actions">
                                    <button
                                        className="btn btn-primary btn-full btn-lg"
                                        onClick={handleApply}
                                        disabled={applying || (user && user.role !== 'CANDIDATE')}
                                    >
                                        {applying ? 'Syncing...' : 'Initiate Application'}
                                    </button>
                                    <button className="btn btn-secondary btn-full" style={{ marginTop: '1rem', gap: '8px' }}>
                                        <Share2 size={16} />
                                        <span>Share Vacancy</span>
                                    </button>
                                </div>
                                <p className="social-proof-small">
                                    <CheckCircle size={12} />
                                    Join 45 other applicants
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />

            <style>{`
                .job-details-wrapper { background: var(--bg-alternate); min-height: 100vh; }
                .job-details-main { padding: 3rem 0; }
                
                .back-link { display: inline-flex; align-items: center; gap: 8px; color: var(--gray-500); font-weight: 700; margin-bottom: 2rem; }
                .back-link:hover { color: var(--primary); }

                .details-layout { display: grid; grid-template-columns: 1fr 380px; gap: 3rem; }

                .luxury-card-v2 { background: white; border-radius: 24px; padding: 4rem; border: 1px solid var(--gray-100); box-shadow: var(--shadow-xl); }
                
                .job-main-header { margin-bottom: 3.5rem; border-bottom: 1px solid var(--gray-50); padding-bottom: 3rem; }
                .company-branding { display: flex; align-items: center; gap: 2rem; position: relative; }
                
                .brand-logo-large {
                    width: 72px; height: 72px; background: var(--primary); color: white;
                    border-radius: 20px; display: flex; align-items: center; justify-content: center;
                    font-size: 2.5rem; font-weight: 800; font-family: 'Outfit';
                    box-shadow: 0 10px 30px rgba(100, 100, 255, 0.2);
                }

                .brand-info h1 { font-size: 3rem; margin: 0; }
                .brand-info h3 { color: var(--primary); font-size: 1.25rem; font-weight: 700; margin-top: 4px; }
                .dot-sep { color: var(--gray-200); margin: 0 8px; }
                .dept-txt { color: var(--gray-400); font-weight: 500; }

                .badge-premium {
                    position: absolute; top: 0; right: 0; background: #FFF7ED; color: #F97316;
                    padding: 6px 12px; border-radius: 100px; font-weight: 800; font-size: 0.75rem; text-transform: uppercase;
                }

                .job-description-section h4, .skills-section h4 { font-size: 1.25rem; margin-bottom: 1.5rem; color: var(--gray-800); }
                .job-description-section p { font-size: 1.15rem; line-height: 1.8; color: var(--gray-600); white-space: pre-wrap; margin-bottom: 3rem; }

                .skills-grid { display: flex; flex-wrap: wrap; gap: 12px; }
                .skill-pill { 
                    display: flex; align-items: center; gap: 8px; padding: 8px 16px;
                    background: var(--gray-50); border: 1px solid var(--gray-200);
                    border-radius: 12px; font-weight: 700; font-size: 0.9rem; color: var(--gray-700);
                }

                .sidebar-card { padding: 2.5rem; border-radius: 20px; position: sticky; top: 120px; }
                .sidebar-card h4 { font-size: 1.1rem; margin-bottom: 2rem; color: var(--gray-800); text-transform: uppercase; letter-spacing: 0.5px; }

                .summary-list { display: grid; gap: 1.5rem; margin-bottom: 3rem; }
                .social-proof-small { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 0.8rem; color: var(--gray-400); font-weight: 600; margin-top: 1.5rem; }

                @media (max-width: 1024px) {
                    .details-layout { grid-template-columns: 1fr; }
                    .sidebar-area { order: -1; }
                }
            `}</style>
        </div>
    );
}

function SummaryItem({ icon, label, value }) {
    return (
        <div className="summary-item">
            <div className="s-icon">{icon}</div>
            <div className="s-text">
                <span className="s-label">{label}</span>
                <span className="s-value">{value}</span>
            </div>
            <style>{`
                .summary-item { display: flex; gap: 1rem; align-items: center; }
                .s-icon { color: var(--primary); }
                .s-text { display: flex; flex-direction: column; }
                .s-label { font-size: 0.75rem; color: var(--gray-400); font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
                .s-value { font-size: 1rem; font-weight: 700; color: var(--gray-800); }
            `}</style>
        </div>
    );
}
