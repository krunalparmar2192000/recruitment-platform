package com.recruitment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class JobDTO {
    
    private Long id;
    
    @NotNull(message = "Company ID is required")
    private Long companyId;
    
    @NotNull(message = "Department ID is required")
    private Long departmentId;
    
    @NotBlank(message = "Job title is required")
    private String title;
    
    @NotBlank(message = "Job description is required")
    private String description;
    
    private String skills;
    private Integer experienceMin;
    private Integer experienceMax;
    private String location;
    private String jobType;
    private String status;
    
    // For response
    private String companyName;
    private String departmentName;
    private String recruiterName;
}
