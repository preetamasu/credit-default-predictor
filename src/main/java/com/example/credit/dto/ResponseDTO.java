package com.example.credit.dto;

import java.util.Date;

public record ResponseDTO(
        String token,
        Date expiredAt
) {

}
