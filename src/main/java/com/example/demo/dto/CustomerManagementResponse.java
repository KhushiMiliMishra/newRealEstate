package com.example.demo.dto;

public class CustomerManagementResponse {

    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private String status;

    public CustomerManagementResponse(
            Long userId,
            String fullName,
            String email,
            String phone,
            String status
    ) {
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getStatus() {
        return status;
    }
}