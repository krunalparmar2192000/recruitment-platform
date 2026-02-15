import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import SEOHead from '../../components/SEOHead';
import { recruiterAPI } from '../../services/api';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';

export default function RecruiterApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // ALL, APPLIED, SHORTLISTED, REJECTED

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await recruiterAPI.getAllApplications();
      setApplications(response.data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'ALL') return true;
    return app.status === filter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      APPLIED: { bg: '#DBEAFE', color: '#1E40AF', label: 'Applied' },
      SHORTLISTED: { bg: '#DCFCE7', color: '#166534', label: 'Shortlisted' },
      REJECTED: { bg: '#FEE2E2', color: '#991B1B', label: 'Rejected' }
    };
    const style = styles[status] || styles.APPLIED;
    return (
      <span className="badge" style={{
        background: style.bg,
        color: style.color,
        padding: '4px 12px',
        fontSize: '0.8125rem',
        fontWeight: 600
      }}>
        ● {style.label}
      </span>
    );
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
        title="Talent Evaluation"
        description="Review and manage candidate applications"
      />

      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
        <Header />

        <main style={{ padding: '2rem 0' }}>
          <div className="container">
            {/* Page Header */}
            <div className="flex-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 className="page-title">Talent Evaluation</h1>
                <p className="page-description">Review candidate applications and manage your hiring pipeline</p>
              </div>

              {/* Filter Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', background: 'white', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
                <button
                  onClick={() => setFilter('ALL')}
                  className={filter === 'ALL' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
                  style={{ minWidth: '80px' }}
                >
                  All ({applications.length})
                </button>
                <button
                  onClick={() => setFilter('APPLIED')}
                  className={filter === 'APPLIED' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
                  style={{ minWidth: '80px' }}
                >
                  Applied ({applications.filter(a => a.status === 'APPLIED').length})
                </button>
                <button
                  onClick={() => setFilter('SHORTLISTED')}
                  className={filter === 'SHORTLISTED' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
                  style={{ minWidth: '100px' }}
                >
                  Shortlisted ({applications.filter(a => a.status === 'SHORTLISTED').length})
                </button>
                <button
                  onClick={() => setFilter('REJECTED')}
                  className={filter === 'REJECTED' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
                  style={{ minWidth: '80px' }}
                >
                  Rejected ({applications.filter(a => a.status === 'REJECTED').length})
                </button>
              </div>
            </div>

            {filteredApplications.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <h3 className="empty-state-title">No applications found</h3>
                <p className="empty-state-description">
                  {filter === 'ALL'
                    ? 'No candidates have applied to your jobs yet.'
                    : `No applications with status "${filter}".`}
                </p>
              </div>
            ) : (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Job Position</th>
                      <th>Company</th>
                      <th>Applied Date</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr key={app.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--gray-900)', marginBottom: '0.25rem' }}>
                            {app.candidate?.fullName || app.candidate?.email || 'Unknown'}
                          </div>
                          <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>
                            {app.candidate?.email}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 500, color: 'var(--gray-900)' }}>
                            {app.job?.title || 'N/A'}
                          </div>
                        </td>
                        <td>
                          <div style={{ color: 'var(--gray-600)' }}>
                            {app.job?.company?.name || 'N/A'}
                          </div>
                        </td>
                        <td>
                          <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                            {formatDate(app.appliedAt)}
                          </div>
                        </td>
                        <td>
                          {getStatusBadge(app.status)}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            {app.candidate?.resumeUrl && (
                              <a
                                href={`http://localhost:8080${app.candidate.resumeUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline btn-sm"
                              >
                                View Resume
                              </a>
                            )}
                            <Link
                              to={`/recruiter/applications/${app.id}`}
                              className="btn btn-primary btn-sm"
                            >
                              Review
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Stats Footer */}
            {filteredApplications.length > 0 && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--gray-200)',
                textAlign: 'center',
                color: 'var(--gray-600)',
                fontSize: '0.875rem'
              }}>
                Showing <strong>{filteredApplications.length}</strong> application{filteredApplications.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
