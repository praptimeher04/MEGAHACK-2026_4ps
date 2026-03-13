package com.project.project.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "municipal_departments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MunicipalDepartment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;
    
    @Column(nullable = false, unique = true)
    private String municipalId;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String mobileNumber;
    
    @Column(nullable = false)
    private String locationLink;
    
    @Column
    private String officeImages;
    
    @Column(nullable = false)
    private String pincode;
    
    @Column
    private String address;
    
    @ManyToOne
    @JoinColumn(name = "assigned_user_id")
    private User assignedUser;
}
