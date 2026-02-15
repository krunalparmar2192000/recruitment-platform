import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsAPI } from '../../services/api';
import Header from '../../components/layout/Header';
import SEOHead from '../../components/SEOHead';
import { formatDate } from '../../utils/dateUtils';
import {
    Search,
    MapPin,
    Briefcase,
    Clock,
    Building2,
    ChevronRight,
    Filter,
    ArrowRight
} from 'lucide-react';

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        location: '',
        status: 'OPEN'
    });

    useEffect(() => {
        fetchJobs();
    }, [filters]);

    const fetchJobs = async () => {
        try {
            const response = await jobsAPI.getAll(filters);
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="jobs-page-wrapper">
            <SEOHead title="Global Job Market" description="Explore high-impact roles from top-tier companies." />

            <Header />

            <main className="jobs-main">
                <div className="container">
                    {/* Catalog Header */}
                    <header className="catalog-header fade-in">
                        <div className="header-text">
                            <h1 className="catalog-title">Market <span className="text-gradient">Opportunities</span></h1>
                            <p className="catalog-subtitle">Connect with your next career milestone in our curated job ecosystem.</p>
                        </div>

                        <div className="search-bar-luxury glass-card">
                            <div className="search-input-group">
                                <Search size={20} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Location (e.g. Remote, Bangalore, New York)"
                                    value={filters.location}
                                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                />
                            </div>
                            <button className="btn btn-primary" onClick={fetchJobs}>
                                <span>Filter Market</span>
                            </button>
                        </div>
                    </header>

                    <div className="catalog-layout">
                        {/* Sidebar Filters */}
                        <aside className="catalog-sidebar">
                            <div className="filter-box glass-card">
                                <div className="filter-header">
                                    <Filter size={18} />
                                    <span>Refine Selection</span>
                                </div>
                                <div className="filter-group">
                                    <label>Employment DNA</label>
                                    <div className="filter-options">
                                        <button className="filter-btn active">All Types</button>
                                        <button className="filter-btn">Full Time</button>
                                        <button className="filter-btn">Contract</button>
                                        <button className="filter-btn">Freelance</button>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Jobs List */}
                        <div className="catalog-content">
                            {loading ? (
                                <div className="loading-state">
                                    <div className="spinner"></div>
                                    <p>Synchronizing market data...</p>
                                </div>
                            ) : jobs.length === 0 ? (
                                <div className="empty-market glass-card">
                                    <h3>No matches detected</h3>
                                    <p>The market is quiet for these criteria. Try expanding your search horizons.</p>
                                </div>
                            ) : (
                                <div className="jobs-grid">
                                    {jobs.map((job, index) => (
                                        <JobCard key={job.id} job={job} index={index} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <style>{`
                .jobs-page-wrapper { min-height: 100vh; background: var(--bg-alternate); }
                .jobs-main { padding: 4rem 0; }

                .catalog-header { margin-bottom: 4rem; text-align: center; }
                .catalog-title { font-size: 3.5rem; margin-bottom: 1rem; }
                .catalog-subtitle { color: var(--gray-600); font-size: 1.1rem; margin-bottom: 3rem; }

                .search-bar-luxury {
                    max-width: 700px;
                    margin: 0 auto;
                    display: flex;
                    padding: 0.75rem;
                    gap: 1rem;
                    border-radius: 100px;
                    border: 1px solid var(--gray-200);
                    box-shadow: var(--shadow-xl);
                }

                .search-input-group {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    padding-left: 1.5rem;
                }

                .search-icon { color: var(--gray-400); margin-right: 12px; }
                .search-input-group input {
                    width: 100%;
                    border: none;
                    background: transparent;
                    font-size: 1.05rem;
                    outline: none;
                    color: var(--gray-800);
                }

                .catalog-layout {
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: 3rem;
                }

                .catalog-sidebar { position: sticky; top: 100px; height: fit-content; }
                .filter-box { padding: 2rem; border-radius: var(--radius-lg); }
                .filter-header { display: flex; align-items: center; gap: 10px; font-weight: 700; margin-bottom: 25px; color: var(--gray-800); }
                .filter-group label { display: block; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--gray-400); margin-bottom: 15px; letter-spacing: 1px; }
                .filter-options { display: grid; gap: 8px; }
                
                .filter-btn {
                    text-align: left;
                    padding: 10px 15px;
                    border-radius: 10px;
                    background: transparent;
                    color: var(--gray-600);
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: var(--transition);
                }
                .filter-btn:hover { background: var(--gray-50); color: var(--primary); }
                .filter-btn.active { background: var(--primary-soft); color: var(--primary); }

                .jobs-grid { display: grid; gap: 1.5rem; }

                .loading-state { text-align: center; padding: 5rem; color: var(--gray-400); }
                
                @media (max-width: 1024px) {
                    .catalog-layout { grid-template-columns: 1fr; }
                    .catalog-sidebar { display: none; }
                }
            `}</style>
        </div>
    );
}

function JobCard({ job, index }) {
    return (
        <Link to={`/jobs/${job.id}`} className="job-card-link fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="premium-job-card">
                <div className="card-top">
                    <div className="company-logo-mini">
                        {job.companyName ? job.companyName[0] : 'J'}
                    </div>
                    <div className="card-title-area">
                        <h4>{job.title}</h4>
                        <span className="department-badge">{job.department || 'Engineering'}</span>
                    </div>
                    <div className="type-tag">{job.jobType || 'Full-time'}</div>
                </div>

                <div className="card-middle">
                    <div className="meta-item"><Building2 size={16} /> <span>{job.companyName || 'Elite Partner'}</span></div>
                    <div className="meta-item"><MapPin size={16} /> <span>{job.location || 'Remote'}</span></div>
                    <div className="meta-item"><Clock size={16} /> <span>Posted {formatDate(job.createdAt)}</span></div>
                </div>

                <div className="card-bottom">
                    <p className="job-preview-text">Join us in driving the next phase of our growth. We are looking for visionary thinkers who...</p>
                    <div className="view-action">
                        <span>Details</span>
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>

            <style>{`
                .job-card-link { text-decoration: none; display: block; }
                .premium-job-card {
                    background: white;
                    padding: 2.5rem;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--gray-100);
                    transition: var(--transition);
                    position: relative;
                }

                .premium-job-card:hover {
                    box-shadow: var(--shadow-premium);
                    border-color: var(--primary-border);
                    transform: translateX(8px);
                }

                .card-top { display: flex; align-items: flex-start; gap: 1.5rem; margin-bottom: 2rem; }
                
                .company-logo-mini {
                    width: 56px;
                    height: 56px;
                    background: var(--primary);
                    color: white;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    font-weight: 800;
                    font-family: 'Outfit';
                    box-shadow: var(--shadow-md);
                }

                .card-title-area { flex: 1; }
                .card-title-area h4 { font-size: 1.5rem; margin-bottom: 6px; color: var(--gray-900); }
                .department-badge { 
                    font-size: 0.75rem; 
                    background: var(--gray-50); 
                    color: var(--gray-500); 
                    padding: 4px 10px; 
                    border-radius: 6px; 
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .type-tag {
                    padding: 6px 14px;
                    background: var(--primary-soft);
                    color: var(--primary);
                    border-radius: 100px;
                    font-size: 0.8rem;
                    font-weight: 700;
                }

                .card-middle { display: flex; gap: 2.5rem; margin-bottom: 2rem; border-top: 1px solid var(--gray-50); padding-top: 1.5rem; }
                .meta-item { display: flex; align-items: center; gap: 8px; color: var(--gray-500); font-size: 0.9rem; font-weight: 600; }
                .meta-item svg { color: var(--gray-300); }

                .card-bottom { display: flex; justify-content: space-between; align-items: center; }
                .job-preview-text { color: var(--gray-400); font-size: 0.95rem; margin: 0; flex: 1; max-width: 60%; }
                
                .view-action { 
                    display: flex; 
                    align-items: center; 
                    gap: 8px; 
                    color: var(--primary); 
                    font-weight: 700; 
                    font-size: 0.95rem; 
                }
                
                .premium-job-card:hover .view-action {
                    text-decoration: underline;
                }

                @media (max-width: 640px) {
                    .card-top { flex-direction: column; }
                    .card-middle { flex-direction: column; gap: 1rem; }
                    .job-preview-text { display: none; }
                }
            `}</style>
        </Link>
    );
}
