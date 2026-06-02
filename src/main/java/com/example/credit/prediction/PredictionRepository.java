package com.example.credit.prediction;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PredictionRepository extends JpaRepository<Prediction, UUID> {
   List<Prediction> findByCreditApplicationId(UUID id);
}
