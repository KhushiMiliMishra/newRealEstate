package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.UserRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/test")
    public String test() {
        return "Backend Working";
    }

    @PostMapping("/register")
    public String register(
            @RequestBody UserRequest request
    ) {

        if (
                userRepository.findByEmail(
                        request.getEmail()
                ).isPresent()
        ) {
            return "Email already exists";
        }

        User user = new User();

        user.setFullName(
                request.getFullName()
        );

        user.setEmail(
                request.getEmail()
        );

        user.setPasswordHash(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setRole("CUSTOMER");

        userRepository.save(user);

        return "User Registered Successfully";
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ) {

        User user =
                userRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElse(null);

        if (user == null) {
            return null;
        }

        if (
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPasswordHash()
                )
        ) {

            if (
                    !user.getRole()
                            .equals(
                                    request.getPortal()
                            )
            ) {
                return null;
            }

            return new LoginResponse(
                    user.getUserId(),
                    user.getFullName(),
                    user.getEmail(),
                    user.getRole()
            );
        }

        return null;
    }
}