import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import { recruiterAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

export default function RecruiterCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', industry: '', location: '', description: '', logoUrl: ''
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await recruiterAPI.getCompanies();
      setCompanies(response.data.sort((a, b) => b.id - a.id));
    } catch (error) {
      toast.error('Failed to fetch client portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await recruiterAPI.updateCompany(editingId, formData);
        toast.success('Company profile updated');
      } else {
        await recruiterAPI.createCompany(formData);
        toast.success('New company added to portfolio');
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '', industry: '', location: '', description: '', logoUrl: '' });
      fetchCompanies();
    } catch (error) {
      toast.error('Failed to save company data');
    }
  };

  const handleEdit = (company) => {
    setFormData(company);
    setEditingId(company.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Critical Action: Are you sure? This will permanently delete all related departments and job postings for this company.')) return;
    try {
      await recruiterAPI.deleteCompany(id);
      toast.success('Company removed from portfolio');
      fetchCompanies();
    } catch (error) {
      toast.error('Failed to delete company data');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <Header />
      <main style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="flex-between mb-4">
            <div>
              <h1 style={{ marginBottom: '0.25rem' }}>Client Portfolio</h1>
              <p className="text-muted">Manage established organizational partnerships and hiring entities</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className={showForm ? "btn btn-outline" : "btn btn-primary"}>
              {showForm ? 'Cancel Operation' : '+ Add New Company'}
            </button>
          </div>

          {showForm && (
            <div className="card mb-4 shadow-lg fade-in" style={{ borderTop: '4px solid var(--primary)' }}>
              <h4 className="mb-4">{editingId ? 'Modify Company Profile' : 'Onboard New Company'}</h4>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Legal Company Name *</label>
                    <input type="text" placeholder="e.g. Acme Corp" className="form-input" required
                      value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sector / Industry</label>
                    <input type="text" placeholder="e.g. Technology" className="form-input"
                      value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Headquarters Location</label>
                    <input type="text" placeholder="e.g. San Francisco, CA" className="form-input"
                      value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                  </div>

                </div>
                <div className="form-group">
                  <label className="form-label">Company Executive Summary</label>
                  <textarea placeholder="Brief history and core operations..." className="form-textarea" rows="3"
                    value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="btn btn-primary">Save Profile</button>
                  <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="btn btn-outline">Discard</button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner" style={{ margin: '0 auto' }}></div>
            </div>
          ) : (
            <div className="grid grid-3">
              {companies.map(c => (
                <div key={c.id} className="card hover-lift" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--gray-200)',
                  padding: '2rem'
                }}>
                  <div className="flex-between mb-4">
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: 'var(--gray-100)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--primary)'
                    }}>
                      {c.logoUrl ? <img src={c.logoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : c.name[0]}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-400)', textTransform: 'uppercase' }}>
                      ID: {c.id}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{c.name}</h3>
                  <p className="text-primary" style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                    {c.industry || 'General Industry'}
                  </p>

                  <div className="flex gap-2 mb-4" style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>
                    <span>📍</span>
                    <span>{c.location || 'Global'}</span>
                  </div>

                  <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.6', flex: 1, marginBottom: '2rem' }}>
                    {c.description ? (c.description.length > 100 ? c.description.substring(0, 100) + '...' : c.description) : 'No description provided.'}
                  </p>

                  <div className="flex gap-2 pt-4 border-top">
                    <button onClick={() => handleEdit(c)} className="btn btn-outline" style={{ flex: 1, padding: '0.5rem' }}>Edit Details</button>
                    <button onClick={() => handleDelete(c.id)} className="btn btn-danger" style={{ padding: '0.5rem', minWidth: '40px' }}>🗑️</button>
                  </div>
                </div>
              ))}

              {companies.length === 0 && (
                <div className="card text-center py-5" style={{ gridColumn: '1 / -1' }}>
                  <p className="text-muted">No companies in portfolio. Click "Add New Company" to begin.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
