package com.example.credit.application;

import com.example.credit.customer.Customer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CreditApplication {

    @Id
    @GeneratedValue(
            strategy = GenerationType.UUID
    )
    private UUID id;

    @ManyToOne
    @JoinColumn(
            name = "customer_id"
    )
    private Customer customer;

    private BigDecimal annualIncome;

    private BigDecimal loanAmount;

    private EmploymentStatus employmentStatus;

    private Integer employmentLengthMonths;

    private Integer creditScore;

    private BigDecimal debtToIncomeRatio;

    private LoanPurpose loanPurpose;

    private Integer requestedTermMonths;

    private CreditApplicationStatus creditApplicationStatus;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

