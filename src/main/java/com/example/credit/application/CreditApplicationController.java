package com.example.credit.application;

import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/applications")
public class CreditApplicationController {

    private final CreditApplicationService creditApplicationService;

    public CreditApplicationController(CreditApplicationService creditApplicationService){
        this.creditApplicationService = creditApplicationService;
    }

    @PostMapping
    public ResponseEntity<CreditApplicationResponseDTO> createApplication(
            @Valid @RequestBody CreditApplicationRequestDTO requestDTO
            ){
        return new ResponseEntity<>(creditApplicationService.createApplication(requestDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CreditApplicationResponseDTO> getApplicationById(@PathVariable UUID id){
        return new ResponseEntity<>(creditApplicationService.getApplicationById(id),HttpStatus.OK);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<CreditApplicationResponseDTO>> getApplicationByCustomerId(@PathVariable UUID customerId){
        return new ResponseEntity<>(creditApplicationService.getApplicationsByCustomerId(customerId),HttpStatus.OK);
    }

}
