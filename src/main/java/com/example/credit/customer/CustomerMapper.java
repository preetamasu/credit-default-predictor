package com.example.credit.customer;

import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {

    public CustomerResponseDTO toResponse(Customer customer){
        return new CustomerResponseDTO(
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getPhoneNumber(),
                customer.getDOB(),
                customer.getCustomerStatus(),
                customer.getCreatedAt(),
                customer.getUpdatedAt()
        );
    }
}
