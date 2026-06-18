package com.example.demo.service;

import com.example.demo.dto.AgentRequest;
import com.example.demo.dto.AgentResponse;

public interface AgentService {

    AgentResponse createAgent(AgentRequest request);

}