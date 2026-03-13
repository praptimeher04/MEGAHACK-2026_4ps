package com.project.project.repository;

import com.project.project.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {
    boolean existsByStateCode(String stateCode);
}
