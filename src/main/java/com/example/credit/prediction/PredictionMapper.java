package com.example.credit.prediction;

import com.example.credit.application.CreditApplication;
import com.example.credit.ml.MlPredictionResponseDTO;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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


    public Prediction toEntity(MlPredictionResponseDTO responseDTO, CreditApplication creditApplication){
        Prediction prediction = new Prediction();
        prediction.setCreditApplication(creditApplication);
        prediction.setDefaultProbability(responseDTO.defaultProbability());
        prediction.setPredictionStatus(PredictionStatus.valueOf(responseDTO.prediction_label()));
        prediction.setModelVersion(responseDTO.modelVersion());
        prediction.setCreatedAt(LocalDateTime.now());

        if(responseDTO.defaultProbability().compareTo(BigDecimal.valueOf(0.70))>=0){
            prediction.setRiskBand(RiskBand.HIGH);
        }
        else if(responseDTO.defaultProbability().compareTo(BigDecimal.valueOf(0.40))>=0){
            prediction.setRiskBand(RiskBand.MEDIUM);
        }
        else{
            prediction.setRiskBand(RiskBand.LOW);
        }

        return prediction;

    }
}
