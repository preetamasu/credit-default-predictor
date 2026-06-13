package com.example.credit.customer;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record CustomerResponseDTO(
        UUID id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        String dateOfBirth,
        CustomerStatus customerStatus,
        String createdAt,
        String updatedAt
) {
}
