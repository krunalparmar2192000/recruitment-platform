package com.recruitment.controller;

import com.recruitment.entity.Application;
import com.recruitment.entity.Candidate;
import com.recruitment.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/candidate")
@PreAuthorize("hasRole('CANDIDATE')")
public class CandidateController {
    
    @Autowired
    private CandidateService candidateService;
    
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        return ResponseEntity.ok(candidateService.getDashboardStats());
    }
    
    @GetMapping("/profile")
    public ResponseEntity<Candidate> getProfile() {
        return ResponseEntity.ok(candidateService.getProfile());
    }
    
    @PutMapping("/profile")
    public ResponseEntity<Candidate> updateProfile(@RequestBody Candidate candidate) {
        return ResponseEntity.ok(candidateService.updateProfile(candidate));
    }
    
    @PostMapping("/resume")
    public ResponseEntity<Map<String, String>> uploadResume(@RequestParam("file") MultipartFile file) {
        try {
            String resumeUrl = candidateService.uploadResume(file);
            return ResponseEntity.ok(Map.of("message", "Resume uploaded successfully", "resumeUrl", resumeUrl));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/applications")
    public ResponseEntity<List<Application>> getApplications() {
        return ResponseEntity.ok(candidateService.getApplications());
    }
    
    @PostMapping("/applications")
    public ResponseEntity<Application> applyForJob(@RequestBody ApplicationRequest request) {
        return ResponseEntity.ok(candidateService.applyForJob(request.getJobId()));
    }
    
    // Inner class for application request
    public static class ApplicationRequest {
        private Long jobId;
        
        public Long getJobId() {
            return jobId;
        }
        
        public void setJobId(Long jobId) {
            this.jobId = jobId;
        }
    }
}
