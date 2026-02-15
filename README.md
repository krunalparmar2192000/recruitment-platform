# Recruitment & Job Vacancy Management Platform

A full-stack agency-driven recruitment platform connecting Companies, Recruiters, and Candidates.

## 🚀 Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.1**
- **Spring Security** with JWT authentication
- **Spring Data JPA** with Hibernate
- **PostgreSQL** database
- **Maven** build tool

### Frontend
- **React 18**
- **Vite** build tool
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management

---

## 📋 Features

### User Roles

#### 1. **Admin**
- Manage recruiter accounts
- View platform statistics
- Monitor system activity

#### 2. **Recruiter (Agency)**
- Manage multiple companies
- Create and organize departments
- Receive and process client job requests
- Create job postings
- Review candidate applications
- Update application status
- Add recruiter notes

#### 3. **Client (Guest - No Login)**
- Browse recruiters
- Submit job requirement requests

#### 4. **Candidate (Registered Users)**
- Browse job listings (public)
- Apply for jobs (requires login)
- Track application status
- Manage profile and resume

---

## 🛠️ Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 18+ and npm
- PostgreSQL 14+
- Maven 3.8+

### Backend Setup

1. **Create PostgreSQL Database**
```bash
createdb recruitment_db
```

2. **Configure Database**
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/recruitment_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. **Build and Run**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## 📁 Project Structure

```
recruitment-platform/
├── backend/
│   ├── src/main/java/com/recruitment/
│   │   ├── config/              # Security, CORS configs
│   │   ├── controller/          # REST Controllers
│   │   ├── dto/                 # Data Transfer Objects
│   │   ├── entity/              # JPA Entities
│   │   ├── repository/          # Spring Data Repositories
│   │   ├── service/             # Business Logic
│   │   ├── security/            # JWT, Auth filters
│   │   └── RecruitmentApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── components/          # Reusable components
    │   │   └── layout/         # Header, Footer
    │   ├── pages/              # Page components
    │   │   ├── public/         # Home, Jobs, etc.
    │   │   ├── auth/           # Login, Register
    │   │   ├── candidate/      # Candidate dashboard
    │   │   ├── recruiter/      # Recruiter dashboard
    │   │   └── admin/          # Admin dashboard
    │   ├── context/            # React Context
    │   ├── services/           # API services
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

---

## 🔐 Authentication Flow

1. **Registration** (Candidates only)
   - POST `/api/auth/register`
   - Creates user account and candidate profile
   - Returns JWT token

2. **Login** (All roles)
   - POST `/api/auth/login`
   - Returns JWT token and user info
   - Token stored in localStorage

3. **Protected Routes**
   - JWT token sent in `Authorization: Bearer <token>` header
   - Role-based access control enforced

---

## 🌐 API Endpoints

### Public Endpoints
```
GET    /api/jobs                    # List all jobs (with filters)
GET    /api/jobs/{id}               # Get job details
GET    /api/public/recruiters       # List recruiters
POST   /api/public/job-requests     # Submit job request
```

### Authentication
```
POST   /api/auth/login              # Login
POST   /api/auth/register           # Register (candidate)
```

### Candidate Endpoints (Requires CANDIDATE role)
```
GET    /api/candidate/profile       # Get profile
PUT    /api/candidate/profile       # Update profile
POST   /api/candidate/resume        # Upload resume
GET    /api/candidate/applications  # List applications
POST   /api/candidate/applications  # Apply for job
```

### Recruiter Endpoints (Requires RECRUITER role)
```
GET    /api/recruiter/dashboard     # Dashboard stats
GET    /api/recruiter/companies     # List companies
POST   /api/recruiter/companies     # Create company
PUT    /api/recruiter/companies/{id}
DELETE /api/recruiter/companies/{id}

GET    /api/recruiter/departments
POST   /api/recruiter/departments
PUT    /api/recruiter/departments/{id}
DELETE /api/recruiter/departments/{id}

GET    /api/recruiter/jobs
POST   /api/recruiter/jobs
PUT    /api/recruiter/jobs/{id}
DELETE /api/recruiter/jobs/{id}

GET    /api/recruiter/job-requests
PUT    /api/recruiter/job-requests/{id}/accept
PUT    /api/recruiter/job-requests/{id}/reject

GET    /api/recruiter/jobs/{id}/applications
PUT    /api/recruiter/applications/{id}
```

### Admin Endpoints (Requires ADMIN role)
```
GET    /api/admin/recruiters        # List recruiters
POST   /api/admin/recruiters        # Create recruiter
PUT    /api/admin/recruiters/{id}
DELETE /api/admin/recruiters/{id}
GET    /api/admin/stats             # Platform stats
```

---

## 🎨 UI/UX Features

- **Modern SaaS Design** with glassmorphism effects
- **Gradient Backgrounds** and smooth animations
- **Card-based Layouts** for better content organization
- **Responsive Design** (mobile, tablet, desktop)
- **Loading States** and error handling
- **Role-based Navigation** and dashboards

---

## 🔒 Security Features

- **JWT Authentication** with secure token generation
- **BCrypt Password Hashing**
- **Role-based Access Control** (RBAC)
- **CORS Configuration** for frontend-backend communication
- **Input Validation** on both frontend and backend
- **SQL Injection Protection** via JPA/Hibernate

---

## 📊 Database Schema

### Core Tables
- `users` - User accounts (email, password, role)
- `recruiters` - Recruiter profiles
- `candidates` - Candidate profiles
- `companies` - Company information
- `departments` - Department structure
- `jobs` - Job postings
- `job_requests` - Client job requests
- `applications` - Job applications

### Relationships
- User → Recruiter (1:1)
- User → Candidate (1:1)
- Recruiter → Companies (1:N)
- Company → Departments (1:N)
- Company → Jobs (1:N)
- Department → Jobs (1:N)
- Job → Applications (1:N)
- Candidate → Applications (1:N)

---

## 🚀 Deployment

### Backend Deployment

1. **Build JAR**
```bash
cd backend
mvn clean package
```

2. **Run JAR**
```bash
java -jar target/recruitment-platform-1.0.0.jar
```

### Frontend Deployment

1. **Build Production Bundle**
```bash
cd frontend
npm run build
```

2. **Deploy `dist/` folder** to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Any static hosting service

### Environment Variables (Production)

**Backend:**
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`

**Frontend:**
- Update API base URL in `src/services/api.js`

---

## 📝 Testing

### Test User Accounts (Create via API or Database)

**Admin:**
```json
{
  "email": "admin@recruithub.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

**Recruiter:**
```json
{
  "email": "recruiter@agency.com",
  "password": "recruiter123",
  "role": "RECRUITER"
}
```

**Candidate:**
- Register via `/register` page

---

## 🐛 Troubleshooting

### Backend Issues

**Port 8080 already in use:**
```properties
# Change in application.properties
server.port=8081
```

**Database connection failed:**
- Ensure PostgreSQL is running
- Verify credentials in `application.properties`

### Frontend Issues

**API calls failing:**
- Check backend is running on port 8080
- Verify CORS configuration
- Check browser console for errors

**Build errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Future Enhancements

- [ ] Email notifications
- [ ] Resume parsing with AI
- [ ] Advanced search and filters
- [ ] Real-time chat between recruiters and candidates
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Video interview integration
- [ ] Skill assessment tests

---

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Email: support@recruithub.com

---

**Built with ❤️ using Spring Boot and React**
