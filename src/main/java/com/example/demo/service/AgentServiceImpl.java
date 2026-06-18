package com.example.demo.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.AgentRequest;
import com.example.demo.dto.AgentResponse;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Service
public class AgentServiceImpl implements AgentService {

    private final UserRepository userRepository;

    public AgentServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public AgentResponse createAgent(AgentRequest request) {

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        user.setPasswordHash(
            new BCryptPasswordEncoder().encode(request.getPassword())
        );

        user.setRole("AGENT");
        user.setStatus("ACTIVE");

        User saved = userRepository.save(user);

        AgentResponse response = new AgentResponse();

        response.setUserId(saved.getUserId());
        response.setFullName(saved.getFullName());
        response.setEmail(saved.getEmail());
        response.setPhone(saved.getPhone());
        response.setRole(saved.getRole());
        response.setStatus(saved.getStatus());

        return response;
    }
}