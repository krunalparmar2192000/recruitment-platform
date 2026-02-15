import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { recruiterAPI, jobsAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

export default function RecruiterJobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    experienceMin: 0,
    experienceMax: 0,
    location: '',
    jobType: 'Full-time',
    status: 'OPEN',
    companyId: '',
    departmentId: ''
  });

  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
    if (isEdit) {
      fetchJobDetails();
    }
  }, [id]);

  const fetchInitialData = async () => {
    try {
      const [companiesRes, deptsRes] = await Promise.all([
        recruiterAPI.getCompanies(),
        recruiterAPI.getDepartments()
      ]);
      setCompanies(companiesRes.data);
      setDepartments(deptsRes.data);
    } catch (error) {
      toast.error('Failed to load organizational directories');
    }
  };

  const fetchJobDetails = async () => {
    try {
      const response = await jobsAPI.getById(id);
      const job = response.data;
      setFormData({
        title: job.title,
        description: job.description,
        skills: job.skills,
        experienceMin: job.experienceMin,
        experienceMax: job.experienceMax,
        location: job.location,
        jobType: job.jobType,
        status: job.status,
        companyId: job.company.id,
        departmentId: job.department.id
      });
    } catch (error) {
      toast.error('Failed to fetch historical job data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        company: { id: formData.companyId },
        department: { id: formData.departmentId }
      };

      if (isEdit) {
        await recruiterAPI.updateJob(id, payload);
        toast.success('Vacancy successfully updated');
      } else {
        await recruiterAPI.createJob(payload);
        toast.success('New vacancy deployed to public board');
      }
      navigate('/recruiter/jobs');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartments = departments.filter(d => d.company.id === parseInt(formData.companyId));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <Header />
      <main style={{ padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="card shadow-lg fade-in" style={{ padding: '3.5rem', borderTop: '4px solid var(--primary)' }}>
            <div className="mb-4">
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{isEdit ? 'Re-configure Posting' : 'Deploy New Vacancy'}</h1>
              <p className="text-muted">Broadcast your client's hiring requirements to our verified talent pool</p>
            </div>

            <form onSubmit={handleSubmit} style={{ borderTop: '1px solid var(--gray-100)', paddingTop: '2.5rem' }}>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Organizational Client *</label>
                  <select
                    name="companyId"
                    className="form-input"
                    required
                    value={formData.companyId}
                    onChange={handleChange}
                  >
                    <option value="">Select Company...</option>
                    {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Functional Department *</label>
                  <select
                    name="departmentId"
                    className="form-input"
                    required
                    value={formData.departmentId}
                    onChange={handleChange}
                    disabled={!formData.companyId}
                  >
                    <option value="">Select Department...</option>
                    {filteredDepartments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Professional Job Title *</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Principal Software Architect"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Job Brief & Scope *</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  required
                  rows="8"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the day-to-day impact and core responsibilities of this role..."
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Core Tech Stack / Mandatory Skills *</label>
                <input
                  type="text"
                  name="skills"
                  className="form-input"
                  required
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, AWS (comma separated tags)"
                />
              </div>

              <div className="grid grid-4" style={{ gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Min Exp (Yrs)</label>
                  <input
                    type="number"
                    name="experienceMin"
                    className="form-input"
                    value={formData.experienceMin}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Max Exp (Yrs)</label>
                  <input
                    type="number"
                    name="experienceMax"
                    className="form-input"
                    value={formData.experienceMax}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Headquarters / Remote *</label>
                  <input
                    type="text"
                    name="location"
                    className="form-input"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. New York, NY (or Remote)"
                  />
                </div>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Employment Type</label>
                  <select
                    name="jobType"
                    className="form-input"
                    value={formData.jobType}
                    onChange={handleChange}
                  >
                    <option value="Full-time">Full-time (Permanent)</option>
                    <option value="Part-time">Part-time (Flex)</option>
                    <option value="Contract">Contract (B2B)</option>
                    <option value="Internship">Internship (Acquisition)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Current Pipeline Status</label>
                  <select
                    name="status"
                    className="form-input"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="OPEN">🟢 OPEN (Public Board)</option>
                    <option value="CLOSED">🔴 CLOSED (Archived)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 2, padding: '1rem' }}>
                  {loading ? 'Processing Transaction...' : isEdit ? 'Commit Changes' : 'Broadcast Vacancy'}
                </button>
                <button type="button" onClick={() => navigate('/recruiter/jobs')} className="btn btn-outline" style={{ flex: 1, padding: '1rem' }}>
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
