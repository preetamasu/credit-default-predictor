package com.example.credit.exception;

import java.util.UUID;

public class PredictionNotFoundException extends RuntimeException {
    public PredictionNotFoundException(UUID uuid) {
        super("Cannot find prediction with this id: " + uuid);
    }
}
