package com.recruitment.controller;

import com.recruitment.dto.JobDTO;
import com.recruitment.entity.Job;
import com.recruitment.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    
    @Autowired
    private JobRepository jobRepository;
    
    @GetMapping
    public ResponseEntity<List<JobDTO>> getAllJobs(
            @RequestParam(required = false) Long companyId,
            @RequestParam(required = false) Long departmentId,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String status) {
        
        Job.JobStatus jobStatus = status != null ? Job.JobStatus.valueOf(status) : null;
        List<Job> jobs = jobRepository.findByFilters(companyId, departmentId, location, jobStatus);
        
        List<JobDTO> jobDTOs = jobs.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(jobDTOs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJobById(@PathVariable Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        return ResponseEntity.ok(convertToDTO(job));
    }
    
    private JobDTO convertToDTO(Job job) {
        JobDTO dto = new JobDTO();
        dto.setId(job.getId());
        dto.setCompanyId(job.getCompany().getId());
        dto.setDepartmentId(job.getDepartment().getId());
        dto.setTitle(job.getTitle());
        dto.setDescription(job.getDescription());
        dto.setSkills(job.getSkills());
        dto.setExperienceMin(job.getExperienceMin());
        dto.setExperienceMax(job.getExperienceMax());
        dto.setLocation(job.getLocation());
        dto.setJobType(job.getJobType());
        dto.setStatus(job.getStatus().name());
        dto.setCompanyName(job.getCompany().getName());
        dto.setDepartmentName(job.getDepartment().getName());
        dto.setRecruiterName(job.getRecruiter().getCompanyName());
        return dto;
    }
}
