package com.example.credit.ml;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class MlPredictionClient {
    private final RestClient restClient;

    public MlPredictionClient(RestClient.Builder restClientBuilder,  @Value("${URL}")
    String url){
        this.restClient = restClientBuilder.baseUrl(url).build();
    }

    public MlPredictionResponseDTO predict(MlPredictionRequestDTO mlPredictionRequestDTO){
        return restClient.post().uri("/predict").body(mlPredictionRequestDTO).retrieve().body(MlPredictionResponseDTO.class);
    }
}
