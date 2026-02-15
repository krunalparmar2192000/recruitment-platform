# 🚀 Production Deployment Guide

Complete guide to deploying RecruitHub to production.

---

## 📋 Pre-Deployment Checklist

### **Backend Configuration**

- [ ] Set up production database (MySQL on AWS RDS/Cloud SQL/Azure)
- [ ] Configure environment variables (see `.env.example`)
- [ ] Update `application-prod.properties`
- [ ] Set up email service (Gmail/SendGrid/AWS SES)
- [ ] Generate strong JWT secret (256+ bits)
- [ ] Configure file storage (AWS S3 recommended)
- [ ] Enable HTTPS/SSL
- [ ] Set up logging and monitoring

### **Frontend Configuration**

- [ ] Update `.env.production` with production API URL
- [ ] Configure analytics (if enabled)
- [ ] Update contact information
- [ ] Test all environment variables

### **Security**

- [ ] Change all default passwords
- [ ] Generate new JWT secret
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Set up firewall rules
- [ ] Enable HTTPS
- [ ] Review security headers

---

## 🗄️ **Step 1: Database Setup**

### **Option A: AWS RDS (MySQL)**

```bash
# 1. Create RDS instance via AWS Console
# - Engine: MySQL 8.0
# - Instance class: db.t3.micro (for testing) or db.t3.small (production)
# - Storage: 20 GB minimum
# - Enable automated backups
# - Set up security group (allow port 3306 from your backend server)

# 2. Get connection details
DB_URL=jdbc:mysql://your-rds-endpoint:3306/recruitment_db
DB_USERNAME=admin
DB_PASSWORD=your-secure-password

# 3. Create database
mysql -h your-rds-endpoint -u admin -p
CREATE DATABASE recruitment_db;
```

### **Option B: Google Cloud SQL (MySQL)**

```bash
# 1. Create Cloud SQL instance
gcloud sql instances create recruithub-mysql \
    --database-version=MYSQL_8_0 \
    --tier=db-f1-micro \
    --region=us-central1

# 2. Set root password
gcloud sql users set-password root \
    --host=% \
    --instance=recruithub-mysql \
    --password=YOUR_PASSWORD

# 3. Create database
gcloud sql databases create recruitment_db --instance=recruithub-mysql
```

### **Option C: Azure Database for MySQL**

```bash
# Via Azure Portal:
# - Create MySQL server
# - Configure firewall rules
# - Create database: recruitment_db
```

---

## 📧 **Step 2: Email Service Setup**

### **Option A: Gmail with App Password** (Development/Small Scale)

```properties
# application-prod.properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

**Get App Password:**
1. Go to Google Account Settings
2. Security → 2-Step Verification
3. App Passwords → Generate for "Mail"

### **Option B: SendGrid** (Recommended for Production)

```bash
# 1. Sign up at sendgrid.com
# 2. Create API Key
# 3. Verify sender identity

# application-prod.properties
spring.mail.host=smtp.sendgrid.net
spring.mail.port=587
spring.mail.username=apikey
spring.mail.password=YOUR_SENDGRID_API_KEY
```

### **Option C: AWS SES** (Scalable)

```bash
# 1. Set up AWS SES
# 2. Verify domain
# 3. Create SMTP credentials

# application-prod.properties
spring.mail.host=email-smtp.us-east-1.amazonaws.com
spring.mail.port=587
spring.mail.username=YOUR_SMTP_USERNAME
spring.mail.password=YOUR_SMTP_PASSWORD
```

---

## ☁️ **Step 3: Backend Deployment**

### **Option A: AWS Elastic Beanstalk**

```bash
# 1. Install EB CLI
pip install awsebcli

# 2. Initialize EB
cd backend
eb init -p java-17 recruithub-backend

# 3. Create environment
eb create recruithub-prod

