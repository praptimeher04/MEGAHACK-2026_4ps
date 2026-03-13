package com.project.project.controller;

import com.project.project.entity.Complaint;
import com.project.project.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {
    
    @Autowired
    private ComplaintService complaintService;
    
    @PostMapping
    public ResponseEntity<?> createComplaint(@RequestBody Map<String, String> request) {
        try {
            Complaint complaint = complaintService.createComplaint(
                Long.parseLong(request.get("userId")),
                request.get("title"),
                request.get("description"),
                request.get("category"),
                request.get("customCategory"),
                request.get("location"),
                request.get("imageUrl")
            );
            return ResponseEntity.ok(complaint);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Complaint>> getComplaintsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(complaintService.getComplaintsByUser(userId));
    }
    
    @GetMapping
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }
}
