import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import { recruiterAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

export default function RecruiterDepartments() {
  const [departments, setDepartments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', companyId: '' });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [deptsRes, compsRes] = await Promise.all([
        recruiterAPI.getDepartments(),
        recruiterAPI.getCompanies()
      ]);
      setDepartments(deptsRes.data.sort((a, b) => b.id - a.id));
      setCompanies(compsRes.data);
    } catch (error) {
      toast.error('Failed to load organizational data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recruiterAPI.createDepartment({
        name: formData.name,
        description: formData.description,
        company: { id: formData.companyId }
      });
      toast.success('Business unit successfully registered');
      setShowForm(false);
      setFormData({ name: '', description: '', companyId: '' });
      fetchInitialData();
    } catch (error) {
      toast.error('Failed to create department');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Action Required: Permanent removal of this department. Proceed?')) return;
    try {
      await recruiterAPI.deleteDepartment(id);
      toast.success('Department archived');
      fetchInitialData();
    } catch (error) {
      toast.error('Failed to delete department. Verify if active jobs are linked.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <Header />
      <main style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="flex-between mb-4">
            <div>
              <h1 style={{ marginBottom: '0.25rem' }}>Business Units</h1>
              <p className="text-muted">Map internal organizational structures for client companies</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className={showForm ? "btn btn-outline" : "btn btn-primary"}>
              {showForm ? 'Cancel Operation' : '+ New Department'}
            </button>
          </div>

          {showForm && (
            <div className="card mb-4 shadow-lg fade-in" style={{ maxWidth: '700px', borderTop: '4px solid var(--primary)' }}>
              <h4 className="mb-4">Department Provisioning</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Parent Company *</label>
                  <select className="form-input" required value={formData.companyId}
                    onChange={e => setFormData({ ...formData, companyId: e.target.value })}>
                    <option value="">Select organizational entity...</option>
                    {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Functional Unit Name *</label>
                  <input type="text" className="form-input" required placeholder="e.g. Strategic Engineering"
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Mission Statement / Description</label>
                  <textarea className="form-textarea" rows="2" placeholder="Primary responsibilities of this unit..."
                    value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="btn btn-primary">Save Department</button>
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
                    <th>Department / Unit</th>
                    <th>Organizational Parent</th>
                    <th>Mission / Overview</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map(d => (
                    <tr key={d.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{d.name}</div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--gray-400)' }}>Dept ID: {d.id}</div>
                      </td>
                      <td>
                        <span className="badge badge-info" style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)', color: 'var(--primary)', border: '1px solid rgba(79, 70, 229, 0.1)', fontWeight: 600 }}>
                          {d.company.name}
                        </span>
                      </td>
                      <td style={{ maxWidth: '400px' }}>
                        <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>{d.description || 'No description provided.'}</p>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button onClick={() => handleDelete(d.id)} className="btn btn-danger" style={{ padding: '0.5rem', minWidth: '40px' }}>
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                  {departments.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-5 text-muted">No departments mapped yet.</td>
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
