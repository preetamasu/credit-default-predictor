package com.example.credit.auth;

import com.example.credit.dto.LoginDTO;
import com.example.credit.dto.RegisterDTO;
import com.example.credit.dto.ResponseDTO;
import com.example.credit.dto.UserResponseDTO;
import com.example.credit.security.ApplicationService;
import com.example.credit.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final ApplicationService applicationService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> signUp(
            @RequestBody RegisterDTO registerDTO
            )
    {
        return new ResponseEntity<>(applicationService.register(registerDTO), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginDTO loginDTO){
        return new ResponseEntity<>(applicationService.login(loginDTO),HttpStatus.OK);
    }
}
