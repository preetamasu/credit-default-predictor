package com.example.credit.ml;

import java.math.BigDecimal;

public record MlPredictionResponseDTO(
        Integer prediction,
        String prediction_label,
        BigDecimal defaultProbability,
        String modelVersion
) {
}
