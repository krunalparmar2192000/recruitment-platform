import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import { adminAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

export default function AdminRecruiters() {
    const [recruiters, setRecruiters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        email: '', password: '', companyName: '', contactNumber: '', address: '', website: '', description: ''
    });

    useEffect(() => {
        fetchRecruiters();
    }, []);

    const fetchRecruiters = async () => {
        try {
            const response = await adminAPI.getRecruiters();
            setRecruiters(response.data);
        } catch (error) {
            toast.error('Failed to fetch recruiters');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminAPI.createRecruiter(formData);
            toast.success('Recruiter account created successfully');
            setShowForm(false);
            setFormData({ email: '', password: '', companyName: '', contactNumber: '', address: '', website: '', description: '' });
            fetchRecruiters();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create recruiter');
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await adminAPI.toggleRecruiterStatus(id);
            toast.success('Status updated');
            fetchRecruiters();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this recruiter? This action cannot be undone.')) return;
        try {
            await adminAPI.deleteRecruiter(id);
            toast.success('Recruiter deleted');
            fetchRecruiters();
        } catch (error) {
            toast.error('Failed to delete recruiter');
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
            <Header />
            <main style={{ padding: '3rem 0' }}>
                <div className="container">
                    <div className="flex-between mb-4">
                        <div>
                            <h1 style={{ marginBottom: '0.25rem' }}>Recruiter Management</h1>
                            <p className="text-muted">Onboard and manage authorized recruitment agencies</p>
                        </div>
                        <button onClick={() => setShowForm(!showForm)} className={showForm ? "btn btn-outline" : "btn btn-primary"}>
                            {showForm ? 'Cancel Creation' : '+ Onboard New Agency'}
                        </button>
                    </div>

                    {showForm && (
                        <div className="card mb-4 fade-in" style={{ borderTop: '4px solid var(--primary)' }}>
                            <h4 className="mb-4">New Agency Registration</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-2">
                                    <div className="form-group">
                                        <label className="form-label">Admin Email Address *</label>
                                        <input type="email" className="form-input" required value={formData.email}
                                            placeholder="admin@agency.com"
                                            onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Initial Password *</label>
                                        <input type="password" className="form-input" required value={formData.password}
                                            placeholder="Minimum 6 characters"
                                            onChange={e => setFormData({ ...formData, password: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Agency Legal Name *</label>
                                        <input type="text" className="form-input" required value={formData.companyName}
                                            placeholder="Global Talent Partners"
                                            onChange={e => setFormData({ ...formData, companyName: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Contact Hotline</label>
                                        <input type="text" className="form-input" value={formData.contactNumber}
                                            placeholder="+1 (555) 000-0000"
                                            onChange={e => setFormData({ ...formData, contactNumber: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Agency Website</label>
                                        <input type="url" className="form-input" value={formData.website}
                                            placeholder="https://agency.com"
                                            onChange={e => setFormData({ ...formData, website: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Headquarters Address</label>
                                        <input type="text" className="form-input" value={formData.address}
                                            placeholder="New York, NY"
                                            onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Agency Profile / Expertise</label>
                                    <textarea className="form-textarea" rows="3" value={formData.description}
                                        placeholder="Brief summary of specialized industries and services..."
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                                </div>
                                <div className="flex gap-2">
                                    <button type="submit" className="btn btn-primary" style={{ padding: '0.875rem 2rem' }}>Complete Onboarding</button>
                                    <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline">Discard</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner" style={{ margin: '0 auto' }}></div>
                        </div>
                    ) : (
                        <div className="table-container fade-in">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Agency Information</th>
                                        <th>Primary Contact</th>
                                        <th>System Status</th>
                                        <th style={{ textAlign: 'right' }}>Management Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recruiters.map(r => (
                                        <tr key={r.id}>
                                            <td>
                                                <div style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{r.companyName}</div>
                                                <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>{r.user.email}</div>
                                            </td>
                                            <td>
                                                <div style={{ fontSize: '0.9375rem' }}>{r.contactNumber || 'No record'}</div>
                                                <div style={{ fontSize: '0.8125rem', color: 'var(--gray-400)' }}>{r.address || 'Global'}</div>
                                            </td>
                                            <td>
                                                <span className={`badge ${r.user.active ? 'badge-success' : 'badge-danger'}`} style={{ backgroundColor: r.user.active ? '#DCFCE7' : '#FEE2E2', color: r.user.active ? '#166534' : '#991B1B' }}>
                                                    {r.user.active ? '● Authorized' : '○ Suspended'}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <div className="flex gap-2" style={{ justifyContent: 'flex-end' }}>
                                                    <button onClick={() => handleToggleStatus(r.id)}
                                                        className="btn btn-outline" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}>
                                                        {r.user.active ? 'Suspend' : 'Activate'}
                                                    </button>
                                                    <button onClick={() => handleDelete(r.id)} className="btn btn-danger" style={{ padding: '0.5rem', minWidth: '40px' }}>
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {recruiters.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center py-5 text-muted">No agencies currently onboarded.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
