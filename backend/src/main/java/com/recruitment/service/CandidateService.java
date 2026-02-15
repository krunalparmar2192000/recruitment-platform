package com.recruitment.service;

import com.recruitment.entity.Application;
import com.recruitment.entity.Candidate;
import com.recruitment.entity.Job;
import com.recruitment.entity.User;
import com.recruitment.repository.ApplicationRepository;
import com.recruitment.repository.CandidateRepository;
import com.recruitment.repository.JobRepository;
import com.recruitment.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j

@Service
public class CandidateService {
    
    @Autowired
    private CandidateRepository candidateRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ApplicationRepository applicationRepository;
    
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private EmailService emailService;
    
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    public Map<String, Object> getDashboardStats() {
        User user = getCurrentUser();
        Candidate candidate = candidateRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Candidate profile not found"));
        
        List<Application> applications = applicationRepository.findByCandidateId(candidate.getId());
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalApplications", applications.size());
        stats.put("shortlisted", applications.stream()
                .filter(a -> a.getStatus() == Application.ApplicationStatus.SHORTLISTED).count());
        stats.put("rejected", applications.stream()
                .filter(a -> a.getStatus() == Application.ApplicationStatus.REJECTED).count());
        
        return stats;
    }
    
    public Candidate getProfile() {
        User user = getCurrentUser();
        return candidateRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Candidate profile not found"));
    }
    
    @Transactional
    public Candidate updateProfile(Candidate updatedProfile) {
        User user = getCurrentUser();
        Candidate candidate = candidateRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Candidate profile not found"));
        
        candidate.setFullName(updatedProfile.getFullName());
        candidate.setPhone(updatedProfile.getPhone());
        candidate.setLocation(updatedProfile.getLocation());
        candidate.setSkills(updatedProfile.getSkills());
        candidate.setExperienceYears(updatedProfile.getExperienceYears());
        candidate.setLinkedinUrl(updatedProfile.getLinkedinUrl());
        
        return candidateRepository.save(candidate);
    }
    
    @Transactional
    public String uploadResume(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("Please select a file to upload");
        }
        
        try {
            // Use FileStorageService for validation and storage
            String filename = fileStorageService.storeFile(file);
            
            // Update candidate profile
            String resumeUrl = "/uploads/resumes/" + filename;
            updateResume(resumeUrl);
            
            log.info("Resume uploaded successfully: {}", filename);
            return resumeUrl;
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload resume: " + e.getMessage());
        }
    }
    
    @Transactional
    public Candidate updateResume(String resumeUrl) {
        User user = getCurrentUser();
        Candidate candidate = candidateRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Candidate profile not found"));
        
        candidate.setResumeUrl(resumeUrl);
        return candidateRepository.save(candidate);
    }
    
    public List<Application> getApplications() {
        User user = getCurrentUser();
        Candidate candidate = candidateRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Candidate profile not found"));
        
        return applicationRepository.findByCandidateId(candidate.getId());
    }
    
    @Transactional
    public Application applyForJob(Long jobId) {
        User user = getCurrentUser();
        Candidate candidate = candidateRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Candidate profile not found"));
        
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        
        // Check if already applied
        if (applicationRepository.existsByJobIdAndCandidateId(jobId, candidate.getId())) {
            throw new RuntimeException("You have already applied for this job");
        }
        
        Application application = new Application();
        application.setJob(job);
        application.setCandidate(candidate);
        application.setStatus(Application.ApplicationStatus.APPLIED);
        application = applicationRepository.save(application);
        
        // Send confirmation email
        try {
            emailService.sendApplicationConfirmation(
                user.getEmail(),
                candidate.getFullName(),
                job.getTitle(),
                job.getCompany().getName()
            );
        } catch (Exception e) {
            log.error("Failed to send application confirmation email", e);
        }
        
        return application;
    }
}
