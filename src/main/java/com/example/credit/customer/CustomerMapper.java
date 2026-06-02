package com.example.credit.customer;

import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class CustomerMapper {

    public CustomerResponseDTO toResponse(Customer customer){
        return new CustomerResponseDTO(
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getPhoneNumber(),
                LocalDate.parse(customer.getDOB()),
                customer.getCustomerStatus(),
                customer.getCreatedAt(),
                customer.getUpdatedAt()
        );
    }
}
