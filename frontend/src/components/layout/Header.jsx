import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { Menu, X, Briefcase, LogOut, LayoutDashboard, User, Building } from 'lucide-react';

export default function Header() {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`nav-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <nav className="header-nav">
                    {/* Logo Section */}
                    <Link to="/" className="brand-logo">
                        <div className="logo-box">
                            <Briefcase size={22} color="white" strokeWidth={2.5} />
                        </div>
                        <span className="brand-name">Recruit<span className="text-gradient">Hub</span></span>
                    </Link>

                    {/* Desktop Navigation links */}
                    <div className="nav-links desktop-only">
                        <Link to="/jobs" className="nav-link-item">Jobs</Link>
                        <Link to="/recruiters" className="nav-link-item">Partners</Link>
                        <Link to="/submit-requirement" className="nav-link-item">For Businesses</Link>

                        <div className="nav-divider"></div>

                        {!user ? (
                            <div className="auth-buttons">
                                <Link to="/login" className="nav-link-item" style={{ marginRight: '1rem' }}>Login</Link>
                                <Link to="/register" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: '12px' }}>
                                    Join Now
                                </Link>
                            </div>
                        ) : (
                            <div className="user-profile-nav">
                                <Link to={`/${user.role.toLowerCase()}/dashboard`} className="btn btn-secondary" style={{ gap: '8px', borderRadius: '12px' }}>
                                    <LayoutDashboard size={16} />
                                    <span>Dashboard</span>
                                </Link>
                                <button onClick={logout} className="logout-btn" title="Logout">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="mobile-overlay fade-in">
                        <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>Browse Jobs</Link>
                        <Link to="/recruiters" onClick={() => setMobileMenuOpen(false)}>Top Recruiters</Link>
                        <Link to="/submit-requirement" onClick={() => setMobileMenuOpen(false)}>Post Requirements</Link>
                        <div className="mobile-divider"></div>
                        {!user ? (
                            <>
                                <Link to="/login" className="btn btn-secondary" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                                <Link to="/register" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                            </>
                        ) : (
                            <>
                                <Link to={`/${user.role.toLowerCase()}/dashboard`} className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                                <button onClick={logout} className="btn btn-danger">Logout</button>
                            </>
                        )}
                    </div>
                )}
            </div>

            <style>{`
                .nav-header {
                    background: transparent;
                    transition: var(--transition);
                    padding: 1.5rem 0;
                }
                
                .nav-header.scrolled {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    padding: 1rem 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
                }

                .header-nav {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .brand-logo {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .logo-box {
                    width: 40px;
                    height: 40px;
                    background: var(--primary);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 16px rgba(100, 100, 255, 0.2);
                }

                .brand-name {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: var(--gray-900);
                    letter-spacing: -0.5px;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }

                .nav-link-item {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: var(--gray-600);
                }

                .nav-link-item:hover {
                    color: var(--primary);
                }

                .nav-divider {
                    width: 1px;
                    height: 24px;
                    background: var(--gray-200);
                }

                .user-profile-nav {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .logout-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--danger);
                    background: var(--danger-soft);
                    transition: var(--transition);
                }

                .logout-btn:hover {
                    background: var(--danger);
                    color: white;
                }

                .mobile-toggle {
                    display: none;
                    background: none;
                    color: var(--gray-800);
                }

                .desktop-only {
                    display: flex;
                }

                @media (max-width: 768px) {
                    .desktop-only { display: none; }
                    .mobile-toggle { display: block; }
                }

                .mobile-overlay {
                    position: fixed;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: white;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    border-top: 1px solid var(--gray-100);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }

                .mobile-divider {
                    height: 1px;
                    background: var(--gray-100);
                }
            `}</style>
        </header>
    );
}
