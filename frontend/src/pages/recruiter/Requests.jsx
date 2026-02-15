import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import { recruiterAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

export default function RecruiterRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await recruiterAPI.getJobRequests();
      setRequests(response.data);
    } catch (error) {
      toast.error('Failed to synchronize client requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      if (action === 'accept') {
        await recruiterAPI.acceptJobRequest(id);
        toast.success('Hiring requirement successfully accepted into pipeline');
      } else {
        await recruiterAPI.rejectJobRequest(id);
        toast.success('Requirement has been declined');
      }
      fetchRequests();
    } catch (error) {
      toast.error('Failed to process request action');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <Header />
      <main style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="flex-between mb-4">
            <div>
              <h1 style={{ marginBottom: '0.25rem' }}>Client Hiring Intake</h1>
              <p className="text-muted">Strategic requirements submitted by prospective company partners</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner" style={{ margin: '0 auto' }}></div>
              <p className="mt-3 text-muted">Synchronizing with intake server...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="card text-center py-5" style={{ padding: '5rem 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📭</div>
              <h3>Intake is currently clear</h3>
              <p className="text-muted" style={{ maxWidth: '400px', margin: '0 auto' }}>
                You have no pending requirements. New client submissions will appear here automatically.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '2rem' }}>
              {requests.map(req => (
                <div key={req.id} className="card shadow-md" style={{ borderLeft: `6px solid ${req.status === 'PENDING' ? 'var(--primary)' : req.status === 'ACCEPTED' ? 'var(--secondary)' : 'var(--danger)'}` }}>
                  <div className="flex-between mb-4" style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--gray-100)' }}>
                    <div className="flex gap-3">
                      <span className={`badge`} style={{
                        backgroundColor: req.status === 'PENDING' ? '#DBEAFE' : req.status === 'ACCEPTED' ? '#DCFCE7' : '#FEE2E2',
                        color: req.status === 'PENDING' ? '#1E40AF' : req.status === 'ACCEPTED' ? '#166534' : '#991B1B',
                        padding: '0.5rem 1rem'
                      }}>
                        {req.status === 'PENDING' ? '● AWAITING REVIEW' : req.status}
                      </span>
                      <span style={{ color: 'var(--gray-500)', fontSize: '0.9375rem', display: 'flex', alignItems: 'center' }}>
                        🗓️ Intake Date: {new Date(req.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-2" style={{ gap: '3rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>🏢 {req.companyName}</h3>
                      <div style={{ display: 'grid', gap: '1rem' }}>
                        <div className="flex gap-2">
                          <span style={{ fontWeight: 700, minWidth: '100px' }}>Department:</span>
                          <span className="text-muted">{req.department || 'General / Unspecified'}</span>
                        </div>
                        <div className="flex gap-2">
                          <span style={{ fontWeight: 700, minWidth: '100px' }}>Contact:</span>
                          <span className="text-primary" style={{ fontWeight: 600 }}>{req.contactName}</span>
                        </div>
                        <div className="flex gap-2">
                          <span style={{ fontWeight: 700, minWidth: '100px' }}>Email:</span>
                          <span className="text-muted">{req.contactEmail}</span>
                        </div>
                        <div className="flex gap-2">
                          <span style={{ fontWeight: 700, minWidth: '100px' }}>Phone:</span>
                          <span className="text-muted">{req.contactPhone || 'No record'}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ backgroundColor: 'var(--gray-50)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--gray-200)' }}>
                      <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gray-400)', marginBottom: '1rem' }}>Requirement Brief</h4>
                      <p style={{ whiteSpace: 'pre-wrap', color: 'var(--gray-700)', lineHeight: '1.8' }}>
                        {req.jobDetails}
                      </p>
                    </div>
                  </div>

                  {req.status === 'PENDING' && (
                    <div className="flex gap-3 mt-4 pt-4" style={{ justifySelf: 'flex-start' }}>
                      <button
                        onClick={() => handleAction(req.id, 'accept')}
                        className="btn btn-primary"
                        style={{ padding: '0.875rem 2.5rem' }}
                      >
                        Accept into Pipeline
                      </button>
                      <button
                        onClick={() => handleAction(req.id, 'reject')}
                        className="btn btn-outline"
                        style={{ padding: '0.875rem 2.5rem' }}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
