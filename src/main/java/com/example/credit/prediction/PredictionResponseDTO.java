package com.example.credit.prediction;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record PredictionResponseDTO(
        UUID id,
        UUID application_Id,
        BigDecimal defaultProbability,
        RiskBand riskBand,
        PredictionStatus predictionStatus,
        String modelVersion,
        LocalDateTime createdAt
) {
}
