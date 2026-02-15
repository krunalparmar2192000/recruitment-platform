# 🎨 Toast Notification Guide

Complete guide for using toast notifications in RecruitHub.

---

## 🎯 **Overview**

RecruitHub uses `react-hot-toast` for beautiful, customizable toast notifications. All toasts are styled to match the app's design system.

---

## 🚀 **Quick Start**

### **Basic Usage**

```javascript
import toast from 'react-hot-toast';

// Success
toast.success('Profile updated successfully!');

// Error
toast.error('Failed to save changes');

// Info
toast('Welcome to RecruitHub');

// Loading
const toastId = toast.loading('Uploading resume...');
// Later...
toast.success('Resume uploaded!', { id: toastId });
```

---

## 🎨 **Custom Styling (Already Configured)**

The `Toaster` component in `App.jsx` has been customized with:

- **Position:** Top-right
- **Duration:** 4 seconds (default), 3s (success), 5s (error)
- **Style:** Matches app design system
- **Border:** 4px left border matching status color
- **Shadow:** Elevated shadow for prominence
- **Font:** Source Sans 3

### **Toast Colors**

- ✅ **Success:** Green border (`var(--success)`)
- ❌ **Error:** Red border (`var(--danger)`)
- ℹ️ **Info:** Blue border (`var(--info)`)
- ⚠️ **Warning:** Orange border (`var(--warning)`)
- ⏳ **Loading:** Blue border (`var(--primary)`)

---

## 📖 **Advanced Usage**

### **1. Promise Toast** (Recommended for API calls)

```javascript
import toast from 'react-hot-toast';

const saveProfile = async () => {
    const promise = api.updateProfile(data);
    
    toast.promise(promise, {
        loading: 'Saving profile...',
        success: 'Profile saved successfully!',
        error: (err) => `Error: ${err.message}`
    });
};
```

### **2. Custom Duration**

```javascript
// Short notification (2 seconds)
toast.success('Copied!', { duration: 2000 });

// Long notification (10 seconds)
toast.error('Critical error details...', { duration: 10000 });

// Permanent (manual dismiss only)
toast.error('Session expired', { duration: Infinity });
```

### **3. Custom Icons**

```javascript
toast.success('Job posted!', { icon: '🚀' });
toast.error('Upload failed', { icon: '📁' });
toast('New message', { icon: '💬' });
```

### **4. Manual Dismiss**

```javascript
const toastId = toast.loading('Processing...');

// Later, when done
toast.dismiss(toastId);

// Or update the toast
toast.success('Done!', { id: toastId });
```

### **5. Action Buttons**

```javascript
toast((t) => (
    <div>
        <p>Delete this item?</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => {
                handleDelete();
                toast.dismiss(t.id);
            }}>
                Confirm
            </button>
            <button onClick={() => toast.dismiss(t.id)}>
                Cancel
            </button>
        </div>
    </div>
));
```

---

## 💡 **Best Practices**

### **DO's ✅**

```javascript
// ✅ Use clear, actionable messages
toast.success('Profile updated successfully!');

// ✅ Provide context in errors
toast.error('Failed to upload resume. File size must not exceed 5MB.');

// ✅ Use loading states for async operations
const toastId = toast.loading('Applying...');
await applyForJob();
toast.success('Application submitted!', { id: toastId });

// ✅ Group related actions
toast.promise(
    api.createJob(data),
    {
        loading: 'Publishing job...',
        success: 'Job posted successfully! Candidates can now apply.',
        error: 'Failed to publish job. Please try again.'
    }
);
```

### **DON'Ts ❌**

```javascript
// ❌ Vague messages
toast.error('Error');

// ❌ Too many toasts at once
toast.success('Saved!');
toast.success('Updated!');
toast.success('Done!');
// Instead, combine or use one

// ❌ Technical jargon for users
toast.error('HTTP 500: Internal Server Error');
// Instead: 'Server error. Please try again later.'

// ❌ Forgetting to dismiss loading toasts
toast.loading('Loading...');
// Always pair with success/error or dismiss

// ❌ Using toast for critical dialogs
toast.error('Are you sure you want to delete?');
// Use a modal dialog instead
```

---

## 📋 **Common Use Cases**

### **1. Form Submission**

```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading('Saving changes...');
    
    try {
        await api.updateProfile(formData);
        toast.success('Changes saved successfully!', { id: loadingToast });
    } catch (error) {
        toast.error(error.message || 'Failed to save', { id: loadingToast });
    }
};
```

