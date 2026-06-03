package com.example.credit.prediction;

import java.math.BigDecimal;

public record MlPredictionRequestDTO(
        Integer person_age,
        BigDecimal person_income,
        BigDecimal person_emp_length,
        Integer loan_grade,
        BigDecimal loan_amnt,
        BigDecimal loan_int_rate,
        BigDecimal loan_percent_income,
        Integer cb_person_default_on_file,
        Integer cb_person_cred_hist_length,
        String person_home_ownership,
        String loan_intent
) {
}
