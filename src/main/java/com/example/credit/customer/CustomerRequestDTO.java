package com.example.credit.customer;

import jakarta.validation.constraints.*;

public record CustomerRequestDTO(
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

        @Past(message = "Date of birth must be in the past")
        String DOB
) {
}
