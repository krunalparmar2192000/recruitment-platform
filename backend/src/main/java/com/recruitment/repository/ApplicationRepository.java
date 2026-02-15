package com.recruitment.repository;

import com.recruitment.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByCandidateId(Long candidateId);
    List<Application> findByJobId(Long jobId);
    List<Application> findByJobRecruiterId(Long recruiterId);
    Optional<Application> findByJobIdAndCandidateId(Long jobId, Long candidateId);
    Boolean existsByJobIdAndCandidateId(Long jobId, Long candidateId);
}
