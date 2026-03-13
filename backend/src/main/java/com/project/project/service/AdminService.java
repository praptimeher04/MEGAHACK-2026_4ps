package com.project.project.service;

import com.project.project.entity.*;
import com.project.project.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminService {
    
    @Autowired
    private StateRepository stateRepository;
    
    @Autowired
    private CityRepository cityRepository;
    
    @Autowired
    private MunicipalDepartmentRepository municipalDepartmentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    // State operations
    public State createState(String stateCode, String stateName) {
        if (stateRepository.existsByStateCode(stateCode)) {
            throw new RuntimeException("State code already exists");
        }
        State state = new State();
        state.setStateCode(stateCode);
        state.setStateName(stateName);
        return stateRepository.save(state);
    }
    
    public List<State> getAllStates() {
        return stateRepository.findAll();
    }
    
    public void deleteState(Long id) {
        stateRepository.deleteById(id);
    }
    
    // City operations
    public City createCity(Long stateId, String cityCode, String cityName) {
        if (cityRepository.existsByCityCode(cityCode)) {
            throw new RuntimeException("City code already exists");
        }
        State state = stateRepository.findById(stateId)
            .orElseThrow(() -> new RuntimeException("State not found"));
        
        City city = new City();
        city.setState(state);
        city.setCityCode(cityCode);
        city.setCityName(cityName);
        return cityRepository.save(city);
    }
    
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }
    
    public List<City> getCitiesByState(Long stateId) {
        return cityRepository.findByStateId(stateId);
    }
    
    public void deleteCity(Long id) {
        cityRepository.deleteById(id);
    }
    
    // Municipal Department operations
    public MunicipalDepartment createMunicipalDepartment(Long cityId, String municipalId, 
            String name, String mobileNumber, String locationLink, String officeImages, 
            String pincode, String address, Long assignedUserId) {
        if (municipalDepartmentRepository.existsByMunicipalId(municipalId)) {
            throw new RuntimeException("Municipal ID already exists");
        }
        
        City city = cityRepository.findById(cityId)
            .orElseThrow(() -> new RuntimeException("City not found"));
        
        MunicipalDepartment dept = new MunicipalDepartment();
        dept.setCity(city);
        dept.setMunicipalId(municipalId);
        dept.setName(name);
        dept.setMobileNumber(mobileNumber);
        dept.setLocationLink(locationLink);
        dept.setOfficeImages(officeImages);
        dept.setPincode(pincode);
        dept.setAddress(address);
        
        if (assignedUserId != null) {
            User user = userRepository.findById(assignedUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));
            dept.setAssignedUser(user);
        }
        
        return municipalDepartmentRepository.save(dept);
    }
    
    public List<MunicipalDepartment> getAllMunicipalDepartments() {
        return municipalDepartmentRepository.findAll();
    }
    
    public List<MunicipalDepartment> getMunicipalDepartmentsByCity(Long cityId) {
        return municipalDepartmentRepository.findByCityId(cityId);
    }
    
    public void deleteMunicipalDepartment(Long id) {
        municipalDepartmentRepository.deleteById(id);
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
