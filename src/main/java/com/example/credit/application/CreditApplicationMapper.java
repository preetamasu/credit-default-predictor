package com.example.credit.application;

import com.example.credit.customer.CustomerRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CreditApplicationMapper {


    public CreditApplication toEntity(CreditApplicationRequestDTO creditApplicationRequestDTO){
        CreditApplication creditApplication = new CreditApplication();
        creditApplication.setLoanAmount(creditApplicationRequestDTO.loanAmount());
        creditApplication.setAnnualIncome(creditApplicationRequestDTO.annualIncome());
        creditApplication.setEmploymentStatus(creditApplicationRequestDTO.employmentStatus());
        creditApplication.setEmploymentLengthMonths(creditApplicationRequestDTO.employmentLengthStatus());
        creditApplication.setCreditScore(creditApplicationRequestDTO.creditScore());
        creditApplication.setDebtToIncomeRatio(creditApplicationRequestDTO.debtToIncomeRatio());
        creditApplication.setLoanPurpose(creditApplicationRequestDTO.loanPurpose());
        creditApplication.setRequestedTermMonths(creditApplicationRequestDTO.requestedTermMonths());

        return creditApplication;

    }

    public CreditApplicationResponseDTO toResponse(CreditApplication creditApplication){
       String fullName = creditApplication.getCustomer().getFirstName() + " " + creditApplication.getCustomer().getLastName();

       return new CreditApplicationResponseDTO(
               creditApplication.getId(),
               creditApplication.getCustomer().getId(),
               fullName,
               creditApplication.getLoanAmount(),
               creditApplication.getAnnualIncome(),
               creditApplication.getEmploymentStatus(),
               creditApplication.getEmploymentLengthMonths(),
               creditApplication.getCreditScore(),
               creditApplication.getDebtToIncomeRatio(),
               creditApplication.getLoanPurpose(),
               creditApplication.getRequestedTermMonths(),
               creditApplication.getCreditApplicationStatus(),
               creditApplication.getCreatedAt(),
               creditApplication.getUpdatedAt()
       );
    }
}
