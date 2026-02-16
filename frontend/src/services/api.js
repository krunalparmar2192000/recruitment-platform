import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (data) => api.post('/auth/register', data),
};

// Jobs API
export const jobsAPI = {
    getAll: (filters = {}) => api.get('/jobs', { params: filters }),
    getById: (id) => api.get(`/jobs/${id}`),
};

// Public API
export const publicAPI = {
    getRecruiters: () => api.get('/public/recruiters'),
    submitJobRequest: (data) => api.post('/public/job-requests', data),
};

// Candidate API
export const candidateAPI = {
    getDashboard: () => api.get('/candidate/dashboard'),
    getProfile: () => api.get('/candidate/profile'),
    updateProfile: (data) => api.put('/candidate/profile', data),
    uploadResume: (formData) => api.post('/candidate/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    getApplications: () => api.get('/candidate/applications'),
    applyForJob: (jobId) => api.post('/candidate/applications', { jobId }),
};

// Recruiter API
export const recruiterAPI = {
    getDashboard: () => api.get('/recruiter/dashboard'),

    getProfile: () => api.get('/recruiter/profile'),
    updateProfile: (data) => api.put('/recruiter/profile', data),

    // Companies
    getCompanies: () => api.get('/recruiter/companies'),
    createCompany: (data) => api.post('/recruiter/companies', data),
    updateCompany: (id, data) => api.put(`/recruiter/companies/${id}`, data),
    deleteCompany: (id) => api.delete(`/recruiter/companies/${id}`),

    // Departments
    getDepartments: () => api.get('/recruiter/departments'),
    createDepartment: (data) => api.post('/recruiter/departments', data),
    updateDepartment: (id, data) => api.put(`/recruiter/departments/${id}`, data),
    deleteDepartment: (id) => api.delete(`/recruiter/departments/${id}`),

    // Jobs
    getJobs: () => api.get('/recruiter/jobs'),
    createJob: (data) => api.post('/recruiter/jobs', data),
    updateJob: (id, data) => api.put(`/recruiter/jobs/${id}`, data),
    deleteJob: (id) => api.delete(`/recruiter/jobs/${id}`),
    getJobApplications: (jobId) => api.get(`/recruiter/jobs/${jobId}/applications`),

    // Job Requests
    getJobRequests: () => api.get('/recruiter/job-requests'),
    acceptJobRequest: (id) => api.put(`/recruiter/job-requests/${id}/accept`),
    rejectJobRequest: (id) => api.put(`/recruiter/job-requests/${id}/reject`),

    // Applications
    getAllApplications: () => api.get('/recruiter/applications'),
    getApplicationById: (id) => api.get(`/recruiter/applications/${id}`),
    updateApplicationStatus: (id, status) => api.put(`/recruiter/applications/${id}`, { status }),
};

// Admin API
export const adminAPI = {
    getRecruiters: () => api.get('/admin/recruiters'),
    createRecruiter: (data) => api.post('/admin/recruiters', data),
    updateRecruiter: (id, data) => api.put(`/admin/recruiters/${id}`, data),
    deleteRecruiter: (id) => api.delete(`/admin/recruiters/${id}`),
    getStats: () => api.get('/admin/stats'),
};

// Password Reset API
export const passwordResetAPI = {
    requestReset: (email) => api.post('/auth/forgot-password', { email }),
    confirmReset: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
};

export default api;
