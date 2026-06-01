package com.example.credit.application;

import java.math.BigDecimal;
import java.util.UUID;

public record CreditApplicationRequestDTO(
        UUID customerId,
        BigDecimal loanAmount,
        BigDecimal annualIncome,
        EmploymentStatus employmentStatus,
        Integer employmentLengthStatus,
        Integer creditScore,
        BigDecimal debtToIncomeRatio,
        LoanPurpose loanPurpose,
        Integer requestedTermMonths
) {
}
