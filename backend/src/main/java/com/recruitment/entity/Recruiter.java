package com.recruitment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recruiters")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recruiter {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    
    @Column(name = "company_name", nullable = false)
    private String companyName;
    
    @Column(name = "contact_number")
    private String contactNumber;
    
    @Column(columnDefinition = "TEXT")
    private String address;
    
    private String website;
    
    @Column(columnDefinition = "TEXT")
    private String description;
}
