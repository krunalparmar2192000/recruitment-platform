import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header';
import { User, Mail, Lock, ArrowRight, CheckCircle, AlertCircle, Phone, MapPin } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import toast from 'react-hot-toast';

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: '',
        location: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 8) {
            toast.error('Password must be at least 8 characters');
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...registerData } = formData;
            const result = await register(registerData);

            if (result) {
                toast.success('Account created successfully! Welcome to RecruitHub');
                navigate('/candidate/dashboard');
            }
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
            setError('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEOHead
                title="Create Account - Join RecruitHub"
                description="Join our community of world-class talent and recruiters"
            />

            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: '#f8fafc'
            }}>
                <Header />

                <div className="flex-center" style={{
                    flex: 1,
                    padding: '4rem 1.5rem',
                    position: 'relative'
                }}>
                    <div
                        className="card animate-scale-in"
                        style={{
                            maxWidth: '480px',
                            width: '100%',
                            background: 'white',
                            padding: '2.5rem 2rem',
                            borderRadius: '16px',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                            border: '1px solid #e2e8f0',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        {/* Header */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h1 style={{
                                marginBottom: '0.5rem',
                                fontSize: '1.875rem',
                                fontWeight: 700,
                                letterSpacing: '-0.025em',
                                color: '#0f172a'
                            }}>
                                Create your account
                            </h1>
                            <p style={{
                                color: '#64748b',
                                fontSize: '0.9375rem',
                                lineHeight: 1.5
                            }}>
                                Start your journey with RecruitHub
                            </p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '1.5rem',
                                padding: '0.875rem 1rem',
                                background: '#fef2f2',
                                border: '1px solid #fecaca',
                                borderRadius: '8px',
                                color: '#dc2626',
                                fontSize: '0.875rem'
                            }}>
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Full Name */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    color: '#334155'
                                }}>
                                    Full Name
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#94a3b8'
                                    }} />
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        autoFocus
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 2.75rem',
                                            fontSize: '0.9375rem',
                                            borderRadius: '8px',
                                            border: '1px solid #cbd5e1',
                                            transition: 'all 0.15s',
                                            outline: 'none',
                                            background: '#ffffff'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                        onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    color: '#334155'
                                }}>
                                    Email Address
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#94a3b8'
                                    }} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="john@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 2.75rem',
                                            fontSize: '0.9375rem',
                                            borderRadius: '8px',
                                            border: '1px solid #cbd5e1',
                                            transition: 'all 0.15s',
                                            outline: 'none',
                                            background: '#ffffff'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                        onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                                    />
                                </div>
                            </div>

                            {/* Phone and Location */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: 500,
                                        fontSize: '0.875rem',
                                        color: '#334155'
                                    }}>
                                        Phone
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Phone size={18} style={{
                                            position: 'absolute',
                                            left: '14px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#94a3b8'
                                        }} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="+1 234 567"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem 0.75rem 2.75rem',
                                                fontSize: '0.9375rem',
                                                borderRadius: '8px',
                                                border: '1px solid #cbd5e1',
                                                transition: 'all 0.15s',
                                                outline: 'none',
                                                background: '#ffffff'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                            onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: 500,
                                        fontSize: '0.875rem',
                                        color: '#334155'
                                    }}>
                                        Location
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <MapPin size={18} style={{
                                            position: 'absolute',
                                            left: '14px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#94a3b8'
                                        }} />
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="New York"
                                            value={formData.location}
                                            onChange={handleChange}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem 0.75rem 2.75rem',
                                                fontSize: '0.9375rem',
                                                borderRadius: '8px',
                                                border: '1px solid #cbd5e1',
                                                transition: 'all 0.15s',
                                                outline: 'none',
                                                background: '#ffffff'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                            onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Password */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    color: '#334155'
                                }}>
                                    Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#94a3b8'
                                    }} />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 2.75rem',
                                            fontSize: '0.9375rem',
                                            borderRadius: '8px',
                                            border: '1px solid #cbd5e1',
                                            transition: 'all 0.15s',
                                            outline: 'none',
                                            background: '#ffffff'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                        onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    color: '#334155'
                                }}>
                                    Confirm Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#94a3b8'
                                    }} />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 2.75rem',
                                            fontSize: '0.9375rem',
                                            borderRadius: '8px',
                                            border: '1px solid #cbd5e1',
                                            transition: 'all 0.15s',
                                            outline: 'none',
                                            background: '#ffffff'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                        onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                                    />
                                </div>
                            </div>

                            {/* Password Requirements */}
                            <div style={{
                                background: '#f8fafc',
                                padding: '1rem',
                                borderRadius: '8px',
                                marginBottom: '1.5rem',
                                border: '1px solid #e2e8f0'
                            }}>
                                <p style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: '#64748b',
                                    marginBottom: '0.625rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    Password Requirements
                                </p>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.8125rem',
                                        color: formData.password.length >= 8 ? '#10b981' : '#94a3b8'
                                    }}>
                                        <CheckCircle size={14} />
                                        <span>At least 8 characters</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.8125rem',
                                        color: formData.password === formData.confirmPassword && formData.password.length > 0 ? '#10b981' : '#94a3b8'
                                    }}>
                                        <CheckCircle size={14} />
                                        <span>Passwords match</span>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1.5rem',
                                    fontSize: '0.9375rem',
                                    fontWeight: 600,
                                    color: 'white',
                                    background: loading ? '#94a3b8' : '#6366f1',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.15s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                                onMouseEnter={(e) => !loading && (e.target.style.background = '#4f46e5')}
                                onMouseLeave={(e) => !loading && (e.target.style.background = '#6366f1')}
                            >
                                {loading ? (
                                    <>
                                        <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div style={{
                            margin: '1.75rem 0',
                            borderTop: '1px solid #e2e8f0'
                        }} />

                        {/* Sign In Link */}
                        <div style={{ textAlign: 'center' }}>
                            <p style={{
                                color: '#64748b',
                                fontSize: '0.875rem',
                                margin: 0
                            }}>
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    style={{
                                        color: '#6366f1',
                                        fontWeight: 600,
                                        textDecoration: 'none'
                                    }}
                                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
