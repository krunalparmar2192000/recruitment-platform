import toast from './toast';

/**
 * Centralized error handler for API calls
 * Extracts error messages and displays appropriate toast notifications
 */

export const handleApiError = (error, customMessage = null) => {
    let errorMessage = customMessage || 'Something went wrong. Please try again.';

    if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;

        if (status === 401) {
            errorMessage = 'Session expired. Please login again.';
            // Could trigger logout here
        } else if (status === 403) {
            errorMessage = 'You do not have permission to perform this action.';
        } else if (status === 404) {
            errorMessage = data?.message || 'Resource not found.';
        } else if (status === 409) {
            errorMessage = data?.message || 'This item already exists.';
        } else if (status === 422) {
            errorMessage = data?.message || 'Invalid data provided.';
        } else if (status === 429) {
            errorMessage = 'Too many requests. Please try again later.';
        } else if (status >= 500) {
            errorMessage = 'Server error. Our team has been notified.';
        } else {
            errorMessage = data?.message || data?.error || errorMessage;
        }
    } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Network error. Please check your internet connection.';
    } else {
        // Something else happened
        errorMessage = error.message || errorMessage;
    }

    toast.error(errorMessage);
    return errorMessage;
};

/**
 * Handle validation errors from forms
 */
export const handleValidationError = (errors) => {
    if (Array.isArray(errors)) {
        errors.forEach(error => toast.error(error));
    } else if (typeof errors === 'object') {
        Object.values(errors).forEach(error => toast.error(error));
    } else {
        toast.error(errors);
    }
};

/**
 * Format file size validation error
 */
export const handleFileSizeError = (maxSize = 5) => {
    toast.error(`File size must not exceed ${maxSize}MB`);
};

/**
 * Format file type validation error
 */
export const handleFileTypeError = (allowedTypes = ['PDF', 'DOCX']) => {
    toast.error(`Only ${allowedTypes.join(', ')} files are allowed`);
};

export default {
    handleApiError,
    handleValidationError,
    handleFileSizeError,
    handleFileTypeError
};
