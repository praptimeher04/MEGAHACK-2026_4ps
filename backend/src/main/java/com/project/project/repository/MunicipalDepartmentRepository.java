package com.project.project.repository;

import com.project.project.entity.MunicipalDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MunicipalDepartmentRepository extends JpaRepository<MunicipalDepartment, Long> {
    boolean existsByMunicipalId(String municipalId);
    List<MunicipalDepartment> findByCityId(Long cityId);
}
