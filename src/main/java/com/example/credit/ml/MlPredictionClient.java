package com.example.credit.ml;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class MlPredictionClient {
    private final RestClient restClient;

    public MlPredictionClient(RestClient.Builder restClientBuilder){
        this.restClient = restClientBuilder.baseUrl("http://127.0.0.1:8000").build();
    }

    public MlPredictionResponseDTO predict(MlPredictionRequestDTO mlPredictionRequestDTO){
        return restClient.post().uri("/predict").body(mlPredictionRequestDTO).retrieve().body(MlPredictionResponseDTO.class);
    }
}
