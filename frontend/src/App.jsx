import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Public Pages
import Home from './pages/public/Home';
import Jobs from './pages/public/Jobs';
import JobDetails from './pages/public/JobDetails';
import Recruiters from './pages/public/Recruiters';
import SubmitRequirement from './pages/public/SubmitRequirement';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Candidate Pages
import CandidateDashboard from './pages/candidate/Dashboard';
import CandidateProfile from './pages/candidate/Profile';
import CandidateApplications from './pages/candidate/Applications';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/Dashboard';
import RecruiterCompanies from './pages/recruiter/Companies';
import RecruiterDepartments from './pages/recruiter/Departments';
import RecruiterJobs from './pages/recruiter/Jobs';
import RecruiterJobForm from './pages/recruiter/JobForm';
import RecruiterApplications from './pages/recruiter/Applications';
import ApplicationReview from './pages/recruiter/ApplicationReview';
import AgencyProfile from './pages/recruiter/AgencyProfile';
import RecruiterRequests from './pages/recruiter/Requests';



// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminRecruiters from './pages/admin/Recruiters';

import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex-center" style={{ minHeight: '100vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        // Default options
                        duration: 4000,
                        style: {
                            background: 'white',
                            color: 'var(--text-primary)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--gray-200)',
                            boxShadow: 'var(--shadow-xl)',
                            padding: '1rem 1.25rem',
                            fontFamily: 'Source Sans 3, sans-serif',
                            fontSize: '0.9375rem',
                            fontWeight: 500,
                            maxWidth: '400px'
                        },
                        // Success toast
                        success: {
                            duration: 3000,
                            iconTheme: {
                                primary: 'var(--success)',
                                secondary: 'white'
                            },
                            style: {
                                borderLeft: '4px solid var(--success)'
                            }
                        },
                        // Error toast
                        error: {
                            duration: 5000,
                            iconTheme: {
                                primary: 'var(--danger)',
                                secondary: 'white'
                            },
                            style: {
                                borderLeft: '4px solid var(--danger)'
                            }
                        },
                        // Loading toast
                        loading: {
                            style: {
                                borderLeft: '4px solid var(--primary)'
                            }
                        }
                    }}
                />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/:id" element={<JobDetails />} />
                    <Route path="/recruiters" element={<Recruiters />} />
                    <Route path="/agencies" element={<Navigate to="/recruiters" replace />} />
                    <Route path="/submit-requirement" element={<SubmitRequirement />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                    {/* Candidate Routes */}
                    <Route
                        path="/candidate/dashboard"
                        element={
                            <ProtectedRoute role="CANDIDATE">
                                <CandidateDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/candidate/profile"
                        element={
                            <ProtectedRoute role="CANDIDATE">
                                <CandidateProfile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/candidate/applications"
                        element={
                            <ProtectedRoute role="CANDIDATE">
                                <CandidateApplications />
                            </ProtectedRoute>
                        }
                    />

                    {/* Recruiter Routes */}
                    <Route
                        path="/recruiter/dashboard"
                        element={
                            <ProtectedRoute role="RECRUITER">
                                <RecruiterDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recruiter/companies"
                        element={
                            <ProtectedRoute role="RECRUITER">
                                <RecruiterCompanies />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recruiter/departments"
                        element={
                            <ProtectedRoute role="RECRUITER">
                                <RecruiterDepartments />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recruiter/jobs"
                        element={
                            <ProtectedRoute role="RECRUITER">
                                <RecruiterJobs />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recruiter/jobs/new"
                        element={
                            <ProtectedRoute role="RECRUITER">
                                <RecruiterJobForm />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recruiter/jobs/edit/:id"
                        element={
                            <ProtectedRoute role="RECRUITER">
                                <RecruiterJobForm />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recruiter/jobs/:jobId/applications"
                        element={
                            <ProtectedRoute role="RECRUITER">
                                <RecruiterApplications />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recruiter/applications"
                        element={
                            <ProtectedRoute role="RECRUITER">
                                <RecruiterApplications />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recruiter/applications/:id"
                        element={
                            <ProtectedRoute role="RECRUITER">
                                <ApplicationReview />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recruiter/profile"
                        element={
                            <ProtectedRoute role="RECRUITER">
                                <AgencyProfile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recruiter/requests"
                        element={
                            <ProtectedRoute role="RECRUITER">
                                <RecruiterRequests />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Routes */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute role="ADMIN">
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/recruiters"
                        element={
                            <ProtectedRoute role="ADMIN">
                                <AdminRecruiters />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
