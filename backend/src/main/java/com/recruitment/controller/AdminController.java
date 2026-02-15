package com.recruitment.controller;

import com.recruitment.entity.Recruiter;
import com.recruitment.entity.User;
import com.recruitment.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    
    @Autowired
    private AdminService adminService;
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getPlatformStats() {
        return ResponseEntity.ok(adminService.getPlatformStats());
    }
    
    @GetMapping("/recruiters")
    public ResponseEntity<List<Recruiter>> getAllRecruiters() {
        return ResponseEntity.ok(adminService.getAllRecruiters());
    }
    
    @PostMapping("/recruiters")
    public ResponseEntity<Recruiter> createRecruiter(@jakarta.validation.Valid @RequestBody RecruiterCreateRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        
        Recruiter recruiter = new Recruiter();
        recruiter.setCompanyName(request.getCompanyName());
        recruiter.setContactNumber(request.getContactNumber());
        recruiter.setAddress(request.getAddress());
        recruiter.setWebsite(request.getWebsite());
        recruiter.setDescription(request.getDescription());
        
        return ResponseEntity.ok(adminService.createRecruiter(user, recruiter));
    }
    
    @PutMapping("/recruiters/{id}")
    public ResponseEntity<Recruiter> updateRecruiter(@PathVariable Long id, @RequestBody Recruiter recruiter) {
        return ResponseEntity.ok(adminService.updateRecruiter(id, recruiter));
    }
    
    @DeleteMapping("/recruiters/{id}")
    public ResponseEntity<Void> deleteRecruiter(@PathVariable Long id) {
        adminService.deleteRecruiter(id);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/recruiters/{id}/toggle-status")
    public ResponseEntity<Void> toggleRecruiterStatus(@PathVariable Long id) {
        adminService.toggleRecruiterStatus(id);
        return ResponseEntity.ok().build();
    }
    
    // Inner class for recruiter creation request
    public static class RecruiterCreateRequest {
        @jakarta.validation.constraints.NotBlank(message = "Email is required")
        @jakarta.validation.constraints.Email(message = "Invalid email format")
        private String email;
        
        @jakarta.validation.constraints.NotBlank(message = "Password is required")
        @jakarta.validation.constraints.Size(min = 6, message = "Password must be at least 6 characters")
        private String password;
        
        @jakarta.validation.constraints.NotBlank(message = "Company Name is required")
        private String companyName;
        
        private String contactNumber;
        private String address;
        private String website;
        private String description;
        
        // Getters and setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        
        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }
        
        public String getContactNumber() { return contactNumber; }
        public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
        
        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }
        
        public String getWebsite() { return website; }
        public void setWebsite(String website) { this.website = website; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }
}
