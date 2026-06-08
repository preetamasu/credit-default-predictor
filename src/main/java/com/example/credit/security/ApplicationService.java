package com.example.credit.security;


import com.example.credit.dto.LoginDTO;
import com.example.credit.dto.RegisterDTO;
import com.example.credit.dto.ResponseDTO;
import com.example.credit.user.Role;
import com.example.credit.user.User;
import com.example.credit.user.UserRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public User register(RegisterDTO registerDTO){
        User user = new User();
        user.setFirstName(registerDTO.firstName());
        user.setLastName(registerDTO.lastName());
        user.setEmail(registerDTO.email());
        user.setPassword(passwordEncoder.encode(registerDTO.password()));
        user.setRole(Role.USER);
        user.setEnabled(true);
        return userRepository.save(user);
    }

    public ResponseDTO login(LoginDTO loginDTO){
        User user = userRepository.findByEmail(loginDTO.email()).orElseThrow( ()-> new UsernameNotFoundException("User not found please register"));
        if(!user.isEnabled()){
            throw new RuntimeException("User is not verified. Please go and verify and come back");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.email(),
                        loginDTO.password()
                )
        );
        String jwtToken = jwtService.generateToken(new HashMap<>(),user);
        return new ResponseDTO(jwtToken,jwtService.extractClaim(jwtToken, Claims::getExpiration));

    }

}
