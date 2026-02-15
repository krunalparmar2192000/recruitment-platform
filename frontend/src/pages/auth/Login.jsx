import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import SEOHead from '../../components/SEOHead';
import { Briefcase, Mail, Lock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await login(credentials);
            toast.success(`Welcome back, ${user.role}!`);
            navigate(`/${user.role.toLowerCase()}/dashboard`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-layout fade-in">
            <SEOHead title="Authentication" description="Access the RecruitHub Command Center" />

            <div className="auth-side-decor">
                <div className="decor-content">
                    <div className="brand-pill">
                        <Zap size={14} fill="currentColor" />
                        <span>High-Velocity Hiring</span>
                    </div>
                    <h2>The modern hub for <br /> <span className="text-white">People & Purpose.</span></h2>
                    <p>Join the world's most intelligent recruitment ecosystem and scale your impact.</p>

                    <div className="decor-features">
                        <div className="d-feat">
                            <ShieldCheck size={20} />
                            <span>Enterprise Security</span>
                        </div>
                        <div className="d-feat">
                            <Zap size={20} />
                            <span>Real-time Sync</span>
                        </div>
                    </div>
                </div>
                <div className="decor-blob"></div>
            </div>

            <div className="auth-form-container">
                <div className="auth-form-box">
                    <header className="auth-header">
                        <Link to="/" className="auth-logo">
                            <Briefcase size={28} />
                            <span>RecruitHub</span>
                        </Link>
                        <h1>Sign In</h1>
                        <p>Enter your credentials to access your dashboard</p>
                    </header>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group-custom">
                            <label>Professional Email</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={20} />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="fancy-input"
                                    value={credentials.email}
                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group-custom">
                            <div className="flex justify-between items-center" style={{ marginBottom: '8px' }}>
                                <label style={{ margin: 0 }}>Secret Key</label>
                                <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>Recovery Options</Link>
                            </div>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={20} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="fancy-input"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <button className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? (
                                <div className="spinner-mini"></div>
                            ) : (
                                <>
                                    <span>Access Dashboard</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <footer className="auth-footer">
                        <p>No account yet? <Link to="/register" className="text-gradient" style={{ fontWeight: 700 }}>Initiate Registration</Link></p>
                    </footer>

                    {/* Quick Demo Assist */}
                    <div className="demo-assist glass-card">
                        <h5>Demo Insights</h5>
                        <p>recruiter@recruithub.com / password123</p>
                    </div>
                </div>
            </div>

            <style>{`
                .auth-layout {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    min-height: 100vh;
                    background: white;
                }

                .auth-side-decor {
                    background: var(--gray-900);
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4rem;
                    overflow: hidden;
                    color: white;
                }

                .auth-side-decor::before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle at top right, var(--primary), transparent 60%);
                    opacity: 0.3;
                }

                .decor-content {
                    position: relative;
                    z-index: 10;
                    max-width: 480px;
                }

                .brand-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 12px;
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 2rem;
                    color: var(--primary);
                }

                .decor-content h2 { color: var(--gray-300); font-size: 3rem; margin-bottom: 1.5rem; }
                .decor-content p { color: var(--gray-400); font-size: 1.1rem; margin-bottom: 3rem; }

                .decor-features { display: flex; gap: 2rem; }
                .d-feat { display: flex; align-items: center; gap: 10px; font-weight: 600; color: var(--gray-300); font-size: 0.9rem; }

                .auth-form-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4rem;
                    background: var(--bg-alternate);
                }

                .auth-form-box {
                    width: 100%;
                    max-width: 400px;
                }

                .auth-header { margin-bottom: 3rem; }
                .auth-logo { 
                    display: inline-flex; 
                    align-items: center; 
                    gap: 10px; 
                    font-weight: 800; 
                    font-family: 'Outfit';
                    font-size: 1.25rem;
                    color: var(--primary);
                    margin-bottom: 2rem;
                }

                .auth-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
                .auth-header p { color: var(--gray-500); }

                .auth-form { display: grid; gap: 1.5rem; margin-bottom: 2.5rem; }

                .form-group-custom label {
                    display: block;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: var(--gray-700);
                    margin-bottom: 10px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .input-wrapper { position: relative; }
                .input-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--gray-400); }

                .fancy-input {
                    width: 100%;
                    padding: 1rem 1rem 1rem 3rem;
                    background: white;
                    border: 2px solid var(--gray-100);
                    border-radius: 14px;
                    transition: var(--transition);
                    font-size: 1rem;
                }

                .fancy-input:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 5px var(--primary-soft);
                }

                .auth-footer { text-align: center; color: var(--gray-500); }

                .demo-assist {
                    margin-top: 3rem;
                    padding: 1.5rem;
                    background: white;
                    border: 1px dashed var(--primary-border);
                }
                .demo-assist h5 { font-size: 0.8rem; text-transform: uppercase; color: var(--primary); margin-bottom: 4px; }
                .demo-assist p { margin: 0; font-family: monospace; font-size: 0.85rem; }

                .spinner-mini {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.6s linear infinite;
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                @media (max-width: 992px) {
                    .auth-layout { grid-template-columns: 1fr; }
                    .auth-side-decor { display: none; }
                }
            `}</style>
        </div>
    );
}
