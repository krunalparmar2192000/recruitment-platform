package com.recruitment.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class JobRequestDTO {
    
    private Long id;
    
    @NotNull(message = "Recruiter ID is required")
    private Long recruiterId;
    
    @NotBlank(message = "Company name is required")
    private String companyName;
    
    @NotBlank(message = "Contact name is required")
    private String contactName;
    
    @NotBlank(message = "Contact email is required")
    @Email(message = "Invalid email format")
    private String contactEmail;
    
    private String contactPhone;
    private String department;
    
    @NotBlank(message = "Job details are required")
    private String jobDetails;
    
    private String status;
}
