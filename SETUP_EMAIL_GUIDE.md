# 📧 Email Configuration Guide

Quick guide to set up email notifications for RecruitHub.

---

## 🚀 Quick Setup (Gmail - Development)

### **Step 1: Enable App Password**

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** → **2-Step Verification** (enable if not already)
3. Scroll to **App passwords**
4. Select app: **Mail**
5. Select device: **Other (Custom name)** → Enter "RecruitHub"
6. Click **Generate**
7. Copy the 16-character password

### **Step 2: Update Backend Configuration**

Edit `backend/src/main/resources/application.properties`:

```properties
# Email Configuration (Gmail)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=xxxx-xxxx-xxxx-xxxx
mail.from=noreply@recruithub.com
mail.from.name=RecruitHub

# Application URL
app.url=http://localhost:5173
```

### **Step 3: Test Email**

Start the backend and register a new user. You should receive a welcome email!

---

## 🎯 Production Setup (SendGrid - Recommended)

### **Step 1: Create SendGrid Account**

1. Sign up at https://sendgrid.com/
2. Complete sender verification
3. Create API Key:
   - Settings → API Keys → Create API Key
   - Name: RecruitHub
   - Permissions: Full Access
   - Copy the key

### **Step 2: Configure Backend**

```properties
# Email Configuration (SendGrid)
spring.mail.host=smtp.sendgrid.net
spring.mail.port=587
spring.mail.username=apikey
spring.mail.password=YOUR_SENDGRID_API_KEY
mail.from=noreply@yourdomain.com
mail.from.name=RecruitHub
```

### **Step 3: Verify Sender**

In SendGrid dashboard:
1. Settings → Sender Authentication
2. Verify single sender OR authenticate your domain

---

## 📝 Email Templates Included

The platform sends these automated emails:

1. **Welcome Email** - When candidate registers
2. **Application Confirmation** - When candidate applies for a job
3. **Application Status Update** - When recruiter changes status
4. **Password Reset** - When user requests password reset
5. **Job Request Notification** - When client submits job request

---

## 🧪 Testing Emails

### **Test Welcome Email**

```bash
# Register a new user via API
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "fullName": "Test User",
    "phone": "1234567890",
    "location": "New York"
  }'
```

### **Test Password Reset**

```bash
curl -X POST http://localhost:8080/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

---

## 🔧 Troubleshooting

### **Emails not sending**

1. Check backend logs for errors
2. Verify SMTP credentials
3. Test connection:
   ```bash
   telnet smtp.gmail.com 587
   ```

### **Emails going to spam**

1. Use SendGrid (better deliverability)
2. Verify sender domain
3. Set up SPF and DKIM records

### **Port 587 blocked**

Try port 465 (SSL):
```properties
spring.mail.port=465
spring.mail.properties.mail.smtp.ssl.enable=true
```

---

## ✅ Verification

After setup, check:
- [ ] Backend starts without errors
- [ ] New user receives welcome email
- [ ] Password reset email works
- [ ] Emails not in spam folder
- [ ] Email links work correctly

---

**Need help?** Check the main documentation or open an issue.
