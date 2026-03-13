package com.project.project.service;

import com.project.project.entity.MunicipalDepartment;
import com.project.project.repository.MunicipalDepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class MunicipalService {
    
    @Autowired
    private MunicipalDepartmentRepository municipalDepartmentRepository;
    
    public MunicipalDepartment getMunicipalDepartmentByUserId(Long userId) {
        List<MunicipalDepartment> departments = municipalDepartmentRepository.findAll();
        return departments.stream()
            .filter(dept -> dept.getAssignedUser() != null && dept.getAssignedUser().getId().equals(userId))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("No municipal department assigned to this user"));
    }
    
    public List<?> getComplaintsByMunicipalUser(Long userId) {
        // For now returning empty list, will be implemented when complaint entity is created
        return new ArrayList<>();
    }
    
    public void updateComplaintStatus(Long complaintId, String status) {
        // Will be implemented when complaint entity is created
        throw new RuntimeException("Complaint management not yet implemented");
    }
}
