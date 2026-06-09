package com.example.credit.dto;

public record RegisterDTO(
        String email,
        String password,
        String firstName,
        String lastName
) {

}
