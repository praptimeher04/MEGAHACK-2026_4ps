package com.project.project.service;

import com.project.project.config.JwtUtil;
import com.project.project.dto.LoginRequest;
import com.project.project.dto.LoginResponse;
import com.project.project.dto.RegisterRequest;
import com.project.project.dto.RegisterResponse;
import com.project.project.entity.User;
import com.project.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public RegisterResponse registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setName(request.getName());
        user.setFullName(request.getName());
        user.setEmail(request.getEmail());
        user.setMobileNumber(request.getMobileNumber());
        user.setPhoneNumber(request.getMobileNumber());
        user.setPassword(request.getPassword());
        user.setUserType("USER");
        user.setUsername(request.getEmail());
        user.setAddress("N/A");
        user.setCity("N/A");
        user.setPincode("000000");
        
        User savedUser = userRepository.save(user);
        
        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getId());
        
        return new RegisterResponse("User registered successfully", savedUser.getId(), token);
    }
    
    public LoginResponse loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getId());
        
        return new LoginResponse("Login successful", user.getId(), token);
    }
}