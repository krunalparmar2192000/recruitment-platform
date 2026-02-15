package com.recruitment.controller;

import com.recruitment.entity.*;
import com.recruitment.service.RecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recruiter")
@PreAuthorize("hasRole('RECRUITER')")
public class RecruiterController {
    
    @Autowired
    private RecruiterService recruiterService;
    
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        return ResponseEntity.ok(recruiterService.getDashboardStats());
    }

    @GetMapping("/profile")
    public ResponseEntity<Recruiter> getProfile() {
        return ResponseEntity.ok(recruiterService.getProfile());
    }
    
    @PutMapping("/profile")
    public ResponseEntity<Recruiter> updateProfile(@RequestBody Recruiter recruiter) {
        return ResponseEntity.ok(recruiterService.updateProfile(recruiter));
    }
    
    // Company Management
    @GetMapping("/companies")
    public ResponseEntity<List<Company>> getCompanies() {
        return ResponseEntity.ok(recruiterService.getCompanies());
    }
    
    @PostMapping("/companies")
    public ResponseEntity<Company> createCompany(@RequestBody Company company) {
        return ResponseEntity.ok(recruiterService.createCompany(company));
    }
    
    @PutMapping("/companies/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable Long id, @RequestBody Company company) {
        return ResponseEntity.ok(recruiterService.updateCompany(id, company));
    }
    
    @DeleteMapping("/companies/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        recruiterService.deleteCompany(id);
        return ResponseEntity.ok().build();
    }
    
    // Department Management
    @GetMapping("/departments")
    public ResponseEntity<List<Department>> getDepartments() {
        return ResponseEntity.ok(recruiterService.getDepartments());
    }
    
    @PostMapping("/departments")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        return ResponseEntity.ok(recruiterService.createDepartment(department));
    }
    
    @PutMapping("/departments/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody Department department) {
        return ResponseEntity.ok(recruiterService.updateDepartment(id, department));
    }
    
    @DeleteMapping("/departments/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        recruiterService.deleteDepartment(id);
        return ResponseEntity.ok().build();
    }
    
    // Job Management
    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getJobs() {
        return ResponseEntity.ok(recruiterService.getJobs());
    }
    
    @PostMapping("/jobs")
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        return ResponseEntity.ok(recruiterService.createJob(job));
    }
    
    @PutMapping("/jobs/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody Job job) {
        return ResponseEntity.ok(recruiterService.updateJob(id, job));
    }
    
    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        recruiterService.deleteJob(id);
        return ResponseEntity.ok().build();
    }
    
    // Job Request Management
    @GetMapping("/job-requests")
    public ResponseEntity<List<JobRequest>> getJobRequests() {
        return ResponseEntity.ok(recruiterService.getJobRequests());
    }
    
    @PutMapping("/job-requests/{id}/accept")
    public ResponseEntity<JobRequest> acceptJobRequest(@PathVariable Long id) {
        return ResponseEntity.ok(recruiterService.acceptJobRequest(id));
    }
    
    @PutMapping("/job-requests/{id}/reject")
    public ResponseEntity<JobRequest> rejectJobRequest(@PathVariable Long id) {
        return ResponseEntity.ok(recruiterService.rejectJobRequest(id));
    }
    
    
    // Application Management
    @GetMapping("/applications")
    public ResponseEntity<List<Application>> getAllApplications() {
        return ResponseEntity.ok(recruiterService.getAllApplications());
    }
    
    @GetMapping("/jobs/{jobId}/applications")
    public ResponseEntity<List<Application>> getJobApplications(@PathVariable Long jobId) {
        return ResponseEntity.ok(recruiterService.getJobApplications(jobId));
    }
    
    @GetMapping("/applications/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long id) {
        return ResponseEntity.ok(recruiterService.getApplicationById(id));
    }
    
    @PutMapping("/applications/{id}")
    public ResponseEntity<Application> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody ApplicationUpdateRequest request) {
        return ResponseEntity.ok(recruiterService.updateApplicationStatus(
                id, 
                Application.ApplicationStatus.valueOf(request.getStatus()), 
                request.getRecruiterNotes()
        ));
    }
    
    // Inner class for application update request
    public static class ApplicationUpdateRequest {
        private String status;
        private String recruiterNotes;
        
        public String getStatus() {
            return status;
        }
        
        public void setStatus(String status) {
            this.status = status;
        }
        
        public String getRecruiterNotes() {
            return recruiterNotes;
        }
        
        public void setRecruiterNotes(String recruiterNotes) {
            this.recruiterNotes = recruiterNotes;
        }
    }
}
