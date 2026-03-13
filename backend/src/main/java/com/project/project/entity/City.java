package com.project.project.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "cities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "state_id", nullable = false)
    private State state;
    
    @Column(nullable = false, unique = true)
    private String cityCode;
    
    @Column(nullable = false)
    private String cityName;
}
