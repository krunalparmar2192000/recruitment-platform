package com.recruitment.controller;

import com.recruitment.dto.JobRequestDTO;
import com.recruitment.entity.JobRequest;
import com.recruitment.entity.Recruiter;
import com.recruitment.repository.JobRequestRepository;
import com.recruitment.repository.RecruiterRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public")
public class PublicController {
    
    @Autowired
    private RecruiterRepository recruiterRepository;
    
    @Autowired
    private JobRequestRepository jobRequestRepository;
    
    @GetMapping("/recruiters")
    public ResponseEntity<List<Recruiter>> getAllRecruiters() {
        return ResponseEntity.ok(recruiterRepository.findAll());
    }
    
    @PostMapping("/job-requests")
    public ResponseEntity<JobRequestDTO> submitJobRequest(@Valid @RequestBody JobRequestDTO request) {
        Recruiter recruiter = recruiterRepository.findById(request.getRecruiterId())
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        
        JobRequest jobRequest = new JobRequest();
        jobRequest.setRecruiter(recruiter);
        jobRequest.setCompanyName(request.getCompanyName());
        jobRequest.setContactName(request.getContactName());
        jobRequest.setContactEmail(request.getContactEmail());
        jobRequest.setContactPhone(request.getContactPhone());
        jobRequest.setDepartment(request.getDepartment());
        jobRequest.setJobDetails(request.getJobDetails());
        jobRequest.setStatus(JobRequest.RequestStatus.PENDING);
        
        jobRequest = jobRequestRepository.save(jobRequest);
        
        JobRequestDTO responseDTO = convertToDTO(jobRequest);
        return ResponseEntity.ok(responseDTO);
    }
    
    private JobRequestDTO convertToDTO(JobRequest jobRequest) {
        JobRequestDTO dto = new JobRequestDTO();
        dto.setId(jobRequest.getId());
        dto.setRecruiterId(jobRequest.getRecruiter().getId());
        dto.setCompanyName(jobRequest.getCompanyName());
        dto.setContactName(jobRequest.getContactName());
        dto.setContactEmail(jobRequest.getContactEmail());
        dto.setContactPhone(jobRequest.getContactPhone());
        dto.setDepartment(jobRequest.getDepartment());
        dto.setJobDetails(jobRequest.getJobDetails());
        dto.setStatus(jobRequest.getStatus().name());
        return dto;
    }
}
