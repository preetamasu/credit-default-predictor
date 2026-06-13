package com.example.credit.application;

import com.example.credit.customer.Customer;
import com.example.credit.customer.CustomerMapper;
import com.example.credit.customer.CustomerRepository;
import com.example.credit.exception.CreditApplicationNotFoundException;
import com.example.credit.exception.CustomerNotFoundException;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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

    @Cacheable(value = "APPLICATION_CACHE",key = "#id")
    public CreditApplicationResponseDTO getApplicationById(UUID id){
        CreditApplication creditApplication = creditApplicationRepository.findById(id).orElseThrow(()-> new CreditApplicationNotFoundException(id));

        return creditApplicationMapper.toResponse(creditApplication);
    }

    @CacheEvict(value= "APPLICATIONS_CACHE",key = "#result.id()")
    public CreditApplicationResponseDTO createApplication(CreditApplicationRequestDTO creditApplicationRequestDTO){
        Customer customer = customerRepository.findById(creditApplicationRequestDTO.customerId()).orElseThrow(()-> new CustomerNotFoundException("Couldn't find an customer with that id"+ creditApplicationRequestDTO.customerId()));

        CreditApplication creditApplication = creditApplicationMapper.toEntity(creditApplicationRequestDTO);

        creditApplication.setCustomer(customer);
        creditApplication.setCreditApplicationStatus(CreditApplicationStatus.SUBMITTED);
        creditApplication.setCreatedAt(LocalDateTime.now());
        creditApplication.setUpdatedAt(LocalDateTime.now());

        creditApplicationRepository.save(creditApplication);
        return creditApplicationMapper.toResponse(creditApplication);
    }

    @Cacheable(value = "APPLICATIONS_CACHE",key = "#customerId")
    public List<CreditApplicationResponseDTO> getApplicationsByCustomerId(UUID customerId){

        customerRepository.findById(customerId).orElseThrow(()-> new CustomerNotFoundException("Customer not found with id: "+ customerId));
         return creditApplicationRepository.findByCustomerId(customerId).stream().map(creditApplicationMapper::toResponse).toList();
    }
    public List<CreditApplicationResponseDTO> getAllApplications(){
        return creditApplicationRepository.findAll().stream().map(creditApplicationMapper::toResponse).toList();
    }
}
