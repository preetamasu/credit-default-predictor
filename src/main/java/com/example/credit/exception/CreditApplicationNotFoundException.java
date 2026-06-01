package com.example.credit.exception;

import java.util.UUID;

public class CreditApplicationNotFoundException extends RuntimeException {
    public CreditApplicationNotFoundException(UUID id) {
        super("Credit application was not found with this id"+id);
    }
}
