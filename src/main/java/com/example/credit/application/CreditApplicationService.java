package com.example.credit.application;

import com.example.credit.customer.Customer;
import com.example.credit.customer.CustomerMapper;
import com.example.credit.customer.CustomerRepository;
import com.example.credit.exception.CreditApplicationNotFoundException;
import com.example.credit.exception.CustomerNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CreditApplicationService {

    private final CreditApplicationRepository creditApplicationRepository;

    private final CustomerRepository customerRepository;

    private final CreditApplicationMapper creditApplicationMapper;

    public CreditApplicationService(CreditApplicationRepository creditApplicationRepository, CustomerRepository customerRepository, CreditApplicationMapper creditApplicationMapper){
        this.creditApplicationRepository = creditApplicationRepository;
        this.customerRepository = customerRepository;
        this.creditApplicationMapper = creditApplicationMapper;
    }

    public CreditApplicationResponseDTO getApplicationById(UUID id){
        CreditApplication creditApplication = creditApplicationRepository.findById(id).orElseThrow(()-> new CreditApplicationNotFoundException(id));

        return creditApplicationMapper.toResponse(creditApplication);
    }

    public CreditApplicationResponseDTO createApplication(CreditApplicationRequestDTO creditApplicationRequestDTO){
        Customer customer = customerRepository.findById(creditApplicationRequestDTO.customerId()).orElseThrow(()-> new CustomerNotFoundException("Couldn't find an customer with that id"+ creditApplicationRequestDTO.customerId()));

        CreditApplication creditApplication = creditApplicationMapper.toEntity(creditApplicationRequestDTO);

        creditApplication.setCustomer(customer);

        CreditApplicationResponseDTO savedApplication = creditApplicationMapper.toResponse(creditApplication);
        return savedApplication;
    }
}
