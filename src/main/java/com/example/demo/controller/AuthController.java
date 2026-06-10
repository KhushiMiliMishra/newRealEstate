package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UserRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/test")
    public String test() {
        return "Backend Working";
    }

    @PostMapping("/register")
    public String register(@RequestBody UserRequest request) {

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        userRepository.save(user);

        return "User Registered Successfully";
    }

    @PostMapping("/login")
public User login(@RequestBody LoginRequest request) {

    User user = userRepository
            .findByEmail(request.getEmail())
            .orElse(null);

    if (user == null) {
        return null;
    }

    if (user.getPassword().equals(request.getPassword())) {
        return user;
    }

    return null;
}
}