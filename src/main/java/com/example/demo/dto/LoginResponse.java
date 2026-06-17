package com.example.demo.dto;

public class LoginResponse {

    private Long userId;
    private String fullName;
    private String email;
    private String role;
    private String phone;

    public LoginResponse(
            Long userId,
            String fullName,
            String email,
            String role,
            String phone
    ) {
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.phone = phone;
    }

    public Long getUserId() {
        return userId;
    }

    public String getPhone() {
        return phone;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}