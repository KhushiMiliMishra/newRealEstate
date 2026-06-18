package com.example.demo.dto;

import lombok.Data;

@Data
public class AgentRequest {

    private String fullName;
    private String email;
    private String phone;
    private String password;

}