package com.recruitment.repository;

import com.recruitment.entity.JobRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRequestRepository extends JpaRepository<JobRequest, Long> {
    List<JobRequest> findByRecruiterId(Long recruiterId);
    List<JobRequest> findByStatus(JobRequest.RequestStatus status);
    List<JobRequest> findByRecruiterIdAndStatus(Long recruiterId, JobRequest.RequestStatus status);
}
