package com.example.demo.dto;

import lombok.Data;

@Data
public class AgentResponse {

    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private String role;
    private String status;

}