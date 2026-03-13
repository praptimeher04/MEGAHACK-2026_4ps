package com.project.project.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String message;
    private Long userId;
    private String token;
    private Integer userType;
    
    public LoginResponse(String message) {
        this.message = message;
        this.userId = null;
        this.token = null;
        this.userType = null;
    }
}