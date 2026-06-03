package com.example.credit.prediction;

import com.example.credit.application.CreditApplication;
import com.example.credit.application.CreditApplicationMapper;
import com.example.credit.application.CreditApplicationRepository;
import com.example.credit.application.CreditApplicationResponseDTO;
import com.example.credit.exception.CreditApplicationNotFoundException;
import com.example.credit.exception.PredictionNotFoundException;
import org.springframework.stereotype.Service;

import javax.swing.undo.CannotRedoException;
import java.util.List;
import java.util.UUID;

@Service
public class PredictionService {

    private final PredictionRepository predictionRepository;

    private final PredictionMapper predictionMapper;

    private final CreditApplicationMapper creditApplicationMapper;
    private final CreditApplicationRepository creditApplicationRepository;

    public PredictionService(PredictionRepository predictionRepository, PredictionMapper predictionMapper, CreditApplicationMapper creditApplicationMapper, CreditApplicationRepository creditApplicationRepository){
        this.predictionRepository = predictionRepository;
        this.predictionMapper = predictionMapper;
        this.creditApplicationMapper = creditApplicationMapper;
        this.creditApplicationRepository = creditApplicationRepository;
    }

    public CreditApplicationResponseDTO getCreditApplicationByPredictionId(UUID id){
        Prediction prediction = predictionRepository.findById(id).orElseThrow(()-> new PredictionNotFoundException(id));

        return creditApplicationMapper.toResponse(prediction.getCreditApplication());
    }

    public PredictionResponseDTO getPredictionById(UUID id){
        Prediction prediction = predictionRepository.findById(id).orElseThrow(()-> new PredictionNotFoundException(id));
        return predictionMapper.toResponse(prediction);
    }

    public List<PredictionResponseDTO> getPredictionsByApplicationId(UUID id){

        creditApplicationRepository.findById(id).orElseThrow(()-> new CreditApplicationNotFoundException(id));

        return predictionRepository.findByCreditApplicationId(id).stream().map(predictionMapper::toResponse).toList();
    }

    public List<PredictionResponseDTO> getAllPredictions(){
        return predictionRepository.findAll().stream().map(predictionMapper::toResponse).toList();
    }


}
