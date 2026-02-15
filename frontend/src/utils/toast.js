import { toast as hotToast } from 'react-hot-toast';

/**
 * Centralized toast notification utility
 * Provides consistent styling and behavior across the app
 */

const defaultOptions = {
    duration: 4000,
    position: 'top-right',
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
    }
};

export const toast = {
    success: (message, options = {}) => {
        return hotToast.success(message, {
            ...defaultOptions,
            ...options,
            icon: '✓',
            style: {
                ...defaultOptions.style,
                borderLeft: '4px solid var(--success)',
                ...options.style
            },
            iconTheme: {
                primary: 'var(--success)',
                secondary: 'white'
            }
        });
    },

    error: (message, options = {}) => {
        return hotToast.error(message, {
            ...defaultOptions,
            duration: 5000, // Errors stay longer
            ...options,
            icon: '✕',
            style: {
                ...defaultOptions.style,
                borderLeft: '4px solid var(--danger)',
                ...options.style
            },
            iconTheme: {
                primary: 'var(--danger)',
                secondary: 'white'
            }
        });
    },

    info: (message, options = {}) => {
        return hotToast(message, {
            ...defaultOptions,
            ...options,
            icon: 'ℹ️',
            style: {
                ...defaultOptions.style,
                borderLeft: '4px solid var(--info)',
                ...options.style
            }
        });
    },

    warning: (message, options = {}) => {
        return hotToast(message, {
            ...defaultOptions,
            ...options,
            icon: '⚠️',
            style: {
                ...defaultOptions.style,
                borderLeft: '4px solid var(--warning)',
                ...options.style
            }
        });
    },

    loading: (message, options = {}) => {
        return hotToast.loading(message, {
            ...defaultOptions,
            ...options,
            style: {
                ...defaultOptions.style,
                borderLeft: '4px solid var(--primary)',
                ...options.style
            }
        });
    },

    promise: (promise, messages, options = {}) => {
        return hotToast.promise(
            promise,
            {
                loading: messages.loading || 'Processing...',
                success: messages.success || 'Success!',
                error: messages.error || 'Something went wrong'
            },
            {
                ...defaultOptions,
                ...options,
                success: {
                    style: {
                        ...defaultOptions.style,
                        borderLeft: '4px solid var(--success)'
                    },
                    iconTheme: {
                        primary: 'var(--success)',
                        secondary: 'white'
                    }
                },
                error: {
                    style: {
                        ...defaultOptions.style,
                        borderLeft: '4px solid var(--danger)'
                    },
                    iconTheme: {
                        primary: 'var(--danger)',
                        secondary: 'white'
                    }
                }
            }
        );
    },

    dismiss: (toastId) => {
        hotToast.dismiss(toastId);
    },

    custom: (message, options = {}) => {
        return hotToast(message, {
            ...defaultOptions,
            ...options
        });
    }
};

// Common toast messages for reusability
export const toastMessages = {
    auth: {
        loginSuccess: 'Welcome back!',
        loginError: 'Invalid email or password',
        registerSuccess: 'Account created successfully!',
        registerError: 'Failed to create account',
        logoutSuccess: 'Logged out successfully',
        passwordResetSent: 'Password reset link sent to your email',
        passwordResetSuccess: 'Password reset successfully',
        passwordResetError: 'Failed to reset password',
        unauthorized: 'Please login to continue'
    },
    job: {
        applySuccess: 'Application submitted successfully!',
        applyError: 'Failed to submit application',
        alreadyApplied: 'You have already applied for this job',
        createSuccess: 'Job posted successfully!',
        createError: 'Failed to create job posting',
        updateSuccess: 'Job updated successfully!',
        updateError: 'Failed to update job',
        deleteSuccess: 'Job deleted successfully',
        deleteError: 'Failed to delete job'
    },
    company: {
        createSuccess: 'Company added successfully!',
        createError: 'Failed to add company',
        updateSuccess: 'Company updated successfully!',
        updateError: 'Failed to update company',
        deleteSuccess: 'Company deleted successfully',
        deleteError: 'Failed to delete company'
    },
    application: {
        statusUpdateSuccess: 'Application status updated',
        statusUpdateError: 'Failed to update status',
        fetchError: 'Failed to load applications'
    },
    profile: {
        updateSuccess: 'Profile updated successfully!',
        updateError: 'Failed to update profile',
        resumeUploadSuccess: 'Resume uploaded successfully!',
        resumeUploadError: 'Failed to upload resume',
        resumeTooLarge: 'File size must not exceed 5MB',
        resumeInvalidType: 'Only PDF and DOCX files are allowed'
    },
    request: {
        submitSuccess: 'Your request has been submitted!',
        submitError: 'Failed to submit request',
        acceptSuccess: 'Request accepted',
        rejectSuccess: 'Request rejected'
    },
    general: {
        saveSuccess: 'Changes saved successfully!',
        saveError: 'Failed to save changes',
        deleteSuccess: 'Deleted successfully',
        deleteError: 'Failed to delete',
        fetchError: 'Failed to load data',
        networkError: 'Network error. Please check your connection.',
        serverError: 'Server error. Please try again later.',
        validationError: 'Please fill in all required fields'
    }
};

export default toast;
