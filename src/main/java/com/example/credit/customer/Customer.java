package com.example.credit.customer;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Customer {

    @Id
    @GeneratedValue
            (
                    strategy = GenerationType.UUID
            )
    private UUID id;

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private LocalDate DOB;
    private CustomerStatus customerStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
