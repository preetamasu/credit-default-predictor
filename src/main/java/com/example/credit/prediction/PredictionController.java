package com.example.credit.prediction;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/predictions")
public class PredictionController {

    private final PredictionService predictionService;

    public PredictionController(PredictionService predictionService){
        this.predictionService = predictionService;
    }

    @GetMapping("/{predictionId}")
    public ResponseEntity<PredictionResponseDTO> getPredictionById(@PathVariable UUID predictionId){
        return new ResponseEntity<>(predictionService.getPredictionById(predictionId), HttpStatus.OK);
    }

    @GetMapping("/application/{applicationId}")
    public ResponseEntity<List<PredictionResponseDTO>> getPredictionsByApplicationId(@PathVariable UUID applicationId){
        return new ResponseEntity<>(predictionService.getPredictionsByApplicationId(applicationId),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PredictionResponseDTO>> getAllPredictions(){
        return new ResponseEntity<>(predictionService.getAllPredictions(),HttpStatus.OK);
    }

}
