package com.recruitment.service;

import com.recruitment.entity.*;
import com.recruitment.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class RecruiterService {
    
    @Autowired
    private RecruiterRepository recruiterRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CompanyRepository companyRepository;
    
    @Autowired
    private DepartmentRepository departmentRepository;
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private JobRequestRepository jobRequestRepository;
    
    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private EmailService emailService;
    
    private Recruiter getCurrentRecruiter() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return recruiterRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Recruiter profile not found"));
    }
    
    public Recruiter getProfile() {
        return getCurrentRecruiter();
    }
    
    @Transactional
    public Recruiter updateProfile(Recruiter updatedRecruiter) {
        Recruiter recruiter = getCurrentRecruiter();
        recruiter.setCompanyName(updatedRecruiter.getCompanyName());
        recruiter.setDescription(updatedRecruiter.getDescription());
        recruiter.setWebsite(updatedRecruiter.getWebsite());
        recruiter.setAddress(updatedRecruiter.getAddress());
        recruiter.setContactNumber(updatedRecruiter.getContactNumber());
        return recruiterRepository.save(recruiter);
    }
    
    public Map<String, Object> getDashboardStats() {
        Recruiter recruiter = getCurrentRecruiter();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalCompanies", companyRepository.findByRecruiterId(recruiter.getId()).size());
        stats.put("totalJobs", jobRepository.findByRecruiterId(recruiter.getId()).size());
        stats.put("totalApplications", applicationRepository.findByJobRecruiterId(recruiter.getId()).size());
        stats.put("pendingRequests", jobRequestRepository.findByRecruiterIdAndStatus(
                recruiter.getId(), JobRequest.RequestStatus.PENDING).size());
        
        return stats;
    }
    
    // Company Management
    public List<Company> getCompanies() {
        Recruiter recruiter = getCurrentRecruiter();
        return companyRepository.findByRecruiterId(recruiter.getId());
    }
    
    @Transactional
    public Company createCompany(Company company) {
        Recruiter recruiter = getCurrentRecruiter();
        company.setRecruiter(recruiter);
        return companyRepository.save(company);
    }
    
    @Transactional
    public Company updateCompany(Long id, Company updatedCompany) {
        Recruiter recruiter = getCurrentRecruiter();
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        if (!company.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        company.setName(updatedCompany.getName());
        company.setIndustry(updatedCompany.getIndustry());
        company.setLocation(updatedCompany.getLocation());
        company.setDescription(updatedCompany.getDescription());
        company.setLogoUrl(updatedCompany.getLogoUrl());
        
        return companyRepository.save(company);
    }
    
    @Transactional
    public void deleteCompany(Long id) {
        Recruiter recruiter = getCurrentRecruiter();
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        if (!company.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        // Delete all jobs and related applications
        List<Job> jobs = jobRepository.findByCompanyId(id);
        for (Job job : jobs) {
            deleteJob(job.getId());
        }
        
        // Delete all departments
        List<Department> departments = departmentRepository.findByCompanyId(id);
        departmentRepository.deleteAll(departments);
        
        companyRepository.delete(company);
    }
    
    // Department Management
    public List<Department> getDepartments() {
        Recruiter recruiter = getCurrentRecruiter();
        List<Company> companies = companyRepository.findByRecruiterId(recruiter.getId());
        return companies.stream()
                .flatMap(company -> departmentRepository.findByCompanyId(company.getId()).stream())
                .toList();
    }
    
    @Transactional
    public Department createDepartment(Department department) {
        Recruiter recruiter = getCurrentRecruiter();
        Company company = companyRepository.findById(department.getCompany().getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        if (!company.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        return departmentRepository.save(department);
    }
    
    @Transactional
    public Department updateDepartment(Long id, Department updatedDepartment) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        
        department.setName(updatedDepartment.getName());
        department.setDescription(updatedDepartment.getDescription());
        
        return departmentRepository.save(department);
    }
    
    @Transactional
    public void deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id)
             .orElseThrow(() -> new RuntimeException("Department not found"));
             
        // Verify ownership via Company
        Recruiter recruiter = getCurrentRecruiter();
        if (!department.getCompany().getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        // Delete jobs associated with this department
        List<Job> jobs = jobRepository.findByDepartmentId(id);
        for (Job job : jobs) {
            deleteJob(job.getId());
        }

        departmentRepository.delete(department);
    }
    
    // Job Management
    public List<Job> getJobs() {
        Recruiter recruiter = getCurrentRecruiter();
        return jobRepository.findByRecruiterId(recruiter.getId());
    }
    
    @Transactional
    public Job createJob(Job job) {
        Recruiter recruiter = getCurrentRecruiter();
        job.setRecruiter(recruiter);
        return jobRepository.save(job);
    }
    
    @Transactional
    public Job updateJob(Long id, Job updatedJob) {
        Recruiter recruiter = getCurrentRecruiter();
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        
        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        job.setTitle(updatedJob.getTitle());
        job.setDescription(updatedJob.getDescription());
        job.setSkills(updatedJob.getSkills());
        job.setExperienceMin(updatedJob.getExperienceMin());
        job.setExperienceMax(updatedJob.getExperienceMax());
        job.setLocation(updatedJob.getLocation());
        job.setJobType(updatedJob.getJobType());
        job.setStatus(updatedJob.getStatus());
        
        return jobRepository.save(job);
    }
    
    @Transactional
    public void deleteJob(Long id) {
        Recruiter recruiter = getCurrentRecruiter();
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        
        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        // Delete related applications
        List<Application> applications = applicationRepository.findByJobId(id);
        applicationRepository.deleteAll(applications);
        
        jobRepository.delete(job);
    }
    
    // Job Request Management
    public List<JobRequest> getJobRequests() {
        Recruiter recruiter = getCurrentRecruiter();
        return jobRequestRepository.findByRecruiterId(recruiter.getId());
    }
    
    @Transactional
    public JobRequest acceptJobRequest(Long id) {
        JobRequest request = jobRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job request not found"));
        
        request.setStatus(JobRequest.RequestStatus.ACCEPTED);
        return jobRequestRepository.save(request);
    }
    
    @Transactional
    public JobRequest rejectJobRequest(Long id) {
        JobRequest request = jobRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job request not found"));
        
        request.setStatus(JobRequest.RequestStatus.REJECTED);
        return jobRequestRepository.save(request);
    }
    
    
    // Application Management
    public List<Application> getAllApplications() {
        Recruiter recruiter = getCurrentRecruiter();
        return applicationRepository.findByJobRecruiterId(recruiter.getId());
    }
    
    public List<Application> getJobApplications(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public Application getApplicationById(Long id) {
        Recruiter recruiter = getCurrentRecruiter();
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        
        // Ensure the application is for a job posted by this recruiter
        if (!application.getJob().getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException("Unauthorized: Application does not belong to your jobs");
        }
        
        return application;
    }
    
    @Transactional
    public Application updateApplicationStatus(Long id, Application.ApplicationStatus status, String notes) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        
        Application.ApplicationStatus oldStatus = application.getStatus();
        application.setStatus(status);
        if (notes != null) {
            application.setRecruiterNotes(notes);
        }
        
        application = applicationRepository.save(application);
        
        // Send email notification if status changed
        if (oldStatus != status) {
            try {
                Candidate candidate = application.getCandidate();
                Job job = application.getJob();
                User candidateUser = candidate.getUser();
                
                emailService.sendApplicationStatusUpdate(
                    candidateUser.getEmail(),
                    candidate.getFullName(),
                    job.getTitle(),
                    status.name(),
                    notes
                );
            } catch (Exception e) {
                log.error("Failed to send application status update email", e);
            }
        }
        
        return application;
    }
}
