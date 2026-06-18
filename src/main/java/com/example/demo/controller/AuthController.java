package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.ProfileUpdateRequest;
import com.example.demo.dto.UserRequest;
import com.example.demo.entity.CustomerProfile;
// import com.example.demo.config.*;
import com.example.demo.config.JwtUtil;
import com.example.demo.entity.User;
import com.example.demo.repository.CustomerProfileRepository;
import com.example.demo.repository.UserRepository;
// import java.nio.charset.StandardCharsets;
// import java.util.Base64;
import java.util.Map;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
// @CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
private CustomerProfileRepository customerProfileRepository;
    
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
        user.setPhone(
                request.getPhone()
        );
        user.setRole("CUSTOMER");

        User savedUser = userRepository.save(user);

CustomerProfile profile = new CustomerProfile();

profile.setCustomerId(savedUser.getUserId());

profile.setBudgetMin(request.getMinBudget());
profile.setBudgetMax(request.getMaxBudget());

profile.setPreferredLocality(
        request.getPreferredLocality()
);

profile.setPreferredPropertyType(
        request.getPreferredPropertyType()
);

profile.setTransactionType(
        request.getPreferredTransactionType()
);

customerProfileRepository.save(profile);

        return "User Registered Successfully";
    }

    @PostMapping("/login")
public LoginResponse login(
        @RequestBody LoginRequest request
) {

    User user =
            userRepository
                    .findByEmail(request.getEmail())
                    .orElse(null);

    if (user == null) {
        return null;
    }

    if (!passwordEncoder.matches(
            request.getPassword(),
            user.getPasswordHash()
    )) {
        return null;
    }

    if (!user.getRole().equals(request.getPortal())) {
        return null;
    }

    CustomerProfile profile =
            customerProfileRepository
                    .findById(user.getUserId())
                    .orElse(null);

    LoginResponse response = new LoginResponse();
    response.setUserId(user.getUserId());
    response.setFullName(user.getFullName());
    response.setEmail(user.getEmail());
    response.setRole(user.getRole());
    response.setPhone(user.getPhone());

    if (profile != null) {
        response.setBudgetMin(profile.getBudgetMin());
        response.setBudgetMax(profile.getBudgetMax());
        response.setPreferredLocality(profile.getPreferredLocality());
        response.setPreferredPropertyType(profile.getPreferredPropertyType());
        response.setTransactionType(profile.getTransactionType());
    } else {
        response.setBudgetMin(0.0);
        response.setBudgetMax(0.0);
        response.setPreferredLocality("");
        response.setPreferredPropertyType("");
        response.setTransactionType("");
    }
    String token =
        JwtUtil.generateToken(
                user.getUserId(),
                user.getEmail(),
                user.getRole()
        );

response.setToken(token);
    return response;
}
    @GetMapping("/profile/{userId}")
    public Map<String, Object> getProfile(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        Map<String, Object> response = new HashMap<>();
        if (user == null) {
            response.put("message", "User not found");
            return response;
        }
        response.put("userId", user.getUserId());
        response.put("fullName", user.getFullName());
        response.put("email", user.getEmail());
        response.put("phone", user.getPhone());
        response.put("role", user.getRole());
        return response;
    }

    @PutMapping("/profile/{userId}")
public Map<String, Object> updateProfile(
        @PathVariable Long userId,
        @RequestBody ProfileUpdateRequest request
) {

    User user = userRepository
            .findById(userId)
            .orElse(null);

    Map<String, Object> response = new HashMap<>();

    if (user == null) {
        response.put("message", "User not found");
        return response;
    }

    user.setFullName(request.getFullName());
    user.setEmail(request.getEmail());
    user.setPhone(request.getPhone());

    userRepository.save(user);

    CustomerProfile profile =
            customerProfileRepository
                    .findById(userId)
                    .orElse(new CustomerProfile());

    profile.setCustomerId(userId);

    profile.setBudgetMin(request.getMinBudget());
    profile.setBudgetMax(request.getMaxBudget());

    profile.setPreferredLocality(
            request.getPreferredLocality()
    );

    profile.setPreferredPropertyType(
            request.getPreferredPropertyType()
    );

    profile.setTransactionType(
            request.getPreferredTransactionType()
    );

    customerProfileRepository.save(profile);

    response.put("userId", user.getUserId());
    response.put("fullName", user.getFullName());
    response.put("email", user.getEmail());
    response.put("phone", user.getPhone());

    response.put("minBudget", profile.getBudgetMin());
    response.put("maxBudget", profile.getBudgetMax());

    response.put("preferredLocality",
            profile.getPreferredLocality());

    response.put("preferredPropertyType",
            profile.getPreferredPropertyType());

    response.put("preferredTransactionType",
            profile.getTransactionType());

    return response;
}
}