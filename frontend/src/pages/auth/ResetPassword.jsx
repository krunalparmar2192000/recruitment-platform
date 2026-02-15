import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import SEOHead from '../../components/SEOHead';
import { passwordResetAPI } from '../../services/api';
import { toast } from 'react-hot-toast';
import { Lock, CheckCircle } from 'lucide-react';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            toast.error('Invalid reset link');
            navigate('/login');
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            await passwordResetAPI.confirmReset(token, password);
            setSuccess(true);
            toast.success('Password reset successfully');
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    if (!token) return null;

    return (
        <>
            <SEOHead
                title="Reset Password"
                description="Create a new password for your RecruitHub account"
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
                            {!success ? (
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
                                        <Lock size={28} />
                                    </div>

                                    <h1 style={{ fontSize: '1.875rem', marginBottom: 'var(--spacing-1)' }}>
                                        Reset Your Password
                                    </h1>
                                    <p style={{ 
                                        color: 'var(--text-secondary)', 
                                        marginBottom: 'var(--spacing-4)',
                                        fontSize: '0.9375rem'
                                    }}>
                                        Enter a new password for your account.
                                    </p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label className="form-label">New Password</label>
                                            <input
                                                type="password"
                                                className="form-input"
                                                placeholder="Enter new password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                minLength={6}
                                            />
                                            <p className="form-helper">
                                                Password must be at least 6 characters
                                            </p>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Confirm Password</label>
                                            <input
                                                type="password"
                                                className="form-input"
                                                placeholder="Confirm new password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-full btn-lg"
                                            disabled={loading}
                                        >
                                            {loading ? 'Resetting...' : 'Reset Password'}
                                        </button>
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
                                        Password Reset Successful
                                    </h2>
                                    <p style={{ 
                                        color: 'var(--text-secondary)', 
                                        marginBottom: 'var(--spacing-4)',
                                        lineHeight: 1.7
                                    }}>
                                        Your password has been reset successfully. 
                                        You can now login with your new password.
                                    </p>

                                    <Link to="/login" className="btn btn-primary btn-full">
                                        Go to Login
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
