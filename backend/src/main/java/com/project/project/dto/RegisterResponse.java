package com.project.project.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class RegisterResponse {
    private String message;
    private Long userId;
    private String token;
    
    public RegisterResponse(String message, Long userId) {
        this.message = message;
        this.userId = userId;
        this.token = null;
    }
}