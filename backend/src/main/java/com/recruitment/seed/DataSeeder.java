package com.recruitment.seed;

import com.recruitment.entity.*;
import com.recruitment.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RecruiterRepository recruiterRepository;
    @Autowired
    private CandidateRepository candidateRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;
    @Autowired
    private JobRequestRepository jobRequestRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void run(String... args) throws Exception {
        System.out.println(">>> Starting Data Cleanup...");
        // Clear all existing data using batch delete for efficiency and immediate feedback
        passwordResetTokenRepository.deleteAllInBatch();
        jobRequestRepository.deleteAllInBatch();
        applicationRepository.deleteAllInBatch();
        jobRepository.deleteAllInBatch();
        departmentRepository.deleteAllInBatch();
        companyRepository.deleteAllInBatch();
        candidateRepository.deleteAllInBatch();
        recruiterRepository.deleteAllInBatch();
        userRepository.deleteAllInBatch();
        System.out.println(">>> Data Cleanup Complete.");

        // Create ADMIN
        createUser("admin@recruithub.com", "password123", User.Role.ADMIN);

        // Create RECRUITER
        User recruiterUser = createUser("recruiter@recruithub.com", "password123", User.Role.RECRUITER);
        
        Recruiter recruiter = new Recruiter();
        recruiter.setUser(recruiterUser);
        recruiter.setCompanyName("Elite Talent Solutions");
        recruiter.setContactNumber("+1 (555) 012-3456");
        recruiter.setWebsite("https://elitetalent.com");
        recruiter.setAddress("123 Market St, San Francisco, CA 94103");
        recruiter.setDescription("Connecting top-tier talent with world-class organizations.");
        recruiter = recruiterRepository.save(recruiter);

        // Create CANDIDATE
        User candidateUser = createUser("candidate@recruithub.com", "password123", User.Role.CANDIDATE);
        
        Candidate candidate = new Candidate();
        candidate.setUser(candidateUser);
        candidate.setFullName("Alex Johnson");
        candidate.setPhone("+1 (555) 987-6543");
        candidate.setLocation("New York, NY");
        candidate.setSkills("Java, Spring Boot, React, AWS, Docker");
        candidate.setExperienceYears(5);
        candidate = candidateRepository.save(candidate);

        // Create 5 Key Companies
        String[] companyNames = {
            "Tech Innovations Inc", 
            "Digital Solutions Corp", 
            "NextGen Systems", 
            "CloudNine Analytics", 
            "Future Finance Group"
        };
        String[] industries = {"Technology", "IT Services", "Aerospace", "Data Science", "FinTech"};
        Company[] companies = new Company[5];

        for (int i = 0; i < 5; i++) {
            Company company = new Company();
            company.setRecruiter(recruiter);
            company.setName(companyNames[i]);
            company.setIndustry(industries[i]);
            company.setLocation(i % 2 == 0 ? "San Francisco, CA" : "New York, NY");
            company.setDescription(companyNames[i] + " is an industry leader in " + industries[i] + ".");
            companies[i] = companyRepository.save(company);
        }

        // Create 5 Departments (1 per company)
        String[] deptNames = {"Engineering", "Product Management", "R&D", "Data Engineering", "Investment Banking"};
        Department[] departments = new Department[5];

        for (int i = 0; i < 5; i++) {
            Department dept = new Department();
            dept.setCompany(companies[i]);
            dept.setName(deptNames[i]);
            dept.setDescription("Responsible for all " + deptNames[i] + " initiatives.");
            departments[i] = departmentRepository.save(dept);
        }

        // Create 5 Jobs (1 per company/dept)
        String[] jobTitles = {
            "Senior Frontend Developer", 
            "Product Owner", 
            "Systems Architect", 
            "Data Scientist", 
            "Financial Analyst"
        };
        
        for (int i = 0; i < 5; i++) {
            Job job = new Job();
            job.setRecruiter(recruiter);
            job.setCompany(companies[i]);
            job.setDepartment(departments[i]); // Ensuring correct company-dept link
            job.setTitle(jobTitles[i]);
            job.setDescription("We are seeking a talented " + jobTitles[i] + " to join our growing team. Key responsibilities include...");
            job.setSkills(i % 2 == 0 ? "React, TypeScript, CSS" : "Java, Python, SQL");
            job.setExperienceMin(3);
            job.setExperienceMax(8);
            job.setLocation(companies[i].getLocation()); // Use company location
            job.setJobType("Full-time");
            job.setStatus(Job.JobStatus.OPEN);
            jobRepository.save(job);
        }

        System.out.println(">>> Data Seeding Completed: 1 Recruiter, 1 Candidate, 5 Companies, 5 Jobs initialized.");
    }

    private User createUser(String email, String password, User.Role role) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setActive(true);
        return userRepository.save(user); // Password implies raw string unless encoded here? Ah, usage above calls createUser(..., "password123")
    }
}
