package com.example.EmployeeSystem.controller;
import java.util.*;


import com.example.EmployeeSystem.entity.EmployeeEntity;
import com.example.EmployeeSystem.services.EmployeeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173/")
public class EmpController {

    @Autowired
    EmployeeServices empService;


    @GetMapping("/info")
    public  List<EmployeeEntity> getAllEmployee(){
        return empService.getEmployees();
    }

    @GetMapping("/info/{id}")
    public Optional<EmployeeEntity> getEmployeeById(@PathVariable Long id){
        return empService.getEmployeeById(id);
    }

    @PostMapping("/addAllEmp")
    public String getAllEmployee(@RequestBody List<EmployeeEntity> employees){
        return empService.getAllEmployee(employees);
    }

    @PostMapping("/addEmp")
    public String createEmployee(@RequestBody EmployeeEntity employee){


        return   empService.createEmployee(employee);

    }

    @DeleteMapping("/info/{id}")
    public String deleteEmployee(@PathVariable Long id){

        return empService.deleteEmployee(id);
    }

    @PutMapping("/updateEmp/{id}")
    public EmployeeEntity updateEmployee(@PathVariable Long id,@RequestBody EmployeeEntity newEmployee){
        return empService.updateEmp(id,newEmployee);
    }
}
