package com.project.project.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String mobileNumber;
    private String password;
}