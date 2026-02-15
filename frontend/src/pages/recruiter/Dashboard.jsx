import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import SEOHead from '../../components/SEOHead';
import { recruiterAPI } from '../../services/api';
import { toast } from 'react-hot-toast';
import {
    Users,
    Briefcase,
    FileText,
    Bell,
    Building2,
    Settings,
    TrendingUp,
    ChevronRight,
    PlusCircle
} from 'lucide-react';

export default function RecruiterDashboard() {
    const [stats, setStats] = useState({
        totalCompanies: 0,
        totalJobs: 0,
        totalApplications: 0,
        pendingRequests: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await recruiterAPI.getDashboard();
            setStats(response.data);
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="dashboard-wrapper fade-in">
            <SEOHead title="Command Center" description="Recruitment Analytics & Management" />
            <Header />

            <main className="dashboard-main">
                <div className="container">
                    {/* Welcome Header */}
                    <header className="dashboard-header">
                        <div className="header-info">
                            <h1 className="dashboard-title">Command <span className="text-gradient">Center</span></h1>
                            <p className="dashboard-subtitle">Here's what's happening in your recruitment universe today.</p>
                        </div>
                        <div className="header-actions">
                            <Link to="/recruiter/jobs/new" className="btn btn-primary" style={{ gap: '10px' }}>
                                <PlusCircle size={20} />
                                <span>Post New Vacancy</span>
                            </Link>
                        </div>
                    </header>

                    {/* Performance Metrics */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon-box blue">
                                <Building2 size={24} />
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">Partner Companies</span>
                                <h2 className="stat-value">{stats.totalCompanies}</h2>
                                <p className="stat-footer"><TrendingUp size={14} color="#10B981" /> <span>+2 this month</span></p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon-box purple">
                                <Briefcase size={24} />
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">Active Vacancies</span>
                                <h2 className="stat-value">{stats.totalJobs}</h2>
                                <p className="stat-footer"><span>Live postings</span></p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon-box green">
                                <Users size={24} />
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">Talent Pool</span>
                                <h2 className="stat-value">{stats.totalApplications}</h2>
                                <p className="stat-footer"><span>Total applicants</span></p>
                            </div>
                        </div>

                        <div className="stat-card highlight">
                            <div className="stat-icon-box orange">
                                <Bell size={24} />
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">New Requests</span>
                                <h2 className="stat-value">{stats.pendingRequests}</h2>
                                <p className="stat-footer"><span>Needs attention</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Management Sections */}
                    <h3 className="section-label">Management Hub</h3>
                    <div className="management-grid">
                        <ManagementCard
                            to="/recruiter/companies"
                            icon={<Building2 size={24} />}
                            title="Client Portfolio"
                            desc="Manage relationships and high-value accounts."
                            color="blue"
                        />
                        <ManagementCard
                            to="/recruiter/jobs"
                            icon={<Briefcase size={24} />}
                            title="Job Openings"
                            desc="Optimize and broadcast active vacancies."
                            color="purple"
                        />
                        <ManagementCard
                            to="/recruiter/applications"
                            icon={<FileText size={24} />}
                            title="Talent Tracking"
                            desc="Screen, shortlist, and hire top candidates."
                            color="green"
                        />
                        <ManagementCard
                            to="/recruiter/job-requests"
                            icon={<Bell size={24} />}
                            title="Demand Review"
                            desc="Respond to company hiring requests."
                            color="orange"
                            badge={stats.pendingRequests}
                        />
                        <ManagementCard
                            to="/recruiter/departments"
                            icon={<Users size={24} />}
                            title="Team Structures"
                            desc="Organize internal company hierarchies."
                            color="cyan"
                        />
                        <ManagementCard
                            to="/recruiter/profile"
                            icon={<Settings size={24} />}
                            title="Agency DNA"
                            desc="Configure your recruitment brand settings."
                            color="gray"
                        />
                    </div>
                </div>
            </main>

            <style>{`
                .dashboard-wrapper {
                    min-height: 100vh;
                    background-color: var(--bg-alternate);
                }
                
                .dashboard-main {
                    padding: 4rem 0;
                }

                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 3.5rem;
                }

                .dashboard-title {
                    margin-bottom: 0.5rem;
                }

                .dashboard-subtitle {
                    color: var(--text-secondary);
                    font-size: 1.1rem;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 4rem;
                }

                .stat-card {
                    background: white;
                    padding: 2rem;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--gray-100);
                    display: flex;
                    gap: 1.5rem;
                    transition: var(--transition);
                }

                .stat-card:hover {
                    box-shadow: var(--shadow-premium);
                    transform: translateY(-5px);
                }

                .stat-card.highlight {
                    border: 1px dashed var(--warning);
                    background: var(--warning-soft);
                }

                .stat-icon-box {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .stat-icon-box.blue { background: #EBF2FF; color: #3B82F6; }
                .stat-icon-box.purple { background: #F3E8FF; color: #A855F7; }
                .stat-icon-box.green { background: #ECFDF5; color: #10B981; }
                .stat-icon-box.orange { background: #FFF7ED; color: #F97316; }

                .stat-label {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--gray-500);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    display: block;
                    margin-bottom: 0.25rem;
                }

                .stat-value {
                    font-size: 2.25rem;
                    color: var(--gray-900);
                    margin: 0;
                }

                .stat-footer {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: var(--gray-400);
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    margin-top: 4px;
                }

                .section-label {
                    margin-bottom: 2rem;
                    font-size: 1.25rem;
                    color: var(--gray-800);
                    font-weight: 700;
                }

                .management-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                }

                .loading-screen {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-alternate);
                }

                @media (max-width: 1024px) {
                    .stats-grid { grid-template-columns: repeat(2, 1fr); }
                    .management-grid { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 640px) {
                    .dashboard-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
                    .stats-grid { grid-template-columns: 1fr; }
                    .management-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}

function ManagementCard({ to, icon, title, desc, color, badge }) {
    const colors = {
        blue: { bg: '#EBF2FF', text: '#3B82F6' },
        purple: { bg: '#F3E8FF', text: '#A855F7' },
        green: { bg: '#ECFDF5', text: '#10B981' },
        orange: { bg: '#FFF7ED', text: '#F97316' },
        cyan: { bg: '#E0F7FA', text: '#00ACC1' },
        gray: { bg: '#F3F4F6', text: '#4B5563' }
    };

    return (
        <Link to={to} className="management-card-link">
            <div className="card-luxury">
                <div className="card-luxury-header">
                    <div className="icon-wrapper" style={{ background: colors[color].bg, color: colors[color].text }}>
                        {icon}
                    </div>
                    {badge > 0 && <span className="badge-notification">{badge}</span>}
                    <ChevronRight size={20} className="arrow-icon" />
                </div>
                <div className="card-luxury-body">
                    <h4 className="card-luxury-title">{title}</h4>
                    <p className="card-luxury-desc">{desc}</p>
                </div>
            </div>
            <style>{`
                .management-card-link { display: block; }
                
                .card-luxury {
                    background: white;
                    padding: 2rem;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--gray-100);
                    transition: var(--transition);
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                }

                .card-luxury:hover {
                    border-color: var(--primary);
                    background: linear-gradient(to bottom right, white, #FAFAFF);
                    box-shadow: var(--shadow-premium);
                    transform: translateY(-4px);
                }

                .card-luxury-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .icon-wrapper {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .badge-notification {
                    background: var(--danger);
                    color: white;
                    padding: 2px 10px;
                    border-radius: 10px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    margin-left: auto;
                    margin-right: 1rem;
                }

                .arrow-icon {
                    color: var(--gray-300);
                    transition: var(--transition);
                }

                .card-luxury:hover .arrow-icon {
                    color: var(--primary);
                    transform: translateX(4px);
                }

                .card-luxury-title {
                    font-size: 1.25rem;
                    margin-bottom: 0.5rem;
                    color: var(--gray-900);
                }

                .card-luxury-desc {
                    color: var(--gray-500);
                    font-size: 0.95rem;
                    margin: 0;
                    line-height: 1.5;
                }
            `}</style>
        </Link>
    );
}
