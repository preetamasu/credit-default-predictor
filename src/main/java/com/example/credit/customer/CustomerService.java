package com.example.credit.customer;

import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class CustomerService {

    private CustomerMapper customerMapper;

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository,CustomerMapper customerMapper){
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
    }


    public CustomerResponseDTO createCustomer(CustomerRequestDTO requestDTO){
        Customer customer = new Customer();
        customer.setFirstName(requestDTO.firstName());
        customer.setLastName(requestDTO.lastName());
        customer.setEmail(requestDTO.email());
        customer.setPhoneNumber(requestDTO.phoneNumber());
        customer.setDOB(LocalDate.parse(requestDTO.DOB()));

        return customerMapper.toResponse(customerRepository.save(customer));
    }
}
