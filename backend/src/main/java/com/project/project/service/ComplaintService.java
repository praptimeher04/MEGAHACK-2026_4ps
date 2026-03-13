package com.project.project.service;

import com.project.project.entity.Complaint;
import com.project.project.entity.User;
import com.project.project.repository.ComplaintRepository;
import com.project.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintService {
    
    @Autowired
    private ComplaintRepository complaintRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Complaint createComplaint(Long userId, String title, String description, 
                                     String category, String customCategory, 
                                     String location, String imageUrl) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Complaint complaint = new Complaint();
        complaint.setUser(user);
        complaint.setTitle(title);
        complaint.setDescription(description);
        complaint.setCategory(category);
        complaint.setCustomCategory(customCategory);
        complaint.setLocation(location);
        complaint.setImageUrl(imageUrl);
        complaint.setStatus("IN_PROGRESS");
        complaint.setCreatedDate(LocalDateTime.now());
        
        return complaintRepository.save(complaint);
    }
    
    public List<Complaint> getComplaintsByUser(Long userId) {
        return complaintRepository.findByUserId(userId);
    }
    
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }
    
    public void updateComplaintStatus(Long complaintId, String status) {
        Complaint complaint = complaintRepository.findById(complaintId)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));
        complaint.setStatus(status);
        complaint.setUpdatedDate(LocalDateTime.now());
        complaintRepository.save(complaint);
    }
}
