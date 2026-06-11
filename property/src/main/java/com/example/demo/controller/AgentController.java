package com.example.demo.controller;

import com.example.demo.entity.Agent;
import com.example.demo.repository.AgentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/agents")
@CrossOrigin(origins = "http://localhost:5173")
public class AgentController {

    @Autowired
    private AgentRepository agentRepository;

    @GetMapping("/{id}")
    public Agent getAgent(
            @PathVariable Long id) {

        return agentRepository.findById(id)
                .orElse(null);
    }

    @GetMapping("/user/{userId}")
    public Agent getAgentByUserId(
            @PathVariable Long userId) {

        return agentRepository.findByUserId(userId);
    }

    @PutMapping("/{id}")
    public Agent updateAgent(
            @PathVariable Long id,
            @RequestBody Agent updatedAgent) {

        Agent agent =
                agentRepository.findById(id).orElse(null);

        if (agent == null) {
            return null;
        }

        agent.setFullName(updatedAgent.getFullName());
        agent.setEmail(updatedAgent.getEmail());
        agent.setPhone(updatedAgent.getPhone());
        agent.setCompanyName(updatedAgent.getCompanyName());
        agent.setStatus(updatedAgent.getStatus());

        return agentRepository.save(agent);
    }
}