package com.example.credit.prediction;

import org.springframework.stereotype.Component;

@Component
public class PredictionMapper {
    public PredictionResponseDTO toResponse(Prediction prediction){
        return new PredictionResponseDTO(
                prediction.getId(),
                prediction.getCreditApplication().getId(),
                prediction.getDefaultProbability(),
                prediction.getRiskBand(),
                prediction.getPredictionStatus(),
                prediction.getModelVersion(),
                prediction.getCreatedAt()
                );

    }
}
