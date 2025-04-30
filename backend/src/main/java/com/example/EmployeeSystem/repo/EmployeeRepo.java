package com.example.EmployeeSystem.repo;


import com.example.EmployeeSystem.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepo extends JpaRepository<EmployeeEntity,Long > {

    Optional<EmployeeEntity> findByEmail(String email);

}
