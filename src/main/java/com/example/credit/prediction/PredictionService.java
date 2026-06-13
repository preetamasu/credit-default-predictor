package com.example.credit.prediction;

import com.example.credit.application.CreditApplication;
import com.example.credit.application.CreditApplicationMapper;
import com.example.credit.application.CreditApplicationRepository;
import com.example.credit.application.CreditApplicationResponseDTO;
import com.example.credit.exception.CreditApplicationNotFoundException;
import com.example.credit.exception.MlServiceException;
import com.example.credit.exception.PredictionNotFoundException;
import com.example.credit.ml.MlPredictionClient;
import com.example.credit.ml.MlPredictionRequestDTO;
import com.example.credit.ml.MlPredictionResponseDTO;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.swing.undo.CannotRedoException;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class PredictionService {

    private final PredictionRepository predictionRepository;

    private final PredictionMapper predictionMapper;

    private final CreditApplicationMapper creditApplicationMapper;
    private final CreditApplicationRepository creditApplicationRepository;

    private MlPredictionResponseDTO responseDTO;
    private final MlPredictionClient mlPredictionClient;

    public PredictionService(PredictionRepository predictionRepository, PredictionMapper predictionMapper, CreditApplicationMapper creditApplicationMapper, CreditApplicationRepository creditApplicationRepository,MlPredictionClient mlPredictionClient){
        this.predictionRepository = predictionRepository;
        this.predictionMapper = predictionMapper;
        this.creditApplicationMapper = creditApplicationMapper;
        this.creditApplicationRepository = creditApplicationRepository;
        this.mlPredictionClient = mlPredictionClient;
    }

    @Cacheable(value = "APPLICATIONBYPREDID_CACHE",key="#id")
    public CreditApplicationResponseDTO getCreditApplicationByPredictionId(UUID id){
        Prediction prediction = predictionRepository.findById(id).orElseThrow(()-> new PredictionNotFoundException(id));

        return creditApplicationMapper.toResponse(prediction.getCreditApplication());
    }

    @Cacheable(value="PREDICTIONBYID_CACHE",key="#id")
    public PredictionResponseDTO getPredictionById(UUID id){
        Prediction prediction = predictionRepository.findById(id).orElseThrow(()-> new PredictionNotFoundException(id));
        return predictionMapper.toResponse(prediction);
    }

    @Cacheable(value="PREDICTIONSBYAPPLID",key="#id")
    public List<PredictionResponseDTO> getPredictionsByApplicationId(UUID id){

        creditApplicationRepository.findById(id).orElseThrow(()-> new CreditApplicationNotFoundException(id));

        return predictionRepository.findByCreditApplicationId(id).stream().map(predictionMapper::toResponse).toList();
    }

    @Cacheable(value="PREDICTIONS",key="'all'")
    public List<PredictionResponseDTO> getAllPredictions(){
        return predictionRepository.findAll().stream().map(predictionMapper::toResponse).toList();
    }

    public PredictionResponseDTO runPredictionForApplication(UUID applicationId){
        CreditApplication creditApplication = creditApplicationRepository.findById(applicationId).orElseThrow(()-> new CreditApplicationNotFoundException(applicationId));

        MlPredictionRequestDTO requestDTO = new MlPredictionRequestDTO(
                12,
                creditApplication.getAnnualIncome(),
                BigDecimal.valueOf(creditApplication.getEmploymentLengthMonths()),
                1,
                creditApplication.getLoanAmount(),
                BigDecimal.valueOf(12.0),
                creditApplication.getDebtToIncomeRatio(),
                0,
                5,
                "RENT",
                creditApplication.getLoanPurpose().name()
        );

        try{
             responseDTO = mlPredictionClient.predict(requestDTO);
        }
        catch(Exception exception){
            throw new MlServiceException("Ml Service is currently unavailable");
        }
        Prediction saved = predictionRepository.save(predictionMapper.toEntity(responseDTO,creditApplication));

        return predictionMapper.toResponse(saved);

    }

}
