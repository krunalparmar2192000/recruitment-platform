import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import SEOHead from '../../components/SEOHead';
import { candidateAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

export default function CandidateProfile() {
    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        yearsOfExperience: '',
        skills: '',
        linkedinUrl: '',
        resumeUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await candidateAPI.getProfile();
            setProfile(response.data);
        } catch (error) {
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await candidateAPI.updateProfile(profile);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            const response = await candidateAPI.uploadResume(formData);
            setProfile({ ...profile, resumeUrl: response.data.resumeUrl });
            toast.success('Resume uploaded successfully');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to upload resume');
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
                <Header />
                <div className="flex-center" style={{ padding: '4rem 0' }}>
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEOHead
                title="My Profile"
                description="Manage your professional profile and resume"
            />

            <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
                <Header />

                <main style={{ padding: '2rem 0' }}>
                    <div className="container" style={{ maxWidth: '900px' }}>
                        {/* Page Header */}
                        <div className="page-header">
                            <h1 className="page-title">My Profile</h1>
                            <p className="page-description">Keep your information up to date</p>
                        </div>

                        {/* Resume Upload Card */}
                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <div className="card-header">
                                <h3 className="card-title">Resume / CV</h3>
                            </div>
                            <div className="card-body">
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                    gap: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        {profile.resumeUrl ? (
                                            <span className="badge badge-success">● Uploaded</span>
                                        ) : (
                                            <span className="badge badge-warning">○ Missing</span>
                                        )}
                                        <span style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                                            PDF / DOCX (Max 5MB)
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        {profile.resumeUrl && (
                                            <a
                                                href={`http://localhost:8080${profile.resumeUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline btn-sm"
                                            >
                                                View Resume
                                            </a>
                                        )}
                                        <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
                                            {uploading ? 'Uploading...' : 'Upload Resume'}
                                            <input
                                                type="file"
                                                accept=".pdf,.docx"
                                                onChange={handleResumeUpload}
                                                disabled={uploading}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Personal Information</h3>
                                </div>
                                <div className="card-body">
                                    <div className="grid grid-2">
                                        <div className="form-group">
                                            <label className="form-label">Full Name *</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={profile.fullName}
                                                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Phone Number *</label>
                                            <input
                                                type="tel"
                                                className="form-input"
                                                value={profile.phone}
                                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Location *</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="City, State"
                                                value={profile.location}
                                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Years of Experience *</label>
                                            <input
                                                type="number"
                                                className="form-input"
                                                min="0"
                                                value={profile.yearsOfExperience}
                                                onChange={(e) => setProfile({ ...profile, yearsOfExperience: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Skills (comma separated) *</label>
                                        <textarea
                                            className="form-textarea"
                                            placeholder="Java, Spring Boot, React, Docker, Kubernetes"
                                            value={profile.skills}
                                            onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                                            required
                                            style={{ minHeight: '100px' }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">LinkedIn Profile URL</label>
                                        <input
                                            type="url"
                                            className="form-input"
                                            placeholder="https://linkedin.com/in/yourprofile"
                                            value={profile.linkedinUrl}
                                            onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                marginTop: '1.5rem',
                                justifyContent: 'flex-end'
                            }}>
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={fetchProfile}
                                    disabled={saving}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={saving}
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
