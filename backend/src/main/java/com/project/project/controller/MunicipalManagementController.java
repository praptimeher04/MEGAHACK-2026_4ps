package com.project.project.controller;

import com.project.project.service.MunicipalManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/municipal-management")
@CrossOrigin(origins = "*")
public class MunicipalManagementController {
    
    @Autowired
    private MunicipalManagementService municipalManagementService;
    
    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        try {
            Map<String, Integer> stats = municipalManagementService.getStats();
            return ResponseEntity.ok(stats);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @GetMapping("/complaints")
    public ResponseEntity<?> getAllComplaints() {
        try {
            List<?> complaints = municipalManagementService.getAllComplaints();
            return ResponseEntity.ok(complaints);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @PutMapping("/complaints/{complaintId}/status")
    public ResponseEntity<?> updateComplaintStatus(@PathVariable Long complaintId, 
                                                   @RequestBody Map<String, String> request) {
        try {
            municipalManagementService.updateComplaintStatus(complaintId, request.get("status"));
            return ResponseEntity.ok(Map.of("message", "Status updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
