import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { publicAPI } from '../../services/api';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SEOHead from '../../components/SEOHead';
import { toast } from 'react-hot-toast';
import {
    Send,
    Building2,
    User,
    Mail,
    Phone,
    Briefcase,
    CheckCircle2,
    ShieldCheck
} from 'lucide-react';

export default function SubmitRequirement() {
    const location = useLocation();
    const [formData, setFormData] = useState({
        recruiterId: '',
        companyName: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        department: '',
        jobDetails: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const rid = params.get('recruiterId');
        if (rid) setFormData(prev => ({ ...prev, recruiterId: rid }));
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await publicAPI.submitJobRequest(formData);
            setSubmitted(true);
            toast.success('Hiring intelligence received!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Transmission failed. Verify your data.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="submit-page-wrapper">
                <Header />
                <main className="flex-center" style={{ flex: 1, padding: '4rem 2rem' }}>
                    <div className="success-box glass-card fade-in">
                        <div className="success-icon-large">
                            <CheckCircle2 size={48} />
                        </div>
                        <h2>Hiring Intelligence Transmitted</h2>
                        <p>Thank you for your trust. Your organizational needs are now being analyzed by our elite recruitment partners. Expect a consultation within 24 hours.</p>
                        <div className="success-actions">
                            <Link to="/" className="btn btn-primary btn-lg">Return to Base</Link>
                        </div>
                    </div>
                </main>
                <Footer />
                <style>{`
                    .success-box { max-width: 600px; padding: 5rem; text-align: center; }
                    .success-icon-large { width: 100px; height: 100px; background: var(--success-soft); color: var(--success); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2.5rem; }
                    .success-box h2 { font-size: 2.5rem; margin-bottom: 1.5rem; }
                    .success-box p { color: var(--gray-500); font-size: 1.1rem; line-height: 1.6; margin-bottom: 3rem; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="submit-page-wrapper">
            <SEOHead title="Partner with Elite Talent" description="Submit your organizational hiring requirements." />
            <Header />
            <main className="submit-main">
                <div className="container">
                    <div className="intake-layout">
                        <div className="intake-info">
                            <div className="brand-pill small">Enterprise Intake</div>
                            <h1>Scale your <br /><span className="text-gradient">Human Capital</span></h1>
                            <p>Provide your requirements through our encrypted portal. We sync your needs with specialized talent hunters globally.</p>

                            <div className="intake-features">
                                <div className="i-feat"><ShieldCheck size={20} /> <span>Priority Routing</span></div>
                                <div className="i-feat"><Briefcase size={20} /> <span>Elite Agency Matching</span></div>
                            </div>
                        </div>

                        <div className="intake-form-box card animate-fade-in">
                            <form onSubmit={handleSubmit} className="luxury-form">
                                <div className="form-grid">
                                    <FormGroup icon={<Building2 size={18} />} label="Venture Name" placeholder="Google, Tesla, etc." value={formData.companyName} onChange={v => setFormData({ ...formData, companyName: v })} />
                                    <FormGroup icon={<User size={18} />} label="Hiring Lead" placeholder="Name of primary contact" value={formData.contactName} onChange={v => setFormData({ ...formData, contactName: v })} />
                                    <FormGroup icon={<Mail size={18} />} label="Work Email" placeholder="corporate@venture.com" type="email" value={formData.contactEmail} onChange={v => setFormData({ ...formData, contactEmail: v })} />
                                    <FormGroup icon={<Phone size={18} />} label="Direct Line" placeholder="+1 (555) 000-0000" value={formData.contactPhone} onChange={v => setFormData({ ...formData, contactPhone: v })} />
                                </div>
                                <div className="full-width-form">
                                    <FormGroup icon={<Send size={18} />} label="Target Domain" placeholder="e.g. AI Research, Backend Eng, DevOps" value={formData.department} onChange={v => setFormData({ ...formData, department: v })} />
                                    <div className="form-group-lux">
                                        <label>Technical Specifics & Mandate</label>
                                        <textarea
                                            placeholder="Outline the role, tech stack, and experience mandate..."
                                            value={formData.jobDetails}
                                            onChange={(e) => setFormData({ ...formData, jobDetails: e.target.value })}
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop: '1rem' }}>
                                    {loading ? 'Transmitting...' : 'Initiate Search Protocol'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <style>{`
                .submit-page-wrapper { background: var(--bg-alternate); min-height: 100vh; display: flex; flex-direction: column; }
                .submit-main { padding: 6rem 0; flex: 1; }
                
                .intake-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 6rem; align-items: center; }
                .intake-info h1 { font-size: 4rem; margin: 1.5rem 0; line-height: 1; }
                .intake-info p { font-size: 1.25rem; color: var(--gray-500); line-height: 1.6; margin-bottom: 3rem; }
                
                .intake-features { display: grid; gap: 1.5rem; }
                .i-feat { display: flex; align-items: center; gap: 12px; font-weight: 700; color: var(--gray-700); }
                .i-feat svg { color: var(--primary); }

                .intake-form-box { padding: 4rem; border-radius: 24px; box-shadow: var(--shadow-xl); border: 1px solid var(--gray-100); }
                .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
                
                .form-group-lux { margin-bottom: 1.5rem; }
                .form-group-lux label { display: block; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--gray-400); margin-bottom: 8px; letter-spacing: 0.5px; }
                .form-group-lux textarea { width: 100%; min-height: 150px; padding: 1rem; border-radius: 12px; border: 2px solid var(--gray-100); background: var(--gray-50); font-family: inherit; font-size: 1rem; transition: var(--transition); resize: vertical; }
                .form-group-lux textarea:focus { outline: none; border-color: var(--primary); background: white; box-shadow: 0 0 0 4px var(--primary-soft); }

                @media (max-width: 992px) {
                    .intake-layout { grid-template-columns: 1fr; gap: 4rem; }
                    .intake-info { text-align: center; }
                    .intake-info h1 { font-size: 3rem; }
                    .intake-features { justify-content: center; }
                }
            `}</style>
        </div>
    );
}

function FormGroup({ icon, label, placeholder, value, onChange, type = "text" }) {
    return (
        <div className="form-group-lux">
            <label>{label}</label>
            <div className="input-with-icon">
                <div className="i-icon">{icon}</div>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    required
                />
            </div>
            <style>{`
                .input-with-icon { position: relative; }
                .i-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--gray-300); }
                .input-with-icon input { width: 100%; padding: 0.875rem 0.875rem 0.875rem 3rem; border-radius: 12px; border: 2px solid var(--gray-100); background: var(--gray-50); font-size: 0.95rem; transition: var(--transition); }
                .input-with-icon input:focus { outline: none; border-color: var(--primary); background: white; box-shadow: 0 0 0 4px var(--primary-soft); }
            `}</style>
        </div>
    );
}