# 4. Set environment variables
eb setenv DB_URL=jdbc:mysql://... \
    DB_USERNAME=admin \
    DB_PASSWORD=your-password \
    JWT_SECRET=your-secret \
    MAIL_USERNAME=your-email \
    MAIL_PASSWORD=your-password

# 5. Deploy
mvn clean package
eb deploy

# 6. Check health
eb health
eb logs
```

### **Option B: Heroku**

```bash
# 1. Install Heroku CLI
# 2. Login
heroku login

# 3. Create app
cd backend
heroku create recruithub-backend

# 4. Add MySQL add-on
heroku addons:create cleardb:ignite

# 5. Set config vars
heroku config:set JWT_SECRET=your-secret
heroku config:set MAIL_USERNAME=your-email
heroku config:set MAIL_PASSWORD=your-password

# 6. Deploy
git push heroku main

# 7. Check logs
heroku logs --tail
```

### **Option C: Docker + AWS ECS**

```dockerfile
# Dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/recruitment-platform-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```bash
# Build
cd backend
mvn clean package
docker build -t recruithub-backend .

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ECR_URI
docker tag recruithub-backend:latest YOUR_ECR_URI/recruithub-backend:latest
docker push YOUR_ECR_URI/recruithub-backend:latest

# Deploy to ECS
# - Create task definition
# - Create service
# - Configure load balancer
```

### **Option D: VPS (DigitalOcean/Linode)**

```bash
# 1. SSH into server
ssh root@your-server-ip

# 2. Install Java 17
apt update
apt install openjdk-17-jdk -y

# 3. Upload JAR
scp target/recruitment-platform-1.0.0.jar root@your-server-ip:/opt/recruithub/

# 4. Create systemd service
cat > /etc/systemd/system/recruithub.service << EOF
[Unit]
Description=RecruitHub Backend
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/recruithub
ExecStart=/usr/bin/java -jar recruitment-platform-1.0.0.jar
Restart=always

Environment="DB_URL=jdbc:mysql://..."
Environment="DB_USERNAME=admin"
Environment="DB_PASSWORD=your-password"
Environment="JWT_SECRET=your-secret"

[Install]
WantedBy=multi-user.target
EOF

# 5. Start service
systemctl enable recruithub
systemctl start recruithub
systemctl status recruithub

# 6. Set up Nginx reverse proxy
apt install nginx -y
cat > /etc/nginx/sites-available/recruithub << EOF
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

ln -s /etc/nginx/sites-available/recruithub /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# 7. Set up SSL with Let's Encrypt
apt install certbot python3-certbot-nginx -y
certbot --nginx -d api.yourdomain.com
```

---

## 🌐 **Step 4: Frontend Deployment**

### **Option A: Vercel** (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
cd frontend
vercel --prod

# 4. Set environment variables in Vercel dashboard:
# VITE_API_URL=https://api.yourdomain.com/api
# VITE_APP_URL=https://yourdomain.com
```

### **Option B: Netlify**

```bash
# 1. Install Netlify CLI
npm i -g netlify-cli

# 2. Login
netlify login

# 3. Build
cd frontend
npm run build

# 4. Deploy
netlify deploy --prod --dir=dist

# 5. Set environment variables in Netlify dashboard
```

### **Option C: AWS S3 + CloudFront**

```bash
# 1. Build
cd frontend
npm run build

# 2. Create S3 bucket
aws s3 mb s3://recruithub-frontend

# 3. Enable static website hosting
aws s3 website s3://recruithub-frontend --index-document index.html --error-document index.html

# 4. Upload files
aws s3 sync dist/ s3://recruithub-frontend

# 5. Create CloudFront distribution
# - Origin: S3 bucket
# - Viewer Protocol Policy: Redirect HTTP to HTTPS
# - Custom Error Response: 404 -> /index.html (for SPA routing)

# 6. Set up custom domain in Route 53
```

---

## 🔒 **Step 5: Security Hardening**

### **Backend Security**

