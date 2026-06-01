package com.example.credit.customer;

import com.example.credit.exception.CustomerNotFoundException;
import com.example.credit.exception.DuplicateEmailException;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {

    private final CustomerMapper customerMapper;

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository,CustomerMapper customerMapper){
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
    }


    public CustomerResponseDTO createCustomer(CustomerRequestDTO requestDTO){

        if(customerRepository.existsByEmail(requestDTO.email())){
            throw new DuplicateEmailException("Customer exits with this email" + requestDTO.email());

        }

        Customer customer = new Customer();
        customer.setFirstName(requestDTO.firstName());
        customer.setLastName(requestDTO.lastName());
        customer.setCustomerStatus(CustomerStatus.ACTIVE);
        customer.setEmail(requestDTO.email());
        customer.setPhoneNumber(requestDTO.phoneNumber());
        customer.setDOB(LocalDate.parse(requestDTO.DOB()));

        return customerMapper.toResponse(customerRepository.save(customer));
    }

    public CustomerResponseDTO getCustomerById(UUID id){
        Customer customer = customerRepository.findById(id).orElseThrow( ()-> new CustomerNotFoundException("Customer not found with id: " + id));
        return customerMapper.toResponse(customer);
    }

    public List<CustomerResponseDTO> getAllCustomers(){
            return customerRepository.findAll().stream().map(customerMapper::toResponse).toList();
    }

    public CustomerResponseDTO updateCustomer(UUID customerId,CustomerRequestDTO customerRequestDTO){
        Customer customer  = customerRepository.findById(customerId).orElseThrow(()-> new CustomerNotFoundException("No customer found with that Id"+ customerId));

        if(customerRepository.existsByEmailAndIdNot(customerRequestDTO.email(),customerId)){
            throw new DuplicateEmailException("There already exists an email"+ customerRequestDTO.email());
        }
        customer.setFirstName(customerRequestDTO.firstName());
        customer.setLastName(customerRequestDTO.lastName());
        customer.setEmail(customerRequestDTO.email());
        customer.setDOB(LocalDate.parse(customerRequestDTO.DOB()));
        customer.setPhoneNumber(customerRequestDTO.phoneNumber());

        return customerMapper.toResponse(customerRepository.save(customer));
    }

    public void deleteCustomer(UUID id){

        Customer customer = customerRepository.findById(id).orElseThrow(()-> new CustomerNotFoundException("Customer not found with id:"+id));
        customer.setCustomerStatus(CustomerStatus.DELETED);

        customerRepository.save(customer);
    }
}
