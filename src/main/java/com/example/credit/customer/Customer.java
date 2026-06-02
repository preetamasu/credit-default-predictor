package com.example.credit.customer;

import com.example.credit.application.CreditApplication;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
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

    @OneToMany(
            mappedBy = "customer"
    )
    private List<CreditApplication> creditApplication;

}
