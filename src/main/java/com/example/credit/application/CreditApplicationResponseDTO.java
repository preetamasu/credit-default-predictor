package com.example.credit.application;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record CreditApplicationResponseDTO(
        UUID id,
        UUID customerId,
        String customerFullName,
        BigDecimal loanAmount,
        BigDecimal annualIncome,
        EmploymentStatus employmentStatus,
        Integer employmentLengthMonths,
        Integer creditScore,
        BigDecimal debtToIncomeRatio,
        LoanPurpose loanPurpose,
        Integer requestedTermMonths,
        CreditApplicationStatus applicationStatus,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
