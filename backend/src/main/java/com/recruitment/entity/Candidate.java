package com.recruitment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "candidates")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    
    @Column(name = "full_name", nullable = false)
    private String fullName;
    
    private String phone;
    
    private String location;
    
    @Column(columnDefinition = "TEXT")
    private String skills;
    
    @Column(name = "experience_years")
    private Integer experienceYears;
    
    @Column(name = "resume_url")
    private String resumeUrl;
    
    @Column(name = "linkedin_url")
    private String linkedinUrl;
}