```properties
# application-prod.properties

# Enable HTTPS only
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=your-password
server.ssl.key-store-type=PKCS12

# Security headers
server.servlet.session.cookie.secure=true
server.servlet.session.cookie.http-only=true
server.servlet.session.cookie.same-site=strict

# Hide server version
server.server-header=

# Enable rate limiting
rate.limit.enabled=true
rate.limit.requests=100
rate.limit.duration=60000
```

### **Nginx Security Headers**

```nginx
# Add to Nginx config
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

---

## 📊 **Step 6: Monitoring & Logging**

### **Application Monitoring**

```bash
# Add to pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

# Enable endpoints in application-prod.properties
management.endpoints.web.exposure.include=health,metrics,info
management.endpoint.health.show-details=always
```

### **Log Management**

```properties
# application-prod.properties
logging.file.name=/var/log/recruithub/application.log
logging.file.max-size=10MB
logging.file.max-history=30
logging.level.com.recruitment=INFO
```

### **External Monitoring Services**

- **Sentry** - Error tracking
- **DataDog** - Application monitoring
- **New Relic** - Performance monitoring
- **AWS CloudWatch** - Logs and metrics

---

## 🧪 **Step 7: Testing Production**

### **Health Checks**

```bash
# Backend health
curl https://api.yourdomain.com/actuator/health

# Frontend
curl https://yourdomain.com

# Database connection
curl https://api.yourdomain.com/api/auth/login -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### **Load Testing**

```bash
# Install Apache Bench
apt install apache2-utils

# Test API
ab -n 1000 -c 10 https://api.yourdomain.com/api/jobs

# Expected: All requests should succeed
```

---

## 🔄 **Step 8: CI/CD Setup (Optional)**

### **GitHub Actions**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up JDK 17
        uses: actions/setup-java@v2
        with:
          java-version: '17'
      - name: Build with Maven
        run: |
          cd backend
          mvn clean package
      - name: Deploy to AWS
        run: |
          # Your deployment commands

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: |
          cd frontend
          npm install
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 📝 **Post-Deployment**

### **Create Admin Account**

```sql
-- Connect to production database
INSERT INTO users (email, password, role, active, created_at, updated_at)
VALUES ('admin@yourdomain.com', 
        '$2a$10$HASH_YOUR_PASSWORD_HERE', 
        'ADMIN', true, NOW(), NOW());
```

### **Test All Features**

- [ ] User registration
- [ ] Login/Logout
- [ ] Password reset (email received?)
- [ ] Job application
- [ ] File upload
- [ ] Email notifications
- [ ] Admin features
- [ ] Recruiter features

### **Monitor First 24 Hours**

- Check error logs
- Monitor database connections
- Track API response times
- Review email delivery rates

---

## 🆘 **Troubleshooting**

### **Backend won't start**

```bash
# Check logs
journalctl -u recruithub -n 100

# Common issues:
# - Database connection failure → Check credentials
# - Port already in use → Change port or kill process
# - Missing environment variables → Check .env
```

### **Database connection errors**

```bash
# Test connection
mysql -h your-db-host -u admin -p -D recruitment_db

# Check security group/firewall
# Allow port 3306 from backend server IP
```

### **Email not sending**

```bash
# Test SMTP connection
telnet smtp.gmail.com 587

# Check credentials
# Verify sender email is configured
```

---

## 📞 **Support Checklist**

Before going live, ensure you have:

- [ ] Backup strategy in place
- [ ] Monitoring alerts configured
- [ ] SSL certificates set up (auto-renewal enabled)
- [ ] DNS records configured
- [ ] Support email set up
- [ ] Documentation for your team
- [ ] Rollback plan ready

---

## 🎉 **You're Live!**

Your RecruitHub platform is now running in production!

**Next Steps:**
1. Monitor logs and metrics
2. Gather user feedback
3. Plan feature iterations
4. Scale infrastructure as needed

---

**Questions?** Check the main README.md or create an issue on GitHub.
