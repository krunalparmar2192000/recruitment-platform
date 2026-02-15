package com.recruitment.repository;

import com.recruitment.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByRecruiterId(Long recruiterId);
    List<Job> findByCompanyId(Long companyId);
    List<Job> findByDepartmentId(Long departmentId);
    List<Job> findByStatus(Job.JobStatus status);
    
    @Query("SELECT j FROM Job j WHERE " +
           "(:companyId IS NULL OR j.company.id = :companyId) AND " +
           "(:departmentId IS NULL OR j.department.id = :departmentId) AND " +
           "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:status IS NULL OR j.status = :status)")
    List<Job> findByFilters(
        @Param("companyId") Long companyId,
        @Param("departmentId") Long departmentId,
        @Param("location") String location,
        @Param("status") Job.JobStatus status
    );
}
