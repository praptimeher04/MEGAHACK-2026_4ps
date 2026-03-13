package com.project.project.controller;

import com.project.project.entity.*;
import com.project.project.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private AdminService adminService;
    
    // State endpoints
    @PostMapping("/states")
    public ResponseEntity<?> createState(@RequestBody Map<String, String> request) {
        try {
            State state = adminService.createState(
                request.get("stateCode"), 
                request.get("stateName")
            );
            return ResponseEntity.ok(state);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @GetMapping("/states")
    public ResponseEntity<List<State>> getAllStates() {
        return ResponseEntity.ok(adminService.getAllStates());
    }
    
    @DeleteMapping("/states/{id}")
    public ResponseEntity<?> deleteState(@PathVariable Long id) {
        try {
            adminService.deleteState(id);
            return ResponseEntity.ok(Map.of("message", "State deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    // City endpoints
    @PostMapping("/cities")
    public ResponseEntity<?> createCity(@RequestBody Map<String, String> request) {
        try {
            City city = adminService.createCity(
                Long.parseLong(request.get("stateId")),
                request.get("cityCode"),
                request.get("cityName")
            );
            return ResponseEntity.ok(city);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @GetMapping("/cities")
    public ResponseEntity<List<City>> getAllCities() {
        return ResponseEntity.ok(adminService.getAllCities());
    }
    
    @GetMapping("/cities/state/{stateId}")
    public ResponseEntity<List<City>> getCitiesByState(@PathVariable Long stateId) {
        return ResponseEntity.ok(adminService.getCitiesByState(stateId));
    }
    
    @DeleteMapping("/cities/{id}")
    public ResponseEntity<?> deleteCity(@PathVariable Long id) {
        try {
            adminService.deleteCity(id);
            return ResponseEntity.ok(Map.of("message", "City deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    // Municipal Department endpoints
    @PostMapping("/municipal-departments")
    public ResponseEntity<?> createMunicipalDepartment(@RequestBody Map<String, String> request) {
        try {
            Long assignedUserId = request.get("assignedUserId") != null && !request.get("assignedUserId").isEmpty() 
                ? Long.parseLong(request.get("assignedUserId")) 
                : null;
                
            MunicipalDepartment dept = adminService.createMunicipalDepartment(
                Long.parseLong(request.get("cityId")),
                request.get("municipalId"),
                request.get("name"),
                request.get("mobileNumber"),
                request.get("locationLink"),
                request.get("officeImages"),
                request.get("pincode"),
                request.get("address"),
                assignedUserId
            );
            return ResponseEntity.ok(dept);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @GetMapping("/municipal-departments")
    public ResponseEntity<List<MunicipalDepartment>> getAllMunicipalDepartments() {
        return ResponseEntity.ok(adminService.getAllMunicipalDepartments());
    }
    
    @GetMapping("/municipal-departments/city/{cityId}")
    public ResponseEntity<List<MunicipalDepartment>> getMunicipalDepartmentsByCity(@PathVariable Long cityId) {
        return ResponseEntity.ok(adminService.getMunicipalDepartmentsByCity(cityId));
    }
    
    @DeleteMapping("/municipal-departments/{id}")
    public ResponseEntity<?> deleteMunicipalDepartment(@PathVariable Long id) {
        try {
            adminService.deleteMunicipalDepartment(id);
            return ResponseEntity.ok(Map.of("message", "Municipal department deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }
}
