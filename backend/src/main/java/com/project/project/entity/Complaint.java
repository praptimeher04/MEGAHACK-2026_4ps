package com.project.project.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false, length = 1000)
    private String description;
    
    @Column(nullable = false)
    private String category;
    
    @Column
    private String customCategory;
    
    @Column(nullable = false)
    private String location;
    
    @Column
    @Lob
    private String imageUrl;
    
    @Column(nullable = false)
    private String status = "IN_PROGRESS";
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "department_id")
    private MunicipalDepartment department;
    
    @Column(nullable = false)
    private LocalDateTime createdDate = LocalDateTime.now();
    
    @Column
    private LocalDateTime updatedDate;
}
