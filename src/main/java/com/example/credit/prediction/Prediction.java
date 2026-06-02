package com.example.credit.prediction;


import com.example.credit.application.CreditApplication;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Prediction {
    @Id
    @GeneratedValue(
            strategy = GenerationType.UUID
    )
    private UUID id;

    @ManyToOne
    @JoinColumn
            (
                    name = "application_id"
            )
    private CreditApplication creditApplication;

    private BigDecimal defaultProbability;

    @Enumerated(EnumType.STRING)
    private RiskBand riskBand;

    private PredictionStatus predictionStatus;

    private String modelVersion;

    private LocalDateTime createdAt;
}
