import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import { recruiterAPI } from '../../services/api';
import { toast } from 'react-hot-toast';
import SEOHead from '../../components/SEOHead';

export default function AgencyProfile() {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        companyName: '',
        contactNumber: '',
        address: '',
        website: '',
        description: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await recruiterAPI.getProfile();
            // Ensure we have values for controlled inputs
            setFormData({
                companyName: response.data.companyName || '',
                contactNumber: response.data.contactNumber || '',
                address: response.data.address || '',
                website: response.data.website || '',
                description: response.data.description || ''
            });
        } catch (error) {
            console.error(error);
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await recruiterAPI.updateProfile(formData);
            toast.success('Agency profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
                <Header />
                <div className="flex-center" style={{ height: 'calc(100vh - 80px)' }}>
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
            <SEOHead title="Agency Profile" description="Manage your recruitment agency profile" />
            <Header />
            <main style={{ padding: '3.5rem 0' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div className="card shadow-lg fade-in" style={{ padding: '2.5rem', borderTop: '4px solid var(--primary)' }}>
                        <div className="mb-4">
                            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Agency Profile</h1>
                            <p className="text-muted">Manage your agency's public information and contact details</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Agency Name *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    required
                                    value={formData.companyName}
                                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                    placeholder="e.g. Acme Recruitment"
                                />
                            </div>

                            <div className="grid grid-2" style={{ gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Website</label>
                                    <input
                                        type="url"
                                        className="form-input"
                                        value={formData.website}
                                        onChange={e => setFormData({ ...formData, website: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Contact Number</label>
                                    <input
                                        type="tel"
                                        className="form-input"
                                        value={formData.contactNumber}
                                        onChange={e => setFormData({ ...formData, contactNumber: e.target.value })}
                                        placeholder="+1 (555) ..."
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Headquarters Address</label>
                                <textarea
                                    className="form-textarea"
                                    rows="3"
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="Street address, City, State, Zip"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Agency Description / Bio</label>
                                <textarea
                                    className="form-textarea"
                                    rows="6"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Tell candidates and companies about your agency's expertise..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end mt-4">
                                <button type="submit" className="btn btn-primary" style={{ minWidth: '150px' }}>
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
