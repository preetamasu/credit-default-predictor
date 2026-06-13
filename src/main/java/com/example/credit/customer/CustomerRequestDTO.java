package com.example.credit.customer;

import jakarta.validation.constraints.*;

public record   CustomerRequestDTO(
        @NotBlank
        String firstName,
        @NotNull
        String lastName,
        @Email
        @NotNull
        String email,
        @Size(
                max = 20, message = "Phone number must not exceed 20 characters"
        )
        String phoneNumber,

        @NotBlank(message = "Date of birth is required")
        @Pattern(
                regexp = "^\\d{4}-\\d{2}-\\d{2}$",
                message = "Date of birth must be in yyyy-MM-dd format"
        )
        String DOB
) {
}
