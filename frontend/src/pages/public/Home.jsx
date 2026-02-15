import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SEOHead from '../../components/SEOHead';
import {
    Building2,
    Target,
    Users,
    ArrowRight,
    Sparkles,
    Zap,
    Shield,
    CheckCircle,
    Play,
    Star
} from 'lucide-react';

export default function Home() {
    return (
        <div className="home-wrapper">
            <SEOHead
                title="Next-Gen Recruitment Platform"
                description="The modern ecosystem connecting elite companies, specialized recruiters, and top-tier talent."
            />

            <Header />

            {/* --- HERO SECTION --- */}
            <section className="hero-modern">
                <div className="container">
                    <div className="hero-content fade-in">
                        <div className="hero-badge">
                            <Sparkles size={16} className="sparkle-icon" />
                            <span>The Future of Talent Acquisition is here</span>
                        </div>

                        <h1 className="hero-title">
                            Elite <span className="text-gradient">Recruitment</span> <br />
                            Ecosystem
                        </h1>

                        <p className="hero-subtitle">
                            We've built the world's most sophisticated bridge between ambitious companies,
                            world-class recruiters, and exceptional talent. Unified, intelligent, and seamless.
                        </p>

                        <div className="hero-actions">
                            <Link to="/register" className="btn btn-primary btn-xl">
                                <span>Get Started Elite</span>
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/jobs" className="btn btn-secondary btn-xl">
                                <Play size={18} fill="currentColor" />
                                <span>View Opportunities</span>
                            </Link>
                        </div>

                        {/* Social Proof Section */}
                        <div className="hero-trust">
                            <div className="avatar-group">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`avatar avatar-${i}`}></div>
                                ))}
                                <div className="avatar avatar-plus">+2k</div>
                            </div>
                            <div className="trust-text">
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
                                </div>
                                <p>Trusted by over <strong>500+</strong> global recruitment agencies</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </section>

            {/* --- CORE PILLARS (Bento Grid Style) --- */}
            <section className="pillars-section">
                <div className="container">
                    <div className="section-intro">
                        <h2 className="section-title">One Platform. <span className="text-gradient">Three Pillars.</span></h2>
                        <p className="section-desc">Tailored experiences for every stakeholder in the hiring journey.</p>
                    </div>

                    <div className="pillar-grid">
                        {/* Pillar 1: Companies */}
                        <div className="pillar-card pillar-featured">
                            <div className="pillar-icon blue"><Building2 size={32} /></div>
                            <h3>For Enterprises</h3>
                            <p>Submit high-impact requirements to our network of verified headhunters and watch your team grow.</p>
                            <ul className="pillar-list">
                                <li><CheckCircle size={16} /> Integrated ATS Sync</li>
                                <li><CheckCircle size={16} /> Verified Headhunter Access</li>
                                <li><CheckCircle size={16} /> Advanced Analytics</li>
                            </ul>
                            <Link to="/submit-requirement" className="pillar-link">Business Solutions <ArrowRight size={16} /></Link>
                        </div>

                        {/* Pillar 2: Recruiters */}
                        <div className="pillar-card">
                            <div className="pillar-icon purple"><Target size={32} /></div>
                            <h3>For Headhunters</h3>
                            <p>Manage your entire agency portfolio, track commissions, and close deals faster than ever.</p>
                            <Link to="/register?role=RECRUITER" className="pillar-link">Agency Access <ArrowRight size={16} /></Link>
                        </div>

                        {/* Pillar 3: Talent */}
                        <div className="pillar-card">
                            <div className="pillar-icon green"><Users size={32} /></div>
                            <h3>For Elite Talent</h3>
                            <p>Don't just apply. Get discovered by specialized recruiters who know your worth.</p>
                            <Link to="/jobs" className="pillar-link">Browse Roles <ArrowRight size={16} /></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- VALUE PROP SECTION --- */}
            <section className="value-section">
                <div className="container">
                    <div className="value-grid">
                        <div className="value-content">
                            <h2 className="value-title">Why the world's best <br /><span className="text-gradient">Hire on RecruitHub</span></h2>
                            <div className="value-items">
                                <div className="value-item">
                                    <div className="value-item-icon"><Zap size={24} /></div>
                                    <div className="value-item-text">
                                        <h4>Lightning Fast Cycles</h4>
                                        <p>Our intelligent routing reduces time-to-hire by an average of 42% compared to traditional boards.</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-item-icon"><Shield size={24} /></div>
                                    <div className="value-item-text">
                                        <h4>Military-Grade Security</h4>
                                        <p>Candidate data and corporate secrets are protected by multi-layer encryption and SOC2 compliance.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="value-visual">
                            <div className="visual-box glass-card fade-in">
                                <div className="visual-header">
                                    <div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div>
                                </div>
                                <div className="visual-body">
                                    <div className="skeleton-line full"></div>
                                    <div className="skeleton-line half"></div>
                                    <div className="skeleton-grid">
                                        <div className="skeleton-box"></div>
                                        <div className="skeleton-box"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="cta-premium">
                <div className="container">
                    <div className="cta-box glass-card">
                        <h2>Ready to Build your <br /> <span className="text-gradient">Dream Team?</span></h2>
                        <p>Join over 5,000+ companies hiring through the unified RecruitHub engine.</p>
                        <div className="cta-btns">
                            <Link to="/register" className="btn btn-primary btn-xl">Create Account</Link>
                            <Link to="/jobs" className="btn btn-secondary btn-xl">Explore Market</Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
                .home-wrapper {
                    overflow-x: hidden;
                    background: var(--bg-alternate);
                }

                /* Hero Section Modern */
                .hero-modern {
                    padding: 10rem 0 12rem;
                    position: relative;
                    text-align: center;
                }

                .hero-content {
                    max-width: 900px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 10;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 8px 16px;
                    background: var(--primary-soft);
                    color: var(--primary);
                    border-radius: 100px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    margin-bottom: 2.5rem;
                    border: 1px solid var(--primary-border);
                }

                .sparkle-icon {
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }

                .hero-title {
                    font-size: clamp(3.5rem, 8vw, 6rem);
                    line-height: 0.95;
                    margin-bottom: 2rem;
                }

                .hero-subtitle {
                    font-size: 1.25rem;
                    color: var(--gray-600);
                    max-width: 700px;
                    margin: 0 auto 3.5rem;
                    line-height: 1.6;
                }

                .hero-actions {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-bottom: 5rem;
                }

                .hero-trust {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1.5rem;
                }

                .avatar-group {
                    display: flex;
                    margin-left: 10px;
                }

                .avatar {
                    width: 44px;
                    height: 44px;
                    border: 3px solid white;
                    border-radius: 50%;
                    margin-left: -12px;
                    background-size: cover;
                    background-color: var(--gray-200);
                    box-shadow: var(--shadow-md);
                }

                .avatar-1 { background-image: url('https://i.pravatar.cc/150?u=1'); }
                .avatar-2 { background-image: url('https://i.pravatar.cc/150?u=2'); }
                .avatar-3 { background-image: url('https://i.pravatar.cc/150?u=3'); }
                .avatar-4 { background-image: url('https://i.pravatar.cc/150?u=4'); }
                
                .avatar-plus {
                    background: var(--gray-900);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    font-weight: 700;
                }

                .trust-text { text-align: left; }
                .trust-text p { margin: 0; font-size: 0.9rem; color: var(--gray-500); }
                .stars { margin-bottom: 4px; }

                /* Pillars Section */
                .pillars-section {
                    padding: 8rem 0;
                    background: white;
                }

                .section-intro {
                    text-align: center;
                    max-width: 600px;
                    margin: 0 auto 5rem;
                }

                .section-title { font-size: 3rem; margin-bottom: 1rem; }
                .section-desc { color: var(--gray-500); font-size: 1.2rem; }

                .pillar-grid {
                    display: grid;
                    grid-template-columns: 1.4fr 1fr 1fr;
                    gap: 2rem;
                }

                .pillar-card {
                    padding: 3rem;
                    background: var(--bg-alternate);
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--gray-100);
                    transition: var(--transition);
                }

                .pillar-card:hover {
                    box-shadow: var(--shadow-premium);
                    transform: translateY(-10px);
                }

                .pillar-featured {
                    background: linear-gradient(to bottom right, var(--bg-alternate), white);
                    border-color: var(--primary-soft);
                }

                .pillar-icon {
                    width: 64px;
                    height: 64px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 2rem;
                }

                .pillar-icon.blue { background: #EBF2FF; color: var(--primary); }
                .pillar-icon.purple { background: #F3E8FF; color: #A855F7; }
                .pillar-icon.green { background: #ECFDF5; color: #10B981; }

                .pillar-list {
                    list-style: none;
                    margin: 2rem 0;
                    display: grid;
                    gap: 1rem;
                }

                .pillar-list li {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 600;
                    color: var(--gray-700);
                }

                .pillar-list li svg { color: var(--success); }

                .pillar-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 700;
                    color: var(--primary);
                    margin-top: 1rem;
                }

                /* Value Section */
                .value-section {
                    padding: 10rem 0;
                }

                .value-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 6rem;
                    align-items: center;
                }

                .value-title { font-size: 3.5rem; margin-bottom: 3.5rem; }

                .value-items { display: grid; gap: 3rem; }
                .value-item { display: flex; gap: 1.5rem; }
                .value-item-icon {
                    width: 48px;
                    height: 48px;
                    min-width: 48px;
                    background: var(--primary);
                    color: white;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .value-item-text h4 { font-size: 1.5rem; margin-bottom: 0.5rem; }
                .value-item-text p { color: var(--gray-500); }

                .value-visual {
                    position: relative;
                }

                .visual-box {
                    padding: 2rem;
                    height: 400px;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .visual-header { display: flex; gap: 8px; margin-bottom: 1rem; }
                .dot { width: 12px; height: 12px; border-radius: 50%; }
                .dot.red { background: #FF5F56; }
                .dot.yellow { background: #FFBD2E; }
                .dot.green { background: #27C93F; }

                .skeleton-line { background: var(--gray-100); height: 12px; border-radius: 6px; }
                .skeleton-line.full { width: 100%; }
                .skeleton-line.half { width: 50%; }
                .skeleton-grid { display: flex; gap: 1rem; flex: 1; margin-top: 1rem; }
                .skeleton-box { flex: 1; background: var(--gray-50); border-radius: 12px; border: 1px dashed var(--gray-200); }

                /* CTA Premium */
                .cta-premium {
                    padding: 8rem 0;
                    text-align: center;
                }

                .cta-box {
                    padding: 6rem;
                    text-align: center;
                }

                .cta-box h2 { font-size: 3.5rem; margin-bottom: 1.5rem; }
                .cta-box p { font-size: 1.25rem; color: var(--gray-600); margin-bottom: 3rem; }
                .cta-btns { display: flex; justify-content: center; gap: 1.5rem; }

                /* Blobs */
                .blob {
                    position: absolute;
                    width: 800px;
                    height: 800px;
                    filter: blur(100px);
                    opacity: 0.15;
                    z-index: 1;
                    border-radius: 50%;
                }

                .blob-1 {
                    top: -200px;
                    right: -200px;
                    background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
                }

                .blob-2 {
                    bottom: -200px;
                    left: -200px;
                    background: radial-gradient(circle, var(--accent-blue) 0%, transparent 70%);
                }

                @media (max-width: 1024px) {
                    .pillar-grid { grid-template-columns: 1fr; }
                    .value-grid { grid-template-columns: 1fr; gap: 4rem; }
                }
            `}</style>
        </div>
    );
}