### **2. File Upload**

```javascript
const handleFileUpload = async (file) => {
    // Validation
    if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must not exceed 5MB');
        return;
    }
    
    if (!['application/pdf', 'application/msword'].includes(file.type)) {
        toast.error('Only PDF and DOCX files are allowed');
        return;
    }
    
    // Upload
    const toastId = toast.loading('Uploading resume...');
    
    try {
        await api.uploadResume(file);
        toast.success('Resume uploaded successfully!', { id: toastId });
    } catch (error) {
        toast.error('Upload failed. Please try again.', { id: toastId });
    }
};
```

### **3. Delete Confirmation**

```javascript
const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
        return;
    }
    
    const toastId = toast.loading('Deleting...');
    
    try {
        await api.delete(id);
        toast.success('Deleted successfully', { id: toastId });
        refreshData();
    } catch (error) {
        toast.error('Failed to delete', { id: toastId });
    }
};
```

### **4. Copy to Clipboard**

```javascript
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!', { 
        duration: 2000,
        icon: '📋'
    });
};
```

### **5. Network Error Handling**

```javascript
import axios from 'axios';

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // Server error
            if (error.response.status === 401) {
                toast.error('Session expired. Please login again.');
            } else if (error.response.status === 403) {
                toast.error('You do not have permission to perform this action.');
            } else if (error.response.status === 404) {
                toast.error('Resource not found.');
            } else if (error.response.status >= 500) {
                toast.error('Server error. Please try again later.');
            } else {
                toast.error(error.response.data?.message || 'An error occurred');
            }
        } else if (error.request) {
            // Network error
            toast.error('Network error. Please check your internet connection.');
        }
        return Promise.reject(error);
    }
);
```

---

## 🎨 **Customization Options**

### **Available Options**

```javascript
toast.success('Message', {
    duration: 4000,           // Duration in ms
    position: 'top-right',    // Position on screen
    icon: '🎉',              // Custom icon
    className: 'my-toast',    // Custom CSS class
    style: {                  // Inline styles
        background: '#fff',
        color: '#333'
    },
    ariaProps: {             // Accessibility
        role: 'status',
        'aria-live': 'polite'
    }
});
```

### **Positions**

- `top-left`
- `top-center`
- `top-right` (default)
- `bottom-left`
- `bottom-center`
- `bottom-right`

---

## 🔧 **Troubleshooting**

### **Toast Not Showing**

1. Check if `<Toaster />` is in `App.jsx`
2. Verify import: `import toast from 'react-hot-toast';`
3. Check browser console for errors

### **Toast Disappears Too Fast**

```javascript
// Increase duration
toast.success('Message', { duration: 10000 });
```

### **Multiple Toasts Stacking Up**

```javascript
// Dismiss all toasts first
toast.dismiss();

// Then show new toast
toast.success('New message');
```

### **Toast Not Styled Correctly**

Check that CSS variables are defined in `index.css`:
- `--success`, `--danger`, `--info`, `--warning`, `--primary`
- `--radius-lg`, `--shadow-xl`
- `--text-primary`, `--gray-200`

---

## 📊 **Examples by Feature**

### **Authentication**

```javascript
// Login
toast.promise(
    authAPI.login(credentials),
    {
        loading: 'Signing in...',
        success: (data) => `Welcome back, ${data.name}!`,
        error: 'Invalid email or password'
    }
);

// Logout
toast.success('Logged out successfully');

// Password reset
toast.success('Password reset link sent to your email');
```

### **Job Application**

```javascript
// Apply
toast.promise(
    candidateAPI.applyForJob(jobId),
    {
        loading: 'Submitting application...',
        success: 'Application submitted! We\'ll notify you of updates.',
        error: (err) => err.response?.data?.message || 'Failed to apply'
    }
);
```

### **File Management**

```javascript
// Upload success
toast.success('Resume uploaded successfully!', { icon: '📄' });

// Upload error
toast.error('Upload failed. File size must not exceed 5MB', {
    duration: 5000
});
```

---

## 🎯 **Summary**

- ✅ Toast is configured globally in `App.jsx`
- ✅ Use `toast.success()`, `toast.error()`, etc.
- ✅ Use `toast.promise()` for async operations
- ✅ Keep messages clear and actionable
- ✅ Provide appropriate duration
- ✅ Use icons to enhance meaning

---

**Questions?** Check the [react-hot-toast documentation](https://react-hot-toast.com/docs)
