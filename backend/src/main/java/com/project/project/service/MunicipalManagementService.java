package com.project.project.service;

import com.project.project.repository.MunicipalDepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MunicipalManagementService {
    
    @Autowired
    private MunicipalDepartmentRepository municipalDepartmentRepository;
    
    @Autowired
    private ComplaintService complaintService;
    
    public Map<String, Integer> getStats() {
        Map<String, Integer> stats = new HashMap<>();
        List<?> complaints = complaintService.getAllComplaints();
        stats.put("totalDepartments", (int) municipalDepartmentRepository.count());
        stats.put("totalComplaints", complaints.size());
        stats.put("pendingComplaints", (int) complaints.stream().filter(c -> "PENDING".equals(((com.project.project.entity.Complaint)c).getStatus())).count());
        stats.put("resolvedComplaints", (int) complaints.stream().filter(c -> "RESOLVED".equals(((com.project.project.entity.Complaint)c).getStatus())).count());
        return stats;
    }
    
    public List<?> getAllComplaints() {
        return complaintService.getAllComplaints();
    }
    
    public void updateComplaintStatus(Long complaintId, String status) {
        complaintService.updateComplaintStatus(complaintId, status);
    }
}
