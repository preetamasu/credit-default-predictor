package com.example.credit.prediction;


import com.example.credit.application.CreditApplication;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Prediction {
    @Id
    @GeneratedValue(
            strategy = GenerationType.UUID
    )
    private UUID id;

    @ManyToOne
    @JoinColumn
            (name = "application_id"      )
    private CreditApplication creditApplication;

    private BigDecimal defaultProbability;

    @Enumerated(EnumType.STRING)
    private RiskBand riskBand;

    private PredictionStatus predictionStatus;

    private String modelVersion;

    private LocalDateTime createdAt;
}
