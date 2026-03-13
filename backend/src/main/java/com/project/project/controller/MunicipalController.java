package com.project.project.controller;

import com.project.project.entity.MunicipalDepartment;
import com.project.project.service.MunicipalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/municipal")
@CrossOrigin(origins = "*")
public class MunicipalController {
    
    @Autowired
    private MunicipalService municipalService;
    
    @GetMapping("/department/{userId}")
    public ResponseEntity<?> getMunicipalDepartmentByUser(@PathVariable Long userId) {
        try {
            MunicipalDepartment dept = municipalService.getMunicipalDepartmentByUserId(userId);
            return ResponseEntity.ok(dept);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @GetMapping("/complaints/{userId}")
    public ResponseEntity<?> getComplaintsByMunicipalUser(@PathVariable Long userId) {
        try {
            List<?> complaints = municipalService.getComplaintsByMunicipalUser(userId);
            return ResponseEntity.ok(complaints);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @PutMapping("/complaints/{complaintId}/status")
    public ResponseEntity<?> updateComplaintStatus(@PathVariable Long complaintId, 
                                                   @RequestBody Map<String, String> request) {
        try {
            municipalService.updateComplaintStatus(complaintId, request.get("status"));
            return ResponseEntity.ok(Map.of("message", "Status updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
