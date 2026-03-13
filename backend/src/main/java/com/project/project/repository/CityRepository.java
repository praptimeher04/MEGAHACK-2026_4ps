package com.project.project.repository;

import com.project.project.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
    boolean existsByCityCode(String cityCode);
    List<City> findByStateId(Long stateId);
}
