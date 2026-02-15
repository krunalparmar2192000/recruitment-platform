import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import SEOHead from '../../components/SEOHead';
import { passwordResetAPI } from '../../services/api';
import { toast } from 'react-hot-toast';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await passwordResetAPI.requestReset(email);
            setEmailSent(true);
            toast.success('Password reset link sent to your email');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send reset link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEOHead
                title="Forgot Password"
                description="Reset your RecruitHub password"
            />

            <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
                <Header />

                <main style={{ padding: '4rem 0' }}>
                    <div className="container-sm">
                        <div style={{
                            maxWidth: '480px',
                            margin: '0 auto',
                            background: 'white',
                            padding: 'var(--spacing-5)',
                            borderRadius: 'var(--radius-xl)',
                            border: '1px solid var(--gray-200)',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            {!emailSent ? (
                                <>
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        background: 'var(--primary-bg)',
                                        borderRadius: 'var(--radius-lg)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 'var(--spacing-3)',
                                        color: 'var(--primary)'
                                    }}>
                                        <Mail size={28} />
                                    </div>

                                    <h1 style={{ fontSize: '1.875rem', marginBottom: 'var(--spacing-1)' }}>
                                        Forgot Password?
                                    </h1>
                                    <p style={{ 
                                        color: 'var(--text-secondary)', 
                                        marginBottom: 'var(--spacing-4)',
                                        fontSize: '0.9375rem'
                                    }}>
                                        Enter your email and we'll send you a link to reset your password.
                                    </p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label className="form-label">Email Address</label>
                                            <input
                                                type="email"
                                                className="form-input"
                                                placeholder="your.email@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-full btn-lg"
                                            disabled={loading}
                                            style={{ marginBottom: 'var(--spacing-3)' }}
                                        >
                                            {loading ? 'Sending...' : 'Send Reset Link'}
                                        </button>

                                        <Link
                                            to="/login"
                                            className="btn btn-ghost btn-full"
                                            style={{ gap: '0.5rem' }}
                                        >
                                            <ArrowLeft size={18} />
                                            Back to Login
                                        </Link>
                                    </form>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '72px',
                                        height: '72px',
                                        background: 'var(--success-bg)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto var(--spacing-4)',
                                        color: 'var(--success)'
                                    }}>
                                        <CheckCircle size={40} />
                                    </div>

                                    <h2 style={{ marginBottom: 'var(--spacing-2)' }}>
                                        Check Your Email
                                    </h2>
                                    <p style={{ 
                                        color: 'var(--text-secondary)', 
                                        marginBottom: 'var(--spacing-4)',
                                        lineHeight: 1.7
                                    }}>
                                        We've sent a password reset link to <strong>{email}</strong>. 
                                        Click the link in the email to reset your password.
                                    </p>

                                    <div style={{
                                        padding: 'var(--spacing-3)',
                                        background: 'var(--gray-50)',
                                        borderRadius: 'var(--radius-md)',
                                        marginBottom: 'var(--spacing-4)',
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        <p style={{ margin: 0 }}>
                                            Didn't receive the email? Check your spam folder or{' '}
                                            <button
                                                onClick={() => setEmailSent(false)}
                                                style={{
                                                    color: 'var(--primary)',
                                                    textDecoration: 'underline',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: 0,
                                                    font: 'inherit'
                                                }}
                                            >
                                                try again
                                            </button>
                                        </p>
                                    </div>

                                    <Link to="/login" className="btn btn-primary btn-full">
                                        Return to Login
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
