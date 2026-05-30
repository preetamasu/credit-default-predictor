package com.example.credit.customer;

public record CustomerRequestDTO(
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        String DOB
) {
}
