import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { recruiterAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

export default function RecruiterJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await recruiterAPI.getJobs();
      setJobs(response.data.sort((a, b) => b.id - a.id));
    } catch (error) {
      toast.error('Failed to synchronize job repository');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Warning: This action will permanently archive the vacancy and all historical candidate data. Proceed?')) return;
    try {
      await recruiterAPI.deleteJob(id);
      toast.success('Vacancy successfully archived');
      fetchJobs();
    } catch (error) {
      toast.error('Failed to archive vacancy');
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <Header />
      <main style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="flex-between mb-4">
            <div>
              <h1 style={{ marginBottom: '0.25rem' }}>Active Vacancies</h1>
              <p className="text-muted">Manage real-time job postings and talent acquisition pipelines</p>
            </div>
            <Link to="/recruiter/jobs/new" className="btn btn-primary" style={{ padding: '0.875rem 2rem' }}>
              + Create New Posting
            </Link>
          </div>

          <div className="mb-5">
            <input
              type="text"
              placeholder="🔍 Filter by role, company name, or department..."
              className="form-input"
              style={{ padding: '1.25rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner" style={{ margin: '0 auto' }}></div>
              <p className="mt-3 text-muted">Scanning professional network...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="card text-center py-5" style={{ padding: '5rem 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>💼</div>
              <h3>No matching vacancies</h3>
              <p className="text-muted" style={{ maxWidth: '400px', margin: '0 auto', marginBottom: '2rem' }}>
                Your current pipeline is empty or filtered. Broaden your search or publish a new requirement.
              </p>
              <Link to="/recruiter/jobs/new" className="btn btn-primary">
                Deploy First Posting
              </Link>
            </div>
          ) : (
            <div className="grid grid-2">
              {filteredJobs.map(job => (
                <div key={job.id} className="card shadow-md hover-lift" style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--gray-200)' }}>
                  <div className="flex-between mb-4">
                    <span className={`badge`} style={{
                      backgroundColor: job.status === 'OPEN' ? '#DCFCE7' : '#FEE2E2',
                      color: job.status === 'OPEN' ? '#166534' : '#991B1B',
                      padding: '4px 12px',
                      border: `1px solid ${job.status === 'OPEN' ? '#BBF7D0' : '#FECACA'}`
                    }}>
                      ● {job.status}
                    </span>
                    <span style={{ color: 'var(--gray-400)', fontSize: '0.75rem', fontWeight: 600 }}>PUBLISHED ID: {job.id}</span>
                  </div>

                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{job.title}</h3>

                  <div className="flex gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
                    <span className="badge badge-info" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--gray-700)', border: '1px solid var(--gray-200)' }}>🏢 {job.company.name}</span>
                    <span className="badge badge-info" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--gray-700)', border: '1px solid var(--gray-200)' }}>🏛️ {job.department.name}</span>
                    <span className="badge badge-info" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--gray-700)', border: '1px solid var(--gray-200)' }}>📍 {job.location}</span>
                  </div>

                  <p className="text-muted" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    fontSize: '0.9375rem',
                    lineHeight: '1.6',
                    flex: 1,
                    marginBottom: '2rem'
                  }}>
                    {job.description}
                  </p>

                  <div className="flex gap-2 pt-4 border-top">
                    <Link to={`/recruiter/jobs/edit/${job.id}`} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                      Edit Brief
                    </Link>
                    <Link to={`/recruiter/jobs/${job.id}/applications`} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                      View Talent (0)
                    </Link>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="btn btn-danger"
                      style={{ padding: '0.5rem', minWidth: '40px' }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
