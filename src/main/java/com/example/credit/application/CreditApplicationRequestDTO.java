package com.example.credit.application;

import jakarta.validation.constraints.*;
import org.aspectj.lang.annotation.RequiredTypes;

import java.math.BigDecimal;
import java.util.UUID;

public record CreditApplicationRequestDTO(
        @NotNull(message="Customer id is required")

        UUID customerId,
        @NotNull(message = "Loan amount is required")
        @Positive(message="Loan amount must be greater than zero")
        BigDecimal loanAmount,
        @NotNull(message="Annual income is required")
        @Positive(message = "Annual income must be greater than zero")
        BigDecimal annualIncome,


        @NotNull(message = "Employment status is required")
        EmploymentStatus employmentStatus,

        @NotNull(message = "Employment length is required")
        @PositiveOrZero(message = "Employment length must be zero or greater")
        Integer employmentLengthStatus,

        @NotNull(message = "Credit score is required")
        @Min(value = 300, message = "Credit score must be at least 300")
        @Max(value = 850, message = "Credit score must not exceed 850")
        Integer creditScore,
        @NotNull(message = "Debt to income ratio is required")
        @DecimalMin(value = "0.00", message = "Debt to income ratio must be at least 0.00")
        @DecimalMax(value = "1.00", message = "Debt to income ratio must not exceed 1.00")
        BigDecimal debtToIncomeRatio,
        @NotNull(message = "Loan purpose is required")

        LoanPurpose loanPurpose,
        @NotNull(message = "Requested term is required")
        @Min(value = 6, message = "Requested term must be at least 6 months")
        @Max(value = 360, message = "Requested term must not exceed 360 months")
        Integer requestedTermMonths
) {
}
