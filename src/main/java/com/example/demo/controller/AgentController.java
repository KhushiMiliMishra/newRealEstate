package com.example.demo.controller;

import com.example.demo.dto.AgentRegistrationRequest;
import com.example.demo.entity.AgentProfile;
import com.example.demo.entity.User;
import com.example.demo.repository.AgentProfileRepository;
import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/agents")
@CrossOrigin(origins = "http://localhost:5173")
public class AgentController {

@Autowired
private UserRepository userRepository;

@Autowired
private AgentProfileRepository agentProfileRepository;

@Autowired
private PasswordEncoder passwordEncoder;

@PostMapping("/register")
public String registerAgent(
        @RequestBody AgentRegistrationRequest request
) {

    if (
            userRepository
                    .findByEmail(request.getEmail())
                    .isPresent()
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

    user.setPhone(
        request.getPhone()
);

    user.setPasswordHash(
            passwordEncoder.encode(
                    request.getPassword()
            )
    );

    user.setRole("AGENT");

    user=userRepository.save(user);

    AgentProfile profile =
            new AgentProfile();

    profile.setAgentId(
            user.getUserId()
    );

    profile.setAgencyName(
            request.getAgencyName()
    );

    profile.setLicenseNumber(
            request.getLicenseNumber()
    );

    profile.setExperienceYears(
            request.getExperienceYears()
    );

    profile.setOfficeAddress(
            request.getOfficeAddress()
    );

    profile.setVerificationStatus(
            "PENDING"
    );

    profile.setAverageRating(0.0);

    profile.setTotalReviews(0);

    agentProfileRepository.save(profile);

    return "Agent Registration Submitted";
}

}
