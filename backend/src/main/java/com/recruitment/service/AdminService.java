package com.recruitment.service;

import com.recruitment.entity.Recruiter;
import com.recruitment.entity.User;
import com.recruitment.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RecruiterRepository recruiterRepository;
    
    @Autowired
    private CandidateRepository candidateRepository;
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private ApplicationRepository applicationRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public Map<String, Object> getPlatformStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalRecruiters", recruiterRepository.count());
        stats.put("totalCandidates", candidateRepository.count());
        stats.put("totalJobs", jobRepository.count());
        stats.put("totalApplications", applicationRepository.count());
        
        return stats;
    }
    
    public List<Recruiter> getAllRecruiters() {
        return recruiterRepository.findAll();
    }
    
    @Transactional
    public Recruiter createRecruiter(User user, Recruiter recruiterProfile) {
        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Create user account
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(User.Role.RECRUITER);
        user.setActive(true);
        user = userRepository.save(user);
        
        // Create recruiter profile
        recruiterProfile.setUser(user);
        return recruiterRepository.save(recruiterProfile);
    }
    
    @Transactional
    public Recruiter updateRecruiter(Long id, Recruiter updatedRecruiter) {
        Recruiter recruiter = recruiterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        
        recruiter.setCompanyName(updatedRecruiter.getCompanyName());
        recruiter.setContactNumber(updatedRecruiter.getContactNumber());
        recruiter.setAddress(updatedRecruiter.getAddress());
        recruiter.setWebsite(updatedRecruiter.getWebsite());
        recruiter.setDescription(updatedRecruiter.getDescription());
        
        return recruiterRepository.save(recruiter);
    }
    
    @Transactional
    public void deleteRecruiter(Long id) {
        Recruiter recruiter = recruiterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        
        // Delete user account (cascade will delete recruiter profile)
        userRepository.delete(recruiter.getUser());
    }
    
    @Transactional
    public void toggleRecruiterStatus(Long id) {
        Recruiter recruiter = recruiterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        
        User user = recruiter.getUser();
        user.setActive(!user.getActive());
        userRepository.save(user);
    }
}
