package com.example.EmployeeSystem.services;


import com.example.EmployeeSystem.entity.EmployeeEntity;
import com.example.EmployeeSystem.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

@Service  // Marks this class as a Spring-managed service bean
public class EmployeeServices {

    @Autowired
   private EmployeeRepo EmpRepo;



    @Autowired
    EmployeeRepo employeeRepo;

    private List<EmployeeEntity> employees = new ArrayList<>();

    public List<EmployeeEntity> getEmployees() {

      return   employeeRepo.findAll();
        

    }

    public String createEmployee(EmployeeEntity employee) {

  Optional<EmployeeEntity> empEmail = employeeRepo.findByEmail(employee.getEmail());

        System.out.println((empEmail.isPresent()));
        System.out.println(!(empEmail.isPresent()));

        if (!empEmail.isPresent()){
            employeeRepo.save(employee);
            return "Employee created successfully";
        }else {
            return "Email is already Exist";
        }


    }

    public String deleteEmployee(Long id) {

        if(id != null){
            employeeRepo.deleteById(id);
            return "Employee Successfully Deleted with id"+id;

        }else{
            return "Something went wrong to delete employee";
        }


    }

    public Optional<EmployeeEntity> getEmployeeById(Long id) {

        return employeeRepo.findById(id);
    }

    public String getAllEmployee(List<EmployeeEntity> employees) {
for (EmployeeEntity singleEmp : employees){

    Optional<EmployeeEntity> emp = employeeRepo.findByEmail(singleEmp.getEmail());

    EmployeeEntity empMail = emp.orElseThrow(() -> new RuntimeException("Employee not found"));


    if (!emp.isPresent()){
        employeeRepo.saveAll(employees);
        return "ALl employees added Successfully";
    }else {
        return empMail.getEmail() +" this Email already exist ";
    }

}
return "";
    }

    public EmployeeEntity updateEmp(Long id,EmployeeEntity updatedEMp) {

        EmployeeEntity newEmployee = employeeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));

        newEmployee.setEmail(updatedEMp.getEmail());
        newEmployee.setMobile(updatedEMp.getMobile());
        newEmployee.setName(updatedEMp.getName());

        employeeRepo.save(newEmployee);
        return newEmployee;
    }
}
